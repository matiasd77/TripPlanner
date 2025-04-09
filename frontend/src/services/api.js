import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

/*
 * TODO: Authentication Interceptors (Temporarily Disabled)
 * Original implementation included:
 * - Request interceptor for JWT token
 * - Response interceptor for 401 handling
 * - Token management in localStorage
 * - Auth-based redirects
 */
// Interceptors temporarily disabled
api.interceptors.request.use((config) => config, (error) => Promise.reject(error));
api.interceptors.response.use((response) => response, (error) => Promise.reject(error));

// ========== Auth API ========== 
/* TODO: Auth endpoints (Temporarily Modified)
 * Original implementation handled:
 * - User login with JWT
 * - User registration
 * - Current user validation
 */
export const authAPI = {
  login: () => Promise.resolve({ data: { user: { id: 1, role: 'USER' }, token: 'dummy-token' } }),
  register: () => Promise.resolve({ data: { user: { id: 1, role: 'USER' }, token: 'dummy-token' } }),
  getCurrentUser: () => Promise.resolve({ data: { id: 1, role: 'USER' } })
};

// ========== Trips API ==========
export const tripsAPI = {
  getAllTrips: () => api.get('/trips'),
  getTrip: (id) => api.get(`/trips/${id}`),
  createTrip: (tripData) => api.post('/trips', tripData),
  updateTrip: (id, tripData) => api.put(`/trips/${id}`, tripData),
  deleteTrip: (id) => api.delete(`/trips/${id}`),
};

// ========== Activities API ==========
export const activitiesAPI = {
  getActivities: (tripId) => api.get(`/trips/${tripId}/activities`),
  addActivity: (tripId, activityData) => api.post(`/trips/${tripId}/activities`, activityData),
  updateActivity: (tripId, activityId, activityData) =>
    api.put(`/trips/${tripId}/activities/${activityId}`, activityData),
  deleteActivity: (tripId, activityId) =>
    api.delete(`/trips/${tripId}/activities/${activityId}`),
};

// ========== Accommodation API ==========
export const accommodationAPI = {
  getAccommodations: (tripId) => api.get(`/trips/${tripId}/accommodations`),
  addAccommodation: (tripId, accommodationData) =>
    api.post(`/trips/${tripId}/accommodations`, accommodationData),
  updateAccommodation: (tripId, accommodationId, accommodationData) =>
    api.put(`/trips/${tripId}/accommodations/${accommodationId}`, accommodationData),
  deleteAccommodation: (tripId, accommodationId) =>
    api.delete(`/trips/${tripId}/accommodations/${accommodationId}`),
};

// ========== Transport API ==========
export const transportAPI = {
  getTransports: (tripId) => api.get(`/trips/${tripId}/transports`),
  addTransport: (tripId, transportData) =>
    api.post(`/trips/${tripId}/transports`, transportData),
  updateTransport: (tripId, transportId, transportData) =>
    api.put(`/trips/${tripId}/transports/${transportId}`, transportData),
  deleteTransport: (tripId, transportId) =>
    api.delete(`/trips/${tripId}/transports/${transportId}`),
};

// ========== User Profile API ==========
export const userAPI = {
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/password', passwordData),
};

export default api;
