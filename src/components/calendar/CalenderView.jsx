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

  // 더블클릭 감지용
  const [lastClickedDate, setLastClickedDate] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;

    // 동일 날짜를 빠르게 두 번 클릭했을 경우
    if (lastClickedDate === clickedDate && clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      setLastClickedDate(null);

      setSelectedDate(clickedDate);
      setIsModalOpen(true); // 더블클릭 시 모달 열림
    } else {
      // 첫 번째 클릭 처리
      const timeout = setTimeout(() => {
        setLastClickedDate(null);
        setClickTimeout(null);
      }, 300); // 300ms 이내 두 번째 클릭 시 더블클릭으로 간주

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
            icon: 'chevron-left',
          },
          myNext: {
            text: '',
            click: () => calendarRef.current.getApi().next(),
            icon: 'chevron-right',
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
        dateClick={handleDateClick} // 더블클릭 감지 함수 연결
        eventClick={(info) => {
          alert(`이벤트 클릭: ${info.event.title}`);
        }}
        ref={calendarRef}
        height="auto"
      />
      <style>
        {`
        /* 요일 헤더 셀 배경 */
        .fc .fc-col-header-cell {
          background-color: #5FCF80 !important;
          text-align: center;
        }

        /* 요일 텍스트 색상 (a 태그) */
        .fc .fc-col-header-cell a {
          color: #ffffff !important;
          font-weight: bold;
          text-decoration: none;
        }

        /* 글자 크기 및 패딩 조정 */
        .fc .fc-col-header-cell-cushion {
          padding: 8px 0;
          font-size: 14px;
        }

        .fc .fc-day-today {
          background-color: #f0f0f0 !important;
        }

        /* 날짜 셀 높이 고정 */
        .fc .fc-daygrid-day-frame {
          min-height: 100px;
          height: 100px;
        }

        /* today 셀도 동일한 높이 유지 */
        .fc .fc-day-today .fc-daygrid-day-frame {
          min-height: 100px;
          height: 100px;
        }

        .fc .fc-toolbar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .fc .fc-toolbar-title {
          position: relative;
          left: 0;
          transform: none;
          margin: 0;
        }

        /* 커스텀 버튼 스타일 */
        .fc-myPrev-button,
        .fc-myNext-button {
          background: none !important;
          border: none !important;
          position: relative;
          width: 30px !important;
          height: 30px !important;
          padding: 0 !important;
          box-shadow: none !important;
          margin: 0 !important;
        }

        .fc-myPrev-button:hover,
        .fc-myNext-button:hover {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
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

        /* Today 버튼 스타일 */
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

        .fc .fc-toolbar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          justify-items: center;
        }

        .fc .fc-toolbar > .fc-toolbar-chunk:first-child,
        .fc .fc-toolbar > .fc-toolbar-chunk:last-child {
          width: 120px;
        }

        .fc .fc-toolbar-title {
          text-align: center;
        }

        `}
      </style>

      <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={selectedDate} />
    </div>
  );
};

export default CalendarView;
