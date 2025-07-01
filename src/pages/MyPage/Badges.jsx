import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // 뱃지 데이터를 가져올 API가 있다면 axios를 사용합니다.
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import './Badges.css'; // 뱃지 페이지 전용 CSS 파일 (필요 시 생성)

import badge1 from '../../assets/img/badges/badge1.png';
import badge2 from '../../assets/img/badges/badge2.png';
import badge3 from '../../assets/img/badges/badge3.png';
import badge4 from '../../assets/img/badges/badge4.png';
import badge5 from '../../assets/img/badges/badge5.png';
import badge6 from '../../assets/img/badges/badge6.png';
import badge7 from '../../assets/img/badges/badge7.png';
import badge8 from '../../assets/img/badges/badge8.png';
import badge9 from '../../assets/img/badges/badge9.png';



// ✅ 뱃지 데이터를 가져오는 API 함수 (가정)
// import { getBadges } from '../../api/badges'; // 이 함수는 백엔드 API에 따라 구현해야 합니다.

const Badges = () => {
  const memberId = localStorage.getItem('memberId'); // 사용자 ID가 필요하다면 사용

  const [badgesList, setBadgesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 뱃지 데이터를 가져오는 함수
  const fetchBadges = async () => {
    try {
      // 실제 API 호출 로직
      // 예시: const res = await getBadges(memberId);
      // setBadgesList(res.data);

      // --- 백엔드 API가 준비되지 않았을 경우를 위한 목업(Mock) 데이터 ---
      const mockBadges = [
        // {
        //   id: 1,
        //   name: '첫 걸음 뱃지',
        //   description: 'SIAT HUB에 가입하고 첫 학습 로그를 작성했어요!',
        //   imageUrl: 'https://via.placeholder.com/100x100?text=Badge+1', // 임시 이미지 URL
        //   achieved: true, // 획득 여부
        //   dateAchieved: '2025-06-01'
        // },
        // {
        //   id: 2,
        //   name: '챌린지 마스터',
        //   description: '5회 이상 챌린지를 성공적으로 완료했습니다.',
        //   imageUrl: 'https://via.placeholder.com/100x100?text=Badge+2',
        //   achieved: false,
        //   dateAchieved: null
        // },
        // {
        //   id: 3,
        //   name: '성장하는 멘토',
        //   description: '멘토링을 10회 이상 진행했습니다.',
        //   imageUrl: 'https://via.placeholder.com/100x100?text=Badge+3',
        //   achieved: true,
        //   dateAchieved: '2025-06-15'
        // },
        // {
        //   id: 4,
        //   name: '학습왕',
        //   description: '총 100시간 이상 학습을 기록했습니다.',
        //   imageUrl: 'https://via.placeholder.com/100x100?text=Badge+4',
        //   achieved: false,
        //   dateAchieved: null
        // },
        // {
        //   id: 5,
        //   name: '꾸준함의 대가',
        //   description: '7일 연속 학습 로그를 작성했습니다.',
        //   imageUrl: 'https://via.placeholder.com/100x100?text=Badge+5',
        //   achieved: true,
        //   dateAchieved: '2025-06-25'
        // }
        {
            id: 1,
            name: '씨앗 뱃지',
            description: '사이트에 가입했어요!',
            imageUrl: badge1, // import 한 변수 사용
            achieved: true,
            dateAchieved: '2025-06-01'
          },
          {
            id: 2,
            name: '새싹 뱃지',
            description: '이제 시작이에요!',
            imageUrl: badge2, // import 한 변수 사용
            achieved: false,
            dateAchieved: null
          },
          {
            id: 3,
            name: '새싹 뱃지2',
            description: '성장중이에요!',
            imageUrl: badge3, // import 한 변수 사용
            achieved: true,
            dateAchieved: '2025-06-15'
          },
          {
            id: 4,
            name: '새싹 뱃지3',
            description: '이제 자리를 잡아가요!',
            imageUrl: badge4, // import 한 변수 사용
            achieved: false,
            dateAchieved: null
          },
          {
            id: 5,
            name: '나무 뱃지',
            description: '적응하기 시작했어요!',
            imageUrl: badge5, // import 한 변수 사용
            achieved: true,
            dateAchieved: '2025-06-25'
          },
          {
            id: 6,
            name: '꽃나무 뱃지',
            description: '꽃을 피웠어요!',
            imageUrl: badge6, // import 한 변수 사용
            achieved: false,
            dateAchieved: null
          },
          {
              id: 7,
              name: '열매나무 뱃지',
              description: '열매를 맺었어요!',
              imageUrl: badge7, // import 한 변수 사용
              achieved: true,
              dateAchieved: '2025-06-28'
          },
          {
              id: 8,
              name: '큰나무 뱃지',
              description: '호기심 가득한 탐구자 뱃지!',
              imageUrl: badge8, // import 한 변수 사용
              achieved: false,
              dateAchieved: null
          },
          {
              id: 9,
              name: '숲나무 뱃지',
              description: '세계를 아우르는 지식인 뱃지!',
              imageUrl: badge9, // import 한 변수 사용
              achieved: true,
              dateAchieved: '2025-06-30'
          },
      ];
      setBadgesList(mockBadges);
      // --- 목업 데이터 끝 ---

    } catch (err) {
      setError('뱃지 데이터를 불러오는 데 실패했습니다.');
      console.error('뱃지 데이터 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, [memberId]); // memberId가 변경될 때마다 뱃지 데이터를 다시 가져옴

  return (
    <div>
      <Header />
      <div className="container-flex">
        {/* 사이드바에 '뱃지 목록'이 활성화되도록 `menuType`을 'mypage'로 유지하고, 현재 경로를 Sidebar 컴포넌트 내에서 비교하여 활성 스타일을 적용하도록 할 것입니다. */}
        <Sidebar menuType="mypage" />
        <main className="main">
          <section className="badges-section" data-aos="fade-up">
            <div className="page-header">
              <h1
                className="h3 fw-bold mb-0"
                style={{ marginTop: '16px', marginLeft: '16px', color: '#84cc16' }}
              >
                뱃지 목록
              </h1>
            </div>

            {loading ? (
              <p>뱃지 데이터를 로딩 중입니다...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : badgesList.length === 0 ? (
              <p>획득한 뱃지가 없습니다.</p>
            ) : (
              <div className="badges-grid">
                {badgesList.map((badge) => (
                  <div key={badge.id} className={`badge-card ${badge.achieved ? 'achieved' : 'not-achieved'}`}>
                    <img
                      src={badge.imageUrl}
                      alt={badge.name}
                      className="badge-image"
                      style={{ opacity: badge.achieved ? 1 : 0.4 }} // 획득하지 못한 뱃지는 흐리게
                    />
                    <h3 className="badge-name">{badge.name}</h3>
                    <p className="badge-description">{badge.description}</p>
                    {badge.achieved && (
                      <span className="badge-achieved-date">획득일: {badge.dateAchieved}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* 오른쪽: Todo */}
        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Badges;