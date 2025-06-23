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

  // ✅ Dummy data
  const dummyChallenge = {
    title: 'AI 개론 - 분류 모델',
    description: '다음 중 지도 학습에 해당하는 것은?',
  };

  const dummyRanking = [
    { rank: 1, name: '이수연', score: 98 },
    { rank: 2, name: '최형규', score: 95 },
    { rank: 3, name: '박지훈', score: 92 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 실제 API 연결 시 사용
        // const res1 = await getTodayChallenge(memberId);
        // const res2 = await getDailyRanking(new Date().toISOString().slice(0, 10));

        // setTodayChallenge(res1.data);
        // setRanking(res2.data);

        // ✅ 현재는 dummy 사용
        setTodayChallenge(dummyChallenge);
        setRanking(dummyRanking);
      } catch (error) {
        console.error('챌린지 메인 데이터 불러오기 실패:', error);
      }
    };

    if (memberId) fetchData();
  }, [memberId]);

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
                    {dummyChallenge ? (
                      <>
                        <p className="mb-2">
                          <strong>{dummyChallenge.title}</strong>
                        </p>
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                          {dummyChallenge.description}
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
                        <li key={idx} className="list-group-item d-flex justify-content-between">
                          <span>
                            {user.rank}위. {user.name}
                          </span>
                          <span>{user.score}점</span>
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
