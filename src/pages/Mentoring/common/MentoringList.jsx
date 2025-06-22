import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Sidebar from '../../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import Todo from '../../../components/common/Todo';
// import { getMentors } from '../../../api/mentoring'; // 실제 사용 시 주석 해제
import '../../../App.css';

const MentoringList = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);

  // 더미 데이터
  const dummyMentors = [
    {
      mentorId: 1,
      mentorName: 'Walter White',
      position: 'Business Analyst',
      company: 'SK 쉴더스',
      mentor_image_url: '/assets/img/mentors/mentor1.jpg',
    },
    {
      mentorId: 2,
      mentorName: 'Sarah Jhonson',
      position: 'Software Engineer',
      company: 'SK C&C',
      mentor_image_url: '/assets/img/mentors/mentor2.jpg',
    },
    {
      mentorId: 3,
      mentorName: 'William Anderson',
      position: 'Cloud Engineer',
      company: 'AWS',
      mentor_image_url: '/assets/img/mentors/mentor3.jpg',
    },
    {
      mentorId: 4,
      mentorName: 'Amanda Jepson',
      position: 'Software Developer',
      company: 'TVING',
      mentor_image_url: '/assets/img/mentors/mentor1.jpg',
    },
    {
      mentorId: 5,
      mentorName: 'Brian Doe',
      position: 'Software Developer',
      company: 'MEGAZONE CLOUD',
      mentor_image_url: '/assets/img/mentors/mentor2.jpg',
    },
    {
      mentorId: 6,
      mentorName: 'Josepha Palas',
      position: 'Cloud Engineer',
      company: 'AWS',
      mentor_image_url: '/assets/img/mentors/mentor3.jpg',
    },
    {
      mentorId: 7,
      mentorName: 'Emily Chen',
      position: 'Data Scientist',
      company: 'Google',
      mentor_image_url: '/assets/img/mentors/mentor1.jpg',
    },
    {
      mentorId: 8,
      mentorName: 'Michael Park',
      position: 'AI Engineer',
      company: 'Naver',
      mentor_image_url: '/assets/img/mentors/mentor2.jpg',
    },
    {
      mentorId: 9,
      mentorName: 'Sophie Kim',
      position: 'Frontend Developer',
      company: 'Kakao',
      mentor_image_url: '/assets/img/mentors/mentor3.jpg',
    },
    {
      mentorId: 10,
      mentorName: 'David Lee',
      position: 'Backend Developer',
      company: 'LINE',
      mentor_image_url: '/assets/img/mentors/mentor1.jpg',
    },
    {
      mentorId: 11,
      mentorName: 'Lisa Wang',
      position: 'DevOps Engineer',
      company: 'Coupang',
      mentor_image_url: '/assets/img/mentors/mentor2.jpg',
    },
    {
      mentorId: 12,
      mentorName: 'James Kim',
      position: 'Security Engineer',
      company: 'Kakao Security',
      mentor_image_url: '/assets/img/mentors/mentor3.jpg',
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await getMentors(); // 실제 호출 시
        // setMentors(res.data);
        setMentors(dummyMentors); // 현재는 local dummy data
      } catch (err) {
        console.error('멘토 목록 불러오기 실패:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="mentoring" />
        <main className="main">
          <h1
            className="h3 fw-bold"
            style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
          >
            Mentoring
          </h1>
          <p style={{ marginTop: '16px', marginLeft: '16px', whiteSpace: 'pre-line' }}>
            멘토와 함께 성장할 수 있는 기회{'\n'}SIAT 멘토링은 SIAT 과정을 수료한 선배와의 1:1
            매칭을 통해 SIAT 수강생들에게 실질적인 진로·기술 조언을 제공합니다
          </p>

          <section id="mentoring-list" className="section trainers">
            <div className="container">
              <div className="row gy-5">
                {mentors.map((mentor, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 member"
                    data-aos="fade-up"
                    data-aos-delay={100 * (index + 1)}
                  >
                    <div
                      className="member-img"
                      style={{
                        width: '100%',
                        maxWidth: '250px',
                        margin: '0 auto',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                        const img = e.currentTarget.querySelector('img');
                        if (img) {
                          img.style.transform = 'scale(1.05)';
                          img.style.filter = 'none';
                          img.style.opacity = '1';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        const img = e.currentTarget.querySelector('img');
                        if (img) {
                          img.style.transform = 'scale(1)';
                        }
                      }}
                      onClick={() => {
                        const role = sessionStorage.getItem('userRole');
                        if (role === 'mentor') {
                          navigate('/mentoring/mentor/detail', { state: { mentor } });
                        } else {
                          navigate('/mentoring/detail', { state: { mentor } });
                        }
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          paddingBottom: '100%',
                          position: 'relative',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={mentor.mentor_image_url}
                          className="img-fluid"
                          alt={mentor.mentorName}
                          style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            transform: 'scale(1)',
                            transformOrigin: 'center center',
                            transition: 'transform 0.3s ease',
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/team/team-1.jpg';
                          }}
                        />
                      </div>
                    </div>
                    <div className="member-info text-center">
                      <h4>{mentor.mentorName}</h4>
                      <p>{mentor.position}</p>
                      <p>{mentor.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default MentoringList;
