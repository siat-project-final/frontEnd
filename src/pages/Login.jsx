import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import './Login.css';

//import api from "../api/axios" ;
function Login() {
  const moveUrl = useNavigate();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const loginHandler = async (event, id, pwd) => {
    event.preventDefault(); // 폼 전송 시 페이지 새로고침 방지용이라 함

    console.log('debug >>> loginHandler ', id, pwd);

    // 가데이터 로그인 정보
    const validId = 'admin';
    const validPwd = '1234';

    if (id === validId && pwd === validPwd) {
      try {
        // API 호출 시에는 여기서 서버로부터 JWT 토큰을 받아옴
        const mockToken = 'mock.jwt.token'; // 실제로는 서버에서 받은 토큰
        setToken(mockToken);

        moveUrl('/home');
      } catch (error) {
        console.error('로그인 실패:', error);
        window.alert('로그인에 실패했습니다.');
      }
    } else {
      console.log('로그인 실패');
      window.alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const idHandler = (event) => {
    console.log('debug >>> idHandler ');
    setId(event.target.value);
    console.log(`input id ${id}`);
  };

  const pwdHandler = (event) => {
    console.log('debug >>> pwdHandler ');
    setPwd(event.target.value);
    console.log(`input pwd ${pwd}`);
  };

  return (
    <div className="login-container">
      <div className="lox">
        <h1 className="login-title">로그인</h1>
        <div className="login-form">
          <form onSubmit={(event) => loginHandler(event, id, pwd)}>
            <div className="form-group">
              <label className="form-label" htmlFor="id">
                아이디
              </label>
              <input
                className="form-input"
                id="id"
                name="id"
                type="text"
                value={id}
                onChange={idHandler}
                placeholder="ID"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                비밀번호
              </label>
              <input
                className="form-input"
                id="password"
                name="password"
                type="password"
                value={pwd}
                onChange={pwdHandler}
                placeholder="********"
              />
            </div>
            <div className="button-group">
              <button className="login-button primary" type="submit">
                <span className="material-icons button-icon">login</span>
                <span>로그인</span>
              </button>
              <button
                className="login-button secondary"
                type="button"
                onClick={() => moveUrl('/signup')}
              >
                <span className="material-icons button-icon">person_add</span>
                <span>회원가입</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
