import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { useLocation } from 'react-router-dom'; // location 객체를 가져옵니다.

function PrivateRoute({ children }) {
  const isAuth = isAuthenticated();
  const location = useLocation();

  if (location.state?.fromLogin || location.state?.fromSignUp) {
    return children;
  }

  if (!isAuth) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
