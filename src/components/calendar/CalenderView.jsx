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

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

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
          title: `[과목] ${subject}`,
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
      // setCalendarKey(Date.now());
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
        {/* <div
          style={{
            width: '1700px',           // 캘린더 너비 고정
            margin: '0 auto',          // 가운데 정렬 (좌우 여백 자동)
            padding: '0 20px',         // 내부 여백
          }}
        > */}

          <style>
            {`
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
                margin-right: 450px !important;
                background-color: #84cc16 !important;
                border-color: #84cc16 !important;
                color: white !important;
              }
            `}
          </style>

          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            // key={calendarKey}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin]}
            initialView="dayGridMonth"
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
