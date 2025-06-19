import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import Footer from '../../../components/common/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import MenteeRegisterCard from './MenteeRegisterCard';
import Todo from '../../../components/common/Todo';

// 멘토링 내역 확인 페이지

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
        date: `${selectedDate}일`,
        name: mentor.name,
        status: '예약 대기',
        mentorImg: mentor.img,
        intro,
        topics,
      };

      // 기존 예약 목록에 새로운 예약 추가
      const updatedReservations = [...reservations, newReservation];
      setReservations(updatedReservations);

      // 로컬 스토리지 업데이트
      localStorage.setItem('mentoringReservations', JSON.stringify(updatedReservations));
    }
  }, [mentor, selectedDate]);

  // 예약 취소 처리
  const handleCancelReservation = (id) => {
    const updatedReservations = reservations.filter((res) => res.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('mentoringReservations', JSON.stringify(updatedReservations));
  };

  // 예약 목록이 비어있을 때 표시할 메시지
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
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="main">
          <div className="max-w-2xl mx-auto pt-10 pb-16">
            <h4 className="text-lg font-bold mb-8 text-slate-900" style={{ textAlign: 'center' }}>
              예약된 멘토링
            </h4>
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
        {/* 오른쪽: Todo 사이드바 */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
            <Todo />
          </div>
      </div>
    </div>
  );
};

export default MenteeRegister;