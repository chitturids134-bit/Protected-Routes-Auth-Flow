import { Shield, LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

/**
 * Navbar component.
 * BUG 4: Navbar ignores auth state completely.
 * It always shows the "Login" link and never shows "Logout" or the User info.
 */
function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-brand-600 font-bold text-xl">
          <Shield className="w-6 h-6" />
          <span>VaultApp</span>
        </Link>
        
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/dashboard" className="text-slate-600 hover:text-brand-600 transition-colors">Dashboard</Link>
          <Link to="/settings" className="text-slate-600 hover:text-brand-600 transition-colors">Settings</Link>
          
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span className="font-medium">{user?.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1.5 text-slate-600 hover:text-red-600 transition-colors px-3 py-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-brand-50 text-brand-600 px-4 py-2 rounded-lg hover:bg-brand-100 transition-all font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
