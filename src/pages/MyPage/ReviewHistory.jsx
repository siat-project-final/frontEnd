import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './ReviewHistory.css';
// ✅ axios 연동 주석
// import { getSubmissionResult } from '../../api/challenge';

const ReviewHistory = () => {
  const [reviewList, setReviewList] = useState([]);
  const memberId = sessionStorage.getItem('memberId');

  useEffect(() => {
    // ✅ 실제 API 연동 시 사용
    // getSubmissionResult(memberId)
    //   .then(res => setReviewList(res.data))
    //   .catch(err => console.error('리뷰 히스토리 불러오기 실패:', err));

    // ✅ 현재는 dummy 사용
    setReviewList([
      {
        date: '6/7',
        subject: 'JAVA',
        score: '12 / 15',
        review: '틀린 문항 복습 완료',
      },
      {
        date: '6/3',
        subject: 'REACT',
        score: '13 / 15',
        review: 'DOM 구조 이슈 재확인',
      },
    ]);
  }, [memberId]);

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="review-section" data-aos="fade-up">
            <div className="page-header">
              <h1 className="page-title">CHALLENGE REVIEW</h1>
            </div>

            <div className="review-box">
              {reviewList.map((item, idx) => (
                <div className="challenge-card" key={idx}>
                  <span className="challenge-date">{item.date}</span>
                  <div className="challenge-info">
                    <div className="info-item">
                      <p className="info-label">SUBJECT</p>
                      <p className="info-value">{item.subject}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">MY SCORE</p>
                      <p className="info-value">{item.score}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">REVIEW</p>
                      <p className="info-value">{item.review}</p>
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

export default ReviewHistory;
