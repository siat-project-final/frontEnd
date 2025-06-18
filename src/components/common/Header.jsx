import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <header id="header" className="header d-flex align-items-center sticky-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center">
      <NavLink to="/" className="logo d-flex align-items-center me-auto">
        <h1 className="sitename">Mentor</h1>
      </NavLink>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/challenge/list">Challenge</NavLink>
          </li>
          <li>
            <NavLink to="/mentoring/mentors">Mentoring</NavLink>
          </li>
          <li>
            <NavLink to="/study">Studylog</NavLink>
          </li>
          <li>
            <NavLink to="/mypage">MyPage</NavLink>
          </li>
          <li>
            <NavLink to="/notifications">
              <img
                src="/assets/img/mentors/bell.png"
                alt="Notifications"
                style={{ width: '20px', height: '20px', marginLeft: '12px' }}
              />
            </NavLink>

          </li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
      <NavLink className="btn-getstarted" to="/login" style={{ fontSize: '16px' }}>
        <b>Logout</b>
      </NavLink>

    </div>
  </header>
);

export default Header;
