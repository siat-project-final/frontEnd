import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
// import Home from './pages/Home'; // 실제 Home 컴포넌트가 있다면 import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* 인증이 필요한 라우트 예시 */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              {/* <Home /> */}
              <div>로그인 성공! (Home 컴포넌트 자리)</div>
            </PrivateRoute>
          }
        />
        {/* 필요하다면 /user/success 등도 위와 같이 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
