import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/scss/layouts/_sidebar.scss';

const Sidebar = () => {
  const location = useLocation();
  const hideSidebarPaths = ['/login', '/signup', '/starter'];

  if (hideSidebarPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Mentoring</div>
      <ul>
        <li>
          <Link to="/mentoring/list">Mentoring</Link>
        </li>
        <li>
          <Link to="/mentoring/register">Reservation List</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
