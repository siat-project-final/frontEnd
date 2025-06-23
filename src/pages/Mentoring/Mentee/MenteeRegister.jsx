import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { useLocation } from 'react-router-dom';
import MenteeRegisterCard from './MenteeRegisterCard';
import Todo from '../../../components/common/Todo';
import { getMentoringReservations } from '../../../api/mentoring';

const MenteeRegister = () => {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const memberId = localStorage.getItem('memberId');
  console.log('✅ 현재 로그인된 memberId:', memberId);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getMentoringReservations(memberId);
        console.log('✅ 서버 응답:', response.data); // 배열인지 확인
        setReservations(response.data);
      } catch (error) {
        console.error('❌ 예약 조회 실패:', error);
      }
    };

    if (memberId) fetchReservations();
  }, [memberId]);

  // 예약 취소 처리
  const handleCancelReservation = (reservationId) => {
    const updated = reservations.filter((res) => res.reservationId !== reservationId);
    setReservations(updated);
  };

  // 예약 없을 때 메시지 렌더링
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
