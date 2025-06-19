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

import { getEvents } from '../../api/schedule';
import { getTodos } from '../../api/todo';

const CalendarView = () => {
  const calendarRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [lastClickedDate, setLastClickedDate] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);
  const [localTodoTrigger, setLocalTodoTrigger] = useState(Date.now()); // ✅ local todo 변경 감지

  const memberId = sessionStorage.getItem('memberId');

  // ✅ localStorage 기반 Todo도 캘린더에 표시
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
        type: 'LOCAL_TODO',
        isChecked: todo.status,
      },
    }));
  };

  useEffect(() => {
  const fetchCalendarData = async () => {
    try {
      const today = new Date();
      const startDate = today.toISOString().slice(0, 10);
      const endDate = new Date(today.setDate(today.getDate() + 30)).toISOString().slice(0, 10);

      const [eventRes /* , todoRes */] = await Promise.all([
        getEvents(memberId, startDate, endDate),
        // getTodos(memberId, startDate, null), // ✅ 서버 연동용 (2안)
      ]);

      const calendarMapped = eventRes.data.map((event) => ({
        title: event.title,
        start: event.date,
        end: event.date,
        extendedProps: {
          type: event.type,
          contents: event.contents,
          relatedId: event.relatedId,
          redirectUrl: event.redirectUrl,
        },
      }));

      // ✅ 1안: localStorage 기반 todo 가져오기
      const todoLocal = JSON.parse(localStorage.getItem('todo-list')) || [];
      const todoMapped = todoLocal.map((todo) => ({
        title: `[TODO] ${todo.item}`,
        start: todo.date,
        end: todo.date,
        backgroundColor: '#F8C471',
        borderColor: '#F8C471',
        textColor: '#000',
        extendedProps: {
          type: 'TODO',
          isChecked: todo.status,
        },
      }));

      // ✅ 2안: 서버에서 받은 투두 (추후 연동 시 사용)
      // const todoMapped = todoRes.data.map((todo) => ({
      //   title: `[TODO] ${todo.contents}`,
      //   start: todo.date,
      //   end: todo.date,
      //   backgroundColor: '#F8C471',
      //   borderColor: '#F8C471',
      //   textColor: '#000',
      //   extendedProps: {
      //     type: 'TODO',
      //     isChecked: todo.isChecked,
      //   },
      // }));

      setCalendarEvents([...calendarMapped, ...todoMapped]);
    } catch (error) {
      console.error('일정 및 투두 불러오기 실패:', error);
    }
  };

  if (memberId) fetchCalendarData();
}, [memberId, localTodoTrigger]);


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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <FullCalendar
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

        {/* ⬇️ local todo 변경 감지 props도 같이 전달 (선택사항) */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo selectedDate={selectedDate} onTodoChange={() => setLocalTodoTrigger(Date.now())} />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
