import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/auth';
import { setToken } from '../utils/auth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const loginHandler = async (event) => {
    event.preventDefault();

    const validId = 'admin';
    const validPwd = '1234';

    // ✅ MOCK 로그인 (삭제 예정)
    if (id === validId && pwd === validPwd) {
      try {
        const mockToken = 'mock.jwt.token';
        setToken(mockToken);
        sessionStorage.setItem('memberId', 1); // mock userId
        navigate('/home');
      } catch (error) {
        console.error('MOCK 로그인 실패:', error);
        alert('로그인에 실패했습니다.');
      }
      return;
    }

    // ✅ 실제 로그인 API 연동
    try {
      const res = await signIn({ id, password: pwd });
      const { accessToken, memberId } = res.data;

      setToken(accessToken);
      sessionStorage.setItem('memberId', memberId);

      navigate('/home');
    } catch (error) {
      console.error('API 로그인 실패:', error);
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
