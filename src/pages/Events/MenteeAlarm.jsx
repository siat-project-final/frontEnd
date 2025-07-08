import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import { deleteNotification, getNotificationsMentee, getNotificationsMentor } from '../../api/notification';
import { useNavigate } from 'react-router-dom';  // ✅ 추가


const MenteeAlarm = () => {
  const [alerts, setAlerts] = useState([]);
  const [links, setLinks] = useState([]); // ✅ 추가: 링크 리스트 상태
  const navigate = useNavigate();          // ✅ 추가
   
  const memberId = localStorage.getItem('memberId');

  const fetchAlerts = () => {
    getNotificationsMentor(memberId)
      .then((res) => {
        setAlerts(res.data);

        // ✅ 여기 추가 : 알람 데이터에서 reservationId-link 저장
        res.data.forEach(alert => {
          if (alert.reservationId && alert.link) {
            localStorage.setItem(`reservationLink_${alert.reservationId}`, alert.link);
          }
        });
      })
      .catch((err) => {
        console.error('멘토알림 조회 실패:', err);
      });
  };

  
  useEffect(() => {
    fetchAlerts();
  }, []);

   // ✅ 링크 추출 함수
  const extractLinks = (text) => {
    const regex = /(https?:\/\/[^\s]+)/g;
    return text.match(regex) || [];
  };

  // ✅ 알림이 로딩될 때 링크 추출
  useEffect(() => {
    if (alerts.length > 0) {
      const allLinks = alerts.flatMap(alert => extractLinks(alert.contents));
      setLinks(allLinks);
    }
  }, [alerts]);

  const handleDelete = (notificationId) => {
    deleteNotification(notificationId)
      .then(() => {
        setAlerts((prev) =>
          prev.filter((alert) => alert.notificationId !== notificationId)
        );
        fetchAlerts();
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
                          whiteSpace: 'pre-line',
                        }}
                      >
                        <div style={{ flex: 1, marginRight: 16 }}>
                          <b>{alert.title}</b>
                          <p style={{ marginTop: 8, whiteSpace: 'pre-line' }}>
                            {alert.contents}
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
                  <button
                    style={{
                      marginTop: '20px',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '1px solid #84cc16',
                      color: '#84cc16',
                      background: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                    onClick={() => navigate('/mentoring/register', { state: { links } })}
                  >
                    예약 페이지로 링크 보내기
                  </button>
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
