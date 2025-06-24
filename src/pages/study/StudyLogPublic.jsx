import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import Todo from '../../components/common/Todo';
// ✅ axios 연동 주석
import { getPublicStudyLogs } from '../../api/studyLog';

const StudyLogPublic = () => {
  const [studyLogs, setStudyLogs] = useState([]);

  useEffect(() => {
    console.log('studyLogs:', studyLogs);
    //dummy data
    // setStudyLogs([
    //   { id: 1, date: '2025-06-13', subject: 'AI 개론', summary: 'BERT 구조 학습함' },
    //   { id: 2, date: '2025-06-12', subject: 'React', summary: 'useEffect 훅 정리함' },
    //   { id: 3, date: '2025-06-11', subject: 'Spring Boot', summary: 'JPA fetch 전략 학습함' },
    // ]);
    const fetchPublicLogs = async () => {
      try {
        const res = await getPublicStudyLogs({ subject: 'ALL' });
        console.log('📥 공유 일지 응답:', res.data); // ✅ 반드시 확인할 로그
        setStudyLogs(res.data);
      } catch (err) {
        console.error('공유 일지 조회 실패:', err);
      }
    };
    fetchPublicLogs();
  }, []);

  return (
    
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main" style={{ flex: 1 }}>
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1
                className="h3 fw-bold mb-0"
                style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
              >
                공유 학습일지
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
              <div key={log.diaryId} className="studylog-boxes card mb-4" data-aos="fade-up">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span className="badge bg-secondary me-2">{log.studyDate}</span>
                      <strong>{log.subject}</strong>
                      <span className="text-muted ms-3">NAME: {log.memberName}</span>
                    </div>
                    <div>
                      <button className="btn btn-outline-success">
                        <i className="bi bi-heart"></i> {log.likeCount}
                      </button>
                    </div>
                  </div>
                  <p>{log.aiSummary}</p>
                  <div className="text-end">
                    <Link
                      to={`/study/public/${log.diaryId}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      상세 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </main>

        {/* 오른쪽: Todo 사이드바 */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default StudyLogPublic;
