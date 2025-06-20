import axios from './axios';

/** 일정 목록 조회 */
export const getEvents = (memberId, startDate, endDate) => {
  return axios.get(`/calendar/events/${memberId}`, {
    params: { startDate, endDate },
  });
};

// [
//   {
//     "type": "MENTORING",
//     "title": "김민지 멘토링",
//     "contents": "AI 프로젝트 피드백",
//     "date": "2025-06-11",
//     "relatedId": 102,
//     "redirectUrl": "/mentoring/102"
//   }
// ]
