import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { Favorite } from '../types';
import Card from '../components/Card';

const categories: Favorite['category'][] = ['food', 'gift', 'place', 'activity', 'other'];

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    item: '',
    category: 'other' as Favorite['category'],
    notes: '',
  });

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;

    try {
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'favorites'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Favorite));
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newFavorite: Omit<Favorite, 'id'> = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'users', user.uid, 'favorites'), newFavorite);
      
      setFormData({ item: '', category: 'other', notes: '' });
      setShowForm(false);
      loadFavorites();
    } catch (error) {
      console.error('Error creating favorite:', error);
    }
  };

  const deleteFavorite = async (id: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', id));
      loadFavorites();
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  const getCategoryIcon = (category: Favorite['category']) => {
    switch (category) {
      case 'food': return '🍽️';
      case 'gift': return '🎁';
      case 'place': return '📍';
      case 'activity': return '🎯';
      default: return '⭐';
    }
  };

  const groupedFavorites = categories.reduce((acc, cat) => {
    acc[cat] = favorites.filter(f => f.category === cat);
    return acc;
  }, {} as Record<Favorite['category'], Favorite[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">⭐ Her Favorites</h1>
            <p className="text-gray-600 mt-2">Keep track of the things she loves</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            {showForm ? 'Cancel' : '+ Add Favorite'}
          </button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                <input
                  type="text"
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Chocolate ice cream, Roses, Paris..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Favorite['category'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional details..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Add Favorite
              </button>
            </form>
          </Card>
        )}

        {loading ? (
          <Card>
            <p className="text-gray-500 text-center">Loading favorites...</p>
          </Card>
        ) : favorites.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center">No favorites yet. Start adding things she loves!</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {categories.map(category => {
              const items = groupedFavorites[category];
              if (items.length === 0) return null;

              return (
                <Card key={category} title={`${getCategoryIcon(category)} ${category.charAt(0).toUpperCase() + category.slice(1)}`}>
                  <div className="grid gap-3">
                    {items.map(favorite => (
                      <div key={favorite.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{favorite.item}</h4>
                          {favorite.notes && (
                            <p className="text-sm text-gray-600 mt-1">{favorite.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteFavorite(favorite.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition ml-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
