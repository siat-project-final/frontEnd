import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios'; // Axios 인스턴스 가져오기

import Header from '../common/Header';
import Todo from '../common/Todo';
import CalendarModal from './CalendarModal';

const CalendarView = () => {
  const calendarRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarKey, setCalendarKey] = useState(Date.now()); // ✅ 강제 리렌더 키
  const [isModalOpen, setIsModalOpen] = useState(false);

  // [kth] 250622 : 현재 달을 기준으로 요청하기 위한 상태
  const [currentMonthStr, setCurrentMonthStr] = useState('');
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(() => {
  //   // 🗓 오늘 날짜 yyyy-MM-dd 포맷
  //   const today = new Date();
  //   const yyyy = today.getFullYear();
  //   const mm = String(today.getMonth() + 1).padStart(2, '0');
  //   const dd = String(today.getDate()).padStart(2, '0');
  //   return `${yyyy}-${mm}-${dd}`;
  // });
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  
  const [selectedDate, setSelectedDate] = useState(() => {
    return sessionStorage.getItem('selectedDate') || getTodayString();
  });
  const [lastClickedDate, setLastClickedDate] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);
  const [localTodoTrigger, setLocalTodoTrigger] = useState(Date.now());

  const memberId = localStorage.getItem('memberId');

  // [kth] 250622 : api로 불러온 json 데이터를 캘린더 이벤트로 변환하는 함수
  const convertJsonToCalendarEvents = (jsonData) => {
    const events = [];
  
    Object.values(jsonData).forEach(({ date, subjectList, studyDiaryList, mentoringList, mentoringReservationList }) => {
      subjectList.forEach((subject) => {
        events.push({
          title: `[과목] ${subject}`,
          start: date,
          end: date,
          backgroundColor: '#AED6F1',
          borderColor: '#AED6F1',
          textColor: '#000',
          extendedProps: { type: 'SUBJECT' }
        });
      });
  
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
  
      mentoringList.forEach((mentoring) => {
        events.push({
          title: `[멘토링] ${mentoring.mentorName}`,
          start: date,
          end: date,
          backgroundColor: '#F1C40F',
          borderColor: '#F9E79F',
          textColor: '#000',
          extendedProps: { type: 'MENTORING', ...mentoring }
        });
      });
  
      mentoringReservationList.forEach((reservation) => {
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

  // [kth] 250622 : 의존성 배열을 비워놔서 최초 렌더링시에만 조회 api 1회 요청
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        // memberId가 없으면 요청하지 않음
        if (!memberId) {
          console.log('memberId가 없습니다. 로그인이 필요합니다.');
          return;
        }

        // 현재 위치한 달을 기준으로 일정 데이터를 가져오기 위해
        const calendarApi = calendarRef.current?.getApi();
        const currentDate = calendarApi ? calendarApi.getDate() : new Date(); // 현재 캘린더 기준 날짜

        // 파라미터에 추가할 날짜 변환을 위한 로직
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const monthStr = `${yyyy}-${mm}`;

        console.log(`캘린더 데이터 요청: /calendar/schedule/${memberId}/${monthStr}`);

        // 서버에 스케쥴 조회 요청
        const res = await instance.get(`/calendar/schedule/${memberId}/${monthStr}`);
  
        // 앞에 작성한 매핑 함수로 res.data를 캘린더 이벤트로 변환
        const calendarMapped = convertJsonToCalendarEvents(res.data);
  
        setCalendarEvents([...calendarMapped]);
        setCalendarKey(Date.now());
      } catch (error) {
        console.error('캘린더 데이터 조회 실패:', error);
        
        // 서버 에러인 경우 더미 데이터로 대체
        if (error.response?.status === 500 || error.response?.status === 404) {
          console.log('서버 에러로 인해 더미 데이터를 사용합니다.');
          const dummyData = {
            [`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`]: {
              date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`,
              subjectList: ['React', 'JavaScript'],
              studyDiaryList: [{ title: 'React 학습일지' }],
              mentoringList: [{ mentorName: '김멘토' }]
            }
          };
          const calendarMapped = convertJsonToCalendarEvents(dummyData);
          setCalendarEvents([...calendarMapped]);
        }
      }
    };

    fetchCalendarData();
  }, [memberId]); // memberId를 의존성 배열에 추가

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
                width: 200px !important;
                text-align: center !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
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
              }
              
              .fc-myPrev-button {
                left: calc(50% - 120px) !important;
              }

              .fc-myNext-button {
                right: calc(50% - 120px) !important;
              }

              .fc-myPrev-button:focus,
              .fc-myNext-button:focus {
                outline: none !important;
                box-shadow: none !important;
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
                margin-right: 20px !important;
                background-color: #84cc16 !important;
                border-color: #84cc16 !important;
                color: white !important;
              }
            `}
          </style>
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            key={calendarKey} // ✅ 핵심!
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
              resourceTimelinePlugin,
            ]}
            initialView="dayGridMonth"
            customButtons={{
              myPrev: {
                text: '‹',
                click: () => calendarRef.current.getApi().prev(),
              },
              myNext: {
                text: '›',
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
              alert(`이벤트 클릭: ${info.event.title}`);
            }}
            ref={calendarRef}
            height="auto"
              // [kth] 250622 : 달 변경시 조회 api 재요청을 위한 콜백 추가
            datesSet={(arg) => {
              const currentDate = arg.view.currentStart;
              const yyyy = currentDate.getFullYear();
              const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
              const monthStr = `${yyyy}-${mm}`;
            
              // 🔒 이미 같은 달이면 요청 안 보냄
              if (monthStr === currentMonthStr) return;
            
              // memberId가 없으면 요청하지 않음
              if (!memberId) {
                console.log('memberId가 없습니다. 로그인이 필요합니다.');
                return;
              }

              instance
                .get(`/calendar/schedule/${memberId}/${monthStr}`)
                .then((res) => {
                  const calendarMapped = convertJsonToCalendarEvents(res.data);
                  setCalendarEvents(calendarMapped);
                  setCurrentMonthStr(monthStr); // 🔑 마지막으로 요청한 달 저장
                })
                .catch((error) => {
                  console.error('달 변경 시 캘린더 데이터 조회 실패:', error);
                  // 에러가 발생해도 기존 이벤트는 유지
                });
            }}
          />

          <CalendarModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            selectedDate={selectedDate}
          />
        </div>

        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo
            selectedDate={selectedDate}
            onTodoChange={() => setLocalTodoTrigger(Date.now())}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
