import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenteeRegisterCard = ({
                              reservationId,
                              date,
                              mentorName,
                              status,
                              mentorImageUrl,
                              subject,
                              onCancel,
                            }) => {
  const navigate = useNavigate();

  // ✅ 상태 영어 → 한글 변환
  const statusToKorean = {
    PENDING: '예약 대기',
    ACCEPTED: '예약 확정',
    CANCELLED: '예약 취소',
    REJECTED: '예약 거절',
  };

  const isConfirmed = status === 'PENDING';

  const defaultMentorImages = [
    '/assets/img/mentors/mentor1.jpg',
    '/assets/img/mentors/mentor2.jpg',
    '/assets/img/mentors/mentor3.jpg',
  ];

  const getMentorImage = () => {
    if (mentorImageUrl && mentorImageUrl !== '') {
      return mentorImageUrl;
    }
    const nameHash = mentorName ? mentorName.charCodeAt(0) % 3 : 0;
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

  const handleProfileClick = () => {
    navigate('/mentoring/detail', {
      state: {
        mentor: {
          name: mentorName,
          mentor_image_url: mentorImageUrl,
          position: '직함', // ❗ position과 company는 예약 목록에서 내려줘야 함
          company: '회사명',
        },
        selectedDate: date.split(' ')[0], // 예약한 날짜만 전달
        mode: 'readOnly', // 캘린더 잠금용
      },
    });
  };
  const handleCancel = () => {
    onCancel();
    navigate('/register/cancel', {
      state: {
        reservationId,
        status,
      },
    });
  };
  
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
          <span style={statusStyle}>{statusToKorean[status] || status}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', color: '#475569' }}>
          <img
            src={getMentorImage()}
            alt={mentorName}
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
          <span style={{ fontSize: '14px', fontWeight: '500', marginRight: '6px' }}>{mentorName}</span>

          {status === 'ACCEPTED' && (
            <a
              href={handleProfileClick}
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
          )}
        </div>

        {/* 대화 주제 표시 */}
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#475569' }}>
          🗣 <strong>{subject}</strong>
        </div>
      </div>

      
      <button
        onClick={handleCancel}
        disabled={!(status === 'PENDING' || status === 'ACCEPTED')}
        style={{
          backgroundColor: '#84cc16',
          color: 'white',
          fontWeight: 600,
          border: 'none',
          borderRadius: '24px',
          padding: '10px 20px',
          fontSize: '14px',
          cursor: (status === 'PENDING' || status === 'ACCEPTED') ? 'pointer' : 'not-allowed',
          opacity: (status === 'PENDING' || status === 'ACCEPTED') ? 1 : 0.4,
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
