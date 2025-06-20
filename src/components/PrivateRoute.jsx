import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuth = isAuthenticated();
  const location = useLocation();

  // 로그인 페이지로 부터의 fromLogin이 true면 무조건 통과
  if (location.state?.fromLogin || location.state?.fromSignUp) {
    return children;
  }

  // 그 외에는 인증 체크
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }


  return children;
}

export default PrivateRoute;
