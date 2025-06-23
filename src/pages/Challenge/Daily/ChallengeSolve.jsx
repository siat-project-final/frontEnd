import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getTodayChallenge, submitChallenge } from '../../../api/challenge';
import '../../../App.css';

const ChallengeSolve = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem('memberId');

  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getTodayChallenge()
      .then(res => {
        const parsed = res.data.map(p => {
          let options = [];
          try {
            const once = typeof p.choices === 'string' ? JSON.parse(p.choices) : p.choices;
            options = typeof once === 'string' ? JSON.parse(once) : once;
          } catch (e) {
            console.error(`선택지 파싱 실패 (problemId=${p.problemId || p.id}):`, e);
            alert('문제의 선택지를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.');
          }
          return { ...p, options, type: 'choice' };
        });
  
        setProblems(parsed);
      })
      .catch(err => console.error('문제 불러오기 실패:', err));
  }, []);

  const handleChange = (problemId, value) => {
    setAnswers(prev => ({ ...prev, [problemId]: value }));
  };

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const submissionData = problems.map(p => ({
      problemId: p.id,
      submitAnswer: answers[p.id] || '',
      memberId,
    }));

    // 실제 API 호출
    // Promise.all(
    //   submissionData.map(data =>
    //     submitChallenge(data.problemId, data.memberId, data.submitAnswer)
    //   )
    // )
    //   .then(() => {
    //     navigate('/challenge/daily/result');
    //   })
    //   .catch(err => {
    //     console.error('제출 실패:', err);
    //     alert('제출에 실패했습니다.');
    //   });

    console.log('제출 데이터:', submissionData);
    navigate('/challenge/daily/result');
  };

  const currentProblem = problems[currentIndex];

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
              {currentProblem && (
                <div className="mb-4">
                  <h5 className="mb-2">
                    Q{currentIndex + 1}. (난이도: {currentProblem.difficulty})
                  </h5>
                  <pre
                    style={{
                      background: '#f8f9fa',
                      padding: '20px',
                      borderRadius: '10px',
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit',
                      fontSize: '15px',
                    }}
                  >
                    {currentProblem.title}
                  </pre>

                  {currentProblem.type === 'text' ? (
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="정답을 입력하세요"
                      value={answers[currentProblem.id] || ''}
                      onChange={(e) =>
                        handleChange(currentProblem.id, e.target.value)
                      }
                    />
                  ) : (
                    <div className="mt-3">
                      {currentProblem.options.map((option, idx) => (
                        <div className="form-check" key={idx}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${currentProblem.id}`}
                            value={option}
                            checked={answers[currentProblem.id] === option}
                            onChange={(e) =>
                              handleChange(
                                currentProblem.id,
                                e.target.value
                              )
                            }
                            id={`option-${currentProblem.id}-${idx}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`option-${currentProblem.id}-${idx}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="text-center mt-4">
                {currentIndex < problems.length - 1 ? (
                  <button className="btn btn-dark" onClick={handleNext}>
                    다음 문제
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleSubmit}>
                    제출
                  </button>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChallengeSolve;