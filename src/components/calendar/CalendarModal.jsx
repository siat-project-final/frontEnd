// import React, { useRef, useEffect } from 'react';

// const CalendarModal = ({ isOpen, onClose, selectedDate }) => {
//   const modalRef = useRef(null);
//   const isDragging = useRef(false);
//   const offset = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!isDragging.current) return;

//       const x = e.clientX - offset.current.x;
//       const y = e.clientY - offset.current.y;

//       modalRef.current.style.left = `${x}px`;
//       modalRef.current.style.top = `${y}px`;
//     };

//     const handleMouseUp = () => {
//       isDragging.current = false;
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, []);

//   const handleMouseDown = (e) => {
//     const rect = modalRef.current.getBoundingClientRect();
//     offset.current = {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     };
//     isDragging.current = true;
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="calendar-modal-overlay">
//       <style>{`
//         .calendar-modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100vw;
//           height: 100vh;
//           background-color: rgba(0, 0, 0, 0);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }

//         .calendar-modal {
//           position: absolute;
//           top: 25%;
//           left: 40%;
//           background-color: #ffffff;
//           width: 280px;
//           border-radius: 12px;
//           padding: 32px 24px;
//           box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
//         }

//         .modal-header {
//           width: 100%;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           position: relative;
//           margin-bottom: 20px;
//           cursor: move; /* 드래그 가능 UI 표시 */
//         }

//         .modal-date {
//           position: absolute;
//           left: 50%;
//           transform: translateX(-50%);
//           font-weight: 600;
//           font-size: 15px;
//         }

//         .menu-icon-button,
//         .close-button {
//           background: transparent;
//           border: none;
//           cursor: pointer;
//         }

//         .menu-buttons {
//           display: flex;
//           flex-direction: column;
//           width: 100%;
//           gap: 12px;
//         }

//         .menu-button {
//           background: #F0FFF5;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           padding: 12px 0;
//           font-size: 16px;
//           font-weight: 500;
//           color: #7ED321;
//           cursor: pointer;
//           text-align: center;
//           transition: background-color 0.2s ease;
//         }

//         .menu-button:hover {
//           background-color: #e3fbe9;
//         }
//       `}</style>

//       <div className="calendar-modal" ref={modalRef}>
//         {/* 헤더 전체에 드래그 이벤트 연결 */}
//         <div className="modal-header" onMouseDown={handleMouseDown}>
//           <button className="menu-icon-button">
//             <img
//               src="/assets/img/mentors/align-justify.png"
//               alt="메뉴"
//               style={{ width: '20px', height: '20px' }}
//               draggable="false"
//             />
//           </button>

//           <div className="modal-date">
//             {selectedDate &&
//               (() => {
//                 const date = new Date(selectedDate);
//                 const year = date.getFullYear();
//                 const month = String(date.getMonth() + 1).padStart(2, '0');
//                 const day = String(date.getDate()).padStart(2, '0');
//                 const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
//                 return `${year}.${month}.${day} (${weekDay})`;
//               })()}
//           </div>

//           <button className="close-button" onClick={onClose}>
//             <img
//               src="/assets/img/mentors/x.png"
//               alt="닫기"
//               style={{ width: '20px', height: '20px' }}
//             />
//           </button>
//         </div>

//         <div className="menu-buttons">
//           <button className="menu-button">
//             <b>커리큘럼</b>
//           </button>
//           <button className="menu-button">
//             <b>멘토링</b>
//           </button>
//           <button className="menu-button">
//             <b>학습일지</b>
//           </button>
//           <button className="menu-button">
//             <b>TODO</b>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarModal;

import React, { useRef, useEffect, useState } from 'react';

const CalendarModal = ({ isOpen, onClose, selectedDate }) => {
  const modalRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false); // ✅ 토글 상태

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const x = e.clientX - offset.current.x;
      const y = e.clientY - offset.current.y;

      modalRef.current.style.left = `${x}px`;
      modalRef.current.style.top = `${y}px`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    const rect = modalRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    isDragging.current = true;
  };

  if (!isOpen) return null;

  return (
    <div className="calendar-modal-overlay">
      <style>{`
        .calendar-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .calendar-modal {
          position: absolute;
          top: 25%;
          left: 40%;
          background-color: #ffffff;
          width: 280px;
          border-radius: 12px;
          padding: 32px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
          transition: height 0.3s ease;
        }

        .modal-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-bottom: 20px;
          cursor: move;
        }

        .modal-date {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
          font-size: 15px;
        }

        .menu-icon-button,
        .close-button {
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .menu-buttons {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 12px;
          transition: max-height 0.3s ease, opacity 0.3s ease;
          overflow: hidden;
        }

        .menu-buttons.collapsed {
          max-height: 0;
          opacity: 0;
          pointer-events: none;
        }

        .menu-button {
          background: #F0FFF5;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px 0;
          font-size: 16px;
          font-weight: 500;
          color: #7ED321;
          cursor: pointer;
          text-align: center;
          transition: background-color 0.2s ease;
        }

        .menu-button:hover {
          background-color: #e3fbe9;
        }
      `}</style>

      <div className="calendar-modal" ref={modalRef}>
        {/* ✅ 헤더: 드래그 + 토글 아이콘 */}
        <div className="modal-header" onMouseDown={handleMouseDown}>
          <button
            className="menu-icon-button"
            onClick={(e) => {
              e.stopPropagation(); // 드래그 방지
              setIsCollapsed((prev) => !prev);
            }}
          >
            <img
              src={
                isCollapsed
                  ? '/assets/img/mentors/list-collapse.png' // 접힌 상태 아이콘
                  : '/assets/img/mentors/align-justify.png' // 펼친 상태 아이콘
              }
              alt={isCollapsed ? '펼치기' : '접기'}
              style={{ width: '20px', height: '20px' }}
              draggable="false"
            />
          </button>

          <div className="modal-date">
            {selectedDate &&
              (() => {
                const date = new Date(selectedDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
                return `${year}.${month}.${day} (${weekDay})`;
              })()}
          </div>

          <button className="close-button" onClick={onClose}>
            <img
              src="/assets/img/mentors/x.png"
              alt="닫기"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>

        {/* 본문 영역: 토글에 따라 열림/닫힘 */}
        <div className={`menu-buttons ${isCollapsed ? 'collapsed' : ''}`}>
          <button className="menu-button">
            <b>커리큘럼</b>
          </button>
          <button className="menu-button">
            <b>멘토링</b>
          </button>
          <button className="menu-button">
            <b>학습일지</b>
          </button>
          <button className="menu-button">
            <b>TODO</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
