import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

function PrivateRoute({ children }) {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  // 인증된 사용자는 요청한 페이지로 이동
  return children;
}

export default PrivateRoute;
