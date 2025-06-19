import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { checkParticipation } from '../../../api/challenge'; // ✅ axios 함수 주석 처리
import '../../../App.css';

const ChallengeInfo = () => {
  const navigate = useNavigate();
  const [hasParticipated, setHasParticipated] = useState(false); // ✅ 기본값: 참여 안함
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // ✅ 실제 백엔드 연동 시 주석 해제
    // checkParticipation(memberId, today)
    //   .then(res => {
    //     setHasParticipated(res.data.participated); // 예: { participated: true }
    //   })
    //   .catch(err => {
    //     console.error('참여 여부 확인 실패:', err);
    //   });

    // ✅ 현재는 dummy
    setHasParticipated(false);
  }, [memberId]);

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="challenge" />
        <main className="main">
          <div className="page-title" data-aos="fade">
            <div className="heading text-center">
              <h2>일일 챌린지</h2>
            </div>
          </div>

          <section className="section">
            <div className="container text-center" style={{ padding: '40px 20px' }}>
              {!hasParticipated ? (
                <>
                  <p style={{ fontSize: '1.1rem' }}>
                    오늘의 문제에 도전해보세요! 커리큘럼 기반 문제 5개가 준비되어 있습니다.
                  </p>
                  <button
                    className="btn btn-dark mt-4"
                    onClick={() => navigate('/challenge/daily/solve')}
                  >
                    문제 풀기
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    이미 오늘의 챌린지를 완료했습니다.
                  </p>
                  <button
                    className="btn btn-dark mt-4"
                    onClick={() => navigate('/challenge/review')}
                  >
                    종합 챌린지로 이동
                  </button>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChallengeInfo;
