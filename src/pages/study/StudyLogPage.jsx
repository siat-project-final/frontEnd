// src/pages/StudyLogPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import StudyLogCard from '../../components/studyCard/StudyLogCard'; // 경로 확인
import { Link } from 'react-router-dom';
import Todo from '../../components/common/Todo';
import { getMyStudyLogs } from '../../api/studyLog';

const SUBJECTS = [
  'Java',
  'JavaScript',
  'Python',
  'React',
  'AWS',
  'CI/CD',
  'Springboot',
  '기타',
];

const StudyLogPage = () => {
  const [studyLogs, setStudyLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const memberId = sessionStorage.getItem('memberId');

  // ─────────────────────────────────────────────────────────────
  // 1. 최초 로딩: 학습일지 가져오기
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!memberId) {
      console.warn('❌ memberId 없음 - 로그인 필요');
      return;
    }

    const fetchLogs = async () => {
      try {
        const res = await getMyStudyLogs(memberId);

        // 학습일지 데이터에 selectedPeriods가 없는 경우를 대비하여 초기화
        const logsWithPeriods = res.data.map(log => ({
          ...log,
          selectedPeriods: log.selectedPeriods || [] // 서버에서 selectedPeriods를 받지 못하면 빈 배열로 설정
        }));

        // 전체 응답 로그
        console.log('📥 studyLogs 응답 원본 (처리 후):', logsWithPeriods);
        // diaryId, subject, selectedPeriods 컬럼 표로 확인
        console.table(
          logsWithPeriods.map((l) => ({
            diaryId: l.diaryId,
            subject: l.subject,
            selectedPeriods: l.selectedPeriods, // selectedPeriods 컬럼 추가
          })),
        );

        setStudyLogs(logsWithPeriods);
        setFilteredLogs(logsWithPeriods); // 필터링된 로그도 초기화된 데이터로 설정
      } catch (err) {
        console.error('학습일지 목록 실패:', err);
      }
    };

    fetchLogs();
  }, [memberId]);

  // ─────────────────────────────────────────────────────────────
  // 2. 삭제 시 상태 동기화
  // ─────────────────────────────────────────────────────────────
  const handleDelete = (diaryId) => {
    const updated = studyLogs.filter((log) => log.diaryId !== diaryId);
    setStudyLogs(updated);

    const next =
      selectedSubject === ''
        ? updated
        : updated.filter((log) => log.subject === selectedSubject);
    setFilteredLogs(next);

    console.log('🗑️ 삭제 후 logs:', next);
  };

  // ─────────────────────────────────────────────────────────────
  // 3. 과목 필터
  // ─────────────────────────────────────────────────────────────
  const handleSubjectFilter = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    console.log('🎯 선택된 과목:', subject);

    const next =
      subject === ''
        ? studyLogs
        : studyLogs.filter((log) => {
            console.log(
              `  ↳ diaryId=${log.diaryId}, subject=${log.subject}, 매칭=${log.subject === subject}`,
            );
            return log.subject === subject;
          });

    setFilteredLogs(next);
    console.log('🔍 필터 결과 logs:', next);
  };

  // ─────────────────────────────────────────────────────────────
  // 4. 렌더
  // ─────────────────────────────────────────────────────────────
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div className="container-flex" style={{ display: 'flex' }}>
            <Sidebar menuType="studylog" />
            <main className="main">
              <div className="container py-5">
                {/* 상단 바 */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1
                    className="h3 fw-bold mb-0"
                    style={{ marginTop: '16px', marginLeft: '16px' }}
                  >
                    MY STUDY LOG
                  </h1>

                  <div className="d-flex align-items-center">
                    {/* 과목 드롭다운 */}
                    <select
                      className="form-select w-auto d-inline-block me-2"
                      value={selectedSubject}
                      onChange={handleSubjectFilter}
                    >
                      <option value="">전체 과목</option>
                      {SUBJECTS.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>

                    {/* 작성 버튼 */}
                    <Link
                      to="./write"
                      className="btn border-0 text-white write-button"
                    >
                      일지 작성하기
                    </Link>
                  </div>
                </div>

                {/* 카드 리스트 */}
                {filteredLogs.map((log) => (
                  <div key={log.diaryId} data-aos="fade-up">
                    {/* log 객체를 StudyLogCard에 전달합니다. log 객체는 이미 selectedPeriods를 포함해야 합니다. */}
                    <StudyLogCard log={log} onDelete={handleDelete} />
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>

        {/* 우측 Todo */}
        <div className="todo-sidebar-wrapper">
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default StudyLogPage;
