import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { checkParticipation } from '../../../api/challenge'; // axios 함수 주석 처리
import '../../../App.css';

const ChallengeInfo = () => {
  const navigate = useNavigate();
  const [hasParticipated, setHasParticipated] = useState(false); // 기본값: 참여 안함
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // 실제 백엔드 연동 시 주석 해제
    // checkParticipation(memberId, today)
    //   .then(res => {
    //     setHasParticipated(res.data.participated); // 예: { participated: true }
    //   })
    //   .catch(err => {
    //     console.error('참여 여부 확인 실패:', err);
    //   });

    // 현재는 dummy
    setHasParticipated(false);
  }, [memberId]);

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="challenge" />
        <main className="main">
          {/* <div className="page-title" data-aos="fade">
            <div className="heading text-center">
              <h2>일일 챌린지</h2>
            </div>
          </div> */}
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1
                className="h3 fw-bold mb-0"
                style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
              >
                일일챌린지
              </h1>
            </div>
          </div>
          <section className="section">
            <div className="container text-center" style={{ padding: '40px 20px' }}>
              {!hasParticipated ? (
                <>
                  <p style={{ fontSize: '20px', marginBottom: '80px'}}>
                    일일챌린지에 도전하세요! 오늘 수강하신 강의 내용을 기반으로 5개의 문제가 출제됩니다.
                  </p>
                  <button
                    className="btn btn-dark mt-4"
                    onClick={() => navigate('/challenge/daily/solve')}
                    style={{
                        background: '#84cc16',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 24,
                        padding: '12px 32px',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(95,207,128,0.08)',
                       }}
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
