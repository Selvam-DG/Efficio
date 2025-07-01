import axios from "axios";

const instance = axios.create({
    baseURL : 'http://localhost:8000/api/',
});

instance.interceptors.request.use((config) => {
  const publicEndpoints = ['/auth/login/', '/auth/register/'];
  const isPublic = publicEndpoints.some((url) => config.url.includes(url));

  if (!isPublic) {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default instance;