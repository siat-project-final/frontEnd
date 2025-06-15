import React from 'react';
import { Link } from 'react-router-dom';
import './MyPageMain.css';

const MyPageMain = () => {
  return (
    <div className="mypage-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">SIAT</div>
          <nav className="main-nav">
            <a className="nav-link active" href="#">
              Home
            </a>
            <a className="nav-link" href="#">
              Challenge
            </a>
            <a className="nav-link" href="#">
              Mentoring
            </a>
            <a className="nav-link" href="#">
              Studylog
            </a>
            <a className="nav-link" href="#">
              Mypage
            </a>
          </nav>
          <button className="logout-btn">LOGOUT</button>
        </div>
      </header>

      <main className="main-content">
        <div className="grid-container">
          <aside className="sidebar">
            <h2 className="sidebar-title">마이 프로필</h2>
            <nav className="sidebar-nav">
              <Link to="/mypage" className="sidebar-link active">
                프로필 변경
              </Link>
              <Link to="/mypage/challenge-history" className="sidebar-link">
                챌린지 히스토리
              </Link>
              <Link to="/mypage/mentoring-history" className="sidebar-link">
                멘토링 히스토리
              </Link>
            </nav>
          </aside>

          <section className="profile-section">
            <div className="profile-content">
              <div className="profile-left">
                <div className="profile-image">
                  <div className="image-placeholder">프로필 이미지</div>
                </div>
                <button className="upload-btn">upload</button>
                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-icon">P</div>
                    <p className="stat-value">8,750</p>
                  </div>
                  <div className="stat-item">
                    <div className="level-info">
                      <p className="level-value">12</p>
                      <p className="level-label">Level</p>
                      <div className="progress-bar">
                        <div className="progress-fill"></div>
                      </div>
                      <p className="xp-value">8000 / 8750</p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="badge-info">
                      <p className="badge-value">5</p>
                      <p className="badge-label">Badges</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="profile-form">
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input id="id" type="text" defaultValue="ID" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">PASSWORD</label>
                  <input id="password" type="password" defaultValue="PASSWORD" />
                </div>
                <div className="form-group">
                  <label htmlFor="name">NAME</label>
                  <input id="name" type="text" defaultValue="NAME" />
                </div>
                <div className="form-group">
                  <label htmlFor="nickname">NICKNAME</label>
                  <input id="nickname" type="text" defaultValue="NICKNAME" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">PHONE</label>
                  <input id="phone" type="text" defaultValue="PHONE" />
                </div>
                <div className="form-group">
                  <label htmlFor="status">STATUS (수정불가)</label>
                  <input id="status" type="text" defaultValue="훈련생 / 수료생" readOnly />
                </div>
                <button className="submit-btn" type="submit">
                  수정하기
                </button>
              </form>
            </div>
          </section>

          <aside className="todo-section">
            <div className="todo-container">
              <div className="todo-header">
                <h3>ToDo List</h3>
                <button className="settings-btn">설정</button>
              </div>
              <div className="todo-input-group">
                <input type="text" placeholder="Add your items" />
                <button className="add-btn">추가</button>
              </div>
              <div className="alert-success">New item created successfully!</div>
              <ul className="todo-list">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <li key={index} className="todo-item">
                    <span className="todo-text">
                      {index % 2 === 0 ? 'Alert Message Sets' : 'Complete the Blog Today'}
                    </span>
                    <div className="todo-actions">
                      <button className="edit-btn">수정</button>
                      <button className="delete-btn">삭제</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default MyPageMain;
