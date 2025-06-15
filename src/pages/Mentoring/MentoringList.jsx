import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const MentoringList = () => {
  const mentors = [
    {
      name: 'Walter White',
      field: 'Business',
      intro: 'Aliquam iure quaerat voluptatem praesentium possimus unde laudantium vel dolorum distinctio dire flow',
      img: '/assets/img/team/team-1.jpg',
    },
    {
      name: 'Sarah Jhonson',
      field: 'Marketing',
      intro: 'Labore ipsam sit consequatur exercitationem rerum laboriosam laudantium aut quod dolores exercitationem ut',
      img: '/assets/img/team/team-2.jpg',
    },
    {
      name: 'William Anderson',
      field: 'Maths',
      intro: 'Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui',
      img: '/assets/img/team/team-3.jpg',
    },
    {
      name: 'Amanda Jepson',
      field: 'Foreign Languages',
      intro: 'Magni voluptatem accusamus assumenda cum nisi aut qui dolorem voluptate sed et veniam quasi quam consectetur',
      img: '/assets/img/team/team-4.jpg',
    },
    {
      name: 'Brian Doe',
      field: 'Web Development',
      intro: 'Qui consequuntur quos accusamus magnam quo est molestiae eius laboriosam sunt doloribus quia impedit laborum velit',
      img: '/assets/img/team/team-5.jpg',
    },
    {
      name: 'Josepha Palas',
      field: 'Business',
      intro: 'Sint sint eveniet explicabo amet consequatur nesciunt error enim rerum earum et omnis fugit eligendi cupiditate vel',
      img: '/assets/img/team/team-6.jpg',
    },
  ];

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
                      <a href="#"><i className="bi bi-twitter-x"></i></a>
                      <a href="#"><i className="bi bi-facebook"></i></a>
                      <a href="#"><i className="bi bi-instagram"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
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
      <Footer />
    </>
  );
};

export default MentoringList;
