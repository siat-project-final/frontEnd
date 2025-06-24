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
  return axios.post('/reservations', {
    mentorId,
    memberId,
    date,
    Introduction,
    subject,
  });
};

/** 멘토링 예약 내역 조회 */
export const getMentoringReservations = (memberId) => {
  return axios.get(`/reservations/mentee/${memberId}`);
};

/** 멘토링 취소 */
export const cancelMentoring = ({ reservationId, memberName, cancelReason }) => {
  return axios.put(`/reservations/mentee/${reservationId}/cancel`, {
    memberName,
    cancelReason,
  });
};

/** 멘토링 히스토리 조회 */
export const getMentoringHistory = (memberId) => {
  return axios.get(`/mentoring/mentee/${memberId}/completed`);
};