import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { useParams } from 'react-router-dom';
import Todo from '../../components/common/Todo';
// ✅ axios 연동 주석 처리
import { getPublicStudyLogDetail } from '../../api/studyLog';

const StudyLogPublicDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getPublicStudyLogDetail(id);
        setLog(res.data);
      } catch (err) {
        console.error('공유 학습일지 상세 조회 실패:', err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!log) return <div>로딩 중...</div>;

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main" style={{ flex: 1 }}>
          <div className="container py-5">
            <h1
              className="h3 fw-bold mb-0"
              style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
            >
              공유 학습일지 상세
            </h1>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <input className="form-control w-50" value={log.title} disabled />
                <div className="d-flex align-items-center">
                  <span className="me-2">작성자: {log.author}</span>
                  <button className="btn btn-outline-success">
                    <i className="bi bi-heart"></i> {log.likes}
                  </button>
                </div>
              </div>
              <div className="d-flex gap-3 mb-3">
                <input className="form-control" value={log.date} disabled />
                <input className="form-control" value={log.subject} disabled />
              </div>
              <textarea className="form-control mb-3" value={log.content} rows="6" disabled />
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-2">등록된 댓글</h6>
              {log.comments.map((c, i) => (
                <div key={i} className="border rounded p-2 mb-2">
                  <strong>{c.user}</strong>
                  <p className="mb-1">{c.text}</p>
                  <small className="text-muted">{c.date}</small>
                </div>
              ))}
              <div className="d-flex align-items-center mt-3">
                <input type="text" placeholder="댓글을 남겨보세요" className="form-control me-2" />
                <button className="btn btn-primary">등록</button>
              </div>
            </div>
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

export default StudyLogPublicDetail;
