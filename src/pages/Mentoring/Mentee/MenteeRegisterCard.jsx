import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenteeRegisterCard = ({
                              reservationId, // ✅ 추가
                              date,
                              mentorName,
                              status,
                              mentorImageUrl,
                              onCancel,
                            }) => {
  const navigate = useNavigate();
  const isConfirmed = status === '예약 대기';

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

  const handleCancel = () => {
    onCancel(); // 상태 동기화
    navigate('/register/cancel', {
      state: {
        reservationId, // ✅ 상태에 예약 ID 포함
        status,
      },
    });
  };

  const profileLink = `https://example.com/profile/${encodeURIComponent(mentorName)}`;

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

          {status === '예약 확정' && (
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
          )}
        </div>
      </div>

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
