import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import Todo from '../../components/common/Todo';

const WriteStudyLogPage = () => {
  return (
    <div>
      <Header />
      <div className="container-flex" style={{ display: 'flex' }}>
        <Sidebar menuType="studylog" />

        <main className="main">
        
          <div className="container py-5">
            <h1 className="h3 fw-bold mb-4">학습일지 작성</h1>

            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">학습일지 제목</label>
                  <input type="text" className="form-control" placeholder="제목 입력" />
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
                  <input type="date" className="form-control" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">과목</label>
                  <input type="text" className="form-control" placeholder="과목 입력" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">학습일지 내용</label>
                <textarea className="form-control" rows="5"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">AI 요약</label>
                <textarea className="form-control" rows="3" readOnly></textarea>
              </div>

              <div className="d-flex justify-content-end gap-3">
                <button type="button" className="btn btn-secondary">AI 요약 실행</button>
                <button type="submit" className="btn btn-primary"><Link to="../study">제출</Link></button>
              </div>
            </form>
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
