import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { UserProfile, SpecialDate } from '../types';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useEffect } from 'react';

export default function Settings() {
  const { profile, updateProfile, logout, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);
  const [showDateForm, setShowDateForm] = useState(false);

  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    name: profile?.name || '',
    partnerName: profile?.partnerName || '',
    loveLanguage: profile?.loveLanguage || 'words',
    cycleStartDate: profile?.cycleStartDate || new Date().toISOString().split('T')[0],
    cycleLength: profile?.cycleLength || 28,
    notificationsEnabled: profile?.notificationsEnabled ?? true,
  });

  const [dateFormData, setDateFormData] = useState({
    label: '',
    date: '',
    type: 'custom' as SpecialDate['type'],
    recurring: true,
  });

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
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newDate: Omit<SpecialDate, 'id'> = {
        ...dateFormData,
        date: new Date(dateFormData.date).toISOString(),
      };

      await addDoc(collection(db, 'users', user.uid, 'specialDates'), newDate);
      
      setDateFormData({ label: '', date: '', type: 'custom', recurring: true });
      setShowDateForm(false);
      loadSpecialDates();
    } catch (error) {
      console.error('Error creating special date:', error);
    }
  };

  const deleteSpecialDate = async (id: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'specialDates', id));
      loadSpecialDates();
    } catch (error) {
      console.error('Error deleting special date:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">⚙️ Settings</h1>
          <p className="text-gray-600 mt-2">Manage your profile and preferences</p>
        </div>

        <div className="grid gap-6 max-w-3xl">
          {/* Profile Settings */}
          <Card title="👤 Profile Information">
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partner's Name</label>
                  <input
                    type="text"
                    value={profileData.partnerName}
                    onChange={(e) => setProfileData({ ...profileData, partnerName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner's Love Language</label>
                <select
                  value={profileData.loveLanguage}
                  onChange={(e) => setProfileData({ ...profileData, loveLanguage: e.target.value as UserProfile['loveLanguage'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="words">Words of Affirmation</option>
                  <option value="acts">Acts of Service</option>
                  <option value="gifts">Receiving Gifts</option>
                  <option value="time">Quality Time</option>
                  <option value="touch">Physical Touch</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Start Date</label>
                  <input
                    type="date"
                    value={profileData.cycleStartDate?.split('T')[0]}
                    onChange={(e) => setProfileData({ ...profileData, cycleStartDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Length (days)</label>
                  <input
                    type="number"
                    min="21"
                    max="35"
                    value={profileData.cycleLength}
                    onChange={(e) => setProfileData({ ...profileData, cycleLength: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={profileData.notificationsEnabled}
                  onChange={(e) => setProfileData({ ...profileData, notificationsEnabled: e.target.checked })}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                  Enable email notifications
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </Card>

          {/* Special Dates */}
          <Card title="📅 Special Dates">
            <div className="space-y-4">
              <button
                onClick={() => setShowDateForm(!showDateForm)}
                className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                {showDateForm ? 'Cancel' : '+ Add Special Date'}
              </button>

              {showDateForm && (
                <form onSubmit={handleDateSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={dateFormData.label}
                      onChange={(e) => setDateFormData({ ...dateFormData, label: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Anniversary, Birthday"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={dateFormData.date}
                        onChange={(e) => setDateFormData({ ...dateFormData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={dateFormData.type}
                        onChange={(e) => setDateFormData({ ...dateFormData, type: e.target.value as SpecialDate['type'] })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="anniversary">Anniversary</option>
                        <option value="birthday">Birthday</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={dateFormData.recurring}
                      onChange={(e) => setDateFormData({ ...dateFormData, recurring: e.target.checked })}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                      Recurring annually
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
                  >
                    Add Date
                  </button>
                </form>
              )}

              {specialDates.length > 0 && (
                <div className="space-y-2">
                  {specialDates.map(date => (
                    <div key={date.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{date.label}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(date.date).toLocaleDateString()} {date.recurring && '(Recurring)'}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteSpecialDate(date.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Account Actions */}
          <Card title="🔐 Account">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
