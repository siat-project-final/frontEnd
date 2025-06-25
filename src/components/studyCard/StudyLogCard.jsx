import React from 'react';
import { Link } from 'react-router-dom';
import { deleteStudyLog } from '../../api/studyLog';

const StudyLogCard = ({ log, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteStudyLog(log.diaryId);
      alert('삭제 완료되었습니다.');
      onDelete(log.diaryId); // 부모에서 리스트 제거
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row mb-3 align-items-center">
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                value={log.studyDate || ''}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control fw-bold"
              value={log.title || ''}
              readOnly
            />
          </div>
          <div className="col-md-2">
            <span className={`badge ${log.isPublic ? 'bg-success' : 'bg-secondary'}`}>
              {log.isPublic ? '공개' : '비공개'}
            </span>
          </div>
          <div className="col-md-2 d-flex gap-1">
            <Link
              to={`/study/edit/${log.diaryId}`}
              className="btn border-0 text-white w-100 py-1"
              style={{ backgroundColor: '#84cc16', fontSize: '0.875rem' }}
            >
              상세보기
            </Link>
            <button
              className="btn border-0 w-100 py-1"
              style={{ backgroundColor: '#ced4da', color: '#fff', fontSize: '0.875rem' }}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>

        <textarea
          className="form-control"
          rows="3"
          value={log.aiSummary || ''}
          readOnly
        />
      </div>
    </div>
  );
};

export default StudyLogCard;
