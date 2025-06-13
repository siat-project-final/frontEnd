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
