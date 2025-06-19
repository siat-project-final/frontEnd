import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { useParams } from 'react-router-dom';
import Todo from '../../components/common/Todo';
// ✅ axios 연동 주석 처리
// import { getPublicStudyLogDetail } from '../../api/studyLog';

const StudyLogPublicDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);

  useEffect(() => {
    // ✅ 실제 API 연동 시 사용
    // getPublicStudyLogDetail(id)
    //   .then(res => setLog(res.data))
    //   .catch(err => console.error('공유 학습일지 상세 조회 실패:', err));

    // ✅ 현재는 dummy 데이터 사용
    setLog({
      id: id,
      title: 'AI 요약',
      date: '2025-06-13',
      subject: 'AI 개론',
      author: '이수현',
      likes: 45,
      content: 'BERT 구조를 학습하고 관련 논문을 리뷰함.',
      comments: [
        {
          user: '최은정',
          text: '깔끔하게 정리했네요:) 덕분에 많은 도움 받고 갑니다아',
          date: '2025.06.13',
        },
      ],
    });
  }, [id]);

  if (!log) return <div>로딩 중...</div>;

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main" style={{ flex: 1 }}>
          <div className="container py-5">
            <h1 className="h4 fw-bold mb-4">공유 학습일지 상세</h1>

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
