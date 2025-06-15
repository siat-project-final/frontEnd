import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
<<<<<<< HEAD
import Sidebar from '../../components/common/Sidebar';
=======
>>>>>>> 3b929a2 (feat: 마이페이지 UI 작업업)

const CourseDetail = () => {
  return (
    <>
      <Header />
<<<<<<< HEAD
      <div className="container-flex">
        <Sidebar />
        <main className="main">
          {/* Page Title */}
          <div className="page-title" data-aos="fade">
            <div className="heading">
              <div className="container">
                <div className="row d-flex justify-content-center text-center">
                  <div className="col-lg-8">
                    <h1>Course Details</h1>
                    <p className="mb-0">Odio et unde deleniti. Deserunt numquam exercitationem...</p>
                  </div>
                </div>
              </div>
            </div>
            <nav className="breadcrumbs">
              <div className="container">
                <ol>
                  <li><a href="/">Home</a></li>
                  <li className="current">Course Details</li>
                </ol>
              </div>
            </nav>
          </div>

          {/* Course Details Section */}
          <section className="courses-course-details section">
            <div className="container" data-aos="fade-up">
              <div className="row">
                <div className="col-lg-8">
                  <img src="/assets/img/course-details.jpg" className="img-fluid" alt="" />
                  <h3>Et enim incidunt fuga tempora</h3>
                  <p>Qui et explicabo voluptatem et ab qui vero et voluptas...</p>
                </div>
                <div className="col-lg-4">
                  <div className="course-info d-flex justify-content-between align-items-center">
                    <h5>Trainer</h5>
                    <p><a href="#">Walter White</a></p>
                  </div>
                  <div className="course-info d-flex justify-content-between align-items-center">
                    <h5>Course Fee</h5>
                    <p>$165</p>
                  </div>
                  <div className="course-info d-flex justify-content-between align-items-center">
                    <h5>Available Seats</h5>
                    <p>30</p>
                  </div>
                  <div className="course-info d-flex justify-content-between align-items-center">
                    <h5>Schedule</h5>
                    <p>5.00 pm - 7.00 pm</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs Section */}
          <section className="tabs section">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row">
                <div className="col-lg-3">
                  <ul className="nav nav-tabs flex-column">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <li className="nav-item" key={n}>
                        <a className={`nav-link${n === 1 ? ' active show' : ''}`} data-bs-toggle="tab" href={`#tab-${n}`}>Tab {n}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-9 mt-4 mt-lg-0">
                  <div className="tab-content">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className={`tab-pane${n === 1 ? ' active show' : ''}`} id={`tab-${n}`}>
                        <div className="row">
                          <div className="col-lg-8 details order-2 order-lg-1">
                            <h3>Tab Title {n}</h3>
                            <p className="fst-italic">탭 {n}에 대한 간략 설명</p>
                            <p>탭 {n} 내용 설명 텍스트</p>
                          </div>
                          <div className="col-lg-4 text-center order-1 order-lg-2">
                            <img src={`/assets/img/tabs/tab-${n}.png`} alt="tab" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
=======
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Course Details</h1>
                  <p className="mb-0">Odio et unde deleniti. Deserunt numquam exercitationem...</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Course Details</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Course Details Section */}
        <section className="courses-course-details section">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-8">
                <img src="/assets/img/course-details.jpg" className="img-fluid" alt="" />
                <h3>Et enim incidunt fuga tempora</h3>
                <p>Qui et explicabo voluptatem et ab qui vero et voluptas...</p>
              </div>
              <div className="col-lg-4">
                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>Trainer</h5>
                  <p><a href="#">Walter White</a></p>
                </div>
                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>Course Fee</h5>
                  <p>$165</p>
                </div>
                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>Available Seats</h5>
                  <p>30</p>
                </div>
                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>Schedule</h5>
                  <p>5.00 pm - 7.00 pm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="tabs section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <li className="nav-item" key={n}>
                      <a className={`nav-link${n === 1 ? ' active show' : ''}`} data-bs-toggle="tab" href={`#tab-${n}`}>Tab {n}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className={`tab-pane${n === 1 ? ' active show' : ''}`} id={`tab-${n}`}>
                      <div className="row">
                        <div className="col-lg-8 details order-2 order-lg-1">
                          <h3>Tab Title {n}</h3>
                          <p className="fst-italic">탭 {n}에 대한 간략 설명</p>
                          <p>탭 {n} 내용 설명 텍스트</p>
                        </div>
                        <div className="col-lg-4 text-center order-1 order-lg-2">
                          <img src={`/assets/img/tabs/tab-${n}.png`} alt="tab" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
>>>>>>> 3b929a2 (feat: 마이페이지 UI 작업업)
      <Footer />
    </>
  );
};

export default CourseDetail;
