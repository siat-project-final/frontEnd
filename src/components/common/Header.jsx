import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ menuType }) => (
  <header id="header" className="header d-flex align-items-center sticky-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center">
      {/* 투명한 더미 요소 - 로고 크기만큼 공간 차지 */}
      <div className="me-auto" style={{ width: '180px', height: '50px', flexShrink: 0 }}></div>

      <NavLink
        to="/"
        className="d-flex align-items-center"
        style={{
          position: 'absolute',
          left: '15px',
          top: '60%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <img
          src="/assets/img/mentors/siatlogo.png"
          alt="SIAT Logo"
          style={{
            width: '200px',
            height: '120px',
            maxHeight: '120px',
            display: 'block',
          }}
        />
      </NavLink>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li className="dropdown">
            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>

          <li className="dropdown">
            <NavLink to="/challenge" className={({ isActive }) => (isActive ? 'active' : '')}>
              Challenge
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/challenge/daily" className="dropdown-item">일일 챌린지</NavLink></li>
              <li><NavLink to="/challenge/ranking" className="dropdown-item">챌린지 랭킹</NavLink></li>
              <li><NavLink to="/challenge/review" className="dropdown-item">종합 챌린지</NavLink></li>
              <li><NavLink to="/mypage/challenge-history" className="dropdown-item">챌린지 히스토리</NavLink></li>
            </ul>
          </li>

          <li className="dropdown">
            <NavLink
              to="/mentoring/mentors"
              className={({ isActive }) => (isActive || menuType === 'mentoring' ? 'active' : '')}
            >
              Mentoring
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/mentoring/mentors" className="dropdown-item">멘토 목록</NavLink></li>
              <li><NavLink to="/mentoring/register" className="dropdown-item">예약 내역</NavLink></li>
            </ul>
          </li>

          <li className="dropdown">
            <NavLink to="/study" className={({ isActive }) => (isActive ? 'active' : '')}>
              Studylog
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/study" className="dropdown-item">학습 일지 목록</NavLink></li>
              <li><NavLink to="/study/write" className="dropdown-item">학습 일지 작성</NavLink></li>
              <li><NavLink to="/study/public" className="dropdown-item">공유 학습 일지</NavLink></li>
            </ul>
          </li>

          
          <li className="dropdown">
            <NavLink
              to="/mypage/shop"
              className={({ isActive }) => (isActive || menuType === 'shop' ? 'active' : '')}
            >
              Shop
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/shop" className="dropdown-item">스티커 상점</NavLink></li>
              <li><NavLink to="/inventory" className="dropdown-item">내 인벤토리</NavLink></li>
            </ul>
          </li>

          <li className="dropdown">
            <NavLink
              to="/mypage"
              className={({ isActive }) => (isActive || menuType === 'mypage' ? 'active' : '')}
            >
              MyPage
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/mypage" className="dropdown-item">마이 프로필</NavLink></li>
              <li><NavLink to="/mypage/mentoring-history" className="dropdown-item">멘토링 히스토리</NavLink></li>
              <li><NavLink to="/mypage/statistics" className="dropdown-item">통계</NavLink></li>
              <li><NavLink to="/mypage/challenge-history" className="dropdown-item">챌린지 히스토리</NavLink></li>
            </ul>
          </li>

          <li className="alarm-item" style={{ listStyle: 'none' }}>
            <NavLink to="/mentee-alarm" style={{ textDecoration: 'none' }}>
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

      <NavLink
        className="btn-getstarted"
        to="/login"
        style={{
          fontSize: '16px',
          color: '#334155',
          backgroundColor: 'white',
          border: '1px solid #334155',
        }}
      >
        <b>Logout</b>
      </NavLink>
    </div>
  </header>
);

export default Header;
