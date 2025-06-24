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
  // focus 상태 관리
  const [focus, setFocus] = useState({
    title: false,
    date: false,
    subject: false,
    content: false,
    comment: false,
  });

  useEffect(() => {
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

  // focus 스타일
  const getFocusStyle = (key) =>
    focus[key]
      ? {
          borderColor: '#84cc16',
          boxShadow: '0 0 0 0.2rem rgba(132,204,22,0.25)',
          outline: 'none',
          backgroundColor: 'white',
        }
      : { backgroundColor: 'white' };

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main" style={{ flex: 1 }} data-aos="fade-up">
          <div className="container py-5">
            <h1
              className="h3 fw-bold mb-4"
              style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
            >
              공유 학습일지 상세
            </h1>

            <div className="card mb-3 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  className="form-control w-50"
                  value={log.title}
                  disabled
                  style={getFocusStyle('title')}
                  onFocus={() => setFocus((f) => ({ ...f, title: true }))}
                  onBlur={() => setFocus((f) => ({ ...f, title: false }))}
                />
                <div className="d-flex align-items-center">
                  <span className="me-2">작성자: {log.author}</span>
                  <button className="btn btn-outline-success">
                    <i className="bi bi-heart"></i> {log.likes}
                  </button>
                </div>
              </div>
              <div className="d-flex gap-3 mb-3">
                <input
                  className="form-control"
                  value={log.date}
                  disabled
                  style={getFocusStyle('date')}
                  onFocus={() => setFocus((f) => ({ ...f, date: true }))}
                  onBlur={() => setFocus((f) => ({ ...f, date: false }))}
                />
                <input
                  className="form-control"
                  value={log.subject}
                  disabled
                  style={getFocusStyle('subject')}
                  onFocus={() => setFocus((f) => ({ ...f, subject: true }))}
                  onBlur={() => setFocus((f) => ({ ...f, subject: false }))}
                />
              </div>
              <textarea
                className="form-control mb-3"
                value={log.content}
                rows="6"
                disabled
                style={getFocusStyle('content')}
                onFocus={() => setFocus((f) => ({ ...f, content: true }))}
                onBlur={() => setFocus((f) => ({ ...f, content: false }))}
              />
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-4">등록된 댓글</h6>
              {log.comments.map((c, i) => (
                <div key={i} className="border rounded p-2 mb-2">
                  <strong>{c.user}</strong>
                  <p className="mb-1">{c.text}</p>
                  <small className="text-muted">{c.date}</small>
                </div>
              ))}
              <div className="d-flex align-items-center mt-3">
                <input
                  type="text"
                  placeholder="댓글을 남겨보세요"
                  className="form-control me-2 flex-grow-1"
                  style={getFocusStyle('comment')}
                  onFocus={() => setFocus((f) => ({ ...f, comment: true }))}
                  onBlur={() => setFocus((f) => ({ ...f, comment: false }))}
                />
                <button
                  className="btn border-0 text-white flex-shrink-0"
                  style={{ backgroundColor: '#84cc16' }}
                >
                  등록
                </button>
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
