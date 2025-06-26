import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import { getMyStudyLogById, updateStudyLog } from '../../api/studyLog';

const StudyLogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem('memberId');

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    contents: '',
    summary: '',
  });
  const [originalData, setOriginalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await getMyStudyLogById(id);
        console.log('🔥 getMyStudyLogById 응답:', res);
        setFormData(res.data);
        setOriginalData(res.data);
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
      const res = await getMyStudyLogById(id);
      setFormData(res.data);
      setOriginalData(res.data);
      setIsEditMode(false);
      alert('수정이 완료되었습니다.');
    } catch (err) {
      console.error('일지 수정 실패:', err);
      alert('수정 실패');
    }
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setIsEditMode(false);
  };

  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />
        <main className="main">
          <div className="container py-5">
            <h1 className="h3 fw-bold mb-0" style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}>
              학습일지 상세
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
                      value={formData.title || ''}
                      onChange={handleChange}
                      readOnly={!isEditMode}
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
                      value={formData.date || ''}
                      onChange={handleChange}
                      readOnly={!isEditMode}
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
                      value={formData.subject || ''}
                      onChange={handleChange}
                      readOnly={!isEditMode}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">학습일지 내용</label>
                  <textarea
                    name="contents"
                    className="form-control"
                    rows="5"
                    value={formData.contents || ''}
                    onChange={handleChange}
                    readOnly={!isEditMode}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">AI 요약</label>
                  <textarea
                    name="summary"
                    className="form-control"
                    rows="3"
                    value={formData.summary || ''}
                    readOnly
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-3">
                  {!isEditMode ? (
                    <button
                      type="button"
                      className="btn border-0 text-white"
                      style={{ backgroundColor: '#84cc16' }}
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeout(() => {
                          setIsEditMode(true);
                        }, 0);
                      }}
                    >
                      수정하기
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="btn border-0 text-white"
                        style={{ backgroundColor: '#84cc16' }}
                      >
                        수정 완료
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        취소
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default StudyLogDetailPage;
