import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { calculateCycleInfo, getCyclePhaseColor } from '../lib/cycle';
import Card from '../components/Card';
import { SpecialDate } from '../types';
import { parseISO, isFuture, isToday, formatDistanceToNow } from 'date-fns';

const relationshipTips = [
  {
    title: 'Listen Actively',
    content: 'Put away distractions and give her your full attention when she speaks. Show you care by remembering the details.',
  },
  {
    title: 'Express Appreciation',
    content: 'Tell her specific things you appreciate about her. "I love how you..." means more than generic compliments.',
  },
  {
    title: 'Small Gestures Matter',
    content: 'Leave a sweet note, bring her favorite coffee, or do a chore without being asked. Consistency beats grand gestures.',
  },
  {
    title: 'Quality Time',
    content: 'Schedule regular date nights and protect that time. Being present matters more than expensive activities.',
  },
  {
    title: 'Learn Her Love Language',
    content: 'Understand how she feels most loved and make an effort to speak her language, not just yours.',
  },
];

export default function Dashboard() {
  const { profile, user } = useAuth();
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);
  const [loading, setLoading] = useState(true);

  const todaysTip = relationshipTips[new Date().getDay() % relationshipTips.length];

  useEffect(() => {
    loadSpecialDates();
  }, [user]);

  const loadSpecialDates = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'users', user.uid, 'specialDates'),
        orderBy('date', 'asc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const dates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SpecialDate));
      setSpecialDates(dates);
    } catch (error) {
      console.error('Error loading special dates:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingDates = specialDates
    .filter(d => isFuture(parseISO(d.date)) || isToday(parseISO(d.date)))
    .slice(0, 3);

  const cycleInfo = profile?.cycleStartDate
    ? calculateCycleInfo(profile.cycleStartDate, profile.cycleLength)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back{profile?.name ? `, ${profile.name}` : ''}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's how you can be an amazing partner today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Tip */}
          <Card title="💡 Today's Relationship Tip" className="bg-gradient-to-br from-primary-50 to-pink-50">
            <h3 className="font-semibold text-lg text-primary-700 mb-2">{todaysTip.title}</h3>
            <p className="text-gray-700">{todaysTip.content}</p>
          </Card>

          {/* Cycle Info */}
          {cycleInfo && profile?.partnerName && (
            <Card title={`🌸 ${profile.partnerName}'s Cycle`}>
              <div className="space-y-3">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCyclePhaseColor(cycleInfo.phase)}`}>
                  {cycleInfo.phase.charAt(0).toUpperCase() + cycleInfo.phase.slice(1)} Phase
                </div>
                <p className="text-sm text-gray-600">Day {cycleInfo.currentDay}</p>
                <p className="text-sm text-gray-700 font-medium">{cycleInfo.mood}</p>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">How to support her:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {cycleInfo.tips.slice(0, 2).map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* Upcoming Dates */}
          <Card title="📅 Upcoming Special Dates">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : upcomingDates.length > 0 ? (
              <div className="space-y-3">
                {upcomingDates.map(date => (
                  <div key={date.id} className="border-l-4 border-primary-500 pl-3">
                    <p className="font-medium text-gray-800">{date.label}</p>
                    <p className="text-sm text-gray-600">
                      {formatDistanceToNow(parseISO(date.date), { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming dates. Add some in Settings!</p>
            )}
          </Card>

          {/* Quick Actions */}
          <Card title="⚡ Quick Actions" className="md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/reminders"
                className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition"
              >
                <span className="text-3xl mb-2">⏰</span>
                <span className="font-medium text-gray-800">Reminders</span>
              </Link>
              <Link
                to="/favorites"
                className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg hover:shadow-md transition"
              >
                <span className="text-3xl mb-2">⭐</span>
                <span className="font-medium text-gray-800">Favorites</span>
              </Link>
              <Link
                to="/tasks"
                className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition"
              >
                <span className="text-3xl mb-2">✅</span>
                <span className="font-medium text-gray-800">Tasks</span>
              </Link>
              <Link
                to="/calendar"
                className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition"
              >
                <span className="text-3xl mb-2">📆</span>
                <span className="font-medium text-gray-800">Calendar</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
