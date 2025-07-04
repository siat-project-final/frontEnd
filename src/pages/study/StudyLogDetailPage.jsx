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
    // 새로운 필드 추가: 선택된 기간 (예: ['하루', '일주일'] )
    selectedPeriods: [], // 초기값은 빈 배열
  });
  const [originalData, setOriginalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await getMyStudyLogById(id);
        console.log('🔥 getMyStudyLogById 응답:', res);
        // 서버 응답에 selectedPeriods가 없다면 빈 배열로 초기화
        const initialData = {
          ...res.data,
          selectedPeriods: res.data.selectedPeriods || [], // 서버 응답에 이 필드가 포함되어야 합니다.
        };
        setFormData(initialData);
        setOriginalData(initialData);
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

  // 체크박스 변경 핸들러 추가
  const handlePeriodChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentPeriods = prev.selectedPeriods || []; // 안전하게 빈 배열로 시작
      if (checked) {
        // 체크박스 선택 시 추가
        return {
          ...prev,
          selectedPeriods: [...currentPeriods, value],
        };
      } else {
        // 체크박스 해제 시 제거
        return {
          ...prev,
          selectedPeriods: currentPeriods.filter((period) => period !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // memberId와 formData를 함께 전송할 데이터 생성
    const updateData = {
      ...formData,
      memberId: parseInt(memberId), // memberId를 숫자로 변환하여 전송 (API 요구사항에 따라)
    };
    try {
      await updateStudyLog(id, updateData);
      const res = await getMyStudyLogById(id);
      // 서버에서 가져온 데이터로 originalData 및 formData 업데이트
      const updatedData = {
        ...res.data,
        selectedPeriods: res.data.selectedPeriods || [],
      };
      setFormData(updatedData);
      setOriginalData(updatedData);
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
          <div className="d-flex align-items-center justify-content-between flex-nowrap mb-4">
            <h3 className="fw-bold mb-0" style={{ 
              color: '#84cc16',
              whiteSpace: 'nowrap', 
              minWidth: 'auto', marginTop: '16px', marginLeft: '16px'  }}>
              
              
              학습일지 상세
            </h3>

            <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
              {['하루', '일주일', '한 달', '세 달'].map(period => (
                <div key={period} className="form-check form-check-inline m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`header-checkbox-${period}`}
                    value={period}
                    checked={formData.selectedPeriods.includes(period)}
                    onChange={handlePeriodChange}
                    disabled={!isEditMode}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`header-checkbox-${period}`}
                    style={{ fontSize: '0.9rem' }}
                  >
                    {period}
                  </label>
                </div>
              ))}
            </div>
            </div>
            {/* 원래 h1 태그에 있던 margin-top과 margin-left를 div로 옮겼습니다.
                margin-right를 추가하여 페이지 오른쪽 끝에 너무 붙지 않도록 합니다. */}

                  
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
                  
                </div>

                <div className="row mb-3 align-items-end"> {/* align-items-end 추가 */}
                  {/* 과목 필드 너비 조정: col-md-3으로 줄임 */}
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
                    readOnly // AI 요약은 수정 불가
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