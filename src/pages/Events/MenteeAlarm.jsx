// import React, { useState } from 'react';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';

// const MenteeAlarm = () => {
//   const [alerts, setAlerts] = useState([
//     `<b>[멘토링 확정]</b>\n박신형님, 6월 17일(목) 김철수 멘토님과의 멘토링이 확정되었습니다.\n멘토링 페이지에서 링크를 확인하세요.`,

//     '<b>[멘토링 거절]</b>\n박신형님, 6월 17일(목) 김철수 멘토님과의 멘토링이 거절되었습니다.\n거절 사유: 일정 변경/개인 사정/건강상/일정 중복/준비 부족\n다른 멘토님과의 멘토링을 원하시면 멘토링 페이지에서 다시 신청해주세요.',

//     '<b>[멘토링 취소]</b>\n박신형님, 6월 17일(목) 김철수 멘토님과의 멘토링이 취소되었습니다.\n취소 사유: 일정 변경/개인 사정/건강상/일정 중복/준비 부족\n다른 멘토님과의 멘토링을 원하시면 멘토링 페이지에서 다시 신청해주세요.',

//     '<b>[챌린지 랭킹 발표]</b>\n6월 17일(목) 배틀 랭킹이 발표되었습니다.\n챌린지 페이지에서 확인하세요.',
//   ]);

//   const handleClose = (index) => {
//     setAlerts((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <>
//       <Header />
//       <div className="container-flex">
//         <Sidebar menuType="alarm" />
//         <main className="main">
//           {/* Page Title */}
//           <div className="page-title" data-aos="fade">
//             <div className="heading">
//               <div className="container">
//                 <div className="row d-flex justify-content-center text-center">
//                   <div className="col-lg-8">
//                     <h1>알림 내역</h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <nav className="breadcrumbs">
//               <div className="container">
//                 <ol>
//                   <li>
//                     <a href="/">Home</a>
//                   </li>
//                   <li className="current">Events</li>
//                 </ol>
//               </div>
//             </nav>
//           </div>

//           {/* Alerts Section */}
//           <section className="alerts-section">
//             <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
//               {alerts.length === 0 ? (
//                 <p style={{ border: '2px dashed #999', padding: '16px', textAlign: 'center' }}>
//                   메시지가 없습니다.
//                 </p>
//               ) : (
//                 alerts.map((message, idx) => (
//                   <div
//                     key={idx}
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       border: '1px solid #999',
//                       padding: '24px 16px',
//                       marginBottom: '15px',
//                       borderRadius: '12px',
//                       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                     }}
//                   >
//                     <div
//                       style={{ flex: 1, marginRight: 16, wordBreak: 'keep-all' }}
//                       dangerouslySetInnerHTML={{
//                         __html: message.replace(/\n/g, '<br/>'),
//                       }}
//                     />
//                     <button
//                       style={{
//                         background: '#5fcf80',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: 24,
//                         padding: '10px 32px',
//                         fontWeight: 600,
//                         fontSize: 16,
//                         cursor: 'pointer',
//                       }}
//                       onClick={() => handleClose(idx)}
//                     >
//                       닫기
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// export default MenteeAlarm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

const MenteeAlarm = () => {
  const [alerts, setAlerts] = useState([]);

  const username = 'admin'; // 추후 로그인 사용자로 교체 필요

  // 알림 불러오기 (GET)
  useEffect(() => {
    axios
      .get(`/api/notifications?username=${username}`)
      .then((res) => {
        // 서버에서 [{ notificationId, title, contents }, ...] 형식으로 응답한다고 가정
        setAlerts(res.data);
      })
      .catch((err) => {
        console.error('알림 불러오기 실패:', err);
      });
  }, []);

  // 알림 삭제 요청 (DELETE)
  const handleDelete = (notificationId) => {
    axios
      .delete(`/api/notifications/${notificationId}`)
      .then(() => {
        setAlerts((prev) => prev.filter((alert) => alert.notificationId !== notificationId));
      })
      .catch((err) => {
        console.error('알림 삭제 실패:', err);
      });
  };

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="alarm" />
        <main className="main">
          {/* 페이지 타이틀 */}
          <div className="page-title" data-aos="fade">
            <div className="heading">
              <div className="container">
                <div className="row d-flex justify-content-center text-center">
                  <div className="col-lg-8">
                    <h1>알림 내역</h1>
                  </div>
                </div>
              </div>
            </div>
            <nav className="breadcrumbs">
              <div className="container">
                <ol>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li className="current">Events</li>
                </ol>
              </div>
            </nav>
          </div>

          {/* 알림 리스트 */}
          <section className="alerts-section">
            <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
              {alerts.length === 0 ? (
                <p style={{ border: '2px dashed #999', padding: '16px', textAlign: 'center' }}>
                  메시지가 없습니다.
                </p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.notificationId}
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
                    <div
                      style={{ flex: 1, marginRight: 16, wordBreak: 'keep-all' }}
                      dangerouslySetInnerHTML={{
                        __html: `<b>${alert.title}</b><br/>${alert.contents.replace(
                          /\n/g,
                          '<br/>'
                        )}`,
                      }}
                    />
                    <button
                      style={{
                        background: '#5fcf80',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 24,
                        padding: '10px 32px',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDelete(alert.notificationId)}
                    >
                      닫기
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default MenteeAlarm;
