import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getTodayChallenge, submitChallenge } from '../../../api/challenge'; // ✅ axios 기반 함수
import '../../../App.css';

const ChallengeSolve = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem('memberId');

  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState({});

  // ✅ 더미 문제
  const dummyProblem = {
    id: 1,
    difficulty: 2,
    type: 'text',
    text: `문제: 사칙연산 계산기 만들기

두 개의 정수와 연산자(+, -, *, /)를 입력받아 계산 결과를 출력하는 프로그램을 작성하세요.

요구사항:
1. 사용자로부터 첫 번째 숫자, 연산자, 두 번째 숫자를 입력받습니다.
2. 연산자에 따라 계산을 수행합니다.
3. 나눗셈의 경우 0으로 나누면 예외 처리합니다.

입력 예시:
10 + 5 → 출력: 15
`,
    correctAnswer: '정답',
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // ✅ 실제 API 호출
    // getTodayChallenge(memberId)
    //   .then(res => {
    //     setProblems(res.data);
    //   })
    //   .catch(err => console.error('문제 불러오기 실패:', err));

    // ✅ 더미로 세팅
    setProblems([dummyProblem]);
  }, [memberId]);

  const handleChange = (problemId, value) => {
    setAnswers(prev => ({ ...prev, [problemId]: value }));
  };

  const handleSubmit = () => {
    const submissionData = problems.map(p => ({
      problemId: p.id,
      submitAnswer: answers[p.id] || '',
      memberId: memberId,
    }));

    // ✅ 실제 API 연결 시
    // submissionData.forEach(data => {
    //   submitChallenge(data.problemId, data.memberId, data.submitAnswer)
    //     .then(() => {
    //       // 성공시
    //       navigate('/challenge/daily/result');
    //     })
    //     .catch(err => {
    //       console.error('제출 실패:', err);
    //       alert('제출에 실패했습니다.');
    //     });
    // });

    console.log('제출된 데이터 (dummy):', submissionData);
    navigate('/challenge/daily/result');
  };

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
              {problems.map((problem, index) => (
                <div key={problem.id} className="mb-4">
                  <h5 className="mb-2">
                    Q{index + 1}. (난이도: {problem.difficulty})
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
                    {problem.text}
                  </pre>
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="정답을 입력하세요"
                    onChange={(e) => handleChange(problem.id, e.target.value)}
                  />
                </div>
              ))}
              <div className="text-center mt-4">
                <button className="btn btn-dark" onClick={handleSubmit}>
                  제출
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

export default ChallengeSolve;
