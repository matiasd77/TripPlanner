import { createContext, useState, useContext } from 'react';

/*
 * TODO: Authentication Context (Temporarily Disabled)
 * Original implementation included:
 * - Token validation on mount
 * - User state management
 * - Login/Logout functionality
 * - Token storage in localStorage
 * - Protected API calls
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Temporarily provide default authenticated state
  const [user] = useState({ id: 1, role: 'USER' });
  const [loading] = useState(false);

  // Simplified auth context value
  const value = {
    user,
    loading,
    login: () => Promise.resolve(true),
    logout: () => {},
    isAuthenticated: true, // Always authenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
