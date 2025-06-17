// import React from 'react';

// const CalendarModal = ({ isOpen, onClose, selectedDate }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="calendar-modal-overlay">
//       <style>
//         {`
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
//           background-color: #ffffff;
//           width: 280px;
//           border-radius: 12px;
//           padding: 32px 24px;
//           box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
//           position: relative;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }
//         .modal-header {
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         position: relative;
//         margin-bottom: 20px;
//         }

//         .menu-icon-button,
//         .close-button {
//         background: transparent;
//         border: none;
//         cursor: pointer;
//         }

//         .menu-buttons {
//           display: flex;
//           flex-direction: column;
//           width: 100%;
//           margin-top: 20px;
//           gap: 12px;
//         }

//         .menu-button {
//           background: #F0FFF5;              /* ✅ 연한 민트 배경 */
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           padding: 12px 0;
//           font-size: 16px;
//           font-weight: 500;
//           color: #7ED321;                  /* ✅ 연두 텍스트 */
//           cursor: pointer;
//           text-align: center;
//           transition: background-color 0.2s ease;
//         }

//         .menu-button:hover {
//           background-color: #e3fbe9;       /* 연한 민트보다 살짝 진한 톤 */
//         }
//       `}
//       </style>

//       <div className="calendar-modal">
//         {/* <button className="close-button" onClick={onClose}>
//           <img
//             src="/assets/img/mentors/x.png"
//             alt="닫기"
//             style={{ width: '20px', height: '20px' }}
//           />
//         </button> */}

//         <div className="modal-header">
//           <button className="menu-icon-button">
//             <img
//               src="/assets/img/mentors/align-justify.png"
//               alt="메뉴"
//               style={{ width: '20px', height: '20px' }}
//             />
//           </button>
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

import React, { useRef, useEffect } from 'react';

const CalendarModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

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
        }

        .modal-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
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
        <div className="modal-header">
          <button className="menu-icon-button" onMouseDown={handleMouseDown}>
            <img
              src="/assets/img/mentors/align-justify.png"
              alt="메뉴"
              style={{ width: '20px', height: '20px' }}
              draggable="false"
            />
          </button>
          <button className="close-button" onClick={onClose}>
            <img
              src="/assets/img/mentors/x.png"
              alt="닫기"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>

        <div className="menu-buttons">
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
