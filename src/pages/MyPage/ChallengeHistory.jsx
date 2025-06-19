import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './ChallengeHistory.css';

const ChallengeHistory = () => {
  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="challenge-history-section" data-aos="fade-up">
            <div className="page-header">
              <h1 className="page-title">CHALLENGE HISTORY</h1>
              <div className="month-selector">
                <span className="current-month">6월</span>
                <button className="month-btn">이전</button>
                <button className="month-btn">다음</button>
              </div>
            </div>

            <div className="challenge-list">
              <div className="challenge-card">
                <span className="challenge-date">6/7</span>
                <div className="challenge-info">
                  <div className="info-item">
                    <p className="info-label">MY RANK</p>
                    <p className="info-value">3.</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">SUBJECT</p>
                    <p className="info-value">JAVA</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">TOTAL SCORE</p>
                    <p className="info-value">10 / 15</p>
                  </div>
                </div>
                <Link to="/mypage/review-history" className="detail-btn">상세보기</Link>
              </div>

              <div className="challenge-card">
                <span className="challenge-date">6/3</span>
                <div className="challenge-info">
                  <div className="info-item">
                    <p className="info-label">MY RANK</p>
                    <p className="info-value">3.</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">SUBJECT</p>
                    <p className="info-value">REACT</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">TOTAL SCORE</p>
                    <p className="info-value">10 / 15</p>
                  </div>
                </div>
                <Link to="/mypage/review-history" className="detail-btn">상세보기</Link>
              </div>

              <div className="challenge-card">
                <span className="challenge-date">6/3</span>
                <div className="challenge-info">
                  <div className="info-item">
                    <p className="info-label">MY RANK</p>
                    <p className="info-value">5.</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">SUBJECT</p>
                    <p className="info-value">AWS</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">TOTAL SCORE</p>
                    <p className="info-value">10 / 15</p>
                  </div>
                </div>
                <Link to="/mypage/review-history" className="detail-btn">상세보기</Link>
              </div>
            </div>
          </section>
        </main>

        {/* 오른쪽: Todo */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default ChallengeHistory;
