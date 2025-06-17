import React from 'react';
import { Link } from 'react-router-dom';
import './MentoringHistory.css';

const MentoringHistory = () => {
  return (
    <div className="mypage-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">SIAT</div>
          <nav className="main-nav">
            <a className="nav-link" href="/">
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
            <a className="nav-link active" href="#">
              Mypage
            </a>
          </nav>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="main-content2">
        <aside className="sidebar">
          <h2 className="sidebar-title">마이 프로필</h2>
          <nav className="sidebar-nav">
            <Link to="/mypage" className="sidebar-link">
              프로필 변경
            </Link>
            <Link to="/mypage/challenge-history" className="sidebar-link">
              챌린지 히스토리
            </Link>
            <Link to="/mypage/mentoring-history" className="sidebar-link active">
              멘토링 히스토리
            </Link>
            <Link to="/mypage/statistics" className="sidebar-link">
              통계
            </Link>
          </nav>
        </aside>

        <main className="mentoring-section">
          <div className="page-header">
            <h1 className="page-title">MENTORING HISTORY</h1>
          </div>
          <div className="mentoring-boxes">
            <div className="mentoring-box">
              <h3 className="mentoring-date">6/6 (금)</h3>
              <div className="mentoring-content">
                <div className="mentor-image">
                  <div className="mentoring-image-placeholder">멘토 이미지</div>
                </div>
                <div className="mentoring-form-group">
                  <label htmlFor="status">대화주제</label>
                  <input id="status" type="text" defaultValue="선택한 항목대로" readOnly />
                  <label htmlFor="status">획득 xp</label>
                  <input id="status" type="text" defaultValue="바꾸는 게 어떨까" readOnly />
                </div>
              </div>
            </div>
            <div className="mentoring-box">
              <h3 className="mentoring-date">6/5 (목)</h3>
              <div className="mentoring-content">
                <div className="mentor-image">
                  <div className="mentoring-image-placeholder">멘토 이미지</div>
                </div>
                <div className="mentoring-form-group">
                  <label htmlFor="status">대화주제</label>
                  <input id="status" type="text" defaultValue="선택한 항목대로" readOnly />
                  <label htmlFor="status">획득 xp</label>
                  <input id="status" type="text" defaultValue="바꾸는 게 어떨까" readOnly />
                </div>
              </div>
            </div>
          </div>
        </main>

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
              <span>일</span>
              <span>월</span>
              <span>화</span>
              <span>수</span>
              <span>목</span>
              <span>금</span>
              <span>토</span>
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
      </div>
    </div>
  );
};

export default MentoringHistory;
