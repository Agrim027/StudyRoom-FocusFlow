import axios from 'axios';
import useAuthStore from '../../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Configured Axios instance with base URL and interceptors.
 */
const apiClient = axios.create({
  baseURL: API_URL,
});

// Request interceptor to automatically attach the JWT token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Authentication related API calls
 */
export const authService = {
  login: (email, password) => apiClient.post('/auth/signin', { email, password }),
  register: (username, email, password) => apiClient.post('/auth/signup', { username, email, password }),
};

/**
 * Focus Zone (Room) related API calls
 */
export const focusZoneService = {
  getAvailableZones: () => apiClient.get('/rooms/my-rooms'),
  getZoneDetails: (id) => apiClient.get(`/rooms/${id}`),
  createZone: (name, description) => apiClient.post('/rooms', { name, description }),
  joinZone: (roomCode) => apiClient.post(`/rooms/join/${roomCode}`)
};

/**
 * Productivity Session related API calls
 */
export const productivitySessionService = {
  getActiveSessions: (roomId) => apiClient.get(`/sessions/room/${roomId}/active`),
  startSession: (roomId) => apiClient.post(`/sessions/start/${roomId}`),
  endSession: (sessionId) => apiClient.post(`/sessions/end/${sessionId}`),
  getUserHistory: () => apiClient.get('/sessions/history'),
};

export default apiClient;
