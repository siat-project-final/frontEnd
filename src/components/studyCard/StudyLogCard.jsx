import React from 'react';
import { Link } from 'react-router-dom';

const StudyLogCard = ({ log }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-3">
            <input type="text" className="form-control" defaultValue={log.date} readOnly />
          </div>
          <div className="col-md-5">
            <input type="text" className="form-control" defaultValue={log.subject} readOnly />
          </div>
          <div className="col-md-2">
            <Link to={`/study/edit/${log.id}`} className="btn btn-outline-secondary w-100">
              수정
            </Link>
          </div>
          <div className="col-md-2">
            <button className="btn btn-outline-danger w-100">삭제</button>
          </div>
        </div>
        <textarea className="form-control" rows="3" defaultValue={log.summary} readOnly></textarea>
      </div>
    </div>
  );
};

export default StudyLogCard;
