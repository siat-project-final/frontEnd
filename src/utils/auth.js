// JWT 토큰 저장
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// JWT 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem('token');
};

// JWT 토큰 삭제
export const removeToken = () => {
  localStorage.removeItem('token');
};

// 인증 상태 확인
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// API 요청 헤더에 토큰 추가
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
