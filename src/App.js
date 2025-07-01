/* src/App.js */
import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/main.css';      
import './assets/css/dark.css';       

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/auth';

/* (생략) — import 들은 기존 그대로 — */
import CalenderView from './components/calendar/CalenderView';
import MyPageMain from './pages/MyPage/MyPageMain';
import ChallengeHistory from './pages/MyPage/ChallengeHistory';
import MentoringHistory from './pages/MyPage/MentoringHistory';
import ReviewHistory from './pages/MyPage/ReviewHistory';
import Statistics from './pages/MyPage/Statistics';
import Badges from './pages/MyPage/Badges';
import MentorAlarm from './pages/Events/MentorAlarm';
import MenteeAlarm from './pages/Events/MenteeAlarm';
import StudyLogPage from './pages/study/StudyLogPage';
import WriteStudyLogPage from './pages/study/WriteStudyLogPage';
import StudyLogDetailPage from './pages/study/StudyLogDetailPage';
import StudyLogPublic from './pages/study/StudyLogPublic';
import StudyLogPublicDetail from './pages/study/StudyLogPublicDetail';
import MentoringList from './pages/Mentoring/common/MentoringList';
import OtherMentoringDetail from './pages/Mentoring/Mentor/OtherMentoringDetail';
import MentoringApply from './pages/Mentoring/Mentee/MentoringApply';
import RegisterCancel from './pages/Mentoring/common/RegisterCancel';
import MentoringReject from './pages/Mentoring/Mentor/MentoringReject';
import MentorRegister from './pages/Mentoring/Mentor/MentorRegister';
import MentorRegisterCard from './pages/Mentoring/Mentor/MentorRegisterCard';
import MentoringDetail from './pages/Mentoring/Mentee/MentoringDetail';
import MenteeRegister from './pages/Mentoring/Mentee/MenteeRegister';
import MenteeRegisterCard from './pages/Mentoring/Mentee/MenteeRegisterCard';
import ChallengeInfo from './pages/Challenge/Daily/ChallengeInfo';
import ChallengeSolve from './pages/Challenge/Daily/ChallengeSolve';
import ChallengeResult from './pages/Challenge/Daily/ChallengeResult';
import ChallengeRanking from './pages/Challenge/ChallengeRanking';
import ReviewMain from './pages/Challenge/Review/ReviewMain';
import ReviewSolve from './pages/Challenge/Review/ReviewSolve';
import ChallengeMain from './pages/Challenge/ChallengeMain';
import MyProgress from './pages/Challenge/Daily/MyProgress';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout({ isDarkMode, toggleTheme }) {
  return (
    <div className={isDarkMode ? 'dark-mode' : ''} style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 전역 다크모드 토글 버튼 — 원하는 위치로 옮겨도 상관없음 */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 2000,
          backgroundColor: 'rgba(100, 100, 100, 0.6)', // 연한 회색 + 투명도
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)', // 배경 흐림 효과
        }}
        className="btn btn-success"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Home */}
          <Route path="/home" element={<PrivateRoute><CalenderView /></PrivateRoute>} />

          {/* Alarm */}
          <Route path="/mentor-alarm" element={<PrivateRoute><MentorAlarm /></PrivateRoute>} />
          <Route path="/mentee-alarm" element={<PrivateRoute><MenteeAlarm /></PrivateRoute>} />

          {/* MyPage */}
          <Route path="/mypage" element={<PrivateRoute><MyPageMain /></PrivateRoute>} />
          <Route path="/mypage/badges" element={<PrivateRoute><Badges /></PrivateRoute>} />
          <Route path="/mypage/challenge-history" element={<PrivateRoute><ChallengeHistory /></PrivateRoute>} />
          <Route path="/mypage/mentoring-history" element={<PrivateRoute><MentoringHistory /></PrivateRoute>} />
          <Route path="/mypage/review-history" element={<PrivateRoute><ReviewHistory /></PrivateRoute>} />
          <Route path="/mypage/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />

          {/* Study */}
          <Route path="/study" element={<PrivateRoute><StudyLogPage /></PrivateRoute>} />
          <Route path="/study/write" element={<PrivateRoute><WriteStudyLogPage /></PrivateRoute>} />
          <Route path="/study/edit/:id" element={<PrivateRoute><StudyLogDetailPage /></PrivateRoute>} />
          <Route path="/study/public" element={<PrivateRoute><StudyLogPublic /></PrivateRoute>} />
          <Route path="/study/public/:id" element={<PrivateRoute><StudyLogPublicDetail /></PrivateRoute>} />

          {/* Challenge */}
          <Route path="/challenge" element={<PrivateRoute><ChallengeMain /></PrivateRoute>} />
          <Route path="/challenge/daily" element={<PrivateRoute><ChallengeInfo /></PrivateRoute>} />
          <Route path="/challenge/daily/solve" element={<PrivateRoute><ChallengeSolve /></PrivateRoute>} />
          <Route path="/challenge/daily/result" element={<PrivateRoute><ChallengeResult /></PrivateRoute>} />
          <Route path="/challenge/ranking" element={<PrivateRoute><ChallengeRanking /></PrivateRoute>} />
          <Route path="/challenge/review" element={<PrivateRoute><ReviewMain /></PrivateRoute>} />
          <Route path="/challenge/review/solve" element={<PrivateRoute><ReviewSolve /></PrivateRoute>} />
          <Route path="/challenge/daily/progress" element={<PrivateRoute><MyProgress /></PrivateRoute>} />

          {/* Mentoring */}
          <Route path="/mentoring/mentors" element={<PrivateRoute><MentoringList /></PrivateRoute>} />
          <Route path="/mentoring/:id" element={<PrivateRoute><MentoringDetail /></PrivateRoute>} />
          <Route path="/mentoring/mentor/detail" element={<PrivateRoute><OtherMentoringDetail /></PrivateRoute>} />
          <Route path="/mentoring/apply" element={<PrivateRoute><MentoringApply /></PrivateRoute>} />
          <Route path="/register/cancel" element={<PrivateRoute><RegisterCancel /></PrivateRoute>} />
          <Route path="/mentoring/mentor/reject" element={<PrivateRoute><MentoringReject /></PrivateRoute>} />
          <Route path="/mentoring/mentor/register" element={<PrivateRoute><MentorRegister /></PrivateRoute>} />
          <Route path="/mentoring/mentor/register/card" element={<PrivateRoute><MentorRegisterCard /></PrivateRoute>} />
          <Route path="/mentoring/detail" element={<PrivateRoute><MentoringDetail /></PrivateRoute>} />
          <Route path="/mentoring/mentee/register" element={<PrivateRoute><MenteeRegister /></PrivateRoute>} />
          <Route path="/mentoring/register" element={<PrivateRoute><MenteeRegister /></PrivateRoute>} />
          <Route path="/mentoring/mentee/register/card" element={<PrivateRoute><MenteeRegisterCard /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    AOS.init();
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
    sessionStorage.setItem('memberId', '1');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    console.log('🌑 isDarkMode:', isDarkMode);
    console.log('🎨 body에 dark-mode 클래스 있음?', document.body.classList.contains('dark-mode'));
  }, [isDarkMode]);

  const toggleTheme = () => {
    console.log('🟢 버튼 클릭됨');
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <ScrollToTop />


      <AppLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
      <div id="preloader"></div>
    </Router>
  );
}
export default App;