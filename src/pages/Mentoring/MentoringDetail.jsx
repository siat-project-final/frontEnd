import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const MentoringDetail = () => {
  const mentor = {
    name: 'Walter White',
    field: 'Business',
    img: '/assets/img/team/team-1.jpg',
    description: `Qui et explicabo voluptatem et ab qui vero et voluptas. Sint voluptates temporibus quam autem.\nAtque nostrum voluptatum laudantium a doloremque enim et ut dicta.\nCorporis aut officiis sit nihil est. Labore aut sapiente aperiam.`,
    schedule: '매주 수요일 5:00 PM - 7:00 PM',
    contact: 'mentor@example.com',
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container text-center">
              <h1>{mentor.name}</h1>
              <p>{mentor.field}</p>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img src={mentor.img} className="img-fluid" alt={mentor.name} />
              </div>
              <div className="col-lg-6">
                <h3>멘토 소개</h3>
                <p>{mentor.description}</p>
                <ul>
                  <li><strong>연락처:</strong> {mentor.contact}</li>
                  <li><strong>일정:</strong> {mentor.schedule}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MentoringDetail;
