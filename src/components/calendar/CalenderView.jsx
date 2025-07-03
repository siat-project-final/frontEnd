import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import instance from '../../api/axios';
import { getMyStudyLogs } from '../../api/studyLog';
import { 
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule
} from '../../api/schedule';
import Header from '../common/Header';
import Todo from '../common/Todo';
import CalendarModal from './CalendarModal';
import CalendarDetailModal from './CalendarDetailModal';
import CalendarEditModal from './CalendarEditModal';

const CalendarView = () => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [serverEvents, setServerEvents] = useState([]);
  const [scheduleEvents, setScheduleEvents] = useState([]);
  const [calendarKey, setCalendarKey] = useState(Date.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonthStr, setCurrentMonthStr] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    return sessionStorage.getItem('selectedDate') || getTodayString();
  });
  const [selectionInfo, setSelectionInfo] = useState(null);
  const [localTodoTrigger, setLocalTodoTrigger] = useState(Date.now());

  const memberId = localStorage.getItem('memberId');
  const [writtenDates, setWrittenDates] = useState(null);

  const SUBJECT_COLORS = {
    Python: '#85C1E9',
    Java: '#F7DC6F',
    JavaScript: '#F5B041',
    C: '#A9DFBF',
    기타: '#D7DBDD',
  };

  const fetchWrittenLogs = async () => {
    try {
      const res = await getMyStudyLogs(memberId);
      const dates = new Set(
        res.data
          .map((log) => {
            if (!log.studyDate) return null;
            return log.studyDate.split('T')[0];
          })
          .filter(Boolean)
      );
      setWrittenDates(dates);
    } catch (err) {
      console.error('작성된 학습일지 불러오기 실패:', err);
    }
  };

  const convertJsonToCalendarEvents = (jsonData, writtenDatesSet) => {
    const events = [];

    Object.entries(jsonData).forEach(([date, { subjectList, studyDiaryList, mentoringList, mentoringReservationList }]) => {
      const normalizedDate = date.split('T')[0];

      subjectList?.forEach((subject) => {
        const color = SUBJECT_COLORS[subject] || SUBJECT_COLORS['기타'];
        events.push({
          title: `${subject}`,
          start: date,
          end: date,
          backgroundColor: color,
          borderColor: color,
          textColor: '#000',
          extendedProps: { type: 'SUBJECT', subject }
        });
      });

      if (studyDiaryList?.length > 0) {
        studyDiaryList.forEach((diary) => {
          events.push({
            title: `[일지] ${diary.title || '학습일지'}`,
            start: date,
            end: date,
            backgroundColor: '#ABEBC6',
            borderColor: '#ABEBC6',
            textColor: '#000',
            extendedProps: { type: 'DIARY', ...diary }
          });
        });
      } else if (subjectList?.length > 0 && !writtenDatesSet?.has(normalizedDate)) {
        events.push({
          title: `학습일지 미작성`,
          start: date,
          end: date,
          backgroundColor: '#F1948A',
          borderColor: '#F1948A',
          textColor: '#000',
          extendedProps: { type: 'UNWRITTEN_DIARY', date }
        });
      }

      mentoringList?.forEach((mentoring) => {
        events.push({
          title: `[멘토링] ${mentoring.mentorName}`,
          start: date,
          end: date,
          backgroundColor: '#F1C40F',
          borderColor: '#F1C40F',
          textColor: '#000',
          extendedProps: { type: 'MENTORING', ...mentoring }
        });
      });

      mentoringReservationList?.forEach((reservation) => {
        events.push({
          title: `[멘토링 예약] ${reservation.mentorName}`,
          start: date,
          end: date,
          backgroundColor: '#F9E79F',
          borderColor: '#F9E79F',
          textColor: '#000',
          extendedProps: { type: 'MENTORING', ...reservation }
        });
      });
    });

    return events;
  };

  const fetchCalendarData = async (monthStr, writtenDatesSet) => {
    try {
      if (!memberId) return;
      const res = await instance.get(`/calendar/schedule/${memberId}/${monthStr}`);
      const calendarMapped = convertJsonToCalendarEvents(res.data, writtenDatesSet);
      setServerEvents(calendarMapped);
    } catch (error) {
      console.error('캘린더 데이터 조회 실패:', error);
    }
  };

  const fetchScheduleData = async (monthStr) => {
    try {
      if (!memberId) return;
      
      const [year, month] = monthStr.split('-');
      const startDate = `${monthStr}-01`;
      const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
      const endDate = `${monthStr}-${lastDay}`;
      
      const res = await getSchedules(memberId, startDate, endDate);
      console.log('일정 응답 데이터:', res.data);
      const scheduleEvents = res.data.map(schedule => ({
        id: schedule.scheduleId,
        title: schedule.title,
        start: schedule.startDatetime,
        end: schedule.endDatetime,
        allDay: schedule.isAllDay,
        backgroundColor: schedule.colorCode || '#BAFFC9',
        borderColor: schedule.colorCode || '#BAFFC9',
        textColor: '#000',
        extendedProps: { 
          type: 'SCHEDULE',
          content: schedule.content,
          scheduleId: schedule.scheduleId
        }
      }));
      console.log('변환된 일정', scheduleEvents);
      setScheduleEvents(scheduleEvents);
    } catch (error) {
      console.error('일정 데이터 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchWrittenLogs();
  }, [memberId]);

  useEffect(() => {
    if (writtenDates !== null) {
      const calendarApi = calendarRef.current?.getApi();
      const currentDate = calendarApi ? calendarApi.getDate() : new Date();
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const monthStr = `${yyyy}-${mm}`;
      fetchCalendarData(monthStr, writtenDates);
      fetchScheduleData(monthStr);
    }
  }, [writtenDates]);

  useEffect(() => {
    if (location.state?.reload) {
      fetchWrittenLogs();
    }
  }, [location.state]);

  const handleSelect = (selectInfo) => {
    const { startStr, endStr, allDay } = selectInfo;
    const endDate = new Date(endStr);
    if (allDay) {
      endDate.setDate(endDate.getDate() - 1);
    }
    const inclusiveEndStr = endDate.toISOString().split('T')[0];
    
    setSelectionInfo({ start: startStr, end: inclusiveEndStr });
    setIsModalOpen(true);

    selectInfo.view.calendar.unselect();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectionInfo(null);
  };


  const handleAddEvent = async (eventData) => {
    try {
      const scheduleData = {
        memberId: parseInt(memberId),
        title: eventData.title,
        content: eventData.extendedProps?.content || '',
        startDatetime: eventData.start,
        endDatetime: eventData.end,
        isAllDay: eventData.allDay,
        colorCode: eventData.backgroundColor
      };
  
      const res = await addSchedule(scheduleData);
      const calendarApi = calendarRef.current?.getApi();
      const currentDate = calendarApi ? calendarApi.getDate() : new Date();
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const monthStr = `${yyyy}-${mm}`;
  
      await fetchScheduleData(monthStr);
  
      setIsModalOpen(false);
  
    } catch (error) {
      console.error('일정 추가 실패:', error);
      alert('일정 추가에 실패했습니다.');
    }
  };
  

  const handleEventClick = (clickInfo) => {
    const { type } = clickInfo.event.extendedProps;
    if (type === 'SCHEDULE') {
      setSelectedEvent(clickInfo.event);
      setIsDetailModalOpen(true);
    } else if (type === 'DIARY') {
      navigate(`/study-log/${clickInfo.event.extendedProps.diaryId}`);
    } else if (type === 'UNWRITTEN_DIARY') {
      navigate(`/study/write?date=${clickInfo.event.extendedProps.date}`);
    } else if (type === 'MENTORING') {
      alert(`멘토링: ${clickInfo.event.title}`);
    }
  };




  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        const scheduleId = selectedEvent.extendedProps.scheduleId;
        await deleteSchedule(scheduleId);
  
        const calendarApi = calendarRef.current?.getApi();
        const currentDate = calendarApi ? calendarApi.getDate() : new Date();
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const monthStr = `${yyyy}-${mm}`;
  
        await fetchScheduleData(monthStr);
  
        handleCloseDetailModal();
        
      } catch (error) {
        console.error('일정 삭제 실패:', error);
        alert('일정 삭제에 실패했습니다.');
      }
    }
  };
  
  const handleEditEvent = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSwitchToEdit = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEdit = async (updatedEventData) => {
    try {
      const scheduleId = Number(selectedEvent.extendedProps.scheduleId); 
  
      if (!scheduleId) {
        alert('일정 ID가 없습니다.');
        return;
      }
  
      const updateData = {
        title: updatedEventData.title,
        content: updatedEventData.extendedProps?.content || '',
        startDatetime: updatedEventData.start,
        endDatetime: updatedEventData.end,
        isAllDay: updatedEventData.allDay,
        colorCode: updatedEventData.backgroundColor
      };
  
      await updateSchedule(scheduleId, updateData);
  
      const calendarApi = calendarRef.current?.getApi();
      const currentDate = calendarApi ? calendarApi.getDate() : new Date();
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const monthStr = `${yyyy}-${mm}`;
  
      await fetchScheduleData(monthStr);
  
      handleCloseEditModal();
      
    } catch (error) {
      console.error('일정 수정 실패:', error);
      alert('일정 수정에 실패했습니다.');
    }
  };
  

  const eventPriority = (event) => {
    const type = event.extendedProps?.type;
    if (type === 'SUBJECT') return 1;
    if (type === 'MENTORING') return 2;
    if (type === 'UNWRITTEN_DIARY') return 3;
    if (type === 'SCHEDULE') return 4;
    return 99;
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>

          <style>
            {`

              .fc .fc-daygrid-body-natural .fc-daygrid-day-frame {
                min-height: 130px; /* 원하는 높이로 조절 */
              }
              .fc .fc-toolbar {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                margin-bottom: 16px !important;
                position: relative !important;
                height: 60px !important;
              }

              .fc .fc-toolbar-title {
                font-size: 24px !important;
                font-weight: bold !important;
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) !important;
                max-width: none !important;
                padding: 0 16px !important;
                white-space: nowrap !important;
                overflow: visible !important;
                text-overflow: unset !important;
                text-align: center !important;

              }

              .fc-myPrev-button,
              .fc-myNext-button {
                background: none !important;
                border: none !important;
                width: 24px !important;
                height: 32px !important;
                cursor: pointer !important;
                position: absolute !important;
                top: 52% !important;
                transform: translateY(-50%) !important;
                z-index: 1 !important;
                outline: none !important;
                box-shadow: none !important;
              }

              .fc-myPrev-button {
                left: calc(50% - 250px) !important;
              }

              .fc-myNext-button {
                right: calc(50% - 250px) !important;
              }

              .fc-myPrev-button::before,
              .fc-myNext-button::before {
                content: '' !important;
                position: absolute !important;
                top: 52% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 24px !important;
                height: 24px !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
              }

              .fc-myPrev-button::before {
                background-image: url('/assets/img/mentors/chevron-left.png') !important;
              }

              .fc-myNext-button::before {
                background-image: url('/assets/img/mentors/chevron-right.png') !important;
              }

              .fc-today-button {
                margin-right: 10px !important;
                background-color: #84cc16 !important;
                border-color: #84cc16 !important;
                color: white !important;
              }
              .fc-daygrid-body tr:nth-child(6) {
                display: none;
              }
            `}
          </style>

          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin]}
            initialView="dayGridMonth"
            fixedWeekCount={true}
            customButtons={{
              myPrev: {
                text: '',
                click: () => {
                  const calendarApi = calendarRef.current?.getApi();
                  console.log('[이전 달 버튼 클릭됨]');
                  if (!calendarApi) {
                    console.error('[myPrev] calendarApi is undefined');
                    return;
                  }
                  calendarApi.prev();
                  console.log('[myPrev] calendar 이동 완료');
                }
              },
              myNext: {
                text: '',
                click: () => {
                  const calendarApi = calendarRef.current?.getApi();
                  console.log('[다음 달 버튼 클릭됨]');
                  if (!calendarApi) {
                    console.error('[myNext] calendarApi is undefined');
                    return;
                  }
                  calendarApi.next();
                  console.log('[myNext] calendar 이동 완료');
                }
              },
              myToday: {
                text: '오늘',
                click: () => {
                  const calendarApi = calendarRef.current?.getApi();
                  console.log('[오늘 버튼 클릭됨]');
                  if (!calendarApi) {
                    console.error('[myToday] calendarApi is undefined');
                    return;
                  }
                  calendarApi.today();
                  console.log('[myToday] 오늘로 이동 완료');
                }
              }
            }}
            eventDidMount={(info) => {
              const { type } = info.event.extendedProps;
            
              if (type === 'SCHEDULE') {
                const el = info.el;
                el.style.border = 'none';
                el.style.borderRadius = '6px';
                el.style.padding = '2px 6px';
                el.style.display = 'inline-block';
                el.style.maxWidth = '100%';
                el.style.whiteSpace = 'nowrap';
                el.style.overflow = 'hidden';
                el.style.textOverflow = 'ellipsis';
                el.style.color = '#000';
              }
            }}
            headerToolbar={{
              left: 'myPrev',
              center: 'title',
              right: 'myNext today',
            }}
            dayCellClassNames={(arg) => {
              const day = arg.date.getDay();
              if (day === 0) return ['fc-sunday'];
              if (day === 6) return ['fc-saturday'];
              return [];
            }}
            events={[...serverEvents, ...scheduleEvents].sort((a, b) => eventPriority(b) - eventPriority(a))}
            selectable={true}
            select={handleSelect}
            eventClick={handleEventClick}
            ref={calendarRef}
            height="auto"
            datesSet={(arg) => {
              const currentDate = arg.view.currentStart;
              const yyyy = currentDate.getFullYear();
              const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
              const monthStr = `${yyyy}-${mm}`;
              if (monthStr !== currentMonthStr && writtenDates !== null) {
                fetchCalendarData(monthStr, writtenDates);
                fetchScheduleData(monthStr);
                setCurrentMonthStr(monthStr);
              }
            }}
            displayEventTime={false}
            eventTimeFormat={false}
            eventDisplay="block"
          />

          <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal} selectionInfo={selectionInfo} onSubmitEvent={handleAddEvent}/>
          <CalendarDetailModal
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            eventInfo={selectedEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            onSwitchToEdit={handleSwitchToEdit}
          />
          <CalendarEditModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            eventInfo={selectedEvent}
            onSave={handleSaveEdit}
            onCancel={() => {
              setIsEditModalOpen(false);
              setIsDetailModalOpen(true);
            }}
          />
        </div>

        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo selectedDate={selectedDate} onTodoChange={() => setLocalTodoTrigger(Date.now())} />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

