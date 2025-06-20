// JWT 토큰 저장
export const setToken = (token) => {
  sessionStorage.setItem('accessToken', token);
};

// JWT 토큰 가져오기
export const getToken = () => {
  return sessionStorage.getItem('accessToken');
};

// JWT 토큰 삭제
export const removeToken = () => {
  sessionStorage.removeItem('accessToken');
};

// 인증 상태 확인
export const isAuthenticated = () => {
  return !!getToken();
};

// API 요청 헤더에 토큰 추가
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const setRefreshToken = (token) => {
  sessionStorage.setItem('refreshToken', token);
};

export const getRefreshToken = () => {
  return sessionStorage.getItem('refreshToken');
};

export const removeRefreshToken = () => {
  sessionStorage.removeItem('refreshToken');
};
