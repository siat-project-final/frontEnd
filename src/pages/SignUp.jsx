import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth';
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
    role: 'USER',
    status: 'ACTIVE',
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

    if (formData.password !== formData.passwordConfirm) {
      window.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const signUpData = {
      id: formData.id,
      password: formData.password,
      name: formData.member_name,
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

    // ✅ MOCK 회원가입 처리
    if (formData.id === 'mock' && formData.password === '1234') {
      window.alert('회원가입이 완료되었습니다. (mock)');
      moveUrl('/');
      return;
    }

    // ✅ 실제 API 호출
    try {
      await signUp(signUpData);
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
          {/* 각 입력 필드 구성 동일 */}
          <div className="form-group">
            <label className="form-label" htmlFor="id">아이디</label>
            <input className="form-input" id="id" name="id" type="text" value={formData.id} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">비밀번호</label>
            <input className="form-input" id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="passwordConfirm">비밀번호 확인</label>
            <input className="form-input" id="passwordConfirm" name="passwordConfirm" type="password" value={formData.passwordConfirm} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="member_name">이름</label>
            <input className="form-input" id="member_name" name="member_name" type="text" value={formData.member_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="nickname">닉네임</label>
            <input className="form-input" id="nickname" name="nickname" type="text" value={formData.nickname} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">이메일</label>
            <input className="form-input" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">휴대폰 번호</label>
            <input className="form-input" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
          <button className="signup-button" type="submit">가입하기</button>
        </form>
        <a className="login-link" href="#" onClick={() => moveUrl('/')}>
          이미 계정이 있으신가요? 로그인
        </a>
      </div>
    </div>
  );
}

export default SignUp;
