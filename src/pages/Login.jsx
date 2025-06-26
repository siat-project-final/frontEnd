import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import instance from '../api/axios'; // Axios 인스턴스
import { signIn } from '../api/auth'; // 로그인 API

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (event) => {
    event.preventDefault();

    if (id === 'mock' && password === '1234') {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem('refreshToken', 'mock-refresh');
      localStorage.setItem('memberId', 'mock-id');
      sessionStorage.setItem('memberId', 'mock-id');
      alert('MOCK 로그인 성공');
      navigate('/home', { state: { fromLogin: true } });
      return;
    }

    if (id === 'admin' && password === 'admin123') {
      localStorage.setItem('accessToken', 'admin-token');
      localStorage.setItem('refreshToken', 'admin-refresh');
      localStorage.setItem('memberId', 'admin-id');
      sessionStorage.setItem('memberId', 'admin-id');
      sessionStorage.setItem('userRole', 'admin');
      sessionStorage.setItem('memberName', '관리자');
      alert('ADMIN 로그인 성공');
      navigate('/home', { state: { fromLogin: true } });
      return;
    }

    try {
      const response = await signIn({ id, password });
      if (response.status === 200) {
        const { accessToken, refreshToken, memberId, id, memberName, role } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('memberId', memberId);
        localStorage.setItem('id', id);
        localStorage.setItem('memberName', memberName);
        localStorage.setItem('role', role);

        if (role === 'MENTOR') {
          try {
            const mentorRes = await instance.get(`/auth/mentor-id?memberId=${memberId}`);
            localStorage.setItem('mentorId', mentorRes.data);
            console.log('✅ mentorId 저장 완료:', mentorRes.data);
          } catch (err) {
            console.error('❌ mentorId 조회 실패:', err);
          }
        }

        sessionStorage.setItem('memberId', memberId);
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('memberName', memberName);

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
