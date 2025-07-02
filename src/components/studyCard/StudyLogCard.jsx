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

          {/* 과목 뱃지 및 공개 여부 뱃지 통합 컬럼 */}
          <div className="col-md-2 d-flex align-items-center gap-2"> {/* 너비 조정 및 gap 추가 */}
            <span className="badge bg-primary">
              {log.subject || '미지정'}
            </span>
            <span
              className={`badge ${
                log.isPublic ? 'bg-success' : 'bg-secondary'
              }`}
            >
              {log.isPublic ? '공개' : '비공개'}
            </span>
          </div>

          {/* 체크박스 그룹과 버튼들 */}
          <div className="col-md-4 d-flex align-items-center gap-2"> {/* 이 부분의 col-md-* 너비를 조정하여 공간을 확보하세요 (예: col-md-4) */}
            {/* 체크박스 그룹 */}
            <div className="d-flex align-items-center gap-1"> {/* 체크박스 사이 간격 조정 */}
              {['하루', '일주일', '한 달', '세 달'].map((period) => (
                <div key={period} className="form-check form-check-inline m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`card-checkbox-${log.diaryId}-${period}`}
                    // log.selectedPeriods가 배열이고 해당 기간을 포함하는지 확인
                    checked={Array.isArray(log.selectedPeriods) && log.selectedPeriods.includes(period)}
                    readOnly // 목록에서는 수정 불가능하게 설정
                    disabled // 사용자 클릭을 완전히 막기 위해 disabled 추가
                  />
                  <label className="form-check-label" htmlFor={`card-checkbox-${log.diaryId}-${period}`} style={{ fontSize: '0.8rem' }}>
                    {period}
                  </label>
                </div>
              ))}
            </div>

            {/* 버튼들 */}
            <div className="d-flex gap-1 flex-grow-1 justify-content-end"> {/* 버튼들을 오른쪽으로 정렬 */}
                <Link
                to={`/study/edit/${log.diaryId}`}
                className="btn border-0 text-white py-1" // w-100 제거, flex-grow-1로 조절
                style={{
                    backgroundColor: '#84cc16',
                    fontSize: '0.875rem',
                    flexGrow: 1, // 버튼이 남은 공간을 채우도록
                    maxWidth: '100px' // 버튼 최대 너비 설정 (선택 사항)
                }}
                >
                상세보기
                </Link>
                <button
                className="btn border-0 py-1" // w-100 제거
                style={{
                    backgroundColor: '#ced4da',
                    color: '#fff',
                    fontSize: '0.875rem',
                    flexGrow: 1, // 버튼이 남은 공간을 채우도록
                    maxWidth: '100px' // 버튼 최대 너비 설정 (선택 사항)
                }}
                onClick={handleDelete}
                >
                삭제
                </button>
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