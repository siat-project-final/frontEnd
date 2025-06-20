import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import Header from '../common/Header';
import Todo from '../common/Todo';
import CalendarModal from './CalendarModal';

const CalendarView = () => {
  const calendarRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarKey, setCalendarKey] = useState(Date.now()); // ✅ 강제 리렌더 키
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const memberId = sessionStorage.getItem('memberId');

  const getLocalTodos = () => {
    const data = JSON.parse(localStorage.getItem('todo-list')) || [];
    return data.map((todo) => ({
      title: `[TODO] ${todo.item}`,
      start: todo.date,
      end: todo.date,
      backgroundColor: '#F9E79F',
      borderColor: '#F9E79F',
      textColor: '#000',
      extendedProps: {
        type: 'TODO',
        isChecked: todo.status,
      },
    }));
  };

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        // 👉 백엔드 API 호출 막아둠
        // const today = new Date();
        // const startDate = today.toISOString().slice(0, 10);
        // const endDate = new Date(today.setDate(today.getDate() + 30)).toISOString().slice(0, 10);
        // const [eventRes] = await Promise.all([
        //   getEvents(memberId, startDate, endDate),
        // ]);

        const calendarMapped = []; // 임시로 이벤트 없음
        const localTodos = getLocalTodos();

        setCalendarEvents([...calendarMapped, ...localTodos]);
        setCalendarKey(Date.now()); // ✅ 리렌더링 트리거
      } catch (error) {
        console.error('일정 및 투두 불러오기 실패:', error);
      }
    };

    if (memberId) fetchCalendarData();
  }, [memberId, localTodoTrigger]); // ✅ todo 바뀌면 다시 불러옴

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
