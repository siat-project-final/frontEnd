import axios from './axios';

/** 알림 조회 */
export const getNotifications = (memberId) => {
  return axios.get('/notifications', {
    params: { memberId },
  });
};

/** 알림 삭제 */
export const deleteNotification = (notificationId) => {
  return axios.delete(`/notifications/${notificationId}`);
};

// 요청 예시
// GET /api/notifications?memberId=3

// DELETE /api/notifications/21