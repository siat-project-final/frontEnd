// import React from 'react';
// import Header from '../../components/common/Header';
// import Footer from '../../components/common/Footer';
// import Sidebar from '../../components/common/Sidebar';

// const Events = () => {
//   const events = [
//     {
//       title: 'Introduction to webdesign',
//       date: 'Sunday, September 26th at 7:00 pm',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
//       img: '/assets/img/events-item-1.jpg',
//     },
//     {
//       title: 'Marketing Strategies',
//       date: 'Sunday, November 15th at 7:00 pm',
//       description:
//         'Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
//       img: '/assets/img/events-item-2.jpg',
//     },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="container-flex">
//         <Sidebar />
//         <main className="main">
//           {/* Page Title */}
//           <div className="page-title" data-aos="fade">
//             <div className="heading">
//               <div className="container">
//                 <div className="row d-flex justify-content-center text-center">
//                   <div className="col-lg-8">
//                     <h1>이벤트</h1>
//                     <p className="mb-0">
//                       오디오와 운동을 통해 삶의 질을 높이고자 하는 사람들을 위한 다양한 이벤트를 제공합니다.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <nav className="breadcrumbs">
//               <div className="container">
//                 <ol>
//                   <li><a href="/">Home</a></li>
//                   <li className="current">Events</li>
//                 </ol>
//               </div>
//             </nav>
//           </div>

//           {/* Events Section */}
//           <section id="events" className="events section">
//             <div className="container" data-aos="fade-up">
//               <div className="row">
//                 {events.map((event, index) => (
//                   <div key={index} className="col-md-6 d-flex align-items-stretch">
//                     <div className="card">
//                       <div className="card-img">
//                         <img src={event.img} alt={event.title} />
//                       </div>
//                       <div className="card-body">
//                         <h5 className="card-title">
//                           <a href="#">{event.title}</a>
//                         </h5>
//                         <p className="fst-italic text-center">{event.date}</p>
//                         <p className="card-text">{event.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Events;
