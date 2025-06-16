import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

// 인증 없이 접근 가능한 페이지
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

// 인증 필요 페이지
import Home from '../pages/Home';
import MyPageMain from "../pages/MyPage/MyPageMain";
import DayChallengeList from "../pages/Challenge/DayChallengeList";
import CourseDetail from "../pages/Challenge/CourseDetail";
import MentoringList from "../pages/Mentoring/MentoringList";
import MentoringDetail from "../pages/Mentoring/MentoringDetail";
import MentoringApply from "../pages/Mentoring/MentoringApply";
import Pricing from "../pages/Pricing/Pricing";
import Starter from "../pages/Starter/Starter";
import Contact from "../pages/Contact/Contact";
import StudyLogPage from "../pages/study/StudyLogPage";
import WriteStudyLogPage from "../pages/study/WriteStudyLogPage";
import EditStudyLogPage from "../pages/study/EditStudyLogPage";
import StudyLogPublic from "../pages/study/StudyLogPublic";
import StudyLogPublicDetail from "../pages/study/StudyLogPublicDetail";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 비회원 접근 허용 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 인증된 사용자만 접근 가능 */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/mypage" element={<PrivateRoute><MyPageMain /></PrivateRoute>} />
        <Route path="/challenge/list" element={<PrivateRoute><DayChallengeList /></PrivateRoute>} />
        <Route path="/challenge/detail" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
        <Route path="/mentoring/mentors" element={<PrivateRoute><MentoringList /></PrivateRoute>} />
        <Route path="/mentoring/:id" element={<PrivateRoute><MentoringDetail /></PrivateRoute>} />
        <Route path="/mentoring/apply" element={<PrivateRoute><MentoringApply /></PrivateRoute>} />
        <Route path="/study" element={<PrivateRoute><StudyLogPage /></PrivateRoute>} />
        <Route path="/study/write" element={<PrivateRoute><WriteStudyLogPage /></PrivateRoute>} />
        <Route path="/study/edit/:id" element={<PrivateRoute><EditStudyLogPage /></PrivateRoute>} />
        <Route path="/study/public" element={<PrivateRoute><StudyLogPublic /></PrivateRoute>} />
        <Route path="/study/public/:id" element={<PrivateRoute><StudyLogPublicDetail /></PrivateRoute>} />
        <Route path="/pricing" element={<PrivateRoute><Pricing /></PrivateRoute>} />
        <Route path="/starter" element={<PrivateRoute><Starter /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
