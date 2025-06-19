import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const loginHandler = async (event) => {
    event.preventDefault();

    // 계정 정보
    const users = [
      { id: 'admin', pwd: '1234', role: 'admin' },
      { id: 'mentee', pwd: 'mentee1234', role: 'mentee' },
      { id: 'mentor', pwd: 'mentor1234', role: 'mentor' },
    ];

    const found = users.find((user) => user.id === id && user.pwd === pwd);

    if (found) {
      try {
        const mockToken = 'mock.jwt.token';
        setToken(mockToken);
        sessionStorage.setItem('userRole', found.role); // 역할 저장
        navigate('/home'); // ✅ 홈으로 이동
      } catch (error) {
        console.error('로그인 실패:', error);
        alert('로그인에 실패했습니다.');
      }
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
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
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
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
