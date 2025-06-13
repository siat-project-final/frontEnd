import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const MyPageMain = () => {
  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar />
        <main className="main">
          {/* Page Title */}
          <div className="page-title" data-aos="fade">
            <div className="heading">
              <div className="container">
                <div className="row d-flex justify-content-center text-center">
                  <div className="col-lg-8">
                    <h1>About Us</h1>
                    <p className="mb-0">Odio et unde deleniti. Deserunt numquam exercitationem...</p>
                  </div>
                </div>
              </div>
            </div>
            <nav className="breadcrumbs">
              <div className="container">
                <ol>
                  <li><a href="/">Home</a></li>
                  <li className="current">About Us</li>
                </ol>
              </div>
            </nav>
          </div>

          {/* About Us Section */}
          <section className="section about-us">
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up">
                  <img src="/assets/img/about-2.jpg" className="img-fluid" alt="" />
                </div>
                <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up">
                  <h3>Voluptatem dignissimos provident quasi corporis</h3>
                  <p className="fst-italic">Lorem ipsum dolor sit amet...</p>
                  <ul>
                    <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi...</li>
                    <li><i className="bi bi-check-circle"></i> Duis aute irure dolor...</li>
                    <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi...</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Counts Section */}
          <section className="section counts light-background">
            <div className="container" data-aos="fade-up">
              <div className="row gy-4">
                {/* 반복되는 Stats 아이템 */}
                {[1232, 64, 42, 24].map((count, index) => (
                  <div key={index} className="col-lg-3 col-md-6">
                    <div className="stats-item text-center w-100 h-100">
                      <span className="purecounter">{count}</span>
                      <p>{['Students', 'Courses', 'Events', 'Trainers'][index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Testimonials</h2>
              <p>What are they saying</p>
            </div>

            <div className="container" data-aos="fade-up">
              <div className="swiper">
                <div className="swiper-wrapper">
                  {/* 반복 예시 */}
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="swiper-slide">
                      <div className="testimonial-wrap">
                        <div className="testimonial-item">
                          <img src={`/assets/img/testimonials/testimonials-${n}.jpg`} className="testimonial-img" alt="" />
                          <h3>사용자 이름</h3>
                          <h4>직함</h4>
                          <div className="stars">★★★★★</div>
                          <p>
                            <i className="bi bi-quote quote-icon-left"></i>
                            <span>피드백 내용 요약...</span>
                            <i className="bi bi-quote quote-icon-right"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MyPageMain;
