import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';

const useApi = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { showLoading, hideLoading, showError, hideError } = useAlert();

  const handleError = useCallback((error) => {
    hideError();
    if (error.response) {
    // Handle specific HTTP error responses
    switch (error.response?.status) {
      case 401:
        logout();
        navigate('/login');
        showError('Authentication session expired. Please log in again.');
        break;
      case 403:
        showError('You do not have permission to perform this action.');
        break;
      case 404:
        showError('The requested resource was not found.');
        break;
      case 422:
        showError(error.response.data.message || 'Validation error. Please check your input.');
        break;
      case 500:
        showError('An internal server error occurred. Please try again later.');
        break;
      default:
        showError(error.response?.data?.message || 'An error occurred. Please try again.');
      }
    }
    // Handle network errors
    if (error.request) {
      showError('Unable to connect to the server. Please check your internet connection.');
    } else {
      // Handle other errors
      showError(error.message || 'An unexpected error occurred.');
    }
  }, [logout, navigate, showError]);

  const executeApiCall = useCallback(async (apiFunction) => {
    showLoading();
    hideError();

    try {
      const response = await apiFunction();
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading, hideError, handleError]);

  return {
    executeApiCall,
  };
};

export default useApi;
