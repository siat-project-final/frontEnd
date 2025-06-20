// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// const CalendarPage = () => {
//   const [events, setEvents] = useState([
//     { id: "3", title: "커리 큘럼(ex. python)", date: "2025-06-07" },
//     { id: "2", title: "-멘토링 일정", date: "2025-06-07" },
//     { id: "1", title: "-개인 일정", date: "2025-06-07" },
//   ]);

//   // ✅ 날짜 클릭 시 해당 날짜의 일정 목록 출력
//   const handleDateClick = (info) => {
//     const dateStr = info.dateStr;
//     const eventsForDate = events.filter((e) => e.date === dateStr);

//     if (eventsForDate.length === 0) {
//       alert(`${dateStr}에는 일정이 없습니다.`);
//     } else {
//       const schedule = eventsForDate.map((e) => `- ${e.title}`).join("\n");
//       alert(`📅 ${dateStr} 일정:\n\n${schedule}`);
//     }
//   };

//   // ✅ 일정 삭제
//   const handleEventClick = (info) => {
//     const confirmed = window.confirm(
//       `"${info.event.title}" 일정을 삭제할까요?`
//     );
//     if (confirmed) {
//       setEvents(events.filter((e) => e.id !== info.event.id));
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>| my | bat | men | lo |</h2>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         selectable={true}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         events={events}
//         height="auto"
//       />
//     </div>
//   );
// };

// export default CalendarPage;
