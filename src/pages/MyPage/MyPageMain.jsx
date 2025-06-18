import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import './MyPageMain.css';

const MyPageMain = () => {
  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage"/>
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

          {/* 캘린더 & ToDo */}
          <aside className="calendar-section">
            <div className="calendar-container">
              <div className="calendar-header">
                <h2 className="calendar-title">2025년 06월</h2>
                <div className="calendar-nav">
                  <button className="calendar-nav-btn">이전</button>
                  <button className="calendar-nav-btn">다음</button>
                </div>
              </div>

              <div className="weekdays">
                <span>일</span><span>월</span><span>화</span>
                <span>수</span><span>목</span><span>금</span><span>토</span>
              </div>

              <div className="calendar-grid">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i + 1;
                  const isCurrentMonth = day <= 30;
                  const isToday = day === 10;
                  return (
                    <span
                      key={i}
                      className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${
                        isToday ? 'today' : ''
                      }`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="todo-container">
              <h3 className="todo-title">ToDo List</h3>
              <div className="todo-input-group">
                <input type="text" placeholder="Add your items" />
                <button className="add-btn">추가</button>
              </div>
              <div className="alert-success">New item created successfully!</div>
              <ul className="todo-list">
                {[1, 2, 3, 4, 5].map((index) => (
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
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MyPageMain;
