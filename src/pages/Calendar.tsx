import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { SpecialDate } from '../types';
import CalendarView from '../components/CalendarView';

export default function Calendar() {
  const { user } = useAuth();
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpecialDates();
  }, [user]);

  const loadSpecialDates = async () => {
    if (!user) return;

    try {
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'specialDates'));
      const dates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SpecialDate));
      setSpecialDates(dates);
    } catch (error) {
      console.error('Error loading special dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📆 Calendar</h1>
          <p className="text-gray-600 mt-2">Track special dates and important moments</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 text-center">Loading calendar...</p>
          </div>
        ) : (
          <CalendarView specialDates={specialDates} />
        )}
      </div>
    </div>
  );
}
