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
import Header from '../common/Header';
import Todo from '../common/Todo';
import CalendarModal from './CalendarModal';
import CalendarDetailModal from './CalendarDetailModal';
import CalendarEditModal from './CalendarEditModal';
import FooterBag from './FooterBag'; // 🟩 feature/shop에서 추가된 부분

const CalendarView = () => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [serverEvents, setServerEvents] = useState([]);
  const [localEvents, setLocalEvents] = useState(() => {
    const savedEvents = localStorage.getItem('localCalendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
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
    }
  }, [writtenDates]);

  useEffect(() => {
    if (location.state?.reload) {
      fetchWrittenLogs();
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem('localCalendarEvents', JSON.stringify(localEvents));
  }, [localEvents]);

  const handleSelect = (selectInfo) => {
    const { startStr, endStr, allDay } = selectInfo;
    const endDate = new Date(endStr);
    if (allDay) endDate.setDate(endDate.getDate() - 1);
    const inclusiveEndStr = endDate.toISOString().split('T')[0];
    setSelectionInfo({ start: startStr, end: inclusiveEndStr });
    setIsModalOpen(true);
    selectInfo.view.calendar.unselect();
  };

  const handleAddEvent = (eventData) => {
    const dateOnly = (dateStr) => dateStr.split('T')[0];
    const newId = `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setLocalEvents(prev => [...prev, {
      ...eventData,
      id: newId,
      start: dateOnly(eventData.start),
      end: dateOnly(eventData.end),
      allDay: true
    }]);
  };

  const handleEventClick = (clickInfo) => {
    const { type } = clickInfo.event.extendedProps;
    if (type === 'USER_ADDED') {
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

  const handleEventReceive = (info) => {
    const calendarApi = calendarRef.current.getApi();
    const droppedDate = info.event.startStr;
    const { stickerId, image } = info.event.extendedProps;
    const eventId = `sticker-${stickerId}-${droppedDate}`;
    if (calendarApi.getEventById(eventId)) {
      console.log('중복 스티커: 추가하지 않음');
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
    info.event.remove(); // 드래그 원본 제거
  };

  const handleEditEvent = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setLocalEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
      handleCloseDetailModal();
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEdit = (updatedEventData) => {
    const dateOnly = (dateStr) => dateStr.split('T')[0];
    if (selectedEvent) {
      setLocalEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { 
              ...event, 
              title: updatedEventData.title, 
              start: dateOnly(updatedEventData.start),
              end: dateOnly(updatedEventData.end),
              allDay: true,
              backgroundColor: updatedEventData.backgroundColor,
              borderColor: updatedEventData.borderColor,
              textColor: updatedEventData.textColor,
              extendedProps: {
                ...event.extendedProps,
                content: updatedEventData.extendedProps?.content
              }
            }
          : event
      ));
    }
    handleCloseEditModal();
  };

  const eventPriority = (event) => {
    const type = event.extendedProps?.type;
    if (type === 'SUBJECT') return 1;
    if (type === 'MENTORING') return 2;
    if (type === 'UNWRITTEN_DIARY') return 3;
    if (type === 'USER_ADDED') return 4;
    return 99;
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin]}
            initialView="dayGridMonth"
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
            events={[...serverEvents, ...localEvents].sort((a, b) => eventPriority(b) - eventPriority(a))}
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
            eventClick={handleEventClick}
            select={handleSelect}
            selectable={true}
            editable={true}
            droppable={true}
            eventReceive={handleEventReceive}
            datesSet={(arg) => {
              const currentDate = arg.view.currentStart;
              const yyyy = currentDate.getFullYear();
              const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
              const monthStr = `${yyyy}-${mm}`;
              if (monthStr !== currentMonthStr && writtenDates !== null) {
                fetchCalendarData(monthStr, writtenDates);
                setCurrentMonthStr(monthStr);
              }
            }}
            ref={calendarRef}
            displayEventTime={false}
          />
          <CalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectionInfo={selectionInfo} onSubmitEvent={handleAddEvent} />
          <CalendarDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} eventInfo={selectedEvent} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
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
