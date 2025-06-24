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

/** 멘토링 신청 (멘티) */
export const applyMentoring = ({ mentorId, memberId, date, introduction, subject }) => {
  return axios.post('/reservations', {
    mentorId,          // Long
    memberId,          // Long
    date,              // ISO 형식 문자열
    introduction,      // String
    subject,           // String (comma로 연결된 주제 목록)
  });
};

/** 멘티 - 본인 예약 목록 조회 */
export const getMentoringReservations = (memberId) => {
  return axios.get(`/reservations/mentee/${memberId}`);
};

/** 멘토 - 본인 예약 목록 조회 */
export const getMentorReservations = (mentorId) => {
  return axios.get(`/reservations/mentor/${mentorId}`);
};

/** 멘토 - 예약 수락 */
export const acceptMentoring = (reservationId) => {
  return axios.put(`/reservations/mentor/${reservationId}/accept`);
};

/** 멘토 - 예약 거절 */
export const rejectMentoring = (reservationId, cancelReason) => {
  return axios.put(`/reservations/mentor/${reservationId}/reject`, {
    cancelReason, // MentoringReservationRejectRequestDto
  });
};

/** 멘티 - 예약 취소 */
export const cancelMentoring = ({ reservationId, memberName, cancelReason }) => {
  return axios.put(`/reservations/mentee/${reservationId}/cancel`, {
    memberName,
    cancelReason,
  });
};

/** 멘토링 완료 히스토리 (멘티 기준) */
export const getMentoringHistory = (memberId) => {
  return axios.get(`/mentoring/mentee/${memberId}/completed`);
};

/** 멘토 - 멘토링 완료 처리 */
export const completeMentoring = (reservationId) => {
  return axios.put(`/reservations/mentor/${reservationId}/complete`);
};

