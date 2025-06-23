import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import StudyLogCard from '../../components/studyCard/StudyLogCard';
import { Link } from 'react-router-dom';
import Todo from '../../components/common/Todo';
// ✅ axios 함수 주석 처리
import { getMyStudyLogs } from '../../api/studyLog';

const StudyLogPage = () => {
  const [studyLogs, setStudyLogs] = useState([]);
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    setStudyLogs([
      { id: 1, date: '2025-06-13', subject: 'AI 개론', summary: 'BERT 구조 학습함' },
      { id: 2, date: '2025-06-12', subject: 'React', summary: 'useEffect 훅 정리함' },
      { id: 3, date: '2025-06-11', subject: 'Spring Boot', summary: 'JPA fetch 전략 학습함' },
    ]);
    const fetchLogs = async () => {
      try {
        const res = await getMyStudyLogs(memberId);
        setStudyLogs(res.data);
      } catch (err) {
        console.error('학습일지 목록 실패:', err);
      }
    };
    fetchLogs();
  }, [memberId]);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div className="container-flex" style={{ display: 'flex' }}>
            <Sidebar menuType="studylog" />
            <main className="main">
              <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1
                    className="h3 fw-bold mb-0"
                    style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
                  >
                    MY STUDY LOG
                  </h1>
                  <div className="d-flex align-items-center">
                    <select className="form-select w-auto d-inline-block me-2">
                      <option>과목</option>
                    </select>
                    <Link
                      to="./write"
                      className="btn border-0 text-white"
                      style={{ backgroundColor: '#84cc16' }}
                    >
                      일지 작성하기
                    </Link>
                  </div>
                </div>

                {studyLogs.map((log) => (
                  <div key={log.id} data-aos="fade-up">
                    <StudyLogCard log={log} />
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
        {/* 오른쪽: Todo 사이드바 */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default StudyLogPage;
