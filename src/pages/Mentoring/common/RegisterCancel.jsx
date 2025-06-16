import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import Footer from '../../../components/common/Footer';

const cancelReasons = [
  '갑작스러운 일정 변경이 생겼어요.',
  '개인 사정으로 참여가 어려워졌어요.',
  '건강상 문제로 참여가 어렵습니다.',
  '다른 일정과 겹쳐서 참석이 어렵습니다.',
  '준비가 부족해서 다음 기회에 참여하고 싶어요',
  '기타 사유',
];

const RegisterCancel = () => {
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [otherText, setOtherText] = useState('');

  const handleCheck = (idx) => {
    setSelected((prev) => (prev.includes(idx) ? prev.filter((v) => v !== idx) : [...prev, idx]));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    // 실제 취소 처리 로직 추가 가능
    setShowModal(false);
    // 예시: 취소 후 목록 페이지로 이동 등
    window.location.href = '/mentoring/register';
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="main" style={{ background: '#f8fafc', minHeight: '100vh', flex: 1 }}>
          <div className="max-w-md mx-auto pt-12 pb-16">
            <div className="mb-8">
              <span className="text-lg font-bold text-slate-900">
                예약 취소 사유 <span className="text-red-500">(필수)</span>
              </span>
            </div>
            <form onSubmit={handleCancel}>
              <div className="space-y-3 mb-8">
                {cancelReasons.map((reason, idx) => (
                  <label
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      gap: '14px',
                      color: '#1e293b',
                      fontSize: '16px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(idx)}
                      onChange={() => handleCheck(idx)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                      }}
                    />
                    <span>{reason}</span>
                    {idx === cancelReasons.length - 1 && selected.includes(idx) && (
                      <input
                        type="text"
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        placeholder="기타 사유를 입력해주세요"
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
                ))}
              </div>
              <button
                type="submit"
                style={{
                  background: '#5fcf80',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  padding: '12px 32px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(95,207,128,0.08)',
                  width: '100%',
                  maxWidth: 180,
                }}
              >
                예약 취소
              </button>
            </form>
          </div>
          {/* 팝업 모달 */}
          {showModal && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '32px 24px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  textAlign: 'center',
                  minWidth: 320,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>
                  정말로 취소하겠습니까?
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                  <button
                    onClick={handleConfirm}
                    style={{
                      background: '#5fcf80',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 24,
                      padding: '10px 32px',
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: 'pointer',
                    }}
                  >
                    예
                  </button>
                  <button
                    onClick={handleClose}
                    style={{
                      background: '#eee',
                      color: '#222',
                      border: 'none',
                      borderRadius: 24,
                      padding: '10px 32px',
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: 'pointer',
                    }}
                  >
                    아니오
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RegisterCancel;
