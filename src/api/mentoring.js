import axios from './axios';

/** 멘토 목록 조회 */
export const getMentors = (keyword, field) => {
  return axios.get('/mentors', {
    params: { keyword, field },
  });
};

/** 멘토 상세 조회 */
export const getMentorDetail = (mentorId) => {
  return axios.get(`/mentors/${mentorId}`);
};

/** 멘토링 신청 */
export const applyMentoring = ({ mentorId, memberId, date, Introduction, subject }) => {
  return axios.post('/mentoring/reserve', {
    mentorId,
    memberId,
    date,
    Introduction,
    subject,
  });
};

/** 멘토링 예약 내역 조회 */
export const getMentoringReservations = (memberId) => {
  return axios.get('/mentoring/reservelist', {
    params: { memberId },
  });
};

/** 멘토링 취소 */
export const cancelMentoring = ({ memberId, memberName, cancelReason }) => {
  return axios.delete('/mentoring/cancel', {
    data: { memberId, memberName, cancelReason },
  });
};

/** 멘토링 히스토리 조회 */
export const getMentoringHistory = (memberId) => {
  return axios.get(`/mentoring/${memberId}/history`);
};


// 주요 요청 예시
// GET /api/mentors?keyword=AI&field=dev

// POST /api/mentoring/reserve { mentorId, memberId, date, Introduction, subject }

// DELETE /api/mentoring/cancel { memberId, memberName, cancelReason }

