import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import './MyPageMain.css';
import Todo from '../../components/common/Todo';
// ✅ axios 함수 import (주석 처리)
// import { getUserInfo } from '../../api/user';

const MyPageMain = () => {
  const [user, setUser] = useState(null);
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    // ✅ 실제 API 연결 시 사용
    // getUserInfo(memberId)
    //   .then(res => setUser(res.data))
    //   .catch(err => console.error('회원 정보 불러오기 실패:', err));

    // ✅ 현재는 dummy 사용
    setUser({
      id: 'hong123',
      password: '1234',
      name: '홍길동',
      nickname: '코딩왕',
      phone: '010-1234-5678',
      status: '훈련생',
      point: 8750,
      level: 12,
      exp: 8000,
      badge: 5,
    });
  }, [memberId]);

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
                    <p className="stat-value">{user.point.toLocaleString()}</p>
                  </div>
                  <div className="stat-item">
                    <div className="level-info">
                      <p className="level-value">{user.level}</p>
                      <p className="level-label">Level</p>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(user.exp / user.point) * 100}%` }}
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

              <form className="profile-form">
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input id="id" type="text" defaultValue={user.id} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">PASSWORD</label>
                  <input id="password" type="password" defaultValue={user.password} />
                </div>
                <div className="form-group">
                  <label htmlFor="name">NAME</label>
                  <input id="name" type="text" defaultValue={user.name} />
                </div>
                <div className="form-group">
                  <label htmlFor="nickname">NICKNAME</label>
                  <input id="nickname" type="text" defaultValue={user.nickname} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">PHONE</label>
                  <input id="phone" type="text" defaultValue={user.phone} />
                </div>
                <div className="form-group">
                  <label htmlFor="status">STATUS (수정불가)</label>
                  <input id="status" type="text" defaultValue={user.status} readOnly />
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
