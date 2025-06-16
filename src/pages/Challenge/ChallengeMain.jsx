import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const ChallengeMain = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="challenge" />
        <main className="main">
          <div className="page-title" data-aos="fade">
            <div className="heading text-center">
              <h2>챌린지 메인</h2>
            </div>
          </div>

          <section className="section">
            <div className="container py-5">
              <div className="row g-4 justify-content-center">
                {/* 일일 챌린지 */}
                <div className="col-lg-5">
                  <div className="card text-center p-4 shadow-sm">
                    <h4 className="mb-3">일일 챌린지</h4>
                    <button
                      className="btn btn-dark mb-2"
                      onClick={() => navigate('/challenge/daily')}
                    >
                      오늘 문제 풀기
                    </button>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => navigate('/challenge/ranking')}
                    >
                      오늘의 랭킹 보기
                    </button>
                  </div>
                </div>

                {/* 종합 챌린지 */}
                <div className="col-lg-5">
                  <div className="card text-center p-4 shadow-sm">
                    <h4 className="mb-3">종합 챌린지</h4>
                    <p>복습하고 싶은 과목의 문제를 선택하여 다시 풀어보세요.</p>
                    <button
                      className="btn btn-dark"
                      onClick={() => navigate('/challenge/review')}
                    >
                      복습하러 가기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChallengeMain;
