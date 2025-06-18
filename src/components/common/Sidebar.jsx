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
      { label: '일일 챌린지', to: '/challenge/daily' },
      { label: '챌린지 랭킹', to: '/challenge/ranking' },
      { label: '종합 챌린지', to: '/challenge/review' },
      { label: '챌린지 히스토리', to: '/challenge/list' },
    ],
  },
  mypage: {
    title: 'MyPage',
    items: [
      { label: '프로필 변경', to: '/mypage' },
      { label: '멘토링 히스토리', to: '/mypage/mentoring-history' },
      { label: '통계', to: '/mypage/statistics' },
      { label: '챌린지 히스토리', to: '/mypage/challenge-history' },
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
