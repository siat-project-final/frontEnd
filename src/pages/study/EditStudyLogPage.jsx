import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
// ✅ axios 연동 주석 처리
import { getMyStudyLogById, updateStudyLog } from '../../api/studyLog';

const dummyLogs = [
  {
    id: 1,
    title: 'BERT 학습',
    subject: 'AI 개론',
    date: '2025-06-13',
    content: 'BERT 구조 학습함',
    summary: 'BERT는 트랜스포머 기반 모델이다.',
  },
  {
    id: 2,
    title: 'useEffect 정리',
    subject: 'React',
    date: '2025-06-12',
    content: 'useEffect 훅 정리함',
    summary: '컴포넌트 라이프사이클 관리에 사용된다.',
  },
];

const EditStudyLogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem('memberId');

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    content: '',
    summary: '',
  });

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await getMyStudyLogById(id);
        setFormData(res.data);
      } catch {
        alert('해당 일지를 불러올 수 없습니다.');
        navigate('/study');
      }
    };
    fetchLog();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = { ...formData, memberId };
    try {
      await updateStudyLog(id, updateData);
      navigate('/study');
    } catch (err) {
      console.error('일지 수정 실패:', err);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main">
          <div className="container py-5">
            <h1
              className="h3 fw-bold mb-0"
              style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
            >
              학습일지 수정
            </h1>
            <div className="studylog-boxes">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">학습일지 제목</label>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">공개 여부</label>
                    <select className="form-select" disabled>
                      <option>공개</option>
                      <option>비공개</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">날짜</label>
                    <input
                      name="date"
                      type="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">과목</label>
                    <input
                      name="subject"
                      type="text"
                      className="form-control"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">학습일지 내용</label>
                  <textarea
                    name="content"
                    className="form-control"
                    rows="5"
                    value={formData.content}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">AI 요약</label>
                  <textarea
                    name="summary"
                    className="form-control"
                    rows="3"
                    value={formData.summary}
                    readOnly
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="submit"
                    className="btn border-0 text-white"
                    style={{ backgroundColor: '#84cc16' }}
                  >
                    수정 완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* 오른쪽: Todo 사이드바 */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default EditStudyLogPage;
