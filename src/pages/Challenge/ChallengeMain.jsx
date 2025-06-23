import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getTodayChallenge, getDailyRanking } from '../../api/challenge'; // ✅ axios 연동 주석
import '../../App.css';

const ChallengeMain = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem('memberId');

  const [todayChallenge, setTodayChallenge] = useState(null);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];

      getTodayChallenge()
        .then(res => {
          setTodayChallenge(res.data[0]);
        })
        .catch(err => console.error('챌린지 과목 데이터 불러오기 실패:', err));

      getDailyRanking(today)
        .then(res => {
          setRanking(res.data);;
        })
        .catch(err => console.error('랭킹 불러오기 실패:', err));
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="challenge" />
        <main className="main">
          <div className="page-title" data-aos="fade">
            <div className="heading text-center">
              <h2>챌린지 메인</h2>
            </div>
          </div>

          <section className="section">
            <div className="container py-5">
              <div className="row g-4 justify-content-center">
                {/* 일일 챌린지 */}
                <div className="col-lg-5">
                  <div className="card text-center p-4 shadow-sm">
                    <h4 className="mb-3">일일 챌린지</h4>
                    {todayChallenge ? (
                      <>
                        <p className="mb-2">
                          <strong>{todayChallenge.title}</strong>
                        </p>
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                          {todayChallenge.description}
                        </p>
                        <button
                          className="btn btn-dark mb-2"
                          onClick={() => navigate('/challenge/daily')}
                        >
                          오늘 문제 풀기
                        </button>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => navigate('/challenge/ranking')}
                        >
                          오늘의 랭킹 보기
                        </button>
                      </>
                    ) : (
                      <p>로딩 중...</p>
                    )}
                  </div>
                </div>

                {/* 종합 챌린지 */}
                <div className="col-lg-5">
                  <div className="card text-center p-4 shadow-sm">
                    <h4 className="mb-3">종합 챌린지</h4>
                    <p className="text-muted">
                      복습하고 싶은 과목의 문제를 선택하여 다시 풀어보세요.
                    </p>
                    <button className="btn btn-dark" onClick={() => navigate('/challenge/review')}>
                      복습하러 가기
                    </button>
                  </div>
                </div>
              </div>

              {/* 🔥 랭킹 섹션 (선택사항) */}
              <div className="row mt-5 justify-content-center">
                <div className="col-lg-10">
                  <div className="card p-4 shadow-sm">
                    <h5 className="mb-3">오늘의 랭킹 TOP 3</h5>
                    <ul className="list-group list-group-flush">
                      {ranking.map((user, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between"
                        >
                          <span>{user.rank}위. {user.memberName}</span>
                          <span>{user.totalPoints}점</span>

                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChallengeMain;
