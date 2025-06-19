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
              <div className="mentoring-box">
                <h3 className="mentoring-date">6/6 (금)</h3>
                <div className="mentoring-content">
                  <div className="mentor-image">
                    <div className="mentoring-image-placeholder">멘토 이미지</div>
                  </div>
                  <div className="mentoring-form-group">
                    <label>대화주제</label>
                    <input type="text" defaultValue="선택한 항목대로" readOnly />
                    <label>획득 xp</label>
                    <input type="text" defaultValue="바꾸는 게 어떨까" readOnly />
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
                    <label>대화주제</label>
                    <input type="text" defaultValue="선택한 항목대로" readOnly />
                    <label>획득 xp</label>
                    <input type="text" defaultValue="바꾸는 게 어떨까" readOnly />
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
