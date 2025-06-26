import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteStudyLog } from '../../api/studyLog';

const StudyLogCard = ({ log, onDelete }) => {
  const [focus, setFocus] = useState({ date: false, subject: false, summary: false });

  const getFocusStyle = (key) =>
    focus[key]
      ? {
          borderColor: '#84cc16',
          boxShadow: '0 0 0 0.2rem rgba(132,204,22,0.25)',
          outline: 'none',
          backgroundColor: 'white',
        }
      : { backgroundColor: 'white' };

  const handleDelete = async () => {
    try {
      await deleteStudyLog(log.diaryId);
      alert('삭제 완료되었습니다.');
      onDelete(log.diaryId);
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제에 실패했습니다.');
    }
  };

  console.log(`🪪 Card 렌더: diaryId=${log.diaryId}, subject=${log.subject}`);

  return (
    <div className="card mb-4">
      <div className="card-body">
        {/* 상단 행 */}
        <div className="row mb-3 align-items-center">
          {/* 날짜 */}
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              value={log.studyDate || log.date || ''}
              readOnly
              style={getFocusStyle('date')}
              onFocus={() => setFocus((f) => ({ ...f, date: true }))}
              onBlur={() => setFocus((f) => ({ ...f, date: false }))}
            />
          </div>

          {/* 제목 */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control fw-bold"
              value={log.title || ''}
              readOnly
              style={getFocusStyle('subject')}
              onFocus={() => setFocus((f) => ({ ...f, subject: true }))}
              onBlur={() => setFocus((f) => ({ ...f, subject: false }))}
            />
          </div>

          {/* 과목 뱃지 */}
          <div className="col-md-2">
            <span className="badge bg-primary">
              {log.subject || '미지정'}
            </span>
          </div>

          {/* 공개 여부 뱃지 */}
          <div className="col-md-1">
            <span
              className={`badge ${
                log.isPublic ? 'bg-success' : 'bg-secondary'
              }`}
            >
              {log.isPublic ? '공개' : '비공개'}
            </span>
          </div>

          {/* 버튼 */}
          <div className="col-md-3 d-flex gap-1">
            <Link
              to={`/study/edit/${log.diaryId}`}
              className="btn border-0 text-white w-100 py-1"
              style={{
                backgroundColor: '#84cc16',
                fontSize: '0.875rem',
              }}
            >
              상세보기
            </Link>
            <button
              className="btn border-0 w-100 py-1"
              style={{
                backgroundColor: '#ced4da',
                color: '#fff',
                fontSize: '0.875rem',
              }}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>

        {/* AI 요약 */}
        <textarea
          className="form-control"
          rows="3"
          value={log.aiSummary || log.summary || ''}
          readOnly
          style={getFocusStyle('summary')}
          onFocus={() => setFocus((f) => ({ ...f, summary: true }))}
          onBlur={() => setFocus((f) => ({ ...f, summary: false }))}
        />
      </div>
    </div>
  );
};

export default StudyLogCard;
