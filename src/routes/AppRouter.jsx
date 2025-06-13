import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import MyPageMain from "../pages/MyPage/MyPageMain";
import DayChallengeList from "../pages/Challenge/DayChallengeList";
import CourseDetail from "../pages/Challenge/CourseDetail";
import MentoringList from "../pages/Mentoring/MentoringList";
import MentoringDetail from "../pages/Mentoring/MentoringDetail";
import MentoringApply from "../pages/Mentoring/MentoringApply";
import Events from "../pages/Events/Events";
import Pricing from "../pages/Pricing/Pricing";
import Starter from "../pages/Starter/Starter";
import Contact from "../pages/Contact/Contact"; // ✅ Contact 페이지 추가
import StudyLogPage from "../pages/study/StudyLogPage";
import WriteStudyLogPage from "../pages/study/WriteStudyLogPage";
import EditStudyLogPage from "../pages/study/EditStudyLogPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPageMain />} />
        <Route path="/challenge/list" element={<DayChallengeList />} />
        <Route path="/challenge/detail" element={<CourseDetail />} />
        <Route path="/mentoring/mentors" element={<MentoringList />} />
        <Route path="/mentoring/:id" element={<MentoringDetail />} />
        <Route path="/mentoring/apply" element={<MentoringApply />} />
        <Route path="/study" element={<StudyLogPage />} />
        <Route path="/study/write" element={<WriteStudyLogPage />} />
        <Route path="/study/edit/:id" element={<EditStudyLogPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/starter" element={<Starter />} />
        <Route path="/courses" element={<CourseDetail />} />
        <Route path="/contact" element={<Contact />} /> {/* Contact 라우팅 */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
