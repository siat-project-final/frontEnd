import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getSubmissionResult } from '../../../api/challenge';
import '../../../App.css';

const ChallengeResult = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // ✅ 실제 API 호출 시
    getSubmissionResult(memberId)
      .then(res => {
        const processed = (res.data || []).map(item => {
        let parsedOptions = [];

        try {
          // 두 번 파싱: 이중 문자열 → 배열
          const once = typeof item.options === 'string' ? JSON.parse(item.options) : item.options;
          parsedOptions = Array.isArray(once)
            ? once
            : typeof once === 'string'
            ? JSON.parse(once)
            : [];
        } catch (e) {
          console.warn(`옵션 파싱 실패 (problemId=${item.problemId}):`, e);
        }

        return {
          ...item,
          options: parsedOptions,
          type: item.type || 'multiple',
        };
      });
        
        setResultData(processed);
        console.log('결과 데이터:', processed);

        const score = processed
          .slice(0, 5)
          .reduce((sum, item) => sum + (item.correct ? item.difficulty : 0), 0);
        setTotalScore(score);
      })
      .catch(err => console.error('결과 불러오기 실패:', err));
  

  }, []);

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="challenge" />
        <main className="main">
          <div className="page-title" data-aos="fade">
            <div className="heading text-center">
              <h2>일일 챌린지 결과</h2>
            </div>
          </div>

          <section className="section">
            <div className="container" style={{ padding: '40px 20px' }}>
              {resultData.slice(0, 5).map((item, index) => (
                <div key={item.problemId} className="mb-4">
                  <h5>
                    Q{index + 1}. ({item.difficulty}점){' '}
                    {item.correct ? (
                      <span style={{ color: 'green' }}>✔ 정답</span>
                    ) : (
                      <span style={{ color: 'red' }}>✘ 오답</span>
                    )}
                  </h5>
                  <pre
                    style={{
                      background: '#f8f9fa',
                      padding: '15px',
                      borderRadius: '8px',
                      whiteSpace: 'pre-wrap',
                      fontSize: '14px',
                    }}
                  >
                    {item.title}
                  </pre>

                  {item.type === 'multiple' && item.options && (
                    <ul className="list-group mb-2">
                      {item.options.map((opt, idx) => {
                        const optionNumber = opt.split('.')[0].trim(); // 🔧 숫자만 추출: "2. String" → "2"

                        return (
                          <li
                            key={idx}
                            className={`list-group-item d-flex justify-content-between ${
                              optionNumber === item.correctAnswer
                                ? 'list-group-item-success'
                                : optionNumber === item.submitAnswer
                                ? 'list-group-item-danger'
                                : ''
                            }`}
                          >
                            <span>{opt}</span>
                            {optionNumber === item.correctAnswer && (
                              <span className="badge bg-success">정답</span>
                            )}
                            {optionNumber === item.submitAnswer &&
                              optionNumber !== item.correctAnswer && (
                                <span className="badge bg-danger">내 답안</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {item.type === 'text' && (
                    <div className="text-muted">
                      <div>
                        <strong>내 답안:</strong> {item.submitAnswer}
                      </div>
                      <div>
                        <strong>정답:</strong> {item.correctAnswer}
                      </div>
                    </div>
                  )}
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
