import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/main.css';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import { isAuthenticated } from './utils/auth';

import CalenderView from './components/calendar/CalenderView';
import MyPageMain from './pages/MyPage/MyPageMain';
import ChallengeHistory from './pages/MyPage/ChallengeHistory';
import MentoringHistory from './pages/MyPage/MentoringHistory';
import ReviewHistory from './pages/MyPage/ReviewHistory';

import Pricing from './pages/Pricing/Pricing';
import Starter from './pages/Starter/Starter';
import Contact from './pages/Contact/Contact';
import Events from './pages/Events/Events';

import StudyLogPage from './pages/study/StudyLogPage';
import WriteStudyLogPage from './pages/study/WriteStudyLogPage';
import EditStudyLogPage from './pages/study/EditStudyLogPage';
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
import DayChallengeList from './pages/Challenge/DayChallengeList';
import CourseDetail from './pages/Challenge/CourseDetail';

function App() {
  useEffect(() => {
    AOS.init();
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Home 및 공통 페이지 */}
        <Route path="/home" element={<PrivateRoute><CalenderView /></PrivateRoute>} />
        <Route path="/pricing" element={<PrivateRoute><Pricing /></PrivateRoute>} />
        <Route path="/starter" element={<PrivateRoute><Starter /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<PrivateRoute><MyPageMain /></PrivateRoute>} />
        <Route path="/mypage/challenge-history" element={<PrivateRoute><ChallengeHistory /></PrivateRoute>} />
        <Route path="/mypage/mentoring-history" element={<PrivateRoute><MentoringHistory /></PrivateRoute>} />
        <Route path="/mypage/review-history" element={<PrivateRoute><ReviewHistory /></PrivateRoute>} />

        {/* Study Log */}
        <Route path="/study" element={<PrivateRoute><StudyLogPage /></PrivateRoute>} />
        <Route path="/study/write" element={<PrivateRoute><WriteStudyLogPage /></PrivateRoute>} />
        <Route path="/study/edit/:id" element={<PrivateRoute><EditStudyLogPage /></PrivateRoute>} />
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
        <Route path="/challenge/list" element={<PrivateRoute><DayChallengeList /></PrivateRoute>} />
        <Route path="/challenge/detail" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />

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

      {/* Scroll-top + preloader */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
      <div id="preloader"></div>
    </Router>
  );
}

export default App;
