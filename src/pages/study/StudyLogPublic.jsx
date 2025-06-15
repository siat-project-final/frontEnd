// import React from 'react';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import StudyLogCard from '../../components/studyCard/StudyLogCard';
// import { Link } from 'react-router-dom';

// const StudyLogPublic = () => {
//   const studyLogs = [
//     { id: 1, date: '2025-06-13', subject: 'AI 개론', summary: 'BERT 구조 학습함' },
//     { id: 2, date: '2025-06-12', subject: 'React', summary: 'useEffect 훅 정리함' },
//     { id: 3, date: '2025-06-11', subject: 'Spring Boot', summary: 'JPA fetch 전략 학습함' },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="container-flex" style={{ display: 'flex' }}>
//         <Sidebar menuType="studylog" />

//         <main className="main" style={{ flex: 1 }}>
//           <div className="container py-5">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <h1 className="h3 fw-bold">공유 학습일지</h1>
//               <Link to="/studylog/write" className="btn btn-primary">일지 작성하기</Link>
//             </div>

//             <div className="mb-4 text-end">
//               <select className="form-select w-auto d-inline-block">
//                 <option>과목</option>
//               </select>
//             </div>

//             {studyLogs.map(log => (
//               <StudyLogCard key={log.id} log={log} />
//             ))}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default StudyLogPublic;
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';

const StudyLogPublic = () => {
  const studyLogs = [
    {
      id: 1,
      date: '2025-06-13',
      subject: 'AI 개론',
      summary: 'BERT 구조 학습함',
      author: '이수현',
      likes: 45,
      comments: [
        { user: '최은정', text: '깔끔하게 정리했네요:) 덕분에 많은 도움 받고 갑니다아', date: '2025.06.13' },
      ],
    },
    {
      id: 2,
      date: '2025-06-12',
      subject: 'React',
      summary: 'useEffect 훅 정리함',
      author: '이수현',
      likes: 20,
      comments: [
        { user: '최은정', text: '깔끔하게 정리했네요:) 덕분에 많은 도움 받고 갑니다fff아', date: '2025.06.13' },
      ],
    },
    {
      id: 3,
      date: '2025-06-11',
      subject: 'Spring Boot',
      summary: 'JPA fetch 전략 학습함',
      author: '이수현',
      likes: 30,
      comments: [],
    },
  ];

  return (
    <>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main" style={{ flex: 1 }}>
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 fw-bold">공유 학습일지</h1>
              <Link to="/studylog/write" className="btn btn-primary">일지 작성하기</Link>
            </div>

            <div className="mb-4 text-end">
              <select className="form-select w-auto d-inline-block">
                <option>과목</option>
              </select>
            </div>

            {studyLogs.map(log => (
              <div key={log.id} className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span className="badge bg-secondary me-2">{log.date}</span>
                      <strong>{log.subject}</strong>
                      <span className="text-muted ms-3">NAME: {log.author}</span>
                    </div>
                    <div>
                      <button className="btn btn-outline-success">
                        <i className="bi bi-heart"></i> {log.likes}
                      </button>
                    </div>
                  </div>
                  <p>{log.summary}</p>
                  <div className="text-end">
                    <Link to={`/study/public/${log.id}`} className="btn btn-outline-secondary btn-sm">상세 보기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default StudyLogPublic;
