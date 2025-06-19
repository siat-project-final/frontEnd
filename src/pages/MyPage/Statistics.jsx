import React from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './Statistics.css';

const Statistics = () => {
  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="statistics-section" data-aos="fade-up">
            <div className="page-header">
              <h1 className="page-title">STATISTICS</h1>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stats-icon">📝</div>
                <p className="stats-value">120</p>
                <p className="stats-label">learning journals created</p>
              </div>

              <div className="stat-card">
                <div className="stats-icon">🏆</div>
                <p className="stats-value">10</p>
                <p className="stats-label">challenges completed</p>
              </div>

              <div className="stat-card">
                <h2 className="stat-title">Mentoring Stats</h2>
                <div className="stats-icon">💬</div>
                <p className="stats-label">5 sessions total</p>
              </div>

              <div className="stat-card">
                <div className="stats-icon">⭐</div>
                <p className="stats-value">5000</p>
                <p className="stats-label">total points earned</p>
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

export default Statistics;
