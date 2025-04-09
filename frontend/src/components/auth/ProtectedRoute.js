import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box } from '@mui/material';

/*
 * TODO: Authentication Check (Temporarily Disabled)
 * Original implementation checked:
 * - Loading state with CircularProgress
 * - Authentication state
 * - Redirected to /login if not authenticated
 * - Preserved original location in state for redirect after login
 */
const ProtectedRoute = ({ children }) => {
  // Authentication temporarily disabled - allowing all access
  return children;
};

export default ProtectedRoute;
