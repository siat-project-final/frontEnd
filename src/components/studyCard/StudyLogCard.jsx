import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudyLogCard = ({ log }) => {
  // focus 상태 관리
  const [focus, setFocus] = useState({ date: false, subject: false, summary: false });
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
    <div className="card mb-4">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              defaultValue={log.date}
              readOnly
              style={getFocusStyle('date')}
              onFocus={() => setFocus((f) => ({ ...f, date: true }))}
              onBlur={() => setFocus((f) => ({ ...f, date: false }))}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              defaultValue={log.subject}
              readOnly
              style={getFocusStyle('subject')}
              onFocus={() => setFocus((f) => ({ ...f, subject: true }))}
              onBlur={() => setFocus((f) => ({ ...f, subject: false }))}
            />
          </div>
          <div className="col-md-2">
            <Link
              to={`/study/edit/${log.id}`}
              className="btn border-0 text-white w-100"
              style={{ backgroundColor: '#84cc16' }}
            >
              수정
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
          defaultValue={log.summary}
          readOnly
          style={getFocusStyle('summary')}
          onFocus={() => setFocus((f) => ({ ...f, summary: true }))}
          onBlur={() => setFocus((f) => ({ ...f, summary: false }))}
        ></textarea>
      </div>
    </div>
  );
};

export default StudyLogCard;
