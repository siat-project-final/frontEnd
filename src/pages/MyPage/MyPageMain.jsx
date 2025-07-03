import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './MyPageMain.css';
import { getUserInfo, updateUserInfo } from '../../api/user';

const levelThresholds = {
  1: 0,
  2: 50,
  3: 120,
  4: 200,
  5: 300,
  6: 420,
  7: 550,
  8: 700,
  9: 900,
};

const MyPageMain = () => {
  const [user, setUser] = useState(null);
  const memberId = localStorage.getItem('memberId');

  const fetchData = async () => {
    try {
      const res = await getUserInfo(memberId);
      setUser(res.data);
    } catch (err) {
      console.error('회원 정보 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: e.target.id.value,
      password: e.target.password.value,
      memberName: e.target.name.value,
      nickname: e.target.nickname.value,
      phoneNumber: e.target.phone.value,
      email: e.target.email.value
    };
    try {
      await updateUserInfo(memberId, updatedUser);
      alert('회원 정보가 수정되었습니다.');
      fetchData();
    } catch (err) {
      console.error('회원 정보 수정 실패:', err);
    }
  };

  const calcLevel = (exp) => {
    const entries = Object.entries(levelThresholds).reverse();
    for (const [levelStr, minXP] of entries) {
      if (exp >= minXP) return Number(levelStr);
    }
    return 1;
  };

  if (!user) return <div>로딩 중...</div>;

  const exp = user.exp ?? 0;
  const currentLevel = calcLevel(exp);
  const currentBase = levelThresholds[currentLevel] || 0;
  const nextBase = levelThresholds[currentLevel + 1] || currentBase + 100;
  const progress = ((exp - currentBase) / (nextBase - currentBase)) * 100;
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
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
                    <p className="stat-value">{user.usablePoints?.toLocaleString()}</p>
                  </div>
                  <div className="stat-item">
                    <div className="level-info">
                      <p className="level-value">{currentLevel}</p>
                      <p className="level-label">Level</p>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${clampedProgress}%` }}
                        ></div>
                      </div>
                      <p className="xp-value">
                        {Math.max(exp - currentBase, 0)} / {nextBase - currentBase}
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
                  <input id="id" type="text" defaultValue={user.id} readOnly />
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
                <button className="submit-btn" type="submit">수정하기</button>
              </form>
            </div>
          </section>
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MyPageMain;
