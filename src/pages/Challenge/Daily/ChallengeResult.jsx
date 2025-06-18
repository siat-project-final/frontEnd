import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

const ChallengeResult = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    fetch(`/api/submissions/result?date=${today}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResultData(data.results);
        setTotalScore(data.totalScore);
      })
      .catch((err) => console.error('결과 불러오기 실패:', err));
  }, []);

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
                    Q. {index + 1} @@@ ({item.difficulty}점) {item.correct ? '(O)' : '(X)'}
                  </h5>
                  <p>{item.content}</p>
                </div>
              ))}
              <div className="text-end" style={{ fontWeight: 'bold', fontSize: '18px' }}>
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
