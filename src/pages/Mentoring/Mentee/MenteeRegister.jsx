import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { useLocation } from 'react-router-dom';
import MenteeRegisterCard from './MenteeRegisterCard';
import Todo from '../../../components/common/Todo';
import { getMentoringReservations } from '../../../api/mentoring';

const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELED: 'CANCELED',
  REJECTED: 'REJECTED',
};

const MenteeRegister = () => {
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const memberId = localStorage.getItem('memberId');

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
        console.log('📦 전체 응답 데이터:', response.data); // 👈 여기 확인 필수
  
        const filtered = response.data.filter(
          (res) => res.status !== 'CANCELLED' && res.status !== 'REJECTED'
        );
  
        const formatted = filtered.map((res) => {
          console.log('🔍 단건 reservation 데이터:', res); // 👈 여기서 res.subject 있는지 확인
          return {
            ...res,
            date: formatDate(res.date),
          };
        });
  
        setReservations(formatted);
      } catch (error) {
        console.error('❌ 예약 조회 실패:', error);
      }
    };

    if (memberId) fetchReservations();
  }, [memberId]);

  const handleCancelReservation = (reservationId) => {
    const updated = reservations.filter((res) => res.reservationId !== reservationId);
    setReservations(updated);
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
