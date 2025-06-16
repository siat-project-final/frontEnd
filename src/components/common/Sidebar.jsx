// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import '../../assets/scss/layouts/_sidebar.scss';

// const menuMap = {
//   mentoring: {
//     title: 'Mentoring',
//     items: [
//       { label: '멘토 목록', to: '/mentoring/mentors' },
//       { label: '예약 내역', to: '/mentoring/register' },
//     ],
//   },
//   studylog: {
//     title: 'Study Log',
//     items: [
//       { label: '학습 일지 목록', to: '/study' },
//       { label: '학습 일지 작성', to: '/study/write' },
//       { label: '공유 학습 일지', to: '/study/public' }
//     ],
//   },
//   challenge: {
//     title: 'Challenge',
//     items: [
//       { label: '챌린지 목록', to: '/challenge/list' },
//       { label: '과정 상세', to: '/challenge/detail' },
//     ],
//   },
// };

// const Sidebar = ({ menuType }) => {
//   const location = useLocation();
//   const hideSidebarPaths = ['/login', '/signup', '/starter'];

//   if (hideSidebarPaths.some(path => location.pathname.startsWith(path))) {
//     return null;
//   }

//   const menu = menuMap[menuType];

//   if (!menu) return null;

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-title">{menu.title}</div>
//       <ul>
//         {menu.items.map((item, idx) => (
//           <li key={idx}>
//             <Link to={item.to}>{item.label}</Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/scss/layouts/_sidebar.scss'; // 여기 경로는 유지해도 됨

const menuMap = {
  mentoring: {
    title: 'Mentoring',
    items: [
      { label: '멘토 목록', to: '/mentoring/mentors' },
      { label: '예약 내역', to: '/mentoring/register' },
    ],
  },
  studylog: {
    title: 'Study Log',
    items: [
      { label: '학습 일지 목록', to: '/study' },
      { label: '학습 일지 작성', to: '/study/write' },
      { label: '공유 학습 일지', to: '/study/public' },
    ],
  },
  challenge: {
    title: 'Challenge',
    items: [
      { label: '일일 챌린지', to: '/challenge/list' },
      { label: '챌린지 랭킹', to: '/challenge/detail' },
      { label: '종합 챌린지', to: '/challenge/list' },
      { label: '챌린지 히스토리', to: '/challenge/list' },
    ],
  },
};

const Sidebar = ({ menuType }) => {
  const location = useLocation();
  const hideSidebarPaths = ['/login', '/signup', '/starter'];

  if (hideSidebarPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  const menu = menuMap[menuType];
  if (!menu) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-title">{menu.title}</div>
      <nav className="sidebar-nav">
        {menu.items.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
