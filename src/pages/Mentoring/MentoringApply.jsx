import React, {useState} from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

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
  const navigate = useNavigate();

  const handleCheck = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직 작성
    alert('제출 완료!');
  };

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar />
        <main className="prewrite-main">
          <h1>대화내용 사전작성</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="자기소개 작성 (필수)"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              required
              rows={5}
              style={{ width: '100%' }}
            />
            <div style={{ marginTop: 24 }}>
              <b>나누고 싶은 대화 주제는?</b>
              <div>
                {options.map((opt) =>
                  opt.value !== 'other' ? (
                    <div key={opt.value}>
                      <input
                        type="checkbox"
                        id={opt.value}
                        checked={selected.includes(opt.value)}
                        onChange={() => handleCheck(opt.value)}
                      />
                      <label htmlFor={opt.value}>{opt.label}</label>
                    </div>
                  ) : null
                )}
                <div>
                  <input
                    type="checkbox"
                    id="other"
                    checked={selected.includes('other')}
                    onChange={() => handleCheck('other')}
                  />
                  <label htmlFor="other">기타 입력</label>
                  {selected.includes('other') && (
                    <input
                      type="text"
                      placeholder="기타 입력"
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <button type="button" onClick={() => navigate('/mentoring/detail')}>
                날짜 변경하기
              </button>
              <button type="submit" style={{ marginLeft: 12 }}>
                Complete
              </button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MentoringApply;