import React from 'react';
import { Link } from 'react-router-dom';

const StudyLogCard = ({ log }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              value={log.studyDate || ''}
              readOnly
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              value={log.subject || ''}
              readOnly
            />
          </div>
          <div className="col-md-2">
            <Link
              to={`/study/edit/${log.diaryId}`}
              className="btn border-0 text-white w-100"
              style={{ backgroundColor: '#84cc16' }}
            >
              상세보기
            </Link>
          </div>
          <div className="col-md-2">
            <button
              className="btn border-0 w-100"
              style={{ backgroundColor: '#ced4da', color: '#fff' }}
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
