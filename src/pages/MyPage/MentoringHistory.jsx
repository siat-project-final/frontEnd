import React from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './MentoringHistory.css';

const MentoringHistory = () => {
  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="mentoring-section" data-aos="fade-up">
            <h1 className="page-title">MENTORING HISTORY</h1>

            <div className="mentoring-boxes">
              <div className="mentoring-box">
                <h3 className="mentoring-date">6/6 (금)</h3>
                <div className="mentoring-content">
                  <div className="mentor-image">
                    <div className="mentoring-image-placeholder">멘토 이미지</div>
                  </div>
                  <div className="mentoring-form-group">
                    <label>멘토 성함</label>
                    <input type="text" defaultValue="홍길동" readOnly />
                    <label>대화 주제</label>
                    <input type="text" defaultValue="진로 상담" readOnly />
                  </div>
                </div>
              </div>

              <div className="mentoring-box">
                <h3 className="mentoring-date">6/5 (목)</h3>
                <div className="mentoring-content">
                  <div className="mentor-image">
                    <div className="mentoring-image-placeholder">멘토 이미지</div>
                  </div>
                  <div className="mentoring-form-group">
                    <label>멘토 성함</label>
                    <input type="text" defaultValue="홍길동" readOnly />
                    <label>대화 주제</label>
                    <input type="text" defaultValue="진로 상담" readOnly />
                  </div>
                </div>
              </div>
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
