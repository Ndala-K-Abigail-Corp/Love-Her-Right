import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { SpecialDate } from '../types';
import { useAuth } from '../hooks/useAuth';
import { calculateCycleInfo, getCyclePhaseColor } from '../lib/cycle';

interface CalendarViewProps {
  specialDates: SpecialDate[];
}

export default function CalendarView({ specialDates }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { profile } = useAuth();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDayInfo = (day: Date) => {
    const specialDate = specialDates.find(sd => isSameDay(parseISO(sd.date), day));
    
    let cyclePhase = null;
    if (profile?.cycleStartDate) {
      const cycleInfo = calculateCycleInfo(profile.cycleStartDate, profile.cycleLength);
      // Simplified - in production you'd calculate the actual phase for each day
      cyclePhase = cycleInfo.phase;
    }

    return { specialDate, cyclePhase };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {daysInMonth.map(day => {
          const { specialDate, cyclePhase } = getDayInfo(day);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toString()}
              className={`
                min-h-20 p-2 border rounded-lg
                ${!isSameMonth(day, currentDate) ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${isToday ? 'border-primary-500 border-2' : 'border-gray-200'}
                ${specialDate ? 'bg-pink-50' : ''}
              `}
            >
              <div className="font-semibold text-sm">{format(day, 'd')}</div>
              {specialDate && (
                <div className="text-xs text-primary-600 mt-1 truncate">
                  {specialDate.label}
                </div>
              )}
              {cyclePhase && (
                <div className={`text-xs mt-1 px-1 rounded ${getCyclePhaseColor(cyclePhase)}`}>
                  {cyclePhase}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary-500 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-50 border border-gray-200 rounded"></div>
          <span>Special Date</span>
        </div>
      </div>
    </div>
  );
}
