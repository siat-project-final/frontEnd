import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import Footer from '../../../components/common/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import MenteeRegisterCard from './MenteeRegisterCard';
import Todo from '../../../components/common/Todo';

// 날짜 포맷 함수 (요일 포함)
const formatDateWithDay = (dateString) => {
  const date = new Date(dateString);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = days[date.getDay()];

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day} (${dayName})`;
};

const MenteeRegister = () => {
  const location = useLocation();
  const { mentor, selectedDate, intro, topics } = location.state || {};
  const [reservations, setReservations] = useState([]);

  // 로컬 스토리지에서 예약 정보 불러오기
  useEffect(() => {
    const savedReservations = localStorage.getItem('mentoringReservations');
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }
  }, []);

  // 새로운 예약이 있을 경우 추가
  useEffect(() => {
    if (mentor && selectedDate) {
      const newReservation = {
        id: Date.now(),
        date: formatDateWithDay(selectedDate), // ✅ 날짜 포맷 적용
        name: mentor.name,
        status: '예약 대기',
        mentorImg: mentor.mentor_image_url,
        intro,
        topics,
      };

      const updatedReservations = [...reservations, newReservation];
      setReservations(updatedReservations);
      localStorage.setItem('mentoringReservations', JSON.stringify(updatedReservations));
    }
  }, [mentor, selectedDate]);

  const handleCancelReservation = (id) => {
    const updatedReservations = reservations.filter((res) => res.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('mentoringReservations', JSON.stringify(updatedReservations));
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
                  key={res.id}
                  {...res}
                  onCancel={() => handleCancelReservation(res.id)}
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
