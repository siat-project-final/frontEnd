  import React, { useState } from 'react';
  import Header from '../../components/common/Header';
  import Footer from '../../components/common/Footer';
  import Sidebar from '../../components/common/Sidebar';
  import { Link, useNavigate } from 'react-router-dom';
  import Todo from '../../components/common/Todo';
  // ✅ axios 연동 주석
  import { postStudyLog, summarizeContent } from '../../api/studyLog';

  const WriteStudyLogPage = () => {
    console.log('WriteStudyLogPage 렌더링');
    const [form, setForm] = useState({
      title: '',
      isPublic: true,
      date: '',
      subject: '',
      content: '',
      summary: '',
    });
    const memberId = localStorage.getItem('memberId');
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSummary = async () => {
      alert('AI 요약을 실행합니다. 잠시 기다려주세요...');
      summarizeContent(form.content)
              .then(res => {
                console.log('AI 요약 실행:', res.data);
                setForm((prev) => ({ ...prev, summary: res.data.result.replace(/\\n/g, '\n') }));
                console.log('요약 결과:', form);
                alert('AI 요약이 완료되었습니다. 결과를 확인해주세요.');
              })
              .catch(err => {
                console.error('요약 실패:', err);
          });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        ...form,
        isPublic: form.isPublic === 'true' || form.isPublic === true,
        memberId,
      };
      // ✅ 이 아래 줄 추가!
      console.log('📤 전송 데이터:', data);
      postStudyLog(data)
        .then((res) => {
          console.log('학습일지 작성 성공:', res.data);
          alert('학습일지가 작성되었습니다.');
          navigate('/studylog');
        })
        .catch((err) => {
          console.error('학습일지 작성 실패:', err);
          alert('학습일지 작성에 실패했습니다. 다시 시도해주세요.');
        });
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
                학습일지 작성
              </h1>
              <div className="studylog-boxes card p-4" data-aos="fade-up">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">학습일지 제목</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="제목 입력"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">공개 여부</label>
                      <select
                        className="form-select"
                        name="isPublic"
                        value={form.isPublic}
                        onChange={handleChange}
                      >
                        <option value="true">공개</option>
                        <option value="false">비공개</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">날짜</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">과목</label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="과목 입력"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">학습일지 내용</label>
                    <textarea
                      className="form-control"
                      name="content"
                      rows="5"
                      value={form.content}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">AI 요약</label>
                    <textarea
                      className="form-control"
                      name="summary"
                      rows="3"
                      readOnly
                      value={form.summary}
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-end gap-3">
                    <button type="button" className="btn btn-secondary" onClick={handleSummary}>
                      AI 요약 실행
                    </button>
                    <button
                      type="submit"
                      className="btn border-0 text-white"
                      style={{ backgroundColor: '#84cc16' }}
                    >
                      제출
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

  export default WriteStudyLogPage;
