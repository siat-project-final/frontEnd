import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getReviewSubjects } from '../../../api/challenge'; // ✅ axios 함수 주석
import '../../../App.css';

const ReviewMain = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const memberId = sessionStorage.getItem('memberId');

    // ✅ 실제 API 호출 시
    // getReviewSubjects(memberId)
    //   .then(res => {
    //     setSubjects(res.data);
    //   })
    //   .catch(err => console.error('과목 불러오기 실패:', err));

    // ✅ 더미 과목 리스트
    setSubjects([
      { id: 1, name: 'Java 기초', progress: 100, completed: true },
      { id: 2, name: 'Spring 입문', progress: 80, completed: false },
      { id: 3, name: 'React 실전', progress: 100, completed: true },
      { id: 4, name: 'DB/SQL', progress: 60, completed: false },
      { id: 5, name: 'AWS 기본', progress: 100, completed: true },
    ]);
  }, []);

  const handleSelect = (subjectId) => {
    navigate('/challenge/review/solve', { state: { subjectId } });
  };

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="challenge" />
        <main className="main">
          <div className="page-title" data-aos="fade">
            <div className="heading text-center">
              <h2>종합 챌린지</h2>
              <p className="text-muted" style={{ fontSize: '14px' }}>
                100% 학습한 과목만 복습에 참여할 수 있어요.
              </p>
            </div>
          </div>

          <section className="section">
            <div className="container">
              <div className="row gy-4 justify-content-center">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="col-lg-4 col-md-6"
                    style={{ opacity: subject.completed ? 1 : 0.4 }}
                  >
                    <div
                      className={`card h-100 text-center p-4 shadow-sm ${
                        subject.completed ? 'bg-white' : 'bg-light'
                      }`}
                      onClick={() => subject.completed && handleSelect(subject.id)}
                      style={{ cursor: subject.completed ? 'pointer' : 'not-allowed' }}
                    >
                      <h5 className="mb-2">{subject.name}</h5>
                      <p className="mb-0">진도율: {subject.progress}%</p>
                      {!subject.completed && (
                        <small className="text-danger">아직 완료되지 않은 과목입니다.</small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ReviewMain;
