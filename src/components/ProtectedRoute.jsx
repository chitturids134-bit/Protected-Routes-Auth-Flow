import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * ProtectedRoute component.
 * Checks if the user is authenticated.
 * If yes, it renders the child components.
 * If no, it redirects to the login page using Navigate.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // If not authenticated, redirect to /login
  if (!isAuthenticated) {
    // We use replace to prevent the user from going back to the protected page
    return <Navigate to="/login" replace />
  }

  // If authenticated, render children
  return children
}

export default ProtectedRoute
