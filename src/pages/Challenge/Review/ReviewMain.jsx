import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

const ReviewMain = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     fetch('/api/review/subjects', {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setSubjects(data))
//       .catch((err) => console.error('과목 불러오기 실패:', err));
//   }, []);
    useEffect(() => {
        // 🔧 백엔드 없이 더미 과목 세팅
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
                      <p className="mb-0">
                        진도율: {subject.progress}%
                      </p>
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
