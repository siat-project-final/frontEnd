import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8087/',
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 선택: 응답 에러 처리도 추가해두면 좋음
instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      sessionStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default instance;
