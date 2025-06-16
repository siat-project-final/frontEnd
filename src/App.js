// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './assets/css/main.css';

// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import PrivateRoute from './components/PrivateRoute';
// import Home from './pages/Home';
// import { isAuthenticated } from './utils/auth'; // ✅ 인증 상태 확인용

// function App() {
//   useEffect(() => {
//     AOS.init();
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* 루트 접근 시 로그인 여부에 따라 분기 */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated()
//               ? <Navigate to="/home" replace />
//               : <Navigate to="/login" replace />
//           }
//         />

//         {/* 비회원용 */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         {/* 보호 라우트 */}
//         <Route
//           path="/home"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

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
import MyPageMain from './pages/MyPage/MyPageMain';
import DayChallengeList from './pages/Challenge/DayChallengeList';
import CourseDetail from './pages/Challenge/CourseDetail';
import Pricing from './pages/Pricing/Pricing';
import Starter from './pages/Starter/Starter';
import Contact from './pages/Contact/Contact';
import StudyLogPage from './pages/study/StudyLogPage';
import WriteStudyLogPage from './pages/study/WriteStudyLogPage';
import EditStudyLogPage from './pages/study/EditStudyLogPage';
import StudyLogPublic from './pages/study/StudyLogPublic';
import StudyLogPublicDetail from './pages/study/StudyLogPublicDetail';
import { isAuthenticated } from './utils/auth';
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

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Routes>
        {/* 루트 경로 접근 시 로그인 여부로 분기 */}
        <Route
          path="/"
          element={
            isAuthenticated()
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* 비회원용 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 로그인 후 접근 가능한 라우트 */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/mypage" element={<PrivateRoute><MyPageMain /></PrivateRoute>} />
        <Route path="/challenge/list" element={<PrivateRoute><DayChallengeList /></PrivateRoute>} />
        <Route path="/challenge/detail" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
        {/* <Route path="/mentoring/mentors" element={<PrivateRoute><MentoringList /></PrivateRoute>} />
        <Route path="/mentoring/:id" element={<PrivateRoute><MentoringDetail /></PrivateRoute>} />
        <Route path="/mentoring/apply" element={<PrivateRoute><MentoringApply /></PrivateRoute>} /> */}
        <Route path="/pricing" element={<PrivateRoute><Pricing /></PrivateRoute>} />
        <Route path="/starter" element={<PrivateRoute><Starter /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/study" element={<PrivateRoute><StudyLogPage /></PrivateRoute>} />
        <Route path="/study/write" element={<PrivateRoute><WriteStudyLogPage /></PrivateRoute>} />
        <Route path="/study/edit/:id" element={<PrivateRoute><EditStudyLogPage /></PrivateRoute>} />
        <Route path="/study/public" element={<PrivateRoute><StudyLogPublic /></PrivateRoute>} />
        <Route path="/study/public/:id" element={<PrivateRoute><StudyLogPublicDetail /></PrivateRoute>} />

        <Route path="/mentoring/mentors" element={<PrivateRoute><MentoringList /></PrivateRoute>} />
        <Route path="/mentoring/mentor/detail" element={<PrivateRoute><OtherMentoringDetail /></PrivateRoute>} />
        <Route path="/mentoring/apply" element={<PrivateRoute><MentoringApply /></PrivateRoute>} />
        <Route path="/mentoring/cancel" element={<PrivateRoute><RegisterCancel /></PrivateRoute>} />
        <Route path="/mentoring/mentor/reject" element={<PrivateRoute><MentoringReject /></PrivateRoute>} />
        <Route path="/mentoring/mentor/register" element={<PrivateRoute><MentorRegister /></PrivateRoute>} />
        {/* <Route path="/mentoring/mentor/register" element={<MentorRegister />} /> */}
        <Route path="/mentoring/mentor/register/card" element={<PrivateRoute><MentorRegisterCard /></PrivateRoute>} />
        <Route path="/mentoring/detail" element={<PrivateRoute><MentoringDetail /></PrivateRoute>} />
        <Route path="/mentoring/mentee/register" element={<PrivateRoute><MenteeRegister /></PrivateRoute>} />
        <Route path="/mentoring/register" element={<PrivateRoute><MenteeRegister /></PrivateRoute>} />
        <Route path="/mentoring/mentee/register/card" element={<PrivateRoute><MenteeRegisterCard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
