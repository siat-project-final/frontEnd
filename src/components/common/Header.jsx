import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header id="header" className="header d-flex align-items-center sticky-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center">
      <Link to="/" className="logo d-flex align-items-center me-auto">
        <h1 className="sitename">Mentor</h1>
      </Link>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/mypage">MyPage</Link></li>
          <li><Link to="/challenge">DayChallengeList</Link></li>
          <li><Link to="/mentoring/mentors">mentoring</Link></li>
          <li><Link to="/study">Study</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

      <Link className="btn-getstarted" to="/courses">Get Started</Link>
    </div>
  </header>
);

export default Header;