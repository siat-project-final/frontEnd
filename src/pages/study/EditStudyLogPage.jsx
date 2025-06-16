import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

// 임시 데이터
const dummyLogs = [
  { id: 1, title: 'BERT 학습', subject: 'AI 개론', date: '2025-06-13', content: 'BERT 구조 학습함', summary: 'BERT는 트랜스포머 기반 모델이다.' },
  { id: 2, title: 'useEffect 정리', subject: 'React', date: '2025-06-12', content: 'useEffect 훅 정리함', summary: '컴포넌트 라이프사이클 관리에 사용된다.' },
];

const EditStudyLogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    content: '',
    summary: '',
  });

  useEffect(() => {
    const log = dummyLogs.find(item => item.id === parseInt(id));
    if (log) {
      setFormData(log);
    } else {
      alert('해당 일지를 찾을 수 없습니다.');
      navigate('/study');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('수정된 데이터:', formData);
    navigate('/study');
  };

  return (
    <>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main">
          
          <div className="container py-5">
            <h1 className="h3 fw-bold mb-4">학습일지 수정</h1>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">학습일지 제목</label>
                  <input name="title" type="text" className="form-control" value={formData.title} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">공개 여부</label>
                  <select className="form-select">
                    <option>공개</option>
                    <option>비공개</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">날짜</label>
                  <input name="date" type="date" className="form-control" value={formData.date} onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">과목</label>
                  <input name="subject" type="text" className="form-control" value={formData.subject} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">학습일지 내용</label>
                <textarea name="content" className="form-control" rows="5" value={formData.content} onChange={handleChange}></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">AI 요약</label>
                <textarea name="summary" className="form-control" rows="3" value={formData.summary} readOnly></textarea>
              </div>

              <div className="d-flex justify-content-end gap-3">
                <button type="submit" className="btn btn-primary">수정 완료</button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default EditStudyLogPage;
