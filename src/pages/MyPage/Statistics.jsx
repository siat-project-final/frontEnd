import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './Statistics.css';
// ✅ axios 연동 주석 처리
import { getUserStats } from '../../api/user';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const memberId = localStorage.getItem('memberId');

const fetchStats = async () => {
      getUserStats(memberId)
      .then(res => {
          setStats(res.data);
        })
        .catch(err => console.error('통계 조회 실패:', err));;
    };

  useEffect(() => {
    fetchStats();
  }, [memberId]);

  if (!stats) return <div>로딩 중...</div>;

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="statistics-section" data-aos="fade-up">
            <div className="page-header">
              <h1
                className="h3 fw-bold mb-0"
                style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
              >
                STATISTICS
              </h1>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stats-icon">📝</div>
                <p className="stats-value">{stats.studyDiaryCount}</p>
                <p className="stats-label">learning journals created</p>
              </div>

              <div className="stat-card">
                <div className="stats-icon">🏆</div>
                <p className="stats-value">{stats.challengeCount}</p>
                <p className="stats-label">challenges completed</p>
              </div>

              <div className="stat-card">
                <div className="stats-icon">💬</div>
                <p className="stats-value">{stats.mentoringCount}</p>
                <p className="stats-label"> Mentoring total</p>
              </div>

              <div className="stat-card">
                <div className="stats-icon">⭐</div>
                <p className="stats-value">{stats?.totalXp?.toLocaleString()}</p>
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
