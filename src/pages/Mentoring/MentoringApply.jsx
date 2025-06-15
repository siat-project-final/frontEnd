import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const MentoringApply = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container text-center">
              <h1>멘토링 신청</h1>
              <p>아래 양식을 작성하여 멘토링을 신청해보세요.</p>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <form className="php-email-form">
              <div className="row">
                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="이름" required />
                </div>
                <div className="col-md-6">
                  <input type="email" name="email" className="form-control" placeholder="이메일" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <textarea name="message" className="form-control" rows="5" placeholder="멘토링 신청 내용" required></textarea>
              </div>
              <div className="text-center mt-3">
                <button type="submit">신청하기</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MentoringApply;