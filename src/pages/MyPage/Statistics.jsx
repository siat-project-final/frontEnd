import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './Statistics.css';
// ✅ axios 연동 주석 처리
import { getUserStats } from '../../api/user';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getUserStats(memberId);
        setStats(res.data);
      } catch (err) {
        console.error('통계 정보 실패:', err);
      }
    };
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
                <p className="stats-value">{stats.learningJournals}</p>
                <p className="stats-label">learning journals created</p>
              </div>

              <div className="stat-card">
                <div className="stats-icon">🏆</div>
                <p className="stats-value">{stats.challengesCompleted}</p>
                <p className="stats-label">challenges completed</p>
              </div>

              <div className="stat-card">
                <h2 className="stat-title">Mentoring Stats</h2>
                <div className="stats-icon">💬</div>
                <p className="stats-label">{stats.mentoringSessions} sessions total</p>
              </div>

              <div className="stat-card">
                <div className="stats-icon">⭐</div>
                <p className="stats-value">{stats.totalPoints.toLocaleString()}</p>
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
