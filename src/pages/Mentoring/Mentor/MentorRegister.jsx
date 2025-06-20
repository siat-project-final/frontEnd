// import React, { useState, useEffect } from 'react';
// import Header from '../../../components/common/Header';
// import Sidebar from '../../../components/common/Sidebar';
// import Footer from '../../../components/common/Footer';
// import { useNavigate, useLocation } from 'react-router-dom';
// import MentorRegisterCard from './MentorRegisterCard';

// const MentorRegister = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { mentor, selectedDate, intro, topics } = location.state || {};
//   const [reservations, setReservations] = useState([]);

//   // ✅ 역할 확인 후 멘토 아니면 차단
//   useEffect(() => {
//     const role = sessionStorage.getItem('userRole');
//     if (role !== 'mentor') {
//       alert('멘토만 접근 가능한 페이지입니다.');
//       navigate('/');
//     }
//   }, [navigate]);

//   // ✅ 로컬 스토리지에서 예약 로딩 or 초기값 넣기
//   useEffect(() => {
//     const saved = localStorage.getItem('mentoringReservations');

//     if (!saved) {
//       const dummyData = [
//         {
//           id: 1,
//           date: '6월 21일',
//           name: '멘토 A',
//           status: '예약 대기',
//           mentorImg: '/assets/img/mentors/mentor1.jpg',
//           intro: 'React 전문가',
//           topics: ['React', 'JS'],
//         },
//         {
//           id: 2,
//           date: '6월 22일',
//           name: '멘토 B',
//           status: '예약 확정',
//           mentorImg: '/assets/img/mentors/mentor2.jpg',
//           intro: 'Java 마스터',
//           topics: ['Java', 'Spring'],
//         },
//       ];
//       localStorage.setItem('mentoringReservations', JSON.stringify(dummyData));
//       setReservations(dummyData);
//     } else {
//       setReservations(JSON.parse(saved));
//     }
//   }, []);

//   // ✅ 멘토일 때만 예약 추가
//   useEffect(() => {
//     const role = sessionStorage.getItem('userRole');
//     if (role === 'mentor' && mentor && selectedDate) {
//       const newReservation = {
//         id: Date.now(),
//         date: `${selectedDate}일`,
//         name: mentor.name,
//         status: '예약 대기',
//         mentorImg: mentor.mentor_image_url,
//         intro,
//         topics,
//       };
//       const updated = [...reservations, newReservation];
//       setReservations(updated);
//       localStorage.setItem('mentoringReservations', JSON.stringify(updated));
//     }
//   }, [mentor, selectedDate]);

//   // 핸들러들
//   const handleCancelReservation = (id) => {
//     const updated = reservations.filter((res) => res.id !== id);
//     setReservations(updated);
//     localStorage.setItem('mentoringReservations', JSON.stringify(updated));
//   };

//   const handleAccept = (id) => {
//     const updated = reservations.map((res) =>
//       res.id === id ? { ...res, status: '예약 확정' } : res
//     );
//     setReservations(updated);
//     localStorage.setItem('mentoringReservations', JSON.stringify(updated));
//   };

//   const handleReject = (id) => {
//     const updated = reservations.filter((res) => res.id !== id);
//     setReservations(updated);
//     localStorage.setItem('mentoringReservations', JSON.stringify(updated));
//   };

//   const handleComplete = (id) => {
//     const updated = reservations.map((res) =>
//       res.id === id ? { ...res, status: '멘토링 완료' } : res
//     );
//     setReservations(updated);
//     localStorage.setItem('mentoringReservations', JSON.stringify(updated));
//   };

//   const renderEmptyMessage = () => {
//     if (reservations.length === 0) {
//       return (
//         <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
//           예약된 멘토링이 없습니다.
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <>
//       <Header menuType="mentoring" />
//       <div className="container-flex">
//         <Sidebar menuType="mentoring" />
//         <main className="main">
//           <div className="max-w-2xl mx-auto pt-10 pb-16">
//             <h4 className="text-lg font-bold mb-8 text-slate-900" style={{ textAlign: 'center' }}>
//               예약된 멘토링
//             </h4>
//             <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' }}></div>
//             <div>
//               {renderEmptyMessage()}
//               {reservations.map((res) => (
//                 <MentorRegisterCard
//                   key={res.id}
//                   {...res}
//                   onCancel={() => handleCancelReservation(res.id)}
//                   onAccept={() => handleAccept(res.id)}
//                   onReject={() => handleReject(res.id)}
//                   onComplete={() => handleComplete(res.id)}
//                 />
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MentorRegister;

import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import Footer from '../../../components/common/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import MentorRegisterCard from './MentorRegisterCard';
// import { getMentoringReservations, acceptMentoring, rejectMentoring, completeMentoring } from '../../../api/mentoring'; // ✅ 실제 연동 시

const MentorRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mentor, selectedDate, intro, topics } = location.state || {};
  const [reservations, setReservations] = useState([]);
  const memberId = sessionStorage.getItem('memberId');

  // ✅ 멘토가 아닌 경우 접근 차단
  useEffect(() => {
    const role = sessionStorage.getItem('userRole');
    if (role !== 'mentor') {
      alert('멘토만 접근 가능한 페이지입니다.');
      navigate('/');
    }
  }, [navigate]);

  // ✅ 예약 목록 조회
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // const res = await getMentoringReservations(memberId);
        // setReservations(res.data);

        // ✅ 현재는 local dummy
        const dummyData = [
          {
            id: 1,
            date: '6월 21일',
            name: '멘토 A',
            status: '예약 대기',
            mentorImg: '/assets/img/mentors/mentor1.jpg',
            intro: 'React 전문가',
            topics: ['React', 'JS'],
          },
          {
            id: 2,
            date: '6월 22일',
            name: '멘토 B',
            status: '예약 확정',
            mentorImg: '/assets/img/mentors/mentor2.jpg',
            intro: 'Java 마스터',
            topics: ['Java', 'Spring'],
          },
        ];
        setReservations(dummyData);
      } catch (err) {
        console.error('예약 조회 실패:', err);
      }
    };

    fetchReservations();
  }, [memberId]);

  // ✅ 예약 수락
  const handleAccept = async (id) => {
    try {
      // await acceptMentoring(id);
      setReservations((prev) =>
        prev.map((res) => (res.id === id ? { ...res, status: '예약 확정' } : res))
      );
    } catch (err) {
      alert('예약 수락 실패');
    }
  };

  // ✅ 예약 거절
  const handleReject = async (id) => {
    try {
      // await rejectMentoring(id);
      setReservations((prev) => prev.filter((res) => res.id !== id));
    } catch (err) {
      alert('예약 거절 실패');
    }
  };

  // ✅ 멘토링 완료
  const handleComplete = async (id) => {
    try {
      // await completeMentoring(id);
      setReservations((prev) =>
        prev.map((res) => (res.id === id ? { ...res, status: '멘토링 완료' } : res))
      );
    } catch (err) {
      alert('멘토링 완료 처리 실패');
    }
  };

  // ✅ 예약 취소 (멘토가 직접 삭제 시)
  const handleCancelReservation = (id) => {
    const updated = reservations.filter((res) => res.id !== id);
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
                  onCancel={() => handleCancelReservation(res.id)}
                  onAccept={() => handleAccept(res.id)}
                  onReject={() => handleReject(res.id)}
                  onComplete={() => handleComplete(res.id)}
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
