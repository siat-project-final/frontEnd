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

  // ✅ MOCK 로그인 (테스트용 계정)
  const users = [
    { id: 'admin', pwd: '1234', role: 'admin', memberId: 0 },
    { id: 'mentee', pwd: 'mentee1234', role: 'mentee', memberId: 1 },
    { id: 'mentor', pwd: 'mentor1234', role: 'mentor', memberId: 2 },
  ];

  const found = users.find((user) => user.id === id && user.pwd === pwd);
  if (found) {
    try {
      const mockToken = 'mock.jwt.token';
      setToken(mockToken);
      sessionStorage.setItem('userRole', found.role); // 역할 저장
      sessionStorage.setItem('memberId', found.memberId); // mock userId 저장
      navigate('/home');
      return;
    } catch (error) {
      console.error('MOCK 로그인 실패:', error);
      alert('로그인에 실패했습니다.');
      return;
    }
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
