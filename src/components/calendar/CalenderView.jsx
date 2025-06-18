import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import Header from '../common/Header';
import CalendarModal from './CalendarModal';

const CalendarView = () => {
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [lastClickedDate, setLastClickedDate] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    if (lastClickedDate === clickedDate && clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      setLastClickedDate(null);
      setSelectedDate(clickedDate);
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
    setSelectedDate(null);
  };

  return (
    <div>
      <Header />
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
        views={{
          resourceTimelineDay: {
            type: 'resourceTimeline',
            duration: { days: 1 },
            buttonText: 'Mentoring Timeline',
          },
        }}
        resources={[
          { id: '1', title: '멘토 김코딩' },
          { id: '2', title: '멘토 이자바' },
        ]}
        events={[
          {
            title: '멘토링 세션 A',
            start: '2025-06-14T10:00:00',
            end: '2025-06-14T11:00:00',
            resourceId: '1',
          },
          {
            title: '멘토링 세션 B',
            start: '2025-06-14T13:00:00',
            end: '2025-06-14T14:00:00',
            resourceId: '2',
          },
        ]}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={(info) => {
          alert(`이벤트 클릭: ${info.event.title}`);
        }}
        ref={calendarRef}
        height="auto"
      />

      <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={selectedDate} />

      {/* 인라인 스타일은 별도 파일로 분리 권장 */}
      <style>
        {`
          .fc .fc-col-header-cell {
            background-color: #5FCF80 !important;
            text-align: center;
          }
          .fc .fc-col-header-cell a {
            color: #ffffff !important;
            font-weight: bold;
            text-decoration: none;
          }
          .fc .fc-col-header-cell-cushion {
            padding: 8px 0;
            font-size: 14px;
          }
          .fc .fc-day-today {
            background-color: #f0f0f0 !important;
          }
          .fc .fc-daygrid-day-frame {
            min-height: 100px;
            height: 100px;
          }
          .fc .fc-day-today .fc-daygrid-day-frame {
            min-height: 100px;
            height: 100px;
          }
          .fc .fc-toolbar {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            justify-items: center;
          }
          .fc .fc-toolbar-title {
            text-align: center;
          }
          .fc-myPrev-button,
          .fc-myNext-button {
            background: none !important;
            border: none !important;
            width: 30px !important;
            height: 30px !important;
            padding: 0 !important;
            box-shadow: none !important;
            margin: 0 !important;
            position: relative;
          }
          .fc-myPrev-button::before,
          .fc-myNext-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }
          .fc-myPrev-button::before {
            background-image: url('/assets/img/mentors/chevron-left.png');
          }
          .fc-myNext-button::before {
            background-image: url('/assets/img/mentors/chevron-right.png');
          }
          .fc-today-button {
            background-color: #5FCF80 !important;
            border-color: #5FCF80 !important;
            color: white !important;
            padding: 4px 12px !important;
            font-size: 14px !important;
          }
          .fc-today-button:hover {
            background-color: #4db870 !important;
            border-color: #4db870 !important;
          }
        `}
      </style>
    </div>
  );
};

export default CalendarView;
