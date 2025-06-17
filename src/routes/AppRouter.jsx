import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

// 인증 없이 접근 가능한 페이지
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

// 인증 필요 페이지
import Home from '../pages/Home';
import MyPageMain from '../pages/MyPage/MyPageMain';
import DayChallengeList from '../pages/Challenge/DayChallengeList';
import CourseDetail from '../pages/Challenge/CourseDetail';
import MentoringList from '../pages/Mentoring/MentoringList';
import MentoringDetail from '../pages/Mentoring/MentoringDetail';
import MentoringApply from '../pages/Mentoring/MentoringApply';
import Pricing from '../pages/Pricing/Pricing';
import Starter from '../pages/Starter/Starter';
import Contact from '../pages/Contact/Contact';
import StudyLogPage from '../pages/study/StudyLogPage';
import WriteStudyLogPage from '../pages/study/WriteStudyLogPage';
import EditStudyLogPage from '../pages/study/EditStudyLogPage';
import StudyLogPublic from '../pages/study/StudyLogPublic';
import StudyLogPublicDetail from '../pages/study/StudyLogPublicDetail';
import OtherMentoringDetail from '../pages/Mentoring/Mentor/OtherMentoringDetail';
import RegisterCancel from '../pages/Mentoring/common/RegisterCancel';
import MentoringReject from '../pages/Mentoring/Mentor/MentoringReject';
import MentorRegister from '../pages/Mentoring/Mentor/MentorRegister';
import MentorRegisterCard from '../pages/Mentoring/Mentor/MentorRegisterCard';
import MenteeRegister from '../pages/Mentoring/Mentee/MenteeRegister';
import MenteeRegisterCard from '../pages/Mentoring/Mentee/MenteeRegisterCard';
import CalenderView from '../components/calendar/CalenderView';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 비회원 접근 허용 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 인증된 사용자만 접근 가능 */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalenderView />
            </PrivateRoute>
          }
        />

        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPageMain />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenge/list"
          element={
            <PrivateRoute>
              <DayChallengeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenge/detail"
          element={
            <PrivateRoute>
              <CourseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/study"
          element={
            <PrivateRoute>
              <StudyLogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/study/write"
          element={
            <PrivateRoute>
              <WriteStudyLogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/study/edit/:id"
          element={
            <PrivateRoute>
              <EditStudyLogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/study/public"
          element={
            <PrivateRoute>
              <StudyLogPublic />
            </PrivateRoute>
          }
        />
        <Route
          path="/study/public/:id"
          element={
            <PrivateRoute>
              <StudyLogPublicDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/pricing"
          element={
            <PrivateRoute>
              <Pricing />
            </PrivateRoute>
          }
        />
        <Route
          path="/starter"
          element={
            <PrivateRoute>
              <Starter />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <CourseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentoring/mentors"
          element={
            <PrivateRoute>
              <MentoringList />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/mentor/detail"
          element={
            <PrivateRoute>
              <OtherMentoringDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/apply"
          element={
            <PrivateRoute>
              <MentoringApply />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/cancel"
          element={
            <PrivateRoute>
              <RegisterCancel />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/mentor/reject"
          element={
            <PrivateRoute>
              <MentoringReject />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/mentor/register"
          element={
            <PrivateRoute>
              <MentorRegister />
            </PrivateRoute>
          }
        />
        {/* <Route path="/mentoring/mentor/register" element={<MentorRegister />} /> */}
        <Route
          path="/mentoring/mentor/register/card"
          element={
            <PrivateRoute>
              <MentorRegisterCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/detail"
          element={
            <PrivateRoute>
              <MentoringDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/mentee/register"
          element={
            <PrivateRoute>
              <MenteeRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/register"
          element={
            <PrivateRoute>
              <MenteeRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentoring/mentee/register/card"
          element={
            <PrivateRoute>
              <MenteeRegisterCard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
