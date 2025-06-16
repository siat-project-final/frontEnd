import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import StudyLogCard from '../../components/studyCard/StudyLogCard';
import { Link } from 'react-router-dom';

const StudyLogPage = () => {
    const studyLogs = [
      { id: 1, date: '2025-06-13', subject: 'AI 개론', summary: 'BERT 구조 학습함' },
      { id: 2, date: '2025-06-12', subject: 'React', summary: 'useEffect 훅 정리함' },
      { id: 3, date: '2025-06-11', subject: 'Spring Boot', summary: 'JPA fetch 전략 학습함' },
    ];
  
    return (
      <>
        <Header />
        <div className="container-flex" style={{ display: 'flex' }}>
          <Sidebar menuType="studylog" />

          <main className="main">
            
            <div className="container py-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 fw-bold">MY STUDY LOG</h1>
                <button className="btn btn-primary"><Link to="./write">일지 작성하기</Link></button>
              </div>
    
              <div className="mb-4 text-end">
                <select className="form-select w-auto d-inline-block">
                  <option>과목</option>
                </select>
              </div>
    
              {studyLogs.map(log => (
                <StudyLogCard key={log.id} log={log} />
              ))}
            </div>
          </main>
        </div>
      </>
    );
  };
  
  export default StudyLogPage;
  
  