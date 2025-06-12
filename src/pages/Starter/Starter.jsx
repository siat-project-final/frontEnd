import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Starter = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="page-title" data-aos="fade">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Starter Page</h1>
                  <p className="mb-0">
                    Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Starter Page</li>
              </ol>
            </div>
          </nav>
        </div>

        <section id="starter-section" className="starter-section section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Starter Section</h2>
            <p>Your Description Here</p>
          </div>

          <div className="container" data-aos="fade-up">
            <p>Use this page as a starter for your own custom pages.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Starter;
