import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import Todo from '../../components/common/Todo';
// ✅ axios 연동 주석
// import { getPublicStudyLogs } from '../../api/studyLog';

const StudyLogPublic = () => {
  const [studyLogs, setStudyLogs] = useState([]);

  useEffect(() => {
    // ✅ 실제 API 연동 시 사용
    // getPublicStudyLogs({ isPublic: true })
    //   .then(res => setStudyLogs(res.data))
    //   .catch(err => console.error('공유 일지 조회 실패:', err));

    // ✅ 현재는 dummy 사용
    setStudyLogs([
      {
        id: 1,
        date: '2025-06-13',
        subject: 'AI 개론',
        summary: 'BERT 구조 학습함',
        author: '이수현',
        likes: 45,
        comments: [
          {
            user: '최은정',
            text: '깔끔하게 정리했네요:) 덕분에 많은 도움 받고 갑니다아',
            date: '2025.06.13',
          },
        ],
      },
      {
        id: 2,
        date: '2025-06-12',
        subject: 'React',
        summary: 'useEffect 훅 정리함',
        author: '이수현',
        likes: 20,
        comments: [
          {
            user: '최은정',
            text: '깔끔하게 정리했네요:) 덕분에 많은 도움 받고 갑니다fff아',
            date: '2025.06.13',
          },
        ],
      },
      {
        id: 3,
        date: '2025-06-11',
        subject: 'Spring Boot',
        summary: 'JPA fetch 전략 학습함',
        author: '이수현',
        likes: 30,
        comments: [],
      },
    ]);
  }, []);

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main" style={{ flex: 1 }}>
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 fw-bold page-title">공유 학습일지</h1>
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
              <div key={log.id} className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span className="badge bg-secondary me-2">{log.date}</span>
                      <strong>{log.subject}</strong>
                      <span className="text-muted ms-3">NAME: {log.author}</span>
                    </div>
                    <div>
                      <button className="btn btn-outline-success">
                        <i className="bi bi-heart"></i> {log.likes}
                      </button>
                    </div>
                  </div>
                  <p>{log.summary}</p>
                  <div className="text-end">
                    <Link
                      to={`/study/public/${log.id}`}
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
