import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmOnlyModal from '../../../components/common/ConfirmOnlyModal';
import '../../../App.css';
import Todo from '../../../components/common/Todo';

// 멘토링 사전 작성 페이지

const options = [
  { label: 'siat 수업 관련', value: 'siat' },
  { label: '커리어 조언', value: 'career' },
  { label: '회사 적응 팁', value: 'adapt' },
  { label: '장애 극복', value: 'overcome' },
  { label: '기타', value: 'other' },
];

const MentoringApply = () => {
  const [intro, setIntro] = useState('');
  const [selected, setSelected] = useState([]);
  const [otherText, setOtherText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showIntroError, setShowIntroError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { mentor, selectedDate } = location.state || {};

  const handleCheck = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setShowError(false);
  };

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
    setShowIntroError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (intro.trim() === '') {
      setShowIntroError(true);
      hasError = true;
    }

    if (selected.length === 0) {
      setShowError(true);
      hasError = true;
    }

    if (hasError) return;
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/mentoring/mentee/register', {
      state: {
        mentor,
        selectedDate,
        intro,
        topics: selected.includes('other')
          ? [...selected.filter((s) => s !== 'other'), otherText]
          : selected,
      },
    });
  };

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="prewrite-main">
          <h1>대화내용 사전작성</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>자기소개 (필수)</div>
                {showIntroError && (
                  <div style={{ color: '#dc3545', fontSize: '14px' }}>자기소개를 해주세요.</div>
                )}
              </div>
              <textarea
                placeholder="
- 이름 / 소속
- 현재 배우는 내용 / 기술 스택
- 개발을 시작한 계기
- 나의 강점이나 협업 스타일"
                value={intro}
                onChange={handleIntroChange}
                // required
                rows={5}
                style={{
                  width: '60%',
                  borderRadius: 10,
                  resize: 'none',
                  height: '160px',
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px',
                  marginTop: '15px',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>멘토링 주제 (필수)</div>
                {showError && (
                  <div style={{ color: '#dc3545', fontSize: '14px' }}>
                    최소 1개 이상의 주제를 선택해주세요.
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {options.map((option, index) => (
                  <div key={index}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        gap: '14px',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(option.value)}
                        onChange={() => handleCheck(option.value)}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                        }}
                      />
                      <span>{option.label}</span>

                      {option.value === 'other' && selected.includes('other') && (
                        <input
                          type="text"
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          placeholder="기타 주제를 입력해주세요"
                          style={{
                            marginLeft: '5px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            width: '300px',
                          }}
                        />
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <button
                type="button"
                onClick={() => navigate('/mentoring/detail')}
                style={{
                  background: '#ced4da',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  padding: '10px 20px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(95,207,128,0.08)',
                  marginRight: 10,
                }}
              >
                날짜 변경
              </button>
              <button
                type="submit"
                style={{
                  background: '#5fcf80',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  padding: '10px 20px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(95,207,128,0.08)',
                }}
              >
                사전작성 완료
              </button>
            </div>
          </form>
          <ConfirmOnlyModal
            visible={showModal}
            message="멘토링 신청이 완료되었습니다!"
            onClose={handleCloseModal}
          />
        </main>
        {/* 오른쪽: Todo 사이드바 */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MentoringApply;