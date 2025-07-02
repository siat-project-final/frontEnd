import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import './MyPageMain.css';
import Todo from '../../components/common/Todo';

import { getUserInfo, updateUserInfo } from '../../api/user';


// ✅ axios 함수 import (주석 처리)
// import { getUserInfo } from '../../api/user';

const MyPageMain = () => {
  const [user, setUser] = useState(null);
  const memberId = localStorage.getItem('memberId');

  const fetchData = async () => {
      getUserInfo(memberId)
      .then(res => setUser(res.data))
      .catch(err => console.error('회원 정보 불러오기 실패:', err));

  }

  useEffect(() => {
    fetchData();
  }, [memberId]);

  const handleSubmit = async (e) => {
    console.log('e.target', e.target);
    
    e.preventDefault(); // 기본 제출 방지

    const updatedUser = {
      id: e.target.id.value,
      password: e.target.password.value,
      memberName: e.target.name.value,
      nickname: e.target.nickname.value,
      phoneNumber: e.target.phone.value,
      email: e.target.email.value
      // role/status는 수정 불가이므로 제외
    };
    
    await updateUserInfo(memberId, updatedUser)
        .then(res => {
          alert('회원 정보가 수정되었습니다.');
          fetchData();
        })
        .catch(err => console.error('회원 정보 수정 실패:', err));
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          {/* 사용자 정보 영역 */}
          <section className="profile-section" data-aos="fade-up">
            <div className="profile-content">
              <div className="profile-left">
                <div className="profile-image">
                  <div className="image-placeholder">프로필 이미지</div>
                </div>
                <button className="upload-btn">upload</button>
                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-icon">P</div>
                    <p className="stat-value">{user?.usablePoints?.toLocaleString()}</p>
                  </div>
                  <div className="stat-item">
                    <div className="level-info">
                      <p className="level-value">{user.currentLevel}</p>
                      <p className="level-label">Level</p>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(user.totalXp / user.totalXp) * 100}%` }}
                        ></div>
                      </div>
                      <p className="xp-value">
                        {user.exp} / {user.point}
                      </p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="badge-info">
                      <p className="badge-value">{user.badge}</p>
                      <p className="badge-label">Badges</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input id="id" type="text" defaultValue={user.id} readOnly/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">PASSWORD</label>
                  <input id="password" type="password" defaultValue={user.password} />
                </div>
                <div className="form-group">
                  <label htmlFor="name">NAME</label>
                  <input id="name" type="text" defaultValue={user.memberName} readOnly />
                </div>
                <div className="form-group">  
                  <label htmlFor="nickname">NICKNAME</label>
                  <input id="nickname" type="text" defaultValue={user.nickname} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">PHONE</label>
                  <input id="phone" type="text" defaultValue={user.phoneNumber} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="email">EMAIL</label>
                  <input id="email" type="text" defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label htmlFor="status">STATUS (수정불가)</label>
                  <input id="status" type="text" defaultValue={user.role} readOnly />
                </div>
                <button className="submit-btn" type="submit">
                  수정하기
                </button>
              </form>
            </div>
          </section>
        </main>
        {/* 오른쪽: Todo 사이드바 */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MyPageMain;
