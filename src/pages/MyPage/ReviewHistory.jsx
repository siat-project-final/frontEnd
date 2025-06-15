import React from 'react';
import { Link } from 'react-router-dom';
import './MyPageMain.css';

const ReviewHistory = () => {
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
              <Link to="/mypage" className="sidebar-link">
                프로필 변경
              </Link>
              <Link to="/mypage/challenge-history" className="sidebar-link">
                챌린지 히스토리
              </Link>
              <a className="sidebar-link" href="#">
                멘토링 히스토리
              </a>
            </nav>
          </aside>

          <section className="review-section">
            <div className="page-header">
              <h1 className="page-title">CHALLENGE HISTORY</h1>
            </div>
            <div className="review-box">{/* 여기에 리뷰 내용이 들어갈 예정입니다 */}</div>
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

export default ReviewHistory;
