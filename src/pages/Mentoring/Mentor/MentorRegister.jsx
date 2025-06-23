import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import Footer from '../../../components/common/Footer';
import MentorRegisterCard from './MentorRegisterCard';
import { useLocation, useNavigate } from 'react-router-dom';

const MentorRegister = () => {
  const [reservations, setReservations] = useState([]);
  const memberId = sessionStorage.getItem('memberId');
  const location = useLocation();
  const navigate = useNavigate();

  // 예약 목록 조회 (현재는 더미 데이터)
  useEffect(() => {
    if (!memberId) return;

    const fetchReservations = async () => {
      try {
        const dummyData = [
          {
            id: 1,
            date: '6월 21일',
            memberName: '멘티 A',
            status: '예약 대기',
            mentorImg: '/assets/img/mentors/mentor1.jpg',
            intro: 'React 전문가',
            topics: ['React', 'JS'],
          },
          {
            id: 2,
            date: '6월 22일',
            memberName: '멘티 B',
            status: '예약 확정',
            mentorImg: '/assets/img/mentors/mentor2.jpg',
            intro: 'Java 마스터',
            topics: ['Java', 'Spring'],
          },
        ];
        setReservations(dummyData);
      } catch (err) {
        console.error('❌ 예약 조회 실패:', err);
      }
    };

    fetchReservations();
  }, [memberId]);

  // 예약 거절 시 상태 반영
  useEffect(() => {
    if (location.state?.rejectedReservationId) {
      const rejectedId = location.state.rejectedReservationId;
      setReservations((prev) => prev.filter((res) => res.id !== rejectedId));
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // 예약 취소 시 상태 반영
  useEffect(() => {
    if (location.state?.cancelledReservationId) {
      const cancelledId = location.state.cancelledReservationId;
      setReservations((prev) => prev.filter((res) => res.id !== cancelledId));
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);
  useEffect(() => {
    console.log('📌 location.state:', location.state);

    if (location.state?.cancelledReservationId) {
      const cancelledId = location.state.cancelledReservationId;
      console.log('🗑️ 취소된 ID:', cancelledId);
      setReservations((prev) => prev.filter((res) => res.id !== cancelledId));
      navigate(location.pathname, { replace: true });
    }

    if (location.state?.rejectedReservationId) {
      const rejectedId = location.state.rejectedReservationId;
      console.log('🗑️ 거절된 ID:', rejectedId);
      setReservations((prev) => prev.filter((res) => res.id !== rejectedId));
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // 상태 업데이트
  const updateStatus = (id, status) => {
    setReservations((prev) =>
        prev.map((res) => (res.id === id ? { ...res, status } : res))
    );
  };

  // 예약 제거
  const removeReservation = (id) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  // 예약 없음 메시지
  const renderEmptyMessage = () =>
      reservations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            예약된 멘토링이 없습니다.
          </div>
      );

  return (
      <>
        <Header menuType="mentoring" />
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
                    <MentorRegisterCard
                        key={res.id}
                        {...res}
                        onCancel={() => removeReservation(res.id)}
                        onAccept={() => updateStatus(res.id, '예약 확정')}
                        onReject={() => removeReservation(res.id)}
                        onComplete={() => updateStatus(res.id, '멘토링 완료')}
                    />
                ))}
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
  );
};

export default MentorRegister;