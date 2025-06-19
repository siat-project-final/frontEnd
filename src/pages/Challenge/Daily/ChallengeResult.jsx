import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getSubmissionResult } from '../../../api/challenge'; // ✅ axios 연동 주석
import '../../../App.css';

const ChallengeResult = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // ✅ 실제 API 호출 시
    // getSubmissionResult(memberId, today)
    //   .then(res => {
    //     setResultData(res.data.results);
    //     setTotalScore(res.data.totalScore);
    //   })
    //   .catch(err => console.error('결과 불러오기 실패:', err));

    // ✅ dummy 데이터
    const dummyResults = [
      {
        problemId: 1,
        content: 'Java에서 사칙연산 계산기 만들기',
        difficulty: 2,
        correct: true,
      },
      {
        problemId: 2,
        content: 'Spring에서 @Service의 역할',
        difficulty: 3,
        correct: false,
      },
    ];
    const dummyScore = dummyResults.reduce(
      (sum, item) => sum + (item.correct ? item.difficulty : 0),
      0
    );

    setResultData(dummyResults);
    setTotalScore(dummyScore);
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
            <div className="container" style={{ padding: '40px 20px' }}>
              {resultData.map((item, index) => (
                <div key={item.problemId} className="mb-4">
                  <h5>
                    Q{index + 1}. ({item.difficulty}점) {item.correct ? '✔ 정답' : '✘ 오답'}
                  </h5>
                  <p className="text-muted">{item.content}</p>
                </div>
              ))}
              <div className="text-end mt-4" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                총점: {totalScore}점
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-dark" onClick={() => navigate('/challenge/review')}>
                  종합 챌린지로 이동
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChallengeResult;
