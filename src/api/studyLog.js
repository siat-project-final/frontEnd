import axios from './axios';

/** 일정 목록 조회 */
export const getEvents = (userId, month) => {
  return axios.get('/calendar/events', {
    params: { userId, month },
  });
};

/** 일정 생성 */
export const createEvent = (eventData) => {
  return axios.post('/calendar/events', eventData);
};

/** 일정 수정 */
export const updateEvent = (id, updatedData) => {
  return axios.put(`/calendar/events/${id}`, updatedData);
};

/** 일정 삭제 */
export const deleteEvent = (id) => {
  return axios.delete(`/calendar/events/${id}`);
};

/** 학습일지 전체 조회 */
export const getStudyLogs = (subject, userId) => {
  return axios.get('/study-logs', {
    params: { subject, userId },
  });
};

/** 학습일지 상세 조회 */
export const getStudyLogById = (id) => {
  return axios.get(`/study-logs/${id}`);
};

/** 학습일지 작성 */
export const postStudyLog = (data) => {
  return axios.post('/study-logs', data);
};

/** 학습일지 수정 */
export const updateStudyLog = (id, data) => {
  return axios.put(`/study-logs/${id}`, data);
};

/** 학습일지 삭제 */
export const deleteStudyLog = (id) => {
  return axios.delete(`/study-logs/${id}`);
};

/** AI 요약 요청 */
export const summarizeContent = (content) => {
  return axios.post('/study-logs/summary', { content });
};

/** 공개 학습일지 댓글 등록 */
export const postComment = (logId, comment) => {
  return axios.post(`/study-logs/${logId}/comments`, { comment });
};

/** 공개 학습일지 좋아요 */
export const toggleLike = (logId) => {
  return axios.post(`/study-logs/${logId}/like`);
};
