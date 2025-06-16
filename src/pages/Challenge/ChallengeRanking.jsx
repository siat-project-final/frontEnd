import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import '../../App.css';

const ChallengeRanking = () => {
  const [rankingList, setRankingList] = useState([]);
  const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     fetch('/api/rankings/challenge', {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setRankingList(data))
//       .catch((err) => console.error('랭킹 불러오기 실패:', err));
//   }, []);

    useEffect(() => {
        // 🔧 백엔드 없이 더미 랭킹 세팅
        setRankingList([
        { userId: 1, name: '김철수', challengePoint: 15 },
        { userId: 2, name: '이영희', challengePoint: 14 },
        { userId: 3, name: '박준호', challengePoint: 13 },
        { userId: 4, name: '최유진', challengePoint: 12 },
        { userId: 5, name: '정민수', challengePoint: 11 },
        { userId: 6, name: '한지민', challengePoint: 10 },
        { userId: 7, name: '조성우', challengePoint: 9 },
        { userId: 8, name: '서지훈', challengePoint: 8 },
        { userId: 9, name: '강예림', challengePoint: 7 },
        { userId: 10, name: '홍길동', challengePoint: 6 },
        { userId: 11, name: '임다은', challengePoint: 5 },
        ]);
    }, []);
  const visibleList = showAll ? rankingList : rankingList.slice(0, 10);

  return (
    <>
      <Header />
      <div className="container-flex">
        <Sidebar menuType="challenge" />
        <main className="main">
          <div className="page-title" data-aos="fade">
            <div className="heading text-center">
              <h2>일일 챌린지 랭킹</h2>
            </div>
          </div>

          <section className="section">
            <div className="container" style={{ padding: '40px 20px' }}>
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>순위</th>
                    <th>이름</th>
                    <th>점수</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleList.map((user, index) => (
                    <tr key={user.userId}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.challengePoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rankingList.length > 10 && (
                <div className="text-center mt-3">
                  <button className="btn btn-outline-dark" onClick={() => setShowAll(!showAll)}>
                    {showAll ? '접기' : '더보기'}
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChallengeRanking;
