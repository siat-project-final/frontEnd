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

const CalendarView = () => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarKey, setCalendarKey] = useState(Date.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonthStr, setCurrentMonthStr] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    return sessionStorage.getItem('selectedDate') || getTodayString();
  });
  const [lastClickedDate, setLastClickedDate] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);
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

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const fetchWrittenLogs = async () => {
    try {
      const res = await getMyStudyLogs(memberId);
      const dates = new Set(
        res.data
          .map((log) => {
            if (!log.studyDate) return null;
            if (typeof log.studyDate === 'string') {
              return log.studyDate.includes('T') ? log.studyDate.split('T')[0] : log.studyDate;
            }
            return null;
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
      const normalizedDate = date.includes('T') ? date.split('T')[0] : date;

      subjectList.forEach((subject) => {
        const color = SUBJECT_COLORS[subject] || SUBJECT_COLORS['기타'];
        events.push({
          title: `[과목] ${subject}`,
          start: date,
          end: date,
          backgroundColor: color,
          borderColor: color,
          textColor: '#000',
          extendedProps: { type: 'SUBJECT', subject }
        });
      });

      if (studyDiaryList.length > 0) {
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
      } else if (subjectList.length > 0 && !writtenDatesSet?.has(normalizedDate)) {
        events.push({
          title: `[미작성] 학습일지`,
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
      setCalendarEvents(calendarMapped);
      setCalendarKey(Date.now());
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

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate);
    sessionStorage.setItem('selectedDate', clickedDate);

    if (lastClickedDate === clickedDate && clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      setLastClickedDate(null);
      setIsModalOpen(true);
    } else {
      const timeout = setTimeout(() => {
        setLastClickedDate(null);
        setClickTimeout(null);
      }, 300);
      setLastClickedDate(clickedDate);
      setClickTimeout(timeout);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            key={calendarKey}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin]}
            initialView="dayGridMonth"
            customButtons={{
              myPrev: {
                text: '',
                click: () => calendarRef.current.getApi().prev(),
              },
              myNext: {
                text: '',
                click: () => calendarRef.current.getApi().next(),
              },
            }}
            headerToolbar={{
              left: 'myPrev',
              center: 'title',
              right: 'myNext today',
            }}
            events={calendarEvents}
            selectable={true}
            dateClick={handleDateClick}
            eventClick={(info) => {
              const { type, diaryId, date } = info.event.extendedProps;
              if (type === 'DIARY') {
                navigate(`/study-log/${diaryId}`);
              } else if (type === 'UNWRITTEN_DIARY') {
                navigate(`/study/write?date=${date}`);
              } else if (type === 'MENTORING') {
                alert(`멘토링: ${info.event.title}`);
              }
            }}
            ref={calendarRef}
            height="auto"
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
          />
          <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={selectedDate} />
        </div>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo selectedDate={selectedDate} onTodoChange={() => setLocalTodoTrigger(Date.now())} />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
