import axios from './axios';

/** 오늘의 챌린지 문제 조회 */
export const getTodayChallenge = (userId) => {
  return axios.get('/challenges/questions', {
    params: { userId },
  });
};

/** 챌린지 문제 제출 */
export const submitChallenge = (problemId, memberId, submitAnswer) => {
  return axios.post('/challenges/submit', {
    problemId,
    memberId,
    submitAnswer,
  });
};

/** 챌린지 히스토리 전체 조회 */
export const getChallengeHistory = (memberId) => {
  return axios.get('/challenges/history', {
    params: { memberId },
  });
};

/** 챌린지 히스토리 상세 조회 */
export const getChallengeHistoryByDate = (date) => {
  return axios.get(`/challenges/history/${date}`);
};

/** 일일 랭킹 조회 */
export const getDailyRanking = (date) => {
  return axios.get('/challenges/ranking', {
    params: { date },
  });
};

/** 챌린지 참여 여부 확인 */
export const checkParticipation = (memberId, date) => {
  return axios.get('/submissions/check', {
    params: { memberId, date },
  });
};

/** 채점 결과 조회 */
export const getSubmissionResult = (memberId, subject) => {
  return axios.get('/submissions/result', {
    params: { memberId, subject },
  });
};

/** 복습 과목 목록 조회 */
export const getReviewSubjects = (memberId) => {
  return axios.get('/review/subjects', {
    params: { memberId },
  });
};

/** 복습 문제 랜덤 조회 */
export const getReviewProblems = (memberId, subject) => {
  return axios.get('/review/problems', {
    params: { memberId, subject },
  });
};


// 주요 요청 예시
// /api/challenges/questions?userId=5

// /api/challenges/submit { problemId: 1, memberId: 5, submitAnswer: "B" }

// /api/submissions/check?memberId=5&date=2025-06-19