// import React, { useState } from 'react';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import Todo from '../../components/common/Todo';

// const MentorAlarm = () => {
//   const [alerts, setAlerts] = useState([
//     '멘토링 신청 메시지',
//     '취소 메시지 (+ 예약 취소 사유)',
//     '배틀 랭킹 발표 알림',
//   ]);

//   const handleClose = (index) => {
//     setAlerts((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div>
//       <Header />
//       <div style={{ display: 'flex' }}>
//         <div style={{ flex: 1 }}>
//           <div className="container-flex" style={{ display: 'flex' }}>
//             <Sidebar menuType="alarm" />
//             <main className="main">
//               <h1
//               className="h3 fw-bold"
//               style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', color: '#84cc16' }}
//               >
//               Alarm
//               </h1>

//               {/* Alerts Section */}
//               <section className="alerts-section">
//                 <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
//                   {alerts.length === 0 ? (
//                     <p style={{ border: '2px dashed #999', padding: '16px', textAlign: 'center' }}>
//                       메시지가 없습니다.
//                     </p>
//                   ) : (
//                     alerts.map((message, idx) => (
//                       <div
//                         key={idx}
//                         style={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           alignItems: 'center',
//                           border: '1px solid #999',
//                           padding: '24px 16px',
//                           marginBottom: '15px',
//                           borderRadius: '12px',
//                           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                         }}
//                       >
//                         <span>{message}</span>
//                         <button
//                           style={{
//                             background: '#84cc16',
//                             color: '#fff',
//                             border: 'none',
//                             borderRadius: 24,
//                             padding: '10px 32px',
//                             fontWeight: 600,
//                             fontSize: 16,
//                             cursor: 'pointer',
//                           }}
//                           onClick={() => handleClose(idx)}
//                         >
//                           닫기
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </section>
//             </main>
//           </div>
//         </div>
//         {/* 오른쪽: Todo 사이드바 */}
//         <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
//           <Todo />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorAlarm;

// import React, { useState } from 'react';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import Todo from '../../components/common/Todo';

// const MentorAlarm = () => {
//   const [alerts, setAlerts] = useState([
//     {
//       type: 'mentoring_request',
//       memberName: '박신형',
//       date: '6월 17일(목)',
//       introduction: '멘티 자기소개: 열심히 배우고 성장하고 싶은 사람입니다.',
//       topic: '멘토링 대화주제: 커리어 전환 관련 조언',
//     },
//     {
//       type: 'mentoring_cancel',
//       mentorName: '김철수',
//       memberName: '박신형',
//       date: '6월 17일(목)',
//       cancelReason: '일정 변경',
//     },
//   ]);

//   const handleClose = (index) => {
//     setAlerts((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div>
//       <Header />
//       <div style={{ display: 'flex' }}>
//         <div style={{ flex: 1 }}>
//           <div className="container-flex" style={{ display: 'flex' }}>
//             <Sidebar menuType="alarm" />
//             <main className="main">
//               <h1
//                 className="h3 fw-bold"
//                 style={{
//                   marginTop: '30px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   color: '#84cc16',
//                 }}
//               >
//                 Alarm
//               </h1>

//               <section className="alerts-section">
//                 <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
//                   {alerts.length === 0 ? (
//                     <p style={{ border: '2px dashed #999', padding: '16px', textAlign: 'center' }}>
//                       메시지가 없습니다.
//                     </p>
//                   ) : (
//                     alerts.map((alert, idx) => {
//                       let content;

//                       switch (alert.type) {
//                         case 'mentoring_request':
//                           content = (
//                             <>
//                               <p>
//                                 <strong>{alert.menteeName}</strong>님께서{' '}
//                                 {alert.date} 멘토링을 신청하셨습니다.
//                               </p>
//                               <p>{alert.introduction}</p>
//                               <p>{alert.topic}</p>
//                               <p>
//                                 <p>수락하시겠습니까?</p>
//                               </p>
//                             </>
//                           );
//                           break;
//                         case 'mentoring_cancel':
//                           content = (
//                             <>
//                               <p>
//                                 <strong>{alert.date}</strong>{' '}
//                                 <strong>{alert.menteeName}</strong> 멘티와의 멘토링이
//                                 취소되었습니다.
//                               </p>
//                               <p>취소 사유: {alert.reason}</p>
//                             </>
//                           );
//                           break;
//                         case 'ranking':
//                           content = <p>{alert.content}</p>;
//                           break;
//                         default:
//                           content = <p>알 수 없는 알림 유형입니다.</p>;
//                       }

//                       return (
//                         <div
//                           key={idx}
//                           style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             border: '1px solid #999',
//                             padding: '24px 16px',
//                             marginBottom: '15px',
//                             borderRadius: '12px',
//                             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                           }}
//                         >
//                           <div style={{ flex: 1 }}>{content}</div>
//                           <button
//                             style={{
//                               background: '#84cc16',
//                               color: '#fff',
//                               border: 'none',
//                               borderRadius: 24,
//                               padding: '10px 32px',
//                               fontWeight: 600,
//                               fontSize: 16,
//                               cursor: 'pointer',
//                               marginLeft: '16px',
//                             }}
//                             onClick={() => handleClose(idx)}
//                           >
//                             닫기
//                           </button>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </section>
//             </main>
//           </div>
//         </div>
//         <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
//           <Todo />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorAlarm;

import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';

const MentorAlarm = () => {
  const [alerts, setAlerts] = useState([
    {
      type: 'mentoring_request',
      memberName: '박신형',
      date: '6월 17일(목)',
      introduction: '멘티 자기소개: 열심히 배우고 성장하고 싶은 사람입니다.',
      topic: '멘토링 대화주제: 커리어 전환 관련 조언',
    },
    {
      type: 'mentoring_cancel',
      mentorName: '김철수',
      memberName: '박신형',
      date: '6월 17일(목)',
      cancelReason: '일정 변경',
    },
  ]);

  const handleClose = (index) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div className="container-flex" style={{ display: 'flex' }}>
            <Sidebar menuType="alarm" />
            <main className="main">
              <h1
                className="h3 fw-bold"
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#84cc16',
                }}
              >
                Alarm
              </h1>

              <section className="alerts-section">
                <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
                  {alerts.length === 0 ? (
                    <p style={{ border: '2px dashed #999', padding: '16px', textAlign: 'center' }}>
                      메시지가 없습니다.
                    </p>
                  ) : (
                    alerts.map((alert, idx) => {
                      let content;
                      let buttons;

                      switch (alert.type) {
                        case 'mentoring_request':
                          content = (
                            <>
                              <p>
                                {alert.memberName}님께서 {alert.date} 멘토링을 신청하셨습니다.
                              </p>
                              <p>{alert.introduction}</p>
                              <p>{alert.topic}</p>
                              <p>수락하시겠습니까?</p>
                            </>
                          );
                          buttons = (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '16px' }}>
                              <button
                                style={buttonStyle}
                                onClick={() => {
                                  // TODO: 수락 처리
                                  handleClose(idx);
                                }}
                              >
                                수락
                              </button>
                              <button
                                style={{...buttonStyle, background: '#ced4da'}}
                                onClick={() => {
                                  // TODO: 거절 처리
                                  handleClose(idx);
                                }}
                              >
                                거절
                              </button>
                            </div>
                          );
                          break;

                        case 'mentoring_cancel':
                          content = (
                            <>
                              <p>
                                {alert.date}{' '}
                                {alert.memberName} 멘티와의 멘토링이 취소되었습니다.
                              </p>
                              <p>취소 사유: {alert.cancelReason}</p>
                            </>
                          );
                          buttons = (
                            <button style={buttonStyle} onClick={() => handleClose(idx)}>
                              닫기
                            </button>
                          );
                          break;

                        case 'ranking':
                          content = <p>{alert.content}</p>;
                          buttons = (
                            <button style={buttonStyle} onClick={() => handleClose(idx)}>
                              닫기
                            </button>
                          );
                          break;

                        default:
                          content = <p>알 수 없는 알림 유형입니다.</p>;
                          buttons = (
                            <button style={buttonStyle} onClick={() => handleClose(idx)}>
                              닫기
                            </button>
                          );
                      }

                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid #999',
                            padding: '24px 16px',
                            marginBottom: '15px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <div style={{ flex: 1 }}>{content}</div>
                          {buttons}
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            </main>
          </div>
        </div>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

// 공통 버튼 스타일
const buttonStyle = {
  background: '#84cc16',
  color: '#fff',
  border: 'none',
  borderRadius: 24,
  padding: '10px 32px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
};

export default MentorAlarm;
