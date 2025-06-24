import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { useParams } from 'react-router-dom';
import Todo from '../../components/common/Todo';
import axios from 'axios';
import { getPublicStudyLogDetail, toggleLikeStudyLog } from '../../api/studyLog';

const StudyLogPublicDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    fetchDetail();
    fetchComments();
  }, [id]);

  const fetchDetail = async () => {
    try {
      console.log('공유 학습일지 상세 조회 시작:', id);
      const res = await getPublicStudyLogDetail(memberId);
      console.log(res.data); // 응답 데이터 확인
      setLog(res.data);
      setIsLiked(localStorage.getItem(`liked-${res.data.diaryId}`) === 'true');
    } catch (err) {
      console.error('공유 학습일지 상세 조회 실패:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/v1/study-diary/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('댓글 조회 실패:', err);
    }
  };

  const handleCommentSubmit = async () => {
    const memberId = sessionStorage.getItem('memberId');
    if (!memberId) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    try {
      await axios.post('/v1/study-diary/comments', {
        diaryId: id,
        memberId: parseInt(memberId),
        contents: commentText,
      });
      setCommentText('');
      fetchComments();
    } catch (err) {
      console.error('댓글 등록 실패:', err);
    }
  };

  const handleLike = async () => {
    if (!log) return;
    try {
      await toggleLikeStudyLog(log.diaryId, !isLiked);
      setIsLiked(!isLiked);
      localStorage.setItem(`liked-${log.diaryId}`, String(!isLiked));
    } catch (err) {
      console.error('좋아요 실패:', err);
    }
  };

  // 로딩 중 화면 처리
  if (!log) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />
        <main className="main" style={{ flex: 1 }} data-aos="fade-up">
          <div className="container py-5">
            <h1 className="h3 fw-bold mb-4" style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}>
              공유 학습일지 상세
            </h1>

            <div className="card mb-3 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input className="form-control w-50" value={log.title} disabled style={{ backgroundColor: 'white' }} />
                <div className="d-flex align-items-center">
                  <span className="me-2">작성자: {log.memberName ? log.memberName : '이름 미제공'}</span>
                  <button
                    className={`btn ${isLiked ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={handleLike}
                  >
                    <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i> {log.likeCount}
                  </button>
                </div>
              </div>
              <div className="d-flex gap-3 mb-3">
                <input className="form-control" value={log.studyDate} disabled style={{ backgroundColor: 'white' }} />
                <input className="form-control" value={log.subject} disabled style={{ backgroundColor: 'white' }} />
              </div>
              <textarea
                className="form-control mb-3"
                value={log.contents}
                rows="6"
                disabled
                style={{ backgroundColor: 'white' }}
              />
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-4">등록된 댓글</h6>
              {comments.map((c, i) => (
                <div key={i} className="border rounded p-2 mb-2">
                  <strong>{c.memberName}</strong>
                  <p className="mb-1">{c.contents}</p>
                  <small className="text-muted">
                    {c.date ? new Date(c.date).toLocaleDateString() : ''}
                  </small>
                </div>
              ))}
              <div className="d-flex align-items-center mt-3">
                <input
                  type="text"
                  placeholder="댓글을 남겨보세요"
                  className="form-control me-2 flex-grow-1"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="btn border-0 text-white flex-shrink-0"
                  style={{ backgroundColor: '#84cc16' }}
                  onClick={handleCommentSubmit}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default StudyLogPublicDetail;
