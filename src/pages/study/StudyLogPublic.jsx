import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import Todo from '../../components/common/Todo';
import { getPublicStudyLogs, toggleLikeStudyLog } from '../../api/studyLog';

const StudyLogPublic = () => {
  const [studyLogs, setStudyLogs] = useState([]);
  const [likedMap, setLikedMap] = useState({}); // 각 로그의 좋아요 여부 상태

  useEffect(() => {
    const fetchPublicLogs = async () => {
      try {
        const res = await getPublicStudyLogs();
        setStudyLogs(res.data);

        const likedStates = {};
        res.data.forEach((log) => {
          likedStates[log.diaryId] = localStorage.getItem(`liked-${log.diaryId}`) === 'true';
        });
        setLikedMap(likedStates);
      } catch (err) {
        console.error('공유 일지 조회 실패:', err);
      }
    };
    fetchPublicLogs();
  }, []);

  const handleLike = async (diaryId) => {
    const isLiked = likedMap[diaryId] || false;
    try {
      await toggleLikeStudyLog(diaryId, !isLiked);

      setStudyLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.diaryId === diaryId
            ? { ...log, likeCount: log.likeCount + (isLiked ? -1 : 1) }
            : log
        )
      );
      setLikedMap((prev) => ({ ...prev, [diaryId]: !isLiked }));
      localStorage.setItem(`liked-${diaryId}`, String(!isLiked));
    } catch (err) {
      console.error('좋아요 실패:', err);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />
        <main className="main" style={{ flex: 1 }}>
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1
                className="h3 fw-bold mb-0"
                style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
              >
                공유 학습일지
              </h1>
              <div className="d-flex align-items-center">
                <select className="form-select w-auto d-inline-block me-2">
                  
                <option value="">과목 선택</option>
                        {/* <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="React">React</option>
                        <option value="AWS">AWS</option>
                        <option value="CI/CD">CI/CD</option>
                        <option value="Springboot">Sprigboot</option>
                        <option value="기타">기타</option> */}
                </select>
                <Link
                  to="../study/write"
                  className="btn border-0 text-white"
                  style={{ backgroundColor: '#84cc16' }}
                >
                  일지 작성하기
                </Link>
              </div>
            </div>

            {studyLogs.map((log) => (
              <div key={log.diaryId} className="studylog-boxes card mb-4" data-aos="fade-up">
                <div className="card-body">
                  {/*  제목 표시 */}
                  <h5 className="fw-bold">{log.title}</h5>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span className="badge bg-secondary me-2">{log.studyDate}</span>
                      <strong>{log.subject}</strong>
                      <span className="text-muted ms-3">NAME: {log.memberName}</span>
                    </div>
                    <div>
                      <button
                        className={`btn ${likedMap[log.diaryId] ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => handleLike(log.diaryId)}
                      >
                        <i className={`bi ${likedMap[log.diaryId] ? 'bi-heart-fill' : 'bi-heart'}`}></i>{' '}
                        {log.likeCount}
                      </button>
                    </div>
                  </div>

                  <p>{log.aiSummary}</p>

                  <div className="text-end">
                    <Link
                      to={`/study/public/${log.diaryId}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      상세 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default StudyLogPublic;
