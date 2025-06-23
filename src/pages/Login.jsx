import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/auth';
import { setToken } from '../utils/auth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (event) => {
   event.preventDefault();

  // ✅ 실제 로그인 API 연동
    try {
      const response = await signIn({ id, password });
      if (response.status === 200) {
        // 예시: 토큰 저장 및 페이지 이동
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('memberId', response.data.memberId);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('memberName', response.data.memberName);
        localStorage.setItem('role', response.data.role);
        navigate('/home', { state: { fromLogin: true } });
      }
    } catch (error) {
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">로그인</h1>
        <form onSubmit={loginHandler}>
          <div className="form-group">
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <div className="button-group">
            <button className="login-button primary" type="submit">
              로그인
            </button>
            <button
              className="login-button secondary"
              type="button"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
