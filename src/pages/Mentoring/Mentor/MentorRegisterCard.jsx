// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ConfirmOnlyModal from '../../../components/common/ConfirmOnlyModal';

// const MentorRegisterCardGroup = ({
//   onCancel = () => {},
//   onAccept = () => {},
//   onReject = () => {},
//   onComplete = () => {},
// }) => {
//   const navigate = useNavigate();
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [showCompleteModal, setShowCompleteModal] = useState(false);

//   const statusStyle = (status) => ({
//     backgroundColor: status === '예약 대기' ? '#f1f5f9' : '#e2e8f0',
//     color: '#475569',
//     fontSize: '12px',
//     fontWeight: '500',
//     padding: '4px 12px',
//     borderRadius: '9999px',
//   });

//   const buttonStyle = {
//     fontWeight: 600,
//     border: 'none',
//     borderRadius: '24px',
//     padding: '10px 16px',
//     fontSize: '14px',
//     cursor: 'pointer',
//     whiteSpace: 'nowrap',
//     marginLeft: '8px',
//     minWidth: '120px',
//     textAlign: 'center',
//   };

//   const handleAcceptClick = () => {
//     setShowAcceptModal(true);
//     onAccept();
//   };

//   const handleCompleteClick = () => {
//     setShowCompleteModal(true);
//     onComplete();
//   };

//   const handleCancelClick = () => {
//     onCancel();
//     navigate('/mentoring/cancel');
//   };

//   const handleRejectClick = () => {
//     onReject();
//     navigate('/mentoring/mentor/reject');
//   };

//   // 💡 외부 링크
//   const profileLink = 'https://example.com/profile/honggildong';

//   return (
//     <>
//       {/* 카드 1 - 예약 대기 */}
//       <div
//         style={{
//           border: '1px solid #cbd5e1',
//           borderRadius: '12px',
//           padding: '16px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '25px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//           maxWidth: '600px',
//           width: '100%',
//           margin: '0 auto',
//           marginBottom: '20px',
//         }}
//       >
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
//             <span style={{ fontWeight: 'bold', fontSize: '16px' }}>2025-06-20</span>
//             <span style={statusStyle('예약 대기')}>예약 대기</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', color: '#475569' }}>
//             <img
//               src="/assets/img/mentors/mentor1.jpg"
//               alt="홍길동"
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 marginRight: '8px',
//                 objectFit: 'cover',
//               }}
//             />
//             <span style={{ fontSize: '14px', marginRight: '6px' }}>홍길동</span>
//             <a
//               href="https://example.com/profile/honggildong"
//               target="_blank"
//               rel="noopener noreferrer"
//               title="프로필 보기"
//               style={{
//                 fontSize: '14px',
//                 textDecoration: 'none',
//                 color: '#0ea5e9',
//                 lineHeight: 1,
//               }}
//             >
//               🔗
//             </a>
//           </div>
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
//           <button
//             onClick={handleAcceptClick}
//             style={{ ...buttonStyle, backgroundColor: '#84cc16', color: '#fff' }}
//           >
//             예약 수락
//           </button>
//           <button
//             onClick={handleRejectClick}
//             style={{ ...buttonStyle, backgroundColor: '#ced4da', color: '#fff' }}
//           >
//             예약 거절
//           </button>
//         </div>
//       </div>

//       {/* 카드 2 - 예약 확정 */}
//       <div
//         style={{
//           border: '1px solid #cbd5e1',
//           borderRadius: '12px',
//           padding: '16px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '32px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//           maxWidth: '600px',
//           width: '100%',
//           margin: '0 auto',
//         }}
//       >
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
//             <span style={{ fontWeight: 'bold', fontSize: '16px' }}>2025-06-25</span>
//             <span style={statusStyle('예약 확정')}>예약 확정</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', color: '#475569' }}>
//             <img
//               src="/assets/img/mentors/mentor1.jpg"
//               alt="홍길동"
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 marginRight: '8px',
//                 objectFit: 'cover',
//               }}
//             />
//             <span style={{ fontSize: '14px', marginRight: '6px' }}>홍길동</span>
//             <a
//               href="https://example.com/profile/honggildong"
//               target="_blank"
//               rel="noopener noreferrer"
//               title="프로필 보기"
//               style={{
//                 fontSize: '14px',
//                 textDecoration: 'none',
//                 color: '#0ea5e9',
//                 lineHeight: 1,
//               }}
//             >
//               🔗
//             </a>
//           </div>
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
//           <button
//             onClick={handleCancelClick}
//             style={{ ...buttonStyle, backgroundColor: '#334155', color: 'white' }}
//           >
//             예약 취소
//           </button>
//           <button
//             onClick={handleCompleteClick}
//             style={{ ...buttonStyle, backgroundColor: '#0ea5e9', color: 'white' }}
//           >
//             멘토링 완료
//           </button>
//         </div>
//       </div>

//       {/* 모달 */}
//       <ConfirmOnlyModal
//         visible={showAcceptModal}
//         onClose={() => setShowAcceptModal(false)}
//         message="멘토링이 예약되었습니다"
//       />
//       <ConfirmOnlyModal
//         visible={showCompleteModal}
//         onClose={() => setShowCompleteModal(false)}
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

// export default MentorRegisterCardGroup;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ConfirmOnlyModal from '../../../components/common/ConfirmOnlyModal';

// const MentorRegisterCard = ({
//   id,
//   date,
//   name,
//   status,
//   mentorImg,
//   onCancel = () => {},
//   onAccept = () => {},
//   onReject = () => {},
//   onComplete = () => {},
// }) => {
//   const navigate = useNavigate();
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [showCompleteModal, setShowCompleteModal] = useState(false);

//   const statusStyle = {
//     backgroundColor: status === '예약 대기' ? '#f1f5f9' : '#e2e8f0',
//     color: '#475569',
//     fontSize: '12px',
//     fontWeight: '500',
//     padding: '4px 12px',
//     borderRadius: '9999px',
//   };

//   const buttonStyle = {
//     fontWeight: 600,
//     border: 'none',
//     borderRadius: '24px',
//     padding: '10px 16px',
//     fontSize: '14px',
//     cursor: 'pointer',
//     whiteSpace: 'nowrap',
//     marginLeft: '8px',
//     minWidth: '120px',
//     textAlign: 'center',
//   };

//   const getMentorImage = () => {
//     return mentorImg || '/assets/img/mentors/mentor1.jpg';
//   };

//   const handleAcceptClick = () => {
//     onAccept(id);
//     setShowAcceptModal(true);
//   };

//   const handleCompleteClick = () => {
//     onComplete(id);
//     setShowCompleteModal(true);
//   };

//   const handleCancelClick = () => {
//     onCancel(id);
//     navigate('/mentoring/cancel');
//   };

//   const handleRejectClick = () => {
//     onReject(id);
//     navigate('/mentoring/mentor/reject');
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
//           marginBottom: '25px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//           maxWidth: '600px',
//           width: '100%',
//           margin: '0 auto',
//         }}
//       >
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
//               src={getMentorImage()}
//               alt={name}
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 marginRight: '8px',
//                 objectFit: 'cover',
//               }}
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = '/assets/img/mentors/mentor1.jpg';
//               }}
//             />
//             <span style={{ fontSize: '14px', marginRight: '6px' }}>{name}</span>
//             <a
//               href={`https://example.com/profile/${encodeURIComponent(name)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               title="프로필 보기"
//               style={{
//                 fontSize: '14px',
//                 textDecoration: 'none',
//                 color: '#0ea5e9',
//                 lineHeight: 1,
//               }}
//             >
//               🔗
//             </a>
//           </div>
//         </div>

//         {/* 버튼 영역 */}
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
//           {status === '예약 대기' && (
//             <>
//               <button
//                 onClick={handleAcceptClick}
//                 style={{ ...buttonStyle, backgroundColor: '#84cc16', color: '#fff' }}
//               >
//                 예약 수락
//               </button>
//               <button
//                 onClick={handleRejectClick}
//                 style={{ ...buttonStyle, backgroundColor: '#ced4da', color: '#fff' }}
//               >
//                 예약 거절
//               </button>
//             </>
//           )}

//           {status === '예약 확정' && (
//             <>
//               <button
//                 onClick={handleCancelClick}
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

//       {/* 모달 */}
//       <ConfirmOnlyModal
//         visible={showAcceptModal}
//         onClose={() => setShowAcceptModal(false)}
//         message="멘토링이 예약되었습니다"
//       />
//       <ConfirmOnlyModal
//         visible={showCompleteModal}
//         onClose={() => setShowCompleteModal(false)}
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
  id,
  date,
  name,
  status,
  mentorImg,
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
    minWidth: '120px',
    textAlign: 'center',
  };

  const getMentorImage = () => {
    return mentorImg || '/assets/img/mentors/mentor1.jpg';
  };

  const handleAcceptClick = () => {
    onAccept(id);
    setShowAcceptModal(true);
  };

  const handleCompleteClick = () => {
    onComplete(id); // ✅ 부모에서 삭제 처리
    setShowCompleteModal(true);
  };

  const handleCancelClick = () => {
    onCancel(id);
    navigate('/mentoring/cancel');
  };

  const handleRejectClick = () => {
    onReject(id);
    navigate('/mentoring/mentor/reject');
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
          marginBottom: '25px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
        }}
      >
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
              src={getMentorImage()}
              alt={name}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                marginRight: '8px',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/img/mentors/mentor1.jpg';
              }}
            />
            <span style={{ fontSize: '14px', marginRight: '6px' }}>{name}</span>
            <a
              href={`https://example.com/profile/${encodeURIComponent(name)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="프로필 보기"
              style={{
                fontSize: '14px',
                textDecoration: 'none',
                color: '#0ea5e9',
                lineHeight: 1,
              }}
            >
              🔗
            </a>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {status === '예약 대기' && (
            <>
              <button
                onClick={handleAcceptClick}
                style={{ ...buttonStyle, backgroundColor: '#84cc16', color: '#fff' }}
              >
                예약 수락
              </button>
              <button
                onClick={handleRejectClick}
                style={{ ...buttonStyle, backgroundColor: '#ced4da', color: '#fff' }}
              >
                예약 거절
              </button>
            </>
          )}

          {status === '예약 확정' && (
            <>
              <button
                onClick={handleCancelClick}
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
            </>
          )}
        </div>
      </div>

      {/* 모달 */}
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
