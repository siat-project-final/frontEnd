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
  
    Object.values(jsonData).forEach(({ date, subjectList, studyDiaryList, mentoringList, todoList }) => {
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
          backgroundColor: '#F9E79F',
          borderColor: '#F9E79F',
          textColor: '#000',
          extendedProps: { type: 'MENTORING', ...mentoring }
        });
      });

      todoList.forEach((todo) => {
        events.push({
          title: `[todo] ${todo.contents}`,
          start: date,
          end: date,
          backgroundColor: '#D7BDE2',
          borderColor: '#D7BDE2',     
          textColor: '#000',
          extendedProps: { type: 'TODO', ...todo }
        });
      });
    });
  
    return events;
  };

  // [kth] 250622 : 의존성 배열을 비워놔서 최초 렌더링시에만 조회 api 1회 요청
  useEffect(() => {
    const fetchCalendarData = async () => {
        // 현재 위치한 달을 기준으로 일정 데이터를 가져오기 위해
        const calendarApi = calendarRef.current?.getApi();
        const currentDate = calendarApi ? calendarApi.getDate() : new Date(); // 현재 캘린더 기준 날짜

        // 파라미터에 추가할 날짜 변환을 위한 로직
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const monthStr = `${yyyy}-${mm}`;

        // 서버에 스케쥴 조회 요청
        const res = await instance.get(`/calendar/schedule/${memberId}/${monthStr}`);
  
        // 앞에 작성한 매핑 함수로 res.data를 캘린더 이벤트로 변환
        const calendarMapped = convertJsonToCalendarEvents(res.data);
  
        setCalendarEvents([...calendarMapped]);
        setCalendarKey(Date.now());
    };

    fetchCalendarData();
  }, []);

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
            
              instance
                .get(`/calendar/schedule/${memberId}/${monthStr}`)
                .then((res) => {
                  const calendarMapped = convertJsonToCalendarEvents(res.data);
                  setCalendarEvents(calendarMapped);
                  setCurrentMonthStr(monthStr); // 🔑 마지막으로 요청한 달 저장
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
