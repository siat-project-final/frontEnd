import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import MenteeRegisterCard from './MenteeRegisterCard';
import Todo from '../../../components/common/Todo';
import { getMentoringReservations } from '../../../api/mentoring';

const MenteeRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const memberId = localStorage.getItem('memberId');

  
  // ✅ 추가: 링크를 location.state 로부터 받기
  const links = location.state?.links || [];

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hour = String(dateObj.getHours()).padStart(2, '0');
    const minute = String(dateObj.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getMentoringReservations(memberId);

        const formatted = response.data.map((res) => ({
          ...res,
          date: formatDate(res.date),
        }));

        setReservations(formatted);
      } catch (error) {
        console.error('❌ 예약 조회 실패:', error);
      }
    };

    if (memberId) fetchReservations();
  }, [memberId]);

  // "닫기" 후 목록에서 제거
  useEffect(() => {
    if (location.state?.cancelledReservationId && !location.state?.alreadyRemoved) {
      setReservations((prev) =>
        prev.filter((res) => res.reservationId !== location.state.cancelledReservationId)
      );

      navigate(location.pathname, {
        replace: true,
        state: {
          ...location.state,
          alreadyRemoved: true,
        },
      });
    }
  }, [location.state, navigate, location.pathname]);

  const handleCancelReservation = (reservationId) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.reservationId === reservationId
          ? { ...res, status: 'CANCELLED' }
          : res
      )
    );
  };

  const renderEmptyMessage = () => {
    if (reservations.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
          예약된 멘토링이 없습니다.
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Header menuType="mentoring" />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="main">
          <div className="max-w-2xl mx-auto pt-10 pb-16">
            <h3 className="text-2xl font-bold mb-8 text-slate-900" style={{ textAlign: 'center' }}>
              예약된 멘토링
            </h3>
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' }}></div>
            <div>
              {renderEmptyMessage()}
              {reservations.map((res) => (
                <MenteeRegisterCard
                  key={res.reservationId}
                  {...res}
                  onCancel={() => handleCancelReservation(res.reservationId)}
                />
              ))}
            </div>
            {/* ✅ 추가: 알림에서 넘어온 링크 출력 */}
            <div style={{ marginTop: '40px' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '18px' }}>알림에서 전달된 링크 목록</h4>
              {links.length === 0 ? (
                <p>링크가 없습니다.</p>
              ) : (
                <ul style={{ paddingLeft: '20px' }}>
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MenteeRegister;
