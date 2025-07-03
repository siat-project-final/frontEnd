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
import { getSchedules, addSchedule, updateSchedule, deleteSchedule } from '../../api/schedule';
import Header from '../common/Header';
import Todo from '../common/Todo';
import CalendarModal from './CalendarModal';
import CalendarDetailModal from './CalendarDetailModal';
import CalendarEditModal from './CalendarEditModal';
import FooterBag from './FooterBag';

const CalendarView = () => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const clickTimer = useRef(null);

  function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  const fetchWrittenLogs = async () => {
    try {
      const res = await getMyStudyLogs(memberId);
      const dates = new Set(res.data.map(log => log.studyDate?.split('T')[0]).filter(Boolean));
      setWrittenDates(dates);
    } catch (err) {
      console.error('작성된 학습일지 불러오기 실패:', err);
    }
  };

  const convertJsonToCalendarEvents = (jsonData, writtenDatesSet) => {
    const events = [];
    const stickerDateSet = new Set();

    Object.entries(jsonData).forEach(([date, { subjectList, studyDiaryList, mentoringList, mentoringReservationList, sticker }]) => {
      const normalizedDate = date.split('T')[0];

      if (sticker && !stickerDateSet.has(normalizedDate)) {
        events.push({
          title: '',
          start: date,
          end: date,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textColor: 'transparent',
          extendedProps: { type: 'STICKER', image: sticker }
        });
        stickerDateSet.add(normalizedDate);
      }

      subjectList?.forEach(subject => {
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
        studyDiaryList.forEach(diary => {
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

      mentoringList?.forEach(m => {
        events.push({
          title: `[멘토링] ${m.mentorName}`,
          start: date,
          end: date,
          backgroundColor: '#F1C40F',
          borderColor: '#F1C40F',
          textColor: '#000',
          extendedProps: { type: 'MENTORING', ...m }
        });
      });

      mentoringReservationList?.forEach(r => {
        events.push({
          title: `[멘토링 예약] ${r.mentorName}`,
          start: date,
          end: date,
          backgroundColor: '#F9E79F',
          borderColor: '#F9E79F',
          textColor: '#000',
          extendedProps: { type: 'MENTORING', ...r }
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
      setScheduleEvents(scheduleEvents);
    } catch (error) {
      console.error('일정 데이터 조회 실패:', error);
    }
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
  
  useEffect(() => { fetchWrittenLogs(); }, [memberId]);

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

  const handleDateClick = (arg) => {
    const dateStr = arg.dateStr;
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setSelectionInfo({ start: dateStr, end: dateStr });
      setIsModalOpen(true);
    } else {
      clickTimer.current = setTimeout(() => {
        setSelectedDate(dateStr);
        clickTimer.current = null;
      }, 250);
    }
  };

  const handleEventReceive = (info) => {
    const calendarApi = calendarRef.current.getApi();
    const droppedDate = info.event.startStr;
    const { stickerId, image } = info.event.extendedProps;
    const eventId = `sticker-${stickerId}-${droppedDate}`;
    if (calendarApi.getEventById(eventId)) {
      info.revert();
      return;
    }
    calendarApi.addEvent({
      id: eventId,
      title: '',
      start: droppedDate,
      allDay: true,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: 'transparent',
      extendedProps: { type: 'STICKER', stickerId, image }
    });
    info.event.remove();
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

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
        <style>
          {`
            
            .fc .fc-daygrid-day {
              height: 130px !important;
              
              padding: 0 !important;
            }
            .fc .fc-daygrid-day-frame {
              height: 100% !important;
              padding: 4px !important;
            }
            .fc .fc-scrollgrid-sync-table {
              height: auto !important;
            }

            /* 툴바 */
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

            /* 커스텀 내비게이션 버튼 */
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

            /*  오늘 버튼 스타일 */
            .fc-today-button {
              margin-right: 10px !important;
              background-color: #84cc16 !important;
              border-color: #84cc16 !important;
              color: white !important;
            }

            /* 6번째 줄 강제 제거 */
            .fc-daygrid-body tr:nth-child(6) {
              display: none;
            }
              .selected-cell {
              background-color: #e9ecef !important;
              transition: background-color 0.3s ease;
            }
          `}
          </style>


          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin]}
            initialView="dayGridMonth"
            height="auto"
            headerToolbar={{
              left: 'myPrev',
              center: 'title',
              right: 'myNext today'
            }}
            customButtons={{
              myPrev: { text: '', click: () => calendarRef.current?.getApi().prev() },
              myNext: { text: '', click: () => calendarRef.current?.getApi().next() },
              today: { text: '오늘', click: () => calendarRef.current?.getApi().today() }
            }}
            events={[...serverEvents, ...scheduleEvents].sort((a, b) => eventPriority(b) - eventPriority(a))}
            eventContent={(arg) => {
              const { type, image } = arg.event.extendedProps;
              if (type === 'STICKER' && image) {
                const img = document.createElement('img');
                img.src = image;
                img.style.width = '40px';
                img.style.height = '40px';
                img.style.objectFit = 'contain';
                return { domNodes: [img] };
              }
              return { html: `<div>${arg.event.title}</div>` };
            }}
            dateClick={handleDateClick}
            editable
            droppable
            eventReceive={handleEventReceive}
            eventClick={handleEventClick}
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
            ref={calendarRef}
            displayEventTime={false}
            dayCellClassNames={(arg) => {
              const cellDate = arg.date;
              const yyyy = cellDate.getFullYear();
              const mm = String(cellDate.getMonth() + 1).padStart(2, '0');
              const dd = String(cellDate.getDate()).padStart(2, '0');
              const formattedDate = `${yyyy}-${mm}-${dd}`;
              return formattedDate === selectedDate ? ['selected-cell'] : [];
            }}
          />
          <CalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectionInfo={selectionInfo} onSubmitEvent={handleAddEvent} />
          <CalendarDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} eventInfo={selectedEvent} onEdit={handleEditEvent} onDelete={handleDeleteEvent} onSwitchToEdit={handleEditEvent} />
          <CalendarEditModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} eventInfo={selectedEvent} onSave={handleSaveEdit} />
        </div>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo selectedDate={selectedDate} onTodoChange={() => setLocalTodoTrigger(Date.now())} />
        </div>
      </div>
      <FooterBag />
    </div>
  );
};

export default CalendarView;
