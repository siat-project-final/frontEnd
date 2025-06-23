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

    // ✅ dummy 데이터 (5개)
    const dummyResults = [
      {
        problemId: 1,
        text: '1 + 1은?',
        type: 'text',
        difficulty: 1,
        correctAnswer: '2',
        submitAnswer: '2',
        correct: true,
      },
      {
        problemId: 2,
        text: '3 + 4는?',
        type: 'text',
        difficulty: 2,
        correctAnswer: '7',
        submitAnswer: '8',
        correct: false,
      },
      {
        problemId: 3,
        text: '프론트엔드 프레임워크가 아닌 것은?',
        type: 'multiple',
        difficulty: 2,
        options: ['React', 'Vue', 'Spring', 'Svelte'],
        correctAnswer: 'Spring',
        submitAnswer: 'Vue',
        correct: false,
      },
      {
        problemId: 4,
        text: 'AI 모델 중 Transformer를 사용하는 것은?',
        type: 'multiple',
        difficulty: 3,
        options: ['CNN', 'RNN', 'BERT', 'SVM'],
        correctAnswer: 'BERT',
        submitAnswer: 'BERT',
        correct: true,
      },
      {
        problemId: 5,
        text: 'Spring에서 의존성 주입 방식이 아닌 것은?',
        type: 'multiple',
        difficulty: 2,
        options: ['필드 주입', '세터 주입', '생성자 주입', '서비스 주입'],
        correctAnswer: '서비스 주입',
        submitAnswer: '필드 주입',
        correct: false,
      },
      {
        problemId: 6,
        text: '이 문제는 6번째지만 출력되면 안 됨',
        type: 'text',
        difficulty: 1,
        correctAnswer: 'x',
        submitAnswer: 'x',
        correct: true,
      },
    ];

    const dummyScore = dummyResults
      .slice(0, 5)
      .reduce((sum, item) => sum + (item.correct ? item.difficulty : 0), 0);

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
                    {item.text}
                  </pre>

                  {item.type === 'multiple' && item.options && (
                    <ul className="list-group mb-2">
                      {item.options.map((opt, idx) => (
                        <li
                          key={idx}
                          className={`list-group-item d-flex justify-content-between ${
                            opt === item.correctAnswer
                              ? 'list-group-item-success'
                              : opt === item.submitAnswer
                              ? 'list-group-item-danger'
                              : ''
                          }`}
                        >
                          <span>{opt}</span>
                          {opt === item.correctAnswer && (
                            <span className="badge bg-success">정답</span>
                          )}
                          {opt === item.submitAnswer && opt !== item.correctAnswer && (
                            <span className="badge bg-danger">내 답안</span>
                          )}
                        </li>
                      ))}
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
