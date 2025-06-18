import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import Footer from '../../../components/common/Footer';
import ConfirmCancelModal from '../../../components/common/ConfirmCancelModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [showWarning, setShowWarning] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const navigate = useNavigate();

  const handleCheck = (idx) => {
    setSelected((prev) => {
      const newSelected = prev.includes(idx) ? prev.filter((v) => v !== idx) : [...prev, idx];
      if (newSelected.length > 0) {
        setShowWarning(false);
      }
      return newSelected;
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      setShowWarning(true);
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      let selectedReasons = selected.map((idx) => cancelReasons[idx]);

      const otherIdx = cancelReasons.length - 1;
      if (selected.includes(otherIdx) && otherReason.trim() !== '') {
        selectedReasons[selectedReasons.indexOf('기타 사유')] = `기타: ${otherReason}`;
      }

      const reasonText = selectedReasons.join(', ');

      const response = await axios.put('/api/cancel', {
        reason: reasonText,
      });

      if (response.status === 200) {
        alert('예약이 취소되었습니다.');
        navigate('/mentoring/mentor/detail');
      }
    } catch (error) {
      console.error('예약 취소 중 오류 발생:', error);
      alert('예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar />
        <main className="main" style={{ minHeight: '100vh' }}>
          <div className="max-w-md mx-auto pt-12 pb-16">
            {/* 제목 */}
            <div className="mb-4" style={{ textAlign: 'center', marginTop: '80px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>
                예약 취소 사유{' '}
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'red' }}>(필수)</span>
              </h4>
              {showWarning && (
                <p style={{ fontSize: '14px', color: '#e11d48' }}>
                  취소 사유를 하나 이상 선택해주세요.
                </p>
              )}
            </div>

            {/* 리스트 & 버튼 */}
            <form onSubmit={handleCancel} style={{ textAlign: 'left' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '24px',
                  alignItems: 'flex-start',
                  maxWidth: '500px', // ✅ 리스트 너비 제한
                  margin: '0 auto', // ✅ 가운데 정렬
                }}
              >
                {cancelReasons.map((reason, idx) => {
                  const isOther = reason === '기타 사유';
                  return (
                    <label
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '15px',
                        color: '#334155',
                        justifyContent: 'flex-start',
                        width: '100%',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(idx)}
                        onChange={() => handleCheck(idx)}
                        style={{
                          marginRight: '12px',
                          width: '18px',
                          height: '18px',
                          accentColor: '#94a3b8',
                        }}
                      />
                      {reason}
                      {isOther && selected.includes(idx) && (
                        <input
                          type="text"
                          placeholder="사유를 입력해주세요"
                          value={otherReason}
                          onChange={(e) => setOtherReason(e.target.value)}
                          style={{
                            marginLeft: '12px',
                            width: '350px',
                            padding: '6px 12px',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            fontSize: '14px',
                          }}
                        />
                      )}
                    </label>
                  );
                })}
              </div>

              {/* 버튼 가운데 정렬 */}
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
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
                  }}
                >
                  예약 취소
                </button>
              </div>
            </form>

            {/* 모달 */}
            <ConfirmCancelModal
              visible={showModal}
              message="예약을 취소하시겠습니까?
              이 작업은 되돌릴 수 없습니다."
              onConfirm={handleConfirm}
              onCancel={handleClose}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RegisterCancel;