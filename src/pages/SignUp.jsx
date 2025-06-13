import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const moveUrl = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    member_name: '',
    email: '',
    phone: '',
    nickname: '',
    role: 'USER', // 기본값 설정
    status: 'ACTIVE', // 기본값 설정
    total_xp: 0,
    usable_points: 0,
    current_level: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      window.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 데이터 준비
    const signUpData = {
      id: formData.id,
      password: formData.password,
      member_name: formData.member_name,
      email: formData.email,
      phone: formData.phone,
      nickname: formData.nickname,
      role: formData.role,
      status: formData.status,
      total_xp: formData.total_xp,
      usable_points: formData.usable_points,
      current_level: formData.current_level,
    };

    console.log('회원가입 정보:', signUpData);
    try {
      // 여기에 실제 API 호출 코드가 들어갈 예정
      window.alert('회원가입이 완료되었습니다.');
      moveUrl('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      window.alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">회원가입</h1>
        <form onSubmit={signUpHandler}>
          <div className="form-group">
            <label className="form-label" htmlFor="id">
              아이디
            </label>
            <input
              className="form-input"
              id="id"
              name="id"
              type="text"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
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
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="passwordConfirm">
              비밀번호 확인
            </label>
            <input
              className="form-input"
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="member_name">
              이름
            </label>
            <input
              className="form-input"
              id="member_name"
              name="member_name"
              type="text"
              value={formData.member_name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="nickname">
              닉네임
            </label>
            <input
              className="form-input"
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              이메일
            </label>
            <input
              className="form-input"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일 주소를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              휴대폰 번호
            </label>
            <input
              className="form-input"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="휴대폰 번호를 입력하세요 ('-' 제외)"
              required
            />
          </div>
          <button className="signup-button" type="submit">
            가입하기
          </button>
        </form>
        <a className="login-link" href="#" onClick={() => moveUrl('/')}>
          이미 계정이 있으신가요? 로그인
        </a>
      </div>
    </div>
  );
}

export default SignUp;
