import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

const MentorAlarm = () => {
  const [alerts, setAlerts] = useState([
    '멘토링 신청 메시지',
    '취소 메시지 (+ 예약 취소 사유)',
    '배틀 랭킹 발표 알림',
    '메시지가 없습니다.',
  ]);

  const handleClose = (index) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar />
        <main className="main">
          {/* Page Title */}
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

          {/* Alerts Section */}
          <section className="alerts-section">
            <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
              {alerts.length === 0 ? (
                <p style={{ border: '2px dashed #999', padding: '16px', textAlign: 'center' }}>
                  메시지가 없습니다.
                </p>
              ) : (
                alerts.map((message, idx) => (
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
                    <span>{message}</span>
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
                      onClick={() => handleClose(idx)}
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

export default MentorAlarm;
