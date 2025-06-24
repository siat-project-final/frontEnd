// import React, { useState, useEffect } from 'react';
// import Header from '../../../components/common/Header';
// import Sidebar from '../../../components/common/Sidebar';
// import Footer from '../../../components/common/Footer';
// import { useNavigate, useLocation } from 'react-router-dom';
// import MentorRegisterCard from './MentorRegisterCard';
// import { getMentorReservations, acceptMentoring, completeMentoring } from '../../../api/mentoring';

// const RESERVATION_STATUS = {
//   PENDING: 'PENDING',
//   CONFIRMED: 'CONFIRMED',
//   CANCELED: 'CANCELED',
//   REJECTED: 'REJECTED',
// };

// const MentorRegister = () => {
//   const [reservations, setReservations] = useState([]);
//   const memberId = localStorage.getItem('memberId');
//   const location = useLocation();
//   const navigate = useNavigate();

//   console.log('🏁 MentorRegister 컴포넌트 마운트');
//   console.log('🆔 memberId:', memberId);
//   console.log('📍 location.state:', location.state);

//   // localStorage 초기화 함수 (디버깅용)
//   const clearCancelledReservations = () => {
//     localStorage.removeItem('cancelledReservations');
//     console.log('🧹 localStorage 취소된 예약들 초기화 완료');
//   };

//   // 개발 중에만 사용 (나중에 제거)
//   // clearCancelledReservations();

//   // 예약 목록 불러오기
//   useEffect(() => {
//     if (!memberId) return;

//     const fetchReservations = async () => {
//       try {
//         console.log('🔍 예약 목록 조회 시작, memberId:', memberId);
//         const response = await getMentorReservations(memberId);
//         console.log('📡 API 응답 전체:', response.data);
        
//         // 정확한 상태값으로 필터링
//         const filtered = response.data.filter(
//           (res) =>
//             res.status !== RESERVATION_STATUS.CANCELED &&
//             res.status !== RESERVATION_STATUS.REJECTED
//         );
//         console.log('🚫 CANCELED/REJECTED 제외 후:', filtered);
        
//         // localStorage에 저장된 취소된 예약들도 제외
//         const cancelledReservations = JSON.parse(localStorage.getItem('cancelledReservations') || '[]');
//         console.log('💾 localStorage 취소된 예약들:', cancelledReservations);
        
//         // const finalFiltered = filtered.filter(
//         //   (res) => !cancelledReservations.includes(res.reservationId)
//         // );
//         // console.log('🎯 localStorage 제외 후 최종:', finalFiltered);
        
//         // const formatted = finalFiltered.map((res) => ({
//         //   ...res,
//         //   date: res.date, // 필요시 formatDate(res.date)
//         // }));
        
//         // console.log('✅ 최종 예약 목록:', formatted);
//         // setReservations(formatted);
//       } catch (error) {
//         console.error('❌ 멘토 예약 조회 실패:', error);
//       }
//     };

//     fetchReservations();
//   }, [memberId]);

//   // MentoringReject에서 돌아올 때 거절된 예약 제거
//   useEffect(() => {
//     if (location.state?.rejectedReservationId) {
//       const rejectedId = location.state.rejectedReservationId;
//       // setReservations((prev) => prev.filter((res) => res.reservationId !== rejectedId));
//       navigate(location.pathname, { replace: true });
//     }
//   }, [location.state, navigate, location.pathname]);

//   // RegisterCancel에서 돌아올 때 취소된 예약 제거
//   useEffect(() => {
//     if (location.state?.cancelledReservationId && !location.state?.alreadyRemoved) {
//       const cancelledId = location.state.cancelledReservationId;
//       setReservations((prev) => {
//         // const filtered = prev.filter((res) => res.reservationId !== cancelledId);
//         console.log('취소 페이지에서 돌아온 후 예약 제거:', cancelledId);
//         // return filtered;
//       });
//       navigate(location.pathname, { replace: true });
//     }
//   }, [location.state, navigate, location.pathname]);

//   // 예약 취소(프론트에서만 제거)
//   const handleCancel = (reservationId) => {
//     console.log('🚨 handleCancel 함수 호출됨, reservationId:', reservationId);
//     console.log('📋 현재 reservations 상태:', reservations);
//     console.log('🔢 reservations 길이:', reservations.length);
    
//     // localStorage에 취소된 예약 저장
//     const cancelledReservations = JSON.parse(localStorage.getItem('cancelledReservations') || '[]');
//     console.log('💾 기존 localStorage 취소된 예약들:', cancelledReservations);
    
//     cancelledReservations.push(reservationId);
//     localStorage.setItem('cancelledReservations', JSON.stringify(cancelledReservations));
//     console.log('💾 localStorage에 추가된 후:', cancelledReservations);
    
//     // 즉시 상태 업데이트
//     setReservations(prev => {
//       console.log('🔄 setReservations prev 값:', prev);
//       // const updated = prev.filter((res) => res.reservationId !== reservationId);
//       // console.log('🎯 필터링 후 updated:', updated);
//       // console.log('🔢 updated 길이:', updated.length);
//       // return updated;
//     });
    
//     console.log('✅ 예약 취소 후 목록에서 제거 완료:', reservationId);
//   };

//   // 예약 거절(프론트에서만 제거)
//   const handleReject = (reservationId) => {
//     // const updated = reservations.filter((res) => res.reservationId !== reservationId);
//     // setReservations(updated);
//   };

//   // 예약 수락 처리
//   const handleAccept = async (reservationId) => {
//     try {
//       await acceptMentoring(reservationId);
      
//       // 상태를 CONFIRMED로 업데이트
//       setReservations(prev => {
//         const updated = prev.map(res => 
//           res.reservationId === reservationId 
//             ? { ...res, status: 'CONFIRMED' }
//             : res
//         );
//         console.log('예약 수락 후 상태 업데이트:', updated);
//         return updated;
//       });
      
//       return Promise.resolve(); // 성공 시 Promise 반환
//     } catch (error) {
//       console.error('예약 수락 실패:', error);
//       alert('예약 수락 중 오류가 발생했습니다.');
//       return Promise.reject(error); // 실패 시 Promise 반환
//     }
//   };

//   // 멘토링 완료 처리
//   const handleComplete = async (reservationId) => {
//     try {
//       await completeMentoring(reservationId);
      
//       // 목록에서 제거
//       const updated = reservations.filter((res) => res.reservationId !== reservationId);
//       setReservations(updated);
//     } catch (error) {
//       console.error('멘토링 완료 처리 실패:', error);
//       alert('멘토링 완료 처리 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <>
//       <Header menuType="mentoring" />
//       <div className="container-flex">
//         <Sidebar menuType="mentoring" />
//         <main className="main">
//           <div className="max-w-2xl mx-auto pt-10 pb-16">
//             <h3 className="text-2xl font-bold mb-8 text-slate-900" style={{ textAlign: 'center' }}>
//               멘토링 예약 관리
//             </h3>
//             <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' }}></div>
//             <div>
//               {reservations.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
//                   예약 요청이 없습니다.
//                 </div>
//               ) : (
//                 <>
//                   {console.log('🎬 MentorRegister 렌더링, reservations:', reservations)}
//                   {reservations.map((res) => {
//                     console.log('📝 각 예약 렌더링:', res);
//                     return (
//                       <MentorRegisterCard
//                         key={`${res.reservationId}-${res.status}`}
//                         id={res.reservationId}
//                         date={res.date}
//                         memberName={res.memberName}
//                         status={res.status}
//                         mentorImg={res.mentorImageUrl}
//                         onCancel={handleCancel}
//                         onReject={handleReject}
//                         onAccept={handleAccept}
//                         onComplete={handleComplete}
//                       />
//                     );
//                   })}
//                 </>
//               )}
//             </div>
//           </div>
//         </main>
//         <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
//           {/* Todo 혹은 다른 사이드 컴포넌트 있으면 여기에 */}
//         </div>
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
import { getMentorReservations, acceptMentoring, completeMentoring } from '../../../api/mentoring';

const MentorRegister = () => {
    const [reservations, setReservations] = useState([]);
    const memberId = localStorage.getItem('memberId');
    const location = useLocation();
    const navigate = useNavigate();

    console.log('🏁 MentorRegister 컴포넌트 마운트');
    console.log('🆔 memberId:', memberId);
    console.log('📍 location.state:', location.state);

    useEffect(() => {
        if (!memberId) return;

        const fetchReservations = async () => {
            try {
                console.log('🔍 예약 목록 조회 시작, memberId:', memberId);
                const response = await getMentorReservations(memberId);
                console.log('📡 API 응답 전체:', response.data);
                setReservations(response.data);
            } catch (error) {
                console.error('❌ 멘토 예약 조회 실패:', error);
            }
        };

        fetchReservations();
    }, [memberId]);

    useEffect(() => {
        if (location.state?.rejectedReservationId) {
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate, location.pathname]);

    useEffect(() => {
        if (location.state?.cancelledReservationId && !location.state?.alreadyRemoved) {
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate, location.pathname]);

    const handleCancel = (reservationId) => {
        console.log('✅ 예약 취소 로직 생략됨, reservationId:', reservationId);
    };

    const handleReject = (reservationId) => {
        console.log('✅ 예약 거절 로직 생략됨, reservationId:', reservationId);
    };

    const handleAccept = async (reservationId) => {
        try {
            await acceptMentoring(reservationId);
            setReservations(prev =>
                prev.map(res =>
                    res.reservationId === reservationId
                        ? { ...res, status: 'CONFIRMED' }
                        : res
                )
            );
        } catch (error) {
            console.error('예약 수락 실패:', error);
            alert('예약 수락 중 오류가 발생했습니다.');
        }
    };

    const handleComplete = async (reservationId) => {
        try {
            await completeMentoring(reservationId);
            const updated = reservations.filter(res => res.reservationId !== reservationId);
            setReservations(updated);
        } catch (error) {
            console.error('멘토링 완료 처리 실패:', error);
            alert('멘토링 완료 처리 중 오류가 발생했습니다.');
        }
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
                                        key={`${res.reservationId}-${res.status}`}
                                        id={res.reservationId}
                                        date={res.date}
                                        memberName={res.memberName}
                                        status={res.status}
                                        mentorImg={res.mentorImageUrl}
                                        onCancel={handleCancel}
                                        onReject={handleReject}
                                        onAccept={handleAccept}
                                        onComplete={handleComplete}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </main>
                <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
                    {/* 사이드 컴포넌트 영역 */}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MentorRegister;
