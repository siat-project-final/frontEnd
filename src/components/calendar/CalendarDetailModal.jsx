import React from 'react';

const CalendarDetailModal = ({ isOpen, onClose, eventInfo, onEdit, onDelete }) => {
  if (!isOpen || !eventInfo) return null;

  const { title, start, end, extendedProps, allDay } = eventInfo;
  const { content } = extendedProps;

  // '제목 시간' 형식에서 시간 부분을 제거하고 순수 제목만 추출
  const displayTitle = title.split(' ')[0];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .modal-content label {
          font-weight: bold;
        }
        .modal-content .detail-content {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            min-height: 50px;
        }
        .modal-content .button-container {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .modal-content button {
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        .edit-button {
          background-color: #84cc16;
          color: white;
        }
        .delete-button {
          background-color: #e53e3e;
          color: white;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }
        .close-button:hover {
          color: #333;
        }
      `}</style>
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onClose} className="close-button">
            <img src="/assets/img/mentors/x.png" alt="닫기" />
          </button>
          
          <div>
            <label>일정명</label>
            <div className="detail-content">{displayTitle}</div>
          </div>

          {!allDay && (
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>시작 시간</label>
                <div className="detail-content">{`${formatDate(start)} ${formatTime(start)}`}</div>
              </div>
              <div style={{ flex: 1 }}>
                <label>종료 시간</label>
                <div className="detail-content">{`${formatDate(end)} ${formatTime(end)}`}</div>
              </div>
            </div>
          )}

          {allDay && (
             <div>
                <label>기간</label>
                <div className="detail-content">{`${formatDate(start)} ~ ${formatDate(end)}`}</div>
            </div>
          )}

          <div>
            <label>일정내용</label>
            <div className="detail-content">{content || '내용 없음'}</div>
          </div>
          
          <div className="button-container">
            <button onClick={onEdit} className="edit-button">수정</button>
            <button onClick={onDelete} className="delete-button">삭제</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarDetailModal;
