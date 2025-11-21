import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl">❤️</span>
            <span className="text-xl font-bold">LoveHerRight</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-primary-100 transition">
              Dashboard
            </Link>
            <Link to="/reminders" className="hover:text-primary-100 transition">
              Reminders
            </Link>
            <Link to="/calendar" className="hover:text-primary-100 transition">
              Calendar
            </Link>
            <Link to="/favorites" className="hover:text-primary-100 transition">
              Favorites
            </Link>
            <Link to="/tasks" className="hover:text-primary-100 transition">
              Tasks
            </Link>
            <Link to="/settings" className="hover:text-primary-100 transition">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-primary-50 transition font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
