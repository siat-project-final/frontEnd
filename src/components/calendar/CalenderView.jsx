// FullCalendar 관련 컴포넌트
import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // scheduler용

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/resource-timeline/main.css";

const CalendarView = () => {
  const calendarRef = useRef(null);

  return (
    <div>
      <h2>FullCalendar Advanced</h2>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,resourceTimelineDay",
        }}
        views={{
          resourceTimelineDay: {
            type: "resourceTimeline",
            duration: { days: 1 },
            buttonText: "Mentoring Timeline",
          },
        }}
        resources={[
          { id: "1", title: "멘토 김코딩" },
          { id: "2", title: "멘토 이자바" },
        ]}
        events={[
          {
            title: "멘토링 세션 A",
            start: "2025-06-14T10:00:00",
            end: "2025-06-14T11:00:00",
            resourceId: "1",
          },
          {
            title: "멘토링 세션 B",
            start: "2025-06-14T13:00:00",
            end: "2025-06-14T14:00:00",
            resourceId: "2",
          },
        ]}
        selectable={true}
        dateClick={(info) => {
          alert(`날짜 클릭: ${info.dateStr}`);
        }}
        eventClick={(info) => {
          alert(`이벤트 클릭: ${info.event.title}`);
        }}
        ref={calendarRef}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;
