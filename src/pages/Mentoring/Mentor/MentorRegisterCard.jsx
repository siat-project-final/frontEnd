// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ConfirmOnlyModal from '../../../components/common/ConfirmOnlyModal';

// // 멘토링 예약 내역을 시각적으로 보여주는 컴포넌트

// const MentorRegisterCard = ({
//   date,
//   name,
//   status,
//   mentorImg,
//   onCancel,
//   onAccept,
//   onReject,
//   onComplete,
// }) => {
//   const navigate = useNavigate();
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [showCompleteModal, setShowCompleteModal] = useState(false);

//   useEffect(() => {
//     const role = sessionStorage.getItem('userRole');
//     if (role !== 'mentor') {
//       alert('멘토만 접근 가능한 페이지입니다.');
//       navigate('/');
//     }
//   }, [navigate]);

//   const statusStyle = {
//     backgroundColor: status === '예약 대기' ? '#f1f5f9' : '#e2e8f0',
//     color: '#475569',
//     fontSize: '12px',
//     fontWeight: '500',
//     padding: '4px 12px',
//     borderRadius: '9999px',
//   };

//   // 버튼 공통 스타일
//   const buttonStyle = {
//     fontWeight: 600,
//     border: 'none',
//     borderRadius: '24px',
//     padding: '10px 16px',
//     fontSize: '14px',
//     cursor: 'pointer',
//     whiteSpace: 'nowrap',
//     marginLeft: '8px',
//   };

//   // 예약 취소 핸들러
//   const handleCancel = () => {
//     onCancel();
//     navigate('/mentoring/cancel');
//   };

//   const handleAcceptClick = () => {
//     setShowAcceptModal(true);
//     onAccept();
//   };

//   const handleCompleteClick = () => {
//     setShowCompleteModal(true);
//     onComplete();
//   };

//   const handleCloseAcceptModal = () => {
//     setShowAcceptModal(false);
//   };

//   const handleCloseCompleteModal = () => {
//     setShowCompleteModal(false);
//   };

//   return (
//     <>
//       <div
//         style={{
//           border: '1px solid #cbd5e1',
//           borderRadius: '12px',
//           padding: '16px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '16px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//           maxWidth: '600px',
//           width: '100%',
//           margin: '0 auto',
//         }}
//       >
//         {/* 예약 정보 */}
//         <div
//           style={{
//             border: '1px solid #e2e8f0',
//             padding: '16px',
//             borderRadius: '8px',
//             flexGrow: 1,
//             marginRight: '16px',
//           }}
//         >
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//             <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{date}</span>
//             <span style={statusStyle}>{status}</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', color: '#475569' }}>
//             <img
//               src={mentorImg}
//               alt={name}
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 marginRight: '8px',
//                 objectFit: 'cover',
//               }}
//             />
//             <span style={{ fontSize: '14px' }}>{name}</span>
//           </div>
//         </div>

//         {/* 버튼 영역 */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           {status === '예약 대기' ? (
//             <>
//               <button
//                 onClick={onReject}
//                 style={{ ...buttonStyle, backgroundColor: '#fecaca', color: '#b91c1c' }} // 연핑크, 빨간 글씨
//               >
//                 예약 거절
//               </button>
//               <button
//                 onClick={handleAcceptClick}
//                 style={{ ...buttonStyle, backgroundColor: '#bbf7d0', color: '#15803d' }} // 연녹색, 녹색 글씨
//               >
//                 예약 수락
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={handleCancel}
//                 style={{ ...buttonStyle, backgroundColor: '#334155', color: 'white' }}
//               >
//                 예약 취소
//               </button>
//               <button
//                 onClick={handleCompleteClick}
//                 style={{ ...buttonStyle, backgroundColor: '#0ea5e9', color: 'white' }}
//               >
//                 멘토링 완료
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <ConfirmOnlyModal
//         isOpen={showAcceptModal}
//         onClose={handleCloseAcceptModal}
//         title="멘토링 예약 완료"
//         message="멘토링이 예약되었습니다"
//       />

//       <ConfirmOnlyModal
//         isOpen={showCompleteModal}
//         onClose={handleCloseCompleteModal}
//         title="멘토링 완료"
//         message={
//           <>
//             멘토링에 참여해주셔서 감사합니다!
//             <br />
//             앞으로도 멘토님의 적극적인 참여를 기대하겠습니다:)
//           </>
//         }
//       />
//     </>
//   );
// };

// export default MentorRegisterCard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmOnlyModal from '../../../components/common/ConfirmOnlyModal';

const MentorRegisterCard = ({
  date = '2025-06-20',
  name = '홍길동',
  status = '예약 대기',
  mentorImg = '/assets/img/mentors/mentor1.jpg',
  onCancel = () => {},
  onAccept = () => {},
  onReject = () => {},
  onComplete = () => {},
}) => {
  const navigate = useNavigate();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const statusStyle = {
    backgroundColor: status === '예약 대기' ? '#f1f5f9' : '#e2e8f0',
    color: '#475569',
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 12px',
    borderRadius: '9999px',
  };

  const buttonStyle = {
    fontWeight: 600,
    border: 'none',
    borderRadius: '24px',
    padding: '10px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginLeft: '8px',
  };

  const handleCancel = () => {
    onCancel();
    navigate('/mentoring/cancel');
  };

  const handleAcceptClick = () => {
    setShowAcceptModal(true);
    onAccept();
  };

  const handleCompleteClick = () => {
    setShowCompleteModal(true);
    onComplete();
  };

  return (
    <>
      <div
        style={{
          border: '1px solid #cbd5e1',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* 예약 정보 */}
        <div
          style={{
            border: '1px solid #e2e8f0',
            padding: '16px',
            borderRadius: '8px',
            flexGrow: 1,
            marginRight: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{date}</span>
            <span style={statusStyle}>{status}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#475569' }}>
            <img
              src={mentorImg}
              alt={name}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                marginRight: '8px',
                objectFit: 'cover',
              }}
            />
            <span style={{ fontSize: '14px' }}>{name}</span>
          </div>
        </div>

        {/* 모든 버튼 항상 표시 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={onReject}
            style={{ ...buttonStyle, backgroundColor: '#fecaca', color: '#b91c1c' }}
          >
            예약 거절
          </button>
          <button
            onClick={handleAcceptClick}
            style={{ ...buttonStyle, backgroundColor: '#bbf7d0', color: '#15803d' }}
          >
            예약 수락
          </button>
          <button
            onClick={handleCancel}
            style={{ ...buttonStyle, backgroundColor: '#334155', color: 'white' }}
          >
            예약 취소
          </button>
          <button
            onClick={handleCompleteClick}
            style={{ ...buttonStyle, backgroundColor: '#0ea5e9', color: 'white' }}
          >
            멘토링 완료
          </button>
        </div>
      </div>

      {/* 조건부 모달 표시 */}
      <ConfirmOnlyModal
        visible={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        message="멘토링이 예약되었습니다"
      />

      <ConfirmOnlyModal
        visible={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        message={
          <>
            멘토링에 참여해주셔서 감사합니다!
            <br />
            앞으로도 멘토님의 적극적인 참여를 기대하겠습니다:)
          </>
        }
      />
    </>
  );
};

export default MentorRegisterCard;
