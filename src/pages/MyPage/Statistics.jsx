import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './Statistics.css';
import { getUserStats } from '../../api/user';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const memberId = localStorage.getItem('memberId');
  const totalDays = 100; //현재 날짜 - 시작 날짜 필요

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getUserStats(memberId);
        setStats(res.data);
      } catch (err) {
        console.error('통계 조회 실패:', err);
      }
    };
    fetchStats();
  }, [memberId]);

  if (!stats) return <div>로딩 중...</div>;

  const getPieChartData = (count, total) => {
    const remaining = total - count;
    return {
      datasets: [
        {
          data: [count, remaining],
          backgroundColor: ['#84cc16', '#d1d5db'],
        },
      ],
    };
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
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

            {selectedCard && (
              <button
                onClick={() => setSelectedCard(null)}
                style={{
                  margin: '0 auto',
                  display: 'block',
                  marginBottom: '2rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#84cc16',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                전체 보기
              </button>
            )}

            {selectedCard === null && (
              <div className="stats-grid">
                <div
                  className="stat-card"
                  style={{ width: '350px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #84cc16';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => handleCardClick('diary')}
                >
                  <div className="stats-icon">📝</div>
                  <p className="stats-value">{stats.studyDiaryCount}</p>
                  <p className="stats-label">learning journals created</p>
                </div>

                <div
                  className="stat-card"
                  style={{ width: '350px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #84cc16';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => handleCardClick('challenge')}
                >
                  <div className="stats-icon">🏆</div>
                  <p className="stats-value">{stats.challengeCount}</p>
                  <p className="stats-label">challenges completed</p>
                </div>

                <div
                  className="stat-card"
                  style={{ width: '350px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #84cc16';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => handleCardClick('mentoring')}
                >
                  <div className="stats-icon">💬</div>
                  <p className="stats-value">{stats.mentoringCount}</p>
                  <p className="stats-label">mentoring total</p>
                </div>

                <div
                  className="stat-card"
                  style={{ width: '350px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #84cc16';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => handleCardClick('ranking')}
                >
                  <div className="stats-icon">⭐</div>
                  <p className="stats-value">{stats.challengeCount?.toLocaleString()}</p>
                  {/* 평균성적 averageRank 필요 */}
                  <p className="stats-label">challenge score</p>
                </div>
              </div>
            )}

            {selectedCard === 'diary' && (
              <div className="stat-card">
                <p className="stats-value">📝 작성한 일지 수</p>
                <div className="pie-wrapper">
                  <div className="pie-block">
                    <Pie data={getPieChartData(stats.studyDiaryCount, totalDays)} />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>전체 수업기간</p>
                      {stats.studyDiaryCount} / {totalDays}
                    </p>
                  </div>
                  <div className="pie-block">
                    <Pie data={getPieChartData(stats.studyDiaryCount, 30)} />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>최근 30일</p>
                      {stats.studyDiaryCount} / 30 {/* 30일, 또는 한 달 기준의 집계 필요 */}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedCard === 'challenge' && (
              <div className="stat-card">
                <p className="stats-value">🏆 참여 횟수</p>
                <div className="pie-wrapper">
                  <div className="pie-block">
                    <Pie data={getPieChartData(stats.challengeCount, totalDays)} />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>전체 수업기간</p>
                      {stats.challengeCount} / {totalDays}
                    </p>
                  </div>
                  <div className="pie-block">
                    <Pie data={getPieChartData(stats.challengeCount, 30)} />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>최근 30일</p>
                      {stats.challengeCount} / 30 {/* 30일, 또는 한 달 기준의 집계 필요 */}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedCard === 'mentoring' && (
              <div className="stat-card">
                <p className="stats-value">💬 멘토링 기록</p>
                <div className="pie-wrapper">
                  <div className="pie-block">
                    <img
                      src={
                        {
                          /* 첫 멘토 이미지 */
                        }
                      }
                      alt={
                        {
                          /* 첫 멘토 이름 */
                        }
                      }
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '1rem',
                      }}
                    />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>최초 멘토링 : </p>
                      {/* 첫 멘토 이름 */}
                    </p>
                  </div>
                  <div className="pie-block">
                    <img
                      src={
                        {
                          /* 최다 멘토 이미지 */
                        }
                      }
                      alt={
                        {
                          /* 최다 멘토 이름 */
                        }
                      }
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '1rem',
                      }}
                    />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>최다 멘토링 : </p>
                      {/* 최다 멘토 이름 */}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedCard === 'ranking' && (
              <div className="stat-card">
                <p className="stats-value">⭐ 평균 점수</p>
                <div className="pie-wrapper">
                  <div className="pie-block">
                    <Pie data={getPieChartData(stats.challengeCount, totalDays)} />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>전체 수업기간</p>
                      {stats.challengeCount} / {totalDays}
                      {/* 평균성적 averageRank 필요 */}
                    </p>
                  </div>
                  <div className="pie-block">
                    <Pie data={getPieChartData(stats.challengeCount, 30)} />
                    <p className="stats-value" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '2rem' }}>최근 30일</p>
                      {stats.challengeCount} / 30 {/* 30일, 또는 한 달 기준의 집계 필요 */}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>

        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
