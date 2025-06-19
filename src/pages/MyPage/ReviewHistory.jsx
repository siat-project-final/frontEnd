import React from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './ReviewHistory.css';

const ReviewHistory = () => {
  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="review-section" data-aos="fade-up">
            <div className="page-header">
              <h1 className="page-title">CHALLENGE REVIEW</h1>
            </div>

            <div className="review-box">
              {/* 필요하면 여기 challenge-card 형식 반복 렌더링 */}
              <div className="challenge-card">
                <span className="challenge-date">6/7</span>
                <div className="challenge-info">
                  <div className="info-item">
                    <p className="info-label">SUBJECT</p>
                    <p className="info-value">JAVA</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">MY SCORE</p>
                    <p className="info-value">12 / 15</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">REVIEW</p>
                    <p className="info-value">틀린 문항 복습 완료</p>
                  </div>
                </div>
              </div>

              <div className="challenge-card">
                <span className="challenge-date">6/3</span>
                <div className="challenge-info">
                  <div className="info-item">
                    <p className="info-label">SUBJECT</p>
                    <p className="info-value">REACT</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">MY SCORE</p>
                    <p className="info-value">13 / 15</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">REVIEW</p>
                    <p className="info-value">DOM 구조 이슈 재확인</p>
                  </div>
                </div>
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

export default ReviewHistory;
