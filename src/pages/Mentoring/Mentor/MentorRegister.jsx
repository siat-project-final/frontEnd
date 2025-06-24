import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import Footer from '../../../components/common/Footer';
import MentorRegisterCard from './MentorRegisterCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMentorReservations } from '../../../api/mentoring';

const MentorRegister = () => {
  const [reservations, setReservations] = useState([]);
  const memberId = localStorage.getItem('memberId');
  const location = useLocation();
  const navigate = useNavigate();

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
    if (!memberId) return;

    const fetchReservations = async () => {
      try {
        const response = await getMentorReservations(memberId);
        const formatted = response.data.map((res) => ({
          ...res,
          date: formatDate(res.date),
        }));
        setReservations(formatted);
      } catch (error) {
        console.error('❌ 멘토 예약 조회 실패:', error);
      }
    };

    fetchReservations();
  }, [memberId]);

  const handleCancel = (reservationId) => {
    const updated = reservations.filter((res) => res.reservationId !== reservationId);
    setReservations(updated);
  };

  return (
    <>
      <Header menuType="mentoring" />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="main">
          <div className="max-w-2xl mx-auto pt-10 pb-16">
            <h3 className="text-2xl font-bold mb-8 text-slate-900" style={{ textAlign: 'center' }}>
              멘토링 예약 관리
            </h3>
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' }}></div>
            <div>
              {reservations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
                  예약 요청이 없습니다.
                </div>
              ) : (
                reservations.map((res) => (
                  <MentorRegisterCard
                    key={res.reservationId}
                    id={res.reservationId}
                    date={res.date}
                    memberName={res.memberName}
                    status={res.status}
                    mentorImg={res.mentorImageUrl}
                    onCancel={handleCancel}
                  />
                ))
              )}
            </div>
          </div>
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          {/* Todo 혹은 다른 사이드 컴포넌트 있으면 여기에 */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorRegister;
