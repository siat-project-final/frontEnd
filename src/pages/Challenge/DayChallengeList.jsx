import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const DayChallengeList = () => {
  return (
    <>
      <Header />
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Courses</h1>
                  <p className="mb-0">Odio et unde deleniti. Deserunt numquam exercitationem...</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Courses</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Courses Section */}
        <section id="courses" className="courses section">
          <div className="container">
            <div className="row">
              {[
                {
                  title: 'Website Design',
                  category: 'Web Development',
                  price: '$169',
                  img: '/assets/img/course-1.jpg',
                  trainerImg: '/assets/img/trainers/trainer-1-2.jpg',
                  trainer: 'Antonio',
                  users: 50,
                  likes: 65
                },
                {
                  title: 'Search Engine Optimization',
                  category: 'Marketing',
                  price: '$250',
                  img: '/assets/img/course-2.jpg',
                  trainerImg: '/assets/img/trainers/trainer-2-2.jpg',
                  trainer: 'Lana',
                  users: 35,
                  likes: 42
                },
                {
                  title: 'Copywriting',
                  category: 'Content',
                  price: '$180',
                  img: '/assets/img/course-3.jpg',
                  trainerImg: '/assets/img/trainers/trainer-3-2.jpg',
                  trainer: 'Brandon',
                  users: 20,
                  likes: 85
                }
              ].map((course, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
                  data-aos="zoom-in"
                  data-aos-delay={100 * (index + 1)}
                >
                  <div className="course-item">
                    <img src={course.img} className="img-fluid" alt="course" />
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="category">{course.category}</p>
                        <p className="price">{course.price}</p>
                      </div>
                      <h3><a href="/course-details">{course.title}</a></h3>
                      <p className="description">
                        Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.
                      </p>
                      <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                          <img src={course.trainerImg} className="img-fluid" alt="trainer" />
                          <a href="#" className="trainer-link">{course.trainer}</a>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                          <i className="bi bi-person user-icon"></i>&nbsp;{course.users}
                          &nbsp;&nbsp;
                          <i className="bi bi-heart heart-icon"></i>&nbsp;{course.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DayChallengeList;
