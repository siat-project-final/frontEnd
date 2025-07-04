import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmOnlyModal from '../../../components/common/ConfirmOnlyModal';
import '../../../App.css';
import Todo from '../../../components/common/Todo';
import { applyMentoring } from '../../../api/mentoring'; // 실제 연동 시 사용

const options = [
  { label: 'siat 수업 관련', value: 'siat 수업 관련' },
  { label: '커리어 조언', value: '커리어 조언' },
  { label: '회사 적응 팁', value: '회사 적응 팁' },
  { label: '장애 극복', value: '장애 극복' },
  { label: '기타', value: 'other' },
];

const MentoringApply = () => {
  const [intro, setIntro] = useState('');
  const [selected, setSelected] = useState([]);
  const [otherText, setOtherText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showIntroError, setShowIntroError] = useState(false);
  const [showMentorBlockModal, setShowMentorBlockModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mentor = location.state?.mentor;
  const selectedDate = location.state?.selectedDate;
  const memberId = localStorage.getItem('memberId');
  const menteeName = localStorage.getItem('memberName');

  // 멘토 접근 차단
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role?.toUpperCase() === 'MENTOR') {
      setShowMentorBlockModal(true);
    }
  }, [navigate]);

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

  const handleCloseModal = async () => {
    const finalTopics = selected.includes('other')
      ? [...selected.filter((v) => v !== 'other'), otherText]
      : selected;
      console.log('selectedDate 원본:', selectedDate);
      console.log('typeof selectedDate:', typeof selectedDate);
    const selectedDateObj = selectedDate instanceof Date
      ? selectedDate
      : new Date(`${selectedDate}T09:00:00`);

    const year = selectedDateObj.getFullYear();
    const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDateObj.getDate()).padStart(2, '0');
    const kstDateStr = `${year}-${month}-${day}`;
    console.log('최종 KST 날짜:', kstDateStr);

    try {
      await applyMentoring({
        mentorId: mentor.mentorId, // mentor.mentorId 사용 가능
        memberId: Number(memberId),
        menteeName: menteeName,
        date: `${kstDateStr}T00:00:00`,
        introduction: intro,
        subject: finalTopics.join(', '),
      });
      // 성공 시 예약 목록으로 이동
      navigate('/mentoring/mentee/register', {
        state: {
          mentor,
          selectedDate: kstDateStr,
          intro,
          topics: finalTopics,
        },
      });
    } catch (error) {
      console.error('멘토링 신청 실패:', error);
      alert('멘토링 신청 중 오류가 발생했습니다.');
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Header menuType="mentoring" />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="prewrite-main">
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            대화내용 사전작성
          </h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
                  자기소개 <span style={{ color: 'red', fontSize: '16px' }}>(필수)</span>
                </div>
                {showIntroError && (
                  <div style={{ color: '#dc3545', fontSize: '14px' }}>자기소개를 해주세요.</div>
                )}
              </div>
              <textarea
                placeholder="이름 / 소속, 기술 스택, 개발 계기, 협업 스타일 등을 자유롭게 작성해주세요."
                value={intro}
                onChange={handleIntroChange}
                rows={5}
                style={{
                  width: '60%',
                  borderRadius: 10,
                  resize: 'none',
                  height: '160px',
                  padding: '5px 16px',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  멘토링 주제 <span style={{ color: 'red', fontSize: '16px' }}>(필수)</span>
                </div>
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
                        style={{ width: '18px', height: '18px', accentColor: '#e5e5e5' }}
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
                  marginRight: 10,
                }}
              >
                날짜 변경
              </button>
              <button
                type="submit"
                style={{
                  background: '#84cc16',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  padding: '10px 20px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                사전작성 완료
              </button>
            </div>
          </form>

          <ConfirmOnlyModal
            visible={showModal}
            message={
              <>
                멘토링 신청이 완료되었습니다!
                <br />
                <span style={{ fontSize: '15px', display: 'inline-block', marginTop: '10px' }}>
                  멘토 수락 후, 대화 일정이 확정됩니다. 예약목록에서 신청 현황을 확인해보세요.
                </span>
              </>
            }
            onClose={handleCloseModal}
          />
          <ConfirmOnlyModal
            visible={showMentorBlockModal}
            message={
              <>
                멘토는 멘토링 신청이 불가능합니다.
              </>
            }
            onClose={() => {
              setShowMentorBlockModal(false);
              navigate('/mentoring/mentor/detail');
            }}
          />
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MentoringApply;
