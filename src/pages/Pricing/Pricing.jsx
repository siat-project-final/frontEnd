// import React from 'react';
// import Header from '../../components/common/Header';
// import Footer from '../../components/common/Footer';
// import Sidebar from '../../components/common/Sidebar';

// const Pricing = () => {
//   const plans = [
//     {
//       name: 'Free',
//       price: 0,
//       features: ['Aida dere', 'Nec feugiat nisl', 'Nulla at volutpat dola'],
//       disabled: ['Pharetra massa', 'Massa ultricies mi'],
//     },
//     {
//       name: 'Business',
//       price: 19,
//       features: ['Aida dere', 'Nec feugiat nisl', 'Nulla at volutpat dola', 'Pharetra massa'],
//       disabled: ['Massa ultricies mi'],
//       featured: true,
//     },
//     {
//       name: 'Developer',
//       price: 29,
//       features: ['Aida dere', 'Nec feugiat nisl', 'Nulla at volutpat dola', 'Pharetra massa', 'Massa ultricies mi'],
//     },
//     {
//       name: 'Ultimate',
//       price: 49,
//       features: ['Aida dere', 'Nec feugiat nisl', 'Nulla at volutpat dola', 'Pharetra massa', 'Massa ultricies mi'],
//       advanced: true,
//     },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="container-flex">
//         <Sidebar />
//         <main className="main">
//           <div className="page-title" data-aos="fade">
//             <div className="heading">
//               <div className="container">
//                 <div className="row d-flex justify-content-center text-center">
//                   <div className="col-lg-8">
//                     <h1>Pricing</h1>
//                     <p className="mb-0">
//                       다양한 학습자를 위한 요금제를 선택하세요. 무료부터 전문가용까지 준비되어 있습니다.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <nav className="breadcrumbs">
//               <div className="container">
//                 <ol>
//                   <li><a href="/">Home</a></li>
//                   <li className="current">Pricing</li>
//                 </ol>
//               </div>
//             </nav>
//           </div>

//           <section id="pricing" className="pricing section">
//             <div className="container">
//               <div className="row gy-3">
//                 {plans.map((plan, idx) => (
//                   <div
//                     key={idx}
//                     className="col-xl-3 col-lg-6"
//                     data-aos="fade-up"
//                     data-aos-delay={100 * (idx + 1)}
//                   >
//                     <div className={`pricing-item ${plan.featured ? 'featured' : ''}`}>
//                       {plan.advanced && <span className="advanced">Advanced</span>}
//                       <h3>{plan.name}</h3>
//                       <h4>
//                         <sup>$</sup>
//                         {plan.price}
//                         <span> / month</span>
//                       </h4>
//                       <ul>
//                         {plan.features.map((f, i) => (
//                           <li key={`f-${i}`}>{f}</li>
//                         ))}
//                         {plan.disabled?.map((d, i) => (
//                           <li key={`d-${i}`} className="na">
//                             {d}
//                           </li>
//                         ))}
//                       </ul>
//                       <div className="btn-wrap">
//                         <a href="#" className="btn-buy">
//                           Buy Now
//                         </a>
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

// export default Pricing;
