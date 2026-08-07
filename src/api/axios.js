import axios from 'axios';

// En desarrollo, Vite hace proxy de /api → localhost:4000/api
// En producción, VITE_API_URL debe apuntar al dominio del backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Importante para enviar Cookies HttpOnly
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptores para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos 401 Unauthorized y no estamos en la página de login
    if (error.response && error.response.status === 401) {
      // Podríamos limpiar el store o forzar redirección
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
