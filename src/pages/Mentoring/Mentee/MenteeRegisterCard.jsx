// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // 멘토링 예약 내역을 시각적으로 보여주는 컴포넌트

// const MenteeRegisterCard = ({ date, name, status, mentorImg, onCancel }) => {
//   const navigate = useNavigate();
//   const isConfirmed = status === '예약 대기';

//   // 기본 이미지 설정 (MentoringList.jsx와 동일한 이미지들)
//   const defaultMentorImages = [
//     '/assets/img/mentors/mentor1.jpg',
//     '/assets/img/mentors/mentor2.jpg',
//     '/assets/img/mentors/mentor3.jpg',
//   ];

//   // mentorImg가 없거나 유효하지 않은 경우 기본 이미지 사용
//   const getMentorImage = () => {
//     if (mentorImg && mentorImg !== '') {
//       return mentorImg;
//     }
//     // 멘토 이름에 따라 다른 기본 이미지 사용 (간단한 해시)
//     const nameHash = name ? name.charCodeAt(0) % 3 : 0;
//     return defaultMentorImages[nameHash];
//   };

//   const statusStyle = {
//     backgroundColor: isConfirmed ? '#e2e8f0' : '#f1f5f9',
//     color: '#475569',
//     fontSize: '12px',
//     fontWeight: '500',
//     padding: '4px 12px',
//     borderRadius: '9999px',
//   };

//   const handleCancel = () => {
//     onCancel();
//     navigate('/mentoring/cancel');
//   };

//   return (
//     // 카드 전체 테두리 박스
//     <div
//       style={{
//         border: '1px solid #cbd5e1',
//         borderRadius: '12px',
//         padding: '16px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '16px',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//         maxWidth: '600px',
//         width: '100%',
//         margin: '0 auto',
//       }}
//     >
//       {/* 카드 내부 테두리 박스 */}
//       <div
//         style={{
//           border: '1px solid #e2e8f0',
//           padding: '16px',
//           borderRadius: '8px',
//           flexGrow: 1,
//           marginRight: '16px',
//         }}
//       >
//         {/* 날짜, 상태 라벨 줄 */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//           <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{date}</span>
//           <span style={statusStyle}>{status}</span>
//         </div>
//         {/* 멘토 이미지, 이름 */}
//         <div style={{ display: 'flex', alignItems: 'center', color: '#475569' }}>
//           <img
//             src={getMentorImage()}
//             alt={name}
//             style={{
//               width: '32px',
//               height: '32px',
//               borderRadius: '50%',
//               marginRight: '12px',
//               objectFit: 'cover',
//               border: '2px solid #e2e8f0',
//             }}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = '/assets/img/mentors/mentor1.jpg';
//             }}
//           />
//           <span style={{ fontSize: '14px', fontWeight: '500' }}>{name}</span>
//         </div>
//       </div>
//       <button
//         onClick={handleCancel}
//         style={{
//           backgroundColor: '#84cc16',
//           color: 'white',
//           fontWeight: 600,
//           border: 'none',
//           borderRadius: '24px',
//           padding: '10px 20px',
//           fontSize: '14px',
//           cursor: 'pointer',
//           whiteSpace: 'nowrap',
//           boxShadow: '0 2px 8px rgba(95,207,128,0.08)',
//         }}
//       >
//         예약 취소
//       </button>
//     </div>
//   );
// };

// export default MenteeRegisterCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenteeRegisterCard = ({ date, name, status, mentorImg, onCancel }) => {
  const navigate = useNavigate();
  const isConfirmed = status === '예약 대기';

  const defaultMentorImages = [
    '/assets/img/mentors/mentor1.jpg',
    '/assets/img/mentors/mentor2.jpg',
    '/assets/img/mentors/mentor3.jpg',
  ];

  const getMentorImage = () => {
    if (mentorImg && mentorImg !== '') {
      return mentorImg;
    }
    const nameHash = name ? name.charCodeAt(0) % 3 : 0;
    return defaultMentorImages[nameHash];
  };

  const statusStyle = {
    backgroundColor: isConfirmed ? '#e2e8f0' : '#f1f5f9',
    color: '#475569',
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 12px',
    borderRadius: '9999px',
  };

  const handleCancel = () => {
    onCancel();
    navigate('/mentoring/cancel');
  };

  // 🔗 외부 프로필 링크 구성
  const profileLink = `https://example.com/profile/${encodeURIComponent(name)}`;

  return (
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

        {/* 멘토 이미지 + 이름 + 🔗 링크 */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#475569' }}>
          <img
            src={getMentorImage()}
            alt={name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              marginRight: '12px',
              objectFit: 'cover',
              border: '2px solid #e2e8f0',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/img/mentors/mentor1.jpg';
            }}
          />
          <span style={{ fontSize: '14px', fontWeight: '500', marginRight: '6px' }}>{name}</span>
          <a
            href={profileLink}
            target="_blank"
            rel="noopener noreferrer"
            title="프로필 보기"
            style={{
              fontSize: '14px',
              color: '#0ea5e9',
              textDecoration: 'none',
            }}
          >
            🔗
          </a>
        </div>
      </div>

      {/* 예약 취소 버튼 */}
      <button
        onClick={handleCancel}
        style={{
          backgroundColor: '#84cc16',
          color: 'white',
          fontWeight: 600,
          border: 'none',
          borderRadius: '24px',
          padding: '10px 20px',
          fontSize: '14px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(95,207,128,0.08)',
        }}
      >
        예약 취소
      </button>
    </div>
  );
};

export default MenteeRegisterCard;
