import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const MentoringDetail = () => {
  const mentor = {
    name: 'Sophia Bennett',
    field: 'Current Backend Developer at Tech Innovators Inc.',
    img: '/assets/img/team/team-1.jpg',
    description: [
      'ABC 전자상거래 플랫폼 백엔드 엔지니어',
      'XYZ 소셜네트워크의 서비스 백엔드 개발자',
      '백엔드 개발 경력 8년, 대규모 앱 애플리케이션 설계 및 구축 경험',
      '주니어 개발자 멘토링 및 기술 지식 공유에 열정 있음',
    ],
    contact: 'mentor@example.com',
  };


  

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar />
        <main className="main" style={{ background: '#f8fafc', minHeight: '100vh', flex: 1 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 0' }}>
            <div style={{ fontSize: 14, color: '#7b8bb2', marginBottom: 16 }}>
              <span style={{ color: '#5fcf80', cursor: 'pointer' }}>Mentoring</span> / <span style={{ color: '#222' }}>Mentor Profile</span>
            </div>
            <div style={{ display: 'flex', gap: 40, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 32, alignItems: 'flex-start' }}>
              {/* 프로필 이미지 */}
              <div style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={mentor.img} alt={mentor.name} style={{ width: 180, height: 180, borderRadius: '24px', objectFit: 'cover', marginBottom: 16, background: '#f3e7e1' }} />
                <div style={{ color: '#bfc8d9', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{mentor.name}</div>
                <div style={{ color: '#7b8bb2', fontWeight: 500, fontSize: 15, marginBottom: 8 }}>{mentor.field}</div>
                <div style={{ color: '#bfc8d9', fontWeight: 500, fontSize: 14, marginBottom: 8 }}>Past</div>
                <ul style={{ color: '#222', fontSize: 14, paddingLeft: 18, margin: 0, marginBottom: 0 }}>
                  {mentor.description.map((desc, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{desc}</li>
                  ))}
                </ul>
              </div>
              {/* 캘린더 & 버튼 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* 임시 캘린더 박스 */}
                <div style={{ width: 320, background: '#f6f8fa', borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                  <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 18, marginBottom: 12 }}>July 2024</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', color: '#222' }}>
                    <thead>
                      <tr style={{ color: '#bfc8d9', fontWeight: 500, fontSize: 13 }}>
                        <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td><td>1</td><td>2</td><td style={{ background: '#5fcf80', color: '#fff', borderRadius: '50%' }}>3</td><td>4</td><td>5</td><td>6</td>
                      </tr>
                      <tr>
                        <td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td>
                      </tr>
                      <tr>
                        <td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td>
                      </tr>
                      <tr>
                        <td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td>
                      </tr>
                      <tr>
                        <td>28</td><td>29</td><td>30</td><td></td><td></td><td></td><td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button style={{ background: '#5fcf80', color: '#fff', border: 'none', borderRadius: 24, padding: '12px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(95,207,128,0.08)' }}>
                  대화내용 사전작성하기
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

export default MentoringDetail;
