// import React, { useState, useEffect } from 'react';

// const CalendarModal = ({ isOpen, onClose, selectionInfo, onSubmitEvent }) => {
//   const [useAllDay, setUseAllDay] = useState(true);
//   const [startTime, setStartTime] = useState("08:00");
//   const [endTime, setEndTime] = useState("18:00");
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [titleError, setTitleError] = useState('');

//   useEffect(() => {
//     if (useAllDay) {
//       setStartTime("00:00");
//       setEndTime("23:59");
//     } else {
//       setStartTime("08:00");
//       setEndTime("18:00");
//     }
//   }, [useAllDay]);

//   useEffect(() => {
//     if (isOpen && selectionInfo) {
//       setStartDate(selectionInfo.start);
//       setEndDate(selectionInfo.end);
//       setTitleError('');
//     }
//   }, [isOpen, selectionInfo]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const title = e.target.title.value;
//     const content = e.target.content.value;
//     if (!title) {
//       setTitleError('입력 필수');
//       return;
//     }
//     setTitleError('');

//     const eventTitle = useAllDay ? title : `${title} ${startTime}~${endTime}`;

//     const newEvent = {
//       title: eventTitle,
//       start: `${startDate}T${useAllDay ? '00:00' : startTime}`,
//       end: `${endDate}T${useAllDay ? '23:59' : endTime}`,
//       backgroundColor: '#AED6F1',
//       borderColor: '#AED6F1',
//       textColor: '#000',
//       allDay: useAllDay,
//       extendedProps: {
//         content,
//         type: 'USER_ADDED',
//       },
//     };

//     onSubmitEvent(newEvent);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <style>{`
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0,0,0,0.4);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 3000; 
//         }

//         .modal-content {
//           background: white;
//           padding: 20px;
//           border-radius: 8px;
//           width: 90%;
//           max-width: 500px;
//           position: relative;
//         }

//         .modal-content form {
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//         }

//         .modal-content label {
//           font-weight: bold;
//         }

//         .modal-content input,
//         .modal-content textarea {
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 14px;
//         }

//         .modal-content input:focus,
//         .modal-content textarea:focus {
//           outline: none;
//           border: 2px solid #84cc16;
//           box-shadow: 0 0 3px #84cc16;
//         }

//         .modal-content input[disabled] {
//           background-color: #e9ecef;
//           color: #555;
//         }

//         .modal-content textarea {
//           min-height: 100px;
//           resize: vertical;
//         }

//         .modal-content button[type="submit"] {
//           background: #84cc16;
//           width: 35%;
//           margin: 0 auto;
//           color: white;
//           padding: 10px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 16px;
//         }

//         .modal-content button[type="submit"]:hover {
//           background: #84cc16;
//         }

//         .close-button {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           background: none;
//           border: none;
//           font-size: 20px;
//           cursor: pointer;
//           color: #666;
//         }

//         .close-button:hover {
//           color: #333;
//         }
//       `}</style>

//       <div className="modal-overlay">
//         <div className="modal-content">
//           <form onSubmit={handleSubmit}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//               <label>일정명 *</label>
//               {titleError && <span style={{ color: 'red', fontSize: '12px' }}>{titleError}</span>}
//             </div>
//             <input type="text" name="title" placeholder="일정명을 입력하세요" />

//             <label>시작일자</label>
//             <input type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
//             <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} disabled={useAllDay} />

//             <label>종료일자</label>
//             <input type="date" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
//             <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={useAllDay} />

//             <label>일정내용</label>
//             <textarea name="content" placeholder="일정 내용을 입력하세요" />

//             <div>
//               <input
//                 type="checkbox"
//                 id="allDay"
//                 checked={useAllDay}
//                 onChange={() => setUseAllDay(!useAllDay)}
//                 style={{ marginRight: '5px' }}
//               />
//               <label htmlFor="allDay">하루 종일</label>
//             </div>

//             <button type="submit">일정등록</button>
//           </form>

//           <button onClick={onClose} className="close-button">
//             <img src="/assets/img/mentors/x.png" alt="닫기" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CalendarModal;

import React, { useState, useEffect } from 'react';

const CalendarModal = ({ isOpen, onClose, selectionInfo, onSubmitEvent }) => {
  const [useAllDay, setUseAllDay] = useState(true);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (useAllDay) {
      setStartTime("00:00");
      setEndTime("23:59");
    } else {
      setStartTime("08:00");
      setEndTime("18:00");
    }
  }, [useAllDay]);

  useEffect(() => {
    if (isOpen && selectionInfo) {
      setStartDate(selectionInfo.start);
      setEndDate(selectionInfo.end);
      setTitleError('');
    }
  }, [isOpen, selectionInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    if (!title) {
      setTitleError('입력 필수');
      return;
    }
    setTitleError('');

    const eventTitle = useAllDay ? title : `${title} ${startTime}~${endTime}`;

    // ✅ 종료일 하루 뒤로 보정
    const adjustedEndDate = new Date(endDate);
    if (useAllDay) {
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
    }
    const adjustedEndStr = adjustedEndDate.toISOString().split('T')[0];

    const newEvent = {
      title: eventTitle,
      start: `${startDate}T${useAllDay ? '00:00' : startTime}`,
      end: `${adjustedEndStr}T${useAllDay ? '00:00' : endTime}`,
      backgroundColor: '#AED6F1',
      borderColor: '#AED6F1',
      textColor: '#000',
      allDay: useAllDay,
      extendedProps: {
        content,
        type: 'USER_ADDED',
      },
    };

    onSubmitEvent(newEvent);
    onClose();
  };

  if (!isOpen) return null;

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
        }

        .modal-content form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .modal-content label {
          font-weight: bold;
        }

        .modal-content input,
        .modal-content textarea {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .modal-content input:focus,
        .modal-content textarea:focus {
          outline: none;
          border: 2px solid #84cc16;
          box-shadow: 0 0 3px #84cc16;
        }

        .modal-content input[disabled] {
          background-color: #e9ecef;
          color: #555;
        }

        .modal-content textarea {
          min-height: 100px;
          resize: vertical;
        }

        .modal-content button[type="submit"] {
          background: #84cc16;
          width: 35%;
          margin: 0 auto;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .modal-content button[type="submit"]:hover {
          background: #84cc16;
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
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <label>일정명 *</label>
              {titleError && <span style={{ color: 'red', fontSize: '12px' }}>{titleError}</span>}
            </div>
            <input type="text" name="title" placeholder="일정명을 입력하세요" />

            <label>시작일자</label>
            <input type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} disabled={useAllDay} />

            <label>종료일자</label>
            <input type="date" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={useAllDay} />

            <label>일정내용</label>
            <textarea name="content" placeholder="일정 내용을 입력하세요" />

            <div>
              <input
                type="checkbox"
                id="allDay"
                checked={useAllDay}
                onChange={() => setUseAllDay(!useAllDay)}
                style={{ marginRight: '5px' }}
              />
              <label htmlFor="allDay">하루 종일</label>
            </div>

            <button type="submit">일정등록</button>
          </form>

          <button onClick={onClose} className="close-button">
            <img src="/assets/img/mentors/x.png" alt="닫기" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarModal;
