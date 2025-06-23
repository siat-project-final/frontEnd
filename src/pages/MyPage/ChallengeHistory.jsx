import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './ChallengeHistory.css';
// ✅ axios 연동
import { getChallengeHistory } from '../../api/challenge';

const ChallengeHistory = () => {
  const memberId = localStorage.getItem('memberId');
  const [historyList, setHistoryList] = useState([]);

    const fetchHistory = async () => {
      getChallengeHistory(memberId)
      .then(res => {
          setHistoryList(res.data);
        })
        .catch(err => console.error('챌린지 히스토리 조회 실패:', err));;
    };


  useEffect(() => {
    fetchHistory();
  }, [memberId]);

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="challenge-history-section" data-aos="fade-up">
            <div className="page-header">
              <h1
                className="h3 fw-bold mb-0"
                style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
              >
                CHALLENGE HISTORY
              </h1>
              <div className="month-selector">
                <span className="current-month">6월</span>
                <button className="month-btn">이전</button>
                <button className="month-btn">다음</button>
              </div>
            </div>

            <div className="challenge-list">
              {historyList.map((item, idx) => (
                <div className="challenge-card" key={idx}>
                  <span className="challenge-date">{item.date}</span>
                  <div className="challenge-info">
                    <div className="info-item">
                      <p className="info-label">MY RANK</p>
                      <p className="info-value">{item.rank}.</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">SUBJECT</p>
                      <p className="info-value">{item.subject}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">TOTAL SCORE</p>
                      <p className="info-value">{item.totalPoints}</p>
                    </div>
                  </div>
                  <Link to="/mypage/review-history" className="detail-btn">
                    상세보기
                  </Link>
                </div>
              ))}
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
