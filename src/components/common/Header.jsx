import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ menuType }) => (
  <header id="header" className="header d-flex align-items-center sticky-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center">
            {/* 투명한 더미 요소 - 로고 크기만큼 공간 차지 */}
            <div className="me-auto"style={{ 
        width: '180px', 
        height: '50px',
        flexShrink: 0 }}>
        </div>
    <NavLink to="/" className="d-flex align-items-center"  style={{ 
        position: 'absolute',
        left: '15px',
        top: '60%',
        transform: 'translateY(-50%)',
        zIndex: 10
      }}>
    <img
          src="/assets/img/mentors/siatlogo.png"
          alt="SIAT Logo"
          style={{ 
            width: '200px', 
            height: '120px',
            maxHeight: '120px',
            display: 'block'
          }}
        />
      </NavLink>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/challenge" className={({ isActive }) => (isActive ? 'active' : '')}>
              Challenge
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mentoring/mentors"
              className={({ isActive }) => (isActive || menuType === 'mentoring' ? 'active' : '')}
            >
              Mentoring
            </NavLink>
          </li>
          <li>
            <NavLink to="/study" className={({ isActive }) => (isActive ? 'active' : '')}>
              Studylog
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>
              MyPage
            </NavLink>
          </li>
          <li className="alarm-item" style={{ 
            listStyle: 'none',
            padding: '0',
            margin: '0',
            border: 'none'
          }}>
            <NavLink to="/mentee-alarm" style={{
              color: 'inherit',
              padding: '0',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              textDecoration: 'none',
              borderBottom: 'none',
              transition: 'none'
            }}>
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


      <NavLink className="btn-getstarted" to="/login" style={{ 
        fontSize: '16px',
        color: '#334155',
        backgroundColor: 'white',
        border: '1px solid #334155'
        }}>
        <b>Logout</b>
      </NavLink>
    </div>
  </header>
);

export default Header;