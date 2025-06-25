import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StudyLogCard from '../../components/studyCard/StudyLogCard';
import { Link } from 'react-router-dom';
import Todo from '../../components/common/Todo';
import { getMyStudyLogs } from '../../api/studyLog';

const SUBJECTS = [
  'Java', 'JavaScript', 'Python', 'React', 'AWS', 'CI/CD', 'Springboot', '기타'
];

const StudyLogPage = () => {
  const [studyLogs, setStudyLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    if (!memberId) {
      console.warn(' memberId 없음 - 로그인 필요');
      return;
    }
    const fetchLogs = async () => {
      try {
        const res = await getMyStudyLogs(memberId);
        console.log('📥 studyLogs 응답:', res.data);
        setStudyLogs(res.data);
        setFilteredLogs(res.data); // 초기 전체 할당
      } catch (err) {
        console.error('학습일지 목록 실패:', err);
      }
    };
    fetchLogs();
  }, [memberId]);

  const handleDelete = (diaryId) => {
    const updated = studyLogs.filter((log) => log.diaryId !== diaryId);
    setStudyLogs(updated);
    setFilteredLogs(
      selectedSubject
        ? updated.filter((log) => log.subject === selectedSubject)
        : updated
    );
  };

  const handleSubjectFilter = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    if (subject === '') {
      setFilteredLogs(studyLogs);
    } else {
      setFilteredLogs(studyLogs.filter((log) => log.subject === subject));
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div className="container-flex" style={{ display: 'flex' }}>
            <Sidebar menuType="studylog" />
            <main className="main">
              <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1
                    className="h3 fw-bold mb-0"
                    style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
                  >
                    MY STUDY LOG
                  </h1>
                  <div className="d-flex align-items-center">
                    <select
                      className="form-select w-auto d-inline-block me-2"
                      value={selectedSubject}
                      onChange={handleSubjectFilter}
                    >
                      <option value="">전체 과목</option>
                      {SUBJECTS.map((subj) => (
                        <option key={subj} value={subj}>{subj}</option>
                      ))}
                    </select>
                    <Link
                      to="./write"
                      className="btn border-0 text-white"
                      style={{ backgroundColor: '#84cc16' }}
                    >
                      일지 작성하기
                    </Link>
                  </div>
                </div>

                {filteredLogs.map((log) => (
                  <div key={log.diaryId} data-aos="fade-up">
                    <StudyLogCard log={log} onDelete={handleDelete} />
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};
export default StudyLogPage;
