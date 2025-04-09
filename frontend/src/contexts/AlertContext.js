import { createContext, useContext, useState, useCallback } from 'react';
import LoadingBackdrop from '../components/layout/LoadingBackdrop';
import ErrorAlert from '../components/layout/ErrorAlert';
import SuccessAlert from '../components/layout/SuccessAlert';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const showError = useCallback((message) => {
    setError(message);
  }, []);

  const hideError = useCallback(() => {
    setError('');
  }, []);

  const showSuccess = useCallback((message) => {
    setSuccess(message);
  }, []);

  const hideSuccess = useCallback(() => {
    setSuccess('');
  }, []);

  return (
    <AlertContext.Provider
      value={{
        showLoading,
        hideLoading,
        showError,
        hideError,
        showSuccess,
        hideSuccess,
      }}
    >
      {children}
      <LoadingBackdrop open={loading} />
      <ErrorAlert error={error} onClose={hideError} />
      <SuccessAlert message={success} onClose={hideSuccess} />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
