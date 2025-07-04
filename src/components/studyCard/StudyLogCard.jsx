// src/components/StudyLogCard.js
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

  console.log(`🪪 Card 렌더: diaryId=${log.diaryId}, subject=${log.subject}, selectedPeriods=${log.selectedPeriods}`);

  return (
    <div className="card mb-4">
      <div className="card-body">
        {/* 상단 행 */}
        <div className="row mb-3 align-items-center g-2 g-sm-3">
          {/* 날짜 */}
          <div className="col-auto col-md-2">
            <input
              type="text"
              className="form-control form-control-sm text-center"
              value={log.studyDate || log.date || ''}
              readOnly
              style={getFocusStyle('date')}
              onFocus={() => setFocus((f) => ({ ...f, date: true }))}
              onBlur={() => setFocus((f) => ({ ...f, date: false }))}
            />
          </div>

          {/* 제목 */}
          <div className="col-12 col-sm flex-grow-1 col-md-4">
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


          
          {/* 과목 뱃지 및 공개 여부 뱃지 통합 컬럼 */}
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center justify-content-end flex-wrap gap-2">
              {/* 뱃지 */}
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary">
                  {log.subject || '미지정'}
                </span>
                <span className={`badge ${log.isPublic ? 'bg-success' : 'bg-secondary'}`}>
                  {log.isPublic ? '공개' : '비공개'}
                </span>
              </div>

              {/* 체크박스 */}
              <div className="d-flex align-items-center gap-1">
                {['하루', '일주일', '한 달', '세 달'].map((period) => (
                  <div key={period} className="form-check form-check-inline m-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`card-checkbox-${log.diaryId}-${period}`}
                      checked={Array.isArray(log.selectedPeriods) && log.selectedPeriods.includes(period)}
                      readOnly
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`card-checkbox-${log.diaryId}-${period}`}
                      style={{ fontSize: '0.8rem' }}
                    >
                      {period}
                    </label>
                  </div>
                ))}
              </div>

              {/* 버튼 */}
              <div className="d-flex gap-1">
                <Link
                  to={`/study/edit/${log.diaryId}`}
                  className="btn border-0 text-white py-1"
                  style={{
                    backgroundColor: '#84cc16',
                    fontSize: '0.875rem',
                    flexShrink: 0,
                    width: '90px'
                  }}
                >
                  상세보기
                </Link>
                <button
                  className="btn border-0 py-1"
                  style={{
                    backgroundColor: '#ced4da',
                    color: '#fff',
                    fontSize: '0.875rem',
                    flexShrink: 0,
                    width: '90px'
                  }}
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </div>
            </div>
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