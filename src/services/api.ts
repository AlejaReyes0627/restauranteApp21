import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8083/arepas-21', // cambia esto
  withCredentials: true,  // clave para enviar cookies con cada petición
});

// Ya no necesitas manejar token en frontend
// El backend controla el token vía cookie HttpOnly

// Opcional: interceptor para detectar 401 (si quieres re-login manual)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Aquí podrías redirigir a login o mostrar mensaje
      console.warn('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
      // No hacer re-login automático porque no tienes credenciales guardadas
    }
    return Promise.reject(error);
  }
);

export default api;