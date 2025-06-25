import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';

const MenteeAlarm = () => {
  const [alerts, setAlerts] = useState([]);
  const username = 'admin'; // TODO: 로그인 사용자 정보로 교체 필요
  const memberName = '박신형';
  const date = '6월 17일(목)';
  const mentorName = '김철수';
  const memberID = 1;

  useEffect(() => {

  const mockAlerts = [
    {
      notificationId: 1,
      title: '멘토링 확정',
      contents: '박신형님, 6월 17일(목) 김철수 멘토님과의 멘토링이 확정되었습니다.\n멘토링 페이지에서 링크를 확인하세요.',
    },
    {
      notificationId: 2,
      title: '멘토링 거절',
      contents: '박신형님, 6월 17일(목) 김철수 멘토님과의 멘토링이 거절되었습니다.\n거절 사유: 개인 사정\n다른 멘토와의 멘토링을 원하시면 멘토링 페이지에서 다시 신청해주세요.',
    },
    {
      notificationId: 3,
      title: '멘토링 취소',
      contents: `${memberName}님 ${date} ${mentorName} 멘토님과의 멘토링이 취소되었습니다 `,
      cancelReason: '일정 변경 \n다른 멘토와의 멘토링을 원하시면 멘토링 페이지에서 다시 신청해주세요.',
      type: 'CANCELLED'
    },
    {
      notificationId: 4,
      title: '챌린지 랭킹 발표',
      contents: '6월 17일(목) 배틀 랭킹이 발표되었습니다.\n챌린지 페이지에서 확인하세요.',
    },

  ];
  setAlerts(mockAlerts);


  }, []);

  const handleDelete = (notificationId) => {
    axios
      .delete(`/api/notifications/${notificationId}`)
      .then(() => {
        setAlerts((prev) =>
          prev.filter((alert) => alert.notificationId !== notificationId)
        );
      })
      .catch((err) => {
        console.error('알림 삭제 실패:', err);
      });
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
              style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', color: '#84cc16' }}
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
                    // alerts.map((alert) => (
                    //   <div
                    //     key={alert.notificationId}
                    //     style={{
                    //       display: 'flex',
                    //       justifyContent: 'space-between',
                    //       alignItems: 'center',
                    //       border: '1px solid #999',
                    //       padding: '24px 16px',
                    //       marginBottom: '15px',
                    //       borderRadius: '12px',
                    //       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    //     }}
                    //   >
                    //     <div style={{ flex: 1, marginRight: 16 }}>
                    //       <b>{alert.title}</b>
                    //       <p style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{alert.contents}</p>
                    //     </div>
                    //     <button
                    //       style={{
                    //         background: '#84cc16',
                    //         color: '#fff',
                    //         border: 'none',
                    //         borderRadius: 24,
                    //         padding: '10px 32px',
                    //         fontWeight: 600,
                    //         fontSize: 16,
                    //         cursor: 'pointer',
                    //       }}
                    //       onClick={() => handleDelete(alert.notificationId)}
                    //     >
                    //       닫기
                    //     </button>
                    //   </div>
                    // ))
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
                        <div style={{ flex: 1, marginRight: 16 }}>
                          <b>{alert.title}</b>
                          <p style={{ marginTop: 8, whiteSpace: 'pre-line' }}>
                            {alert.contents}
                            {alert.type === 'CANCELLED' && alert.cancelReason
                              ? `\n취소 사유: ${alert.cancelReason}`
                              : ''}
                          </p>
                        </div>
                        <button
                          style={{
                            background: '#84cc16',
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
        </div>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MenteeAlarm;
