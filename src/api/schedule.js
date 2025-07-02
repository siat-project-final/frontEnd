import axios from './axios';

/** 일정 목록 조회 */
export const getSchedules = (memberId, startDate, endDate) => {
  return axios.get(`/calendar/schedule/${memberId}`, {
    params: { startDate, endDate },
  });
};

/** 일정 상세 조회 */
export const getScheduleById = (scheduleId) => {
  return axios.get(`/calendar/schedule/detail/${scheduleId}`);
};

/** 일정 추가 */
export const addSchedule = (scheduleData) => {
  return axios.post('/calendar/schedule', scheduleData);
};

/** 일정 수정 */
export const updateSchedule = (scheduleId, updatedData) => {
  return axios.put(`/calendar/schedule/${scheduleId}`, updatedData);
};

/** 일정 삭제 */
export const deleteSchedule = (scheduleId) => {
  return axios.delete(`/calendar/schedule/${scheduleId}`);
};

// ========================================
// 로컬 테스트용 코드 (개발 중에만 사용)
// ========================================

// 로컬 테스트용 데이터
let localSchedules = [];
let nextId = 1;

/** 로컬 테스트용 - 일정 목록 조회 */
export const getSchedulesLocal = async (memberId, startDate, endDate) => {
  const filteredSchedules = localSchedules.filter(schedule => 
    schedule.memberId === memberId &&
    schedule.startDatetime >= startDate &&
    schedule.endDatetime <= endDate &&
    !schedule.isDeleted
  );
  
  return {
    data: filteredSchedules,
    status: 200
  };
};

/** 로컬 테스트용 - 일정 상세 조회 */
export const getScheduleByIdLocal = async (scheduleId) => {
  const schedule = localSchedules.find(s => s.scheduleId === scheduleId && !s.isDeleted);
  
  if (!schedule) {
    throw new Error('일정을 찾을 수 없습니다.');
  }
  
  return {
    data: schedule,
    status: 200
  };
};

/** 로컬 테스트용 - 일정 추가 */
export const addScheduleLocal = async (scheduleData) => {
  const newSchedule = {
    scheduleId: nextId++,
    memberId: scheduleData.memberId,
    title: scheduleData.title,
    content: scheduleData.content || '',
    startDatetime: scheduleData.startDatetime,
    endDatetime: scheduleData.endDatetime,
    isAllDay: scheduleData.isAllDay,
    colorCode: scheduleData.colorCode || '#BAFFC9',
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  localSchedules.push(newSchedule);
  
  return {
    data: newSchedule,
    status: 201
  };
};

/** 로컬 테스트용 - 일정 수정 */
export const updateScheduleLocal = async (scheduleId, updatedData) => {
  const scheduleIndex = localSchedules.findIndex(s => s.scheduleId === scheduleId && !s.isDeleted);
  
  if (scheduleIndex === -1) {
    throw new Error('일정을 찾을 수 없습니다.');
  }
  
  const updatedSchedule = {
    ...localSchedules[scheduleIndex],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };
  
  localSchedules[scheduleIndex] = updatedSchedule;
  
  return {
    data: updatedSchedule,
    status: 200
  };
};

/** 로컬 테스트용 - 일정 삭제 */
export const deleteScheduleLocal = async (scheduleId) => {
  const scheduleIndex = localSchedules.findIndex(s => s.scheduleId === scheduleId && !s.isDeleted);
  
  if (scheduleIndex === -1) {
    throw new Error('일정을 찾을 수 없습니다.');
  }
  
  localSchedules[scheduleIndex].isDeleted = true;
  localSchedules[scheduleIndex].updatedAt = new Date().toISOString();
  
  return {
    data: { message: '일정이 삭제되었습니다.' },
    status: 200
  };
};

/** 로컬 데이터 초기화 함수 (테스트용) */
export const resetLocalData = () => {
  localSchedules = [];
  nextId = 1;
};

/** 로컬 데이터 조회 함수 (디버깅용) */
export const getLocalSchedules = () => {
  return localSchedules;
};


