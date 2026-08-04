import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: true, // Importante para enviar Cookies HttpOnly
  headers: {
    'Content-Type': 'application/json'
  }
});

// Opcional: Interceptores para manejar errores globales (ej. si el token expira)
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
