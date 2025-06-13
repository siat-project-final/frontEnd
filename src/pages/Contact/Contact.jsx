import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar />
        <main className="main">
          <div className="page-title" data-aos="fade">
            <div className="heading">
              <div className="container">
                <div className="row d-flex justify-content-center text-center">
                  <div className="col-lg-8">
                    <h1>Contact</h1>
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
                  <li className="current">Contact</li>
                </ol>
              </div>
            </nav>
          </div>

          <section id="contact" className="contact section">
            <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
              <iframe
                style={{ border: 0, width: '100%', height: '300px' }}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row gy-4">
                <div className="col-lg-4">
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                    <i className="bi bi-geo-alt flex-shrink-0"></i>
                    <div>
                      <h3>Address</h3>
                      <p>A108 Adam Street, New York, NY 535022</p>
                    </div>
                  </div>
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                    <i className="bi bi-telephone flex-shrink-0"></i>
                    <div>
                      <h3>Call Us</h3>
                      <p>+1 5589 55488 55</p>
                    </div>
                  </div>
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                    <i className="bi bi-envelope flex-shrink-0"></i>
                    <div>
                      <h3>Email Us</h3>
                      <p>info@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <form className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                      </div>
                      <div className="col-md-6">
                        <input type="email" name="email" className="form-control" placeholder="Your Email" required />
                      </div>
                      <div className="col-md-12">
                        <input type="text" name="subject" className="form-control" placeholder="Subject" required />
                      </div>
                      <div className="col-md-12">
                        <textarea name="message" className="form-control" rows="6" placeholder="Message" required></textarea>
                      </div>
                      <div className="col-md-12 text-center">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                        <button type="submit">Send Message</button>
                      </div>
                    </div>
                  </form>
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

export default Contact;
