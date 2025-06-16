import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const MentoringList = () => {
  const mentors = [
    {
      name: 'Walter White',
      field: 'Business Analyst',
      intro: 'SK 쉴더스 | 분당',
      img: '../../assets/img/mentors/mentor1.jpg',
    },
    {
      name: 'Sarah Jhonson',
      field: 'Software Engineer',
      intro: 'SK C&C | 판교',
      img: '../../assets/img/mentors/mentor2.jpg',
    },
    {
      name: 'William Anderson',
      field: 'Cloud Engineer',
      intro: 'AWS | 서울',
      img: '../../assets/img/mentors/mentor3.jpg',
    },
    {  
      name: 'Amanda Jepson',
      field: 'Software Developer',
      intro: 'TVING | 서울',
      img: '../../assets/img/mentors/mentor1.jpg',
    },
    {
      name: 'Brian Doe',
      field: 'Software Developer',
      intro: 'MEGAZONE CLOUD | 과천',
      img: '../../assets/img/mentors/mentor2.jpg',
    },
    {
      name: 'Josepha Palas',
      field: 'Cloud Engineer',
      intro: 'AWS | 서울',
      img: '../../assets/img/mentors/mentor3.jpg',
    },
  ];

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />

        <main className="main">
          {/* Page Title */}
          <div className="page-title" data-aos="fade">
              <div className="heading">
                <div className="container">
                  <div className="row d-flex justify-content-center text-center">
                    <div className="col-lg-8">
                      <h1>멘토 목록</h1>
                      <p className="mb-0">다양한 분야의 전문가들과 함께하는 멘토링을 경험해보세요.</p>
                    </div>
                  </div>
                </div>
              </div>
            <nav className="breadcrumbs">
              <div className="container">
                <ol>
                  <li><a href="/">Home</a></li>
                  <li className="current">Mentoring</li>
                </ol>
              </div>
            </nav>
          </div>

          {/* Mentors Section */}
          <section id="mentoring-list" className="section trainers">
            <div className="container">
              <div className="row gy-5">
                {mentors.map((mentor, index) => (
                  <div key={index} className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                    <div className="member-img">
                      <img src={mentor.img} className="img-fluid" alt={mentor.name} />
                      <div className="social">
                        <a href="/mentoring/apply"><i className="bi bi-twitter-x"></i></a>
                      </div>
                    </div>
                    <div className="member-info text-center">
                      <h4>{mentor.name}</h4>
                      <span>{mentor.field}</span>
                      <p>{mentor.intro}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MentoringList;
