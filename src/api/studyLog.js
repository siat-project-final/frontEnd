import axios from './axios';

/** 내 학습일지 전체 조회 */
export const getMyStudyLogs = (memberId) => {
  return axios.get(`/study-diary/member/${memberId}`); // subject, memberId, isPublic 등
};

/** 내 학습일지 상세 조회 */
export const getMyStudyLogById = (diaryId) => {
  return axios.get(`/study-diary/${diaryId}`);
};

/** 학습일지 작성 */
export const postStudyLog = (data) => {
  return axios.post('/study-diary', data);
};

/** 학습일지 수정 */
export const updateStudyLog = (diaryId, data) => {
  return axios.put(`/study-diary/${diaryId}`, data);
};

/** 학습일지 삭제 */
export const deleteStudyLog = (diaryId, memberId) => {
  return axios.delete(`/study-diary/${diaryId}`, {
    params: { memberId },
  });
};

/** AI 요약 생성 */
export const summarizeContent = (content) => {
  return axios.post('/study-diary/ai-summary', { text: content });
};

/** 공개 학습일지 전체 조회 */
export const getPublicStudyLogs = (params) => {
  return axios.get('/study-diary/public', { params }); // isPublic, subject, memberId 등
};

/** 공개 학습일지 상세 조회 (댓글+좋아요 포함) */
export const getPublicStudyLogDetail = (diaryId) => {
  return axios.get(`/study-diary/${diaryId}`);
};

/** 좋아요 등록 */
export const likePublicStudyLog = (diaryId, memberId) => {
  return axios.post(`/study-diary/${diaryId}/likes`, { memberId });
};

/** 댓글 작성 */
export const commentOnStudyLog = (diaryId, memberId, contents) => {
  return axios.post(`/study-diary/${diaryId}/comments`, {
    memberId,
    contents,
  });
};


// 요청 예시
// GET /api/study-logs/public?subject=AI&isPublic=true

// POST /api/study-logs/3/comments { memberId: 5, contents: "좋은 글입니다!" }