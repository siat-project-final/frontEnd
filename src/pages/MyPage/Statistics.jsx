import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './Statistics.css';
import { getUserStats } from '../../api/user';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js 설정
ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const memberId = localStorage.getItem('memberId');

  const totalDays = 365; // 예시로 1년(365일)을 사용, 실제로는 백엔드에서 받아오는 전체일자로 대체

  const fetchStats = async () => {
    getUserStats(memberId)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.error('통계 조회 실패:', err));
  };

  useEffect(() => {
    fetchStats();
  }, [memberId]);

  if (!stats) return <div>로딩 중...</div>;

  // 원 그래프 데이터 생성
  const getPieChartData = (count) => {
    const remaining = totalDays - count;
    return {
      labels: ['Completed', 'Remaining'],
      datasets: [
        {
          data: [count, remaining],
          backgroundColor: ['#84cc16', '#d1d5db'],
        },
      ],
    };
  };

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
                <Pie data={getPieChartData(stats.studyDiaryCount)} />
              </div>

              <div className="stat-card">
                <div className="stats-icon">🏆</div>
                <p className="stats-value">{stats.challengeCount}</p>
                <p className="stats-label">challenges completed</p>
                <Pie data={getPieChartData(stats.challengeCount)} />
              </div>

              <div className="stat-card">
                <div className="stats-icon">💬</div>
                <p className="stats-value">{stats.mentoringCount}</p>
                <p className="stats-label">Mentoring total</p>
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
