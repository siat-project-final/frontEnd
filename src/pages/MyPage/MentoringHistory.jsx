import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './MentoringHistory.css';
// ✅ axios 연동 (주석 처리)
// import { getMentoringHistory } from '../../api/user';

const MentoringHistory = () => {
  const [mentoringList, setMentoringList] = useState([]);
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    // ✅ 실제 API 연동 시 사용
    // getMentoringHistory(memberId)
    //   .then(res => setMentoringList(res.data))
    //   .catch(err => console.error('멘토링 히스토리 불러오기 실패:', err));

    // ✅ 현재는 dummy 데이터 사용
    setMentoringList([
      { date: '6/6 (금)', mentorName: '홍길동', topic: '진로 상담' },
      { date: '6/5 (목)', mentorName: '이수연', topic: 'AI 프로젝트' },
    ]);
  }, [memberId]);

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="mentoring-section" data-aos="fade-up">
            <h1
              className="page-title"
              style={{
                backgroundColor: '#84cc16',
                color: '#fff',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
              }}
            >
              MENTORING HISTORY
            </h1>

            <div className="mentoring-boxes">
              {mentoringList.map((item, idx) => (
                <div className="mentoring-box" key={idx}>
                  <h3 className="mentoring-date">{item.date}</h3>
                  <div className="mentoring-content">
                    <div className="mentor-image">
                      <div className="mentoring-image-placeholder">멘토 이미지</div>
                    </div>
                    <div className="mentoring-form-group">
                      <label>멘토 성함</label>
                      <input type="text" value={item.mentorName} readOnly />
                      <label>대화 주제</label>
                      <input type="text" value={item.topic} readOnly />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* 오른쪽: Todo */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MentoringHistory;
