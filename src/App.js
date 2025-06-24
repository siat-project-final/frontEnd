import React, { useLayoutEffect } from 'react';
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

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/auth';

import CalenderView from './components/calendar/CalenderView';
import MyPageMain from './pages/MyPage/MyPageMain';
import ChallengeHistory from './pages/MyPage/ChallengeHistory';
import MentoringHistory from './pages/MyPage/MentoringHistory';
import ReviewHistory from './pages/MyPage/ReviewHistory';
import Statistics from './pages/MyPage/Statistics';

// import Pricing from './pages/Pricing/Pricing';
// import Starter from './pages/Starter/Starter';
// import Contact from './pages/Contact/Contact';

// import Todo from './components/common/Todo';
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
// import DayChallengeList from './pages/Challenge/DayChallengeList';
// import CourseDetail from './pages/Challenge/CourseDetail';

function AppLayout() {
  const { pathname } = useLocation();
  // const hideTodo = pathname === '/login' || pathname === '/signup';

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      {/* 메인 컨텐츠 영역 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Home 및 기타 공통 페이지 */}
          <Route path="/home" element={<PrivateRoute><CalenderView /></PrivateRoute>} />
          {/* <Route path="/pricing" element={<PrivateRoute><Pricing /></PrivateRoute>} />
          <Route path="/starter" element={<PrivateRoute><Starter /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} /> */}

          {/* 알람 */}
          <Route path="/mentor-alarm" element={<PrivateRoute><MentorAlarm /></PrivateRoute>} />
          <Route path="/mentee-alarm" element={<PrivateRoute><MenteeAlarm /></PrivateRoute>} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<PrivateRoute><MyPageMain /></PrivateRoute>} />
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
          {/* <Route path="/challenge/list" element={<PrivateRoute><DayChallengeList /></PrivateRoute>} />
          <Route path="/challenge/detail" element={<PrivateRoute><CourseDetail /></PrivateRoute>} /> */}

          {/* Mentoring */}
          <Route path="/mentoring/mentors" element={<PrivateRoute><MentoringList /></PrivateRoute>} />
          <Route path="/mentoring/:id" element={<PrivateRoute><MentoringDetail /></PrivateRoute>} />
          <Route path="/mentoring/mentor/detail" element={<PrivateRoute><OtherMentoringDetail /></PrivateRoute>} />
          <Route path="/mentoring/apply" element={<PrivateRoute><MentoringApply /></PrivateRoute>} />
          <Route path="/mentoring/cancel" element={<PrivateRoute><RegisterCancel /></PrivateRoute>} />
          <Route path="/mentoring/mentor/reject" element={<PrivateRoute><MentoringReject /></PrivateRoute>} />
          <Route path="/mentoring/mentor/register" element={<PrivateRoute><MentorRegister /></PrivateRoute>} />
          <Route path="/mentoring/mentor/register/card" element={<PrivateRoute><MentorRegisterCard /></PrivateRoute>} />
          <Route path="/mentoring/detail" element={<PrivateRoute><MentoringDetail /></PrivateRoute>} />
          <Route path="/mentoring/mentee/register" element={<PrivateRoute><MenteeRegister /></PrivateRoute>} />
          <Route path="/mentoring/register" element={<PrivateRoute><MenteeRegister /></PrivateRoute>} />
          <Route path="/mentoring/mentee/register/card" element={<PrivateRoute><MenteeRegisterCard /></PrivateRoute>} />
        </Routes>
      </div>

      {/* 우측 Todo 사이드바
      {!hideTodo && isAuthenticated() && (
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      )} */}
    </div>
  );
}

function App() {
  useLayoutEffect(() => {
    AOS.init();
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
     // ✅ 테스트용 memberId 강제 주입
    sessionStorage.setItem('memberId', '1');  // 또는 실제 테스트 ID
    // 🔍 확인용 로그
  console.log('✅ sessionStorage 설정 완료:', sessionStorage.getItem('memberId'));
  }, []);

  return (
    <Router>
      <AppLayout />
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      <div id="preloader"></div>
    </Router>
  );
}



export default App;
