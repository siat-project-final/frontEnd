import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default instance;

// src/api/axios.js
// import axios from 'axios';
// import { getAuthHeader } from '../utils/auth';

// const api = axios.create({
//   baseURL: 'http://your-backend-url/api',
//   headers: {
//     'Content-Type': 'application/json',
//     ...getAuthHeader(), // 이 부분이 핵심
//   },
// });

// export default api;
