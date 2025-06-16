import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../App.css';

const OtherMentoringDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mentorData = location.state?.mentor || {
    name: 'Sophia Bennett',
    field: 'Current Backend Developer at Tech Innovators Inc.',
    img: '/assets/img/mentors/mentor1.jpg',
    intro: 'ABC 전자상거래 플랫폼 백엔드 엔지니어',
  };

  const mentor = {
    name: mentorData.name,
    field: mentorData.field,
    img: mentorData.img,
    description: [
      mentorData.intro,
      '백엔드 개발 경력 8년, 대규모 앱 애플리케이션 설계 및 구축 경험',
      '주니어 개발자 멘토링 및 기술 지식 공유에 열정 있음',
    ],
    contact: 'mentor@example.com',
  };

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="main" style={{ background: '#f8fafc', minHeight: '100vh', flex: 1 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 0' }}>
            <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
              {/* 프로필 카드 */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: 'left',
                  maxWidth: 600,
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  padding: 32,
                }}
              >
                <div
                  style={{
                    flex: '0 0 220px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={mentor.img}
                    alt={mentor.name}
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: '24px',
                      objectFit: 'cover',
                      marginBottom: 16,
                      background: '#f3e7e1',
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/img/team/team-1.jpg';
                    }}
                  />
                  <div style={{ color: '#bfc8d9', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>
                    {mentor.name}
                  </div>
                  <div style={{ color: '#7b8bb2', fontWeight: 500, fontSize: 15, marginBottom: 8 }}>
                    {mentor.field}
                  </div>
                  <div style={{ color: '#bfc8d9', fontWeight: 500, fontSize: 14, marginBottom: 8 }}>
                    Past
                  </div>
                  <ul
                    style={{
                      color: '#222',
                      fontSize: 14,
                      paddingLeft: 18,
                      margin: 0,
                      marginBottom: 0,
                    }}
                  >
                    {mentor.description.map((desc, i) => (
                      <li key={i} style={{ marginBottom: 4 }}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 버튼*/}
              <div style={{ marginLeft: 8, alignSelf: 'center' }}>
                <button
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
                  멘토 등록하기
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OtherMentoringDetail;