import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

const ChallengeSolve = () => {
    const dummyProblem = {
        id: 1,
        difficulty: 2,
        type: 'text',
        text: `여기 간단한 Java 문제를 제시해드리겠습니다:

        문제: 사칙연산 계산기 만들기

        두 개의 정수와 연산자(+, -, *, /)를 입력받아 계산 결과를 출력하는 프로그램을 작성하세요.

        요구사항:
        1. 사용자로부터 첫 번째 숫자, 연산자, 두 번째 숫자를 순서대로 입력받습니다.
        2. 입력받은 연산자에 따라 적절한 계산을 수행합니다.
        3. 계산 결과를 출력합니다.
        4. 나눗셈의 경우 두 번째 숫자가 0이면 "0으로 나눌 수 없습니다"라는 메시지를 출력합니다.

        입력 예시:
        첫 번째 숫자를 입력하세요: 10
        연산자를 입력하세요(+,-,*,/): +
        두 번째 숫자를 입력하세요: 5

        출력 예시:
        계산 결과: 10 + 5 = 15

        다음은 문제 해결을 위한 코드 템플릿입니다:

        import java.util.Scanner;

        public class SimpleCalculator {
            public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in);
                
                // 여기에 코드를 작성하세요
                
            }
        }
        `,
        correctAnswer: '정답',
    };


  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];

//     fetch(/api/problems?date=${today}, {
//       method: 'GET',
//       headers: {
//         Authorization: Bearer ${sessionStorage.getItem('token')},
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setProblems([dummyProblem]))
//       .catch((err) => console.error('문제 불러오기 실패:', err));
//   }, []);

  useEffect(() => {
    setProblems([dummyProblem]); // 테스트 목적
  }, []);

  const handleChange = (problemId, value) => {
    setAnswers((prev) => ({ ...prev, [problemId]: value }));
  };

  const handleSubmit = () => {
    const submissionData = {
      answers: problems.map((p) => ({
        problemId: p.id,
        answer: answers[p.id] || '',
      })),
    };

    fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/challenge/daily/result');
        } else {
          alert('제출에 실패했습니다.');
        }
      })
      .catch((err) => console.error('제출 실패:', err));
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
                  <h5>
                    Q. {index + 1} @@@ ({problem.difficulty}점)
                  </h5>
                  <div><pre
                    style={{
                        background: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '10px',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        marginTop: '10px',
                    }}
                    >
                    {problem.text}
                    </pre></div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="정답 입력"
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
