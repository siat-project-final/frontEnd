// src/pages/Shop/ShopPage.jsx
import React, { useEffect, useState } from 'react';
import Header   from '../../components/common/Header';
import Sidebar  from '../../components/common/Sidebar';
import Todo     from '../../components/common/Todo';
import StickerCard from '../../components/shop/StickerCard';

// ──────────────────────────── 짭심이 시리즈
import kangsim from '../../assets/img/stickers/강심이.png';
import gosim   from '../../assets/img/stickers/고심이.png';
import sasim   from '../../assets/img/stickers/사심이.png';
import tosim   from '../../assets/img/stickers/토심이.png';

// ──────────────────────────── 기본 스티커
import basicDrawing  from '../../assets/img/stickers/basic_그림.png';
import basicPharmacy from '../../assets/img/stickers/basic_약국.png';
import basicBicycle  from '../../assets/img/stickers/basic_자전거.png';
import basicCamera   from '../../assets/img/stickers/basic_카메라.png';
import basicAI       from '../../assets/img/stickers/basic_AI.png';

// ──────────────────────────── 스티커 정의
const jabSimSeries = [
  { id: 1,  name: '강심이',         image: kangsim,       cost: 30 },
  { id: 2,  name: '고심이',         image: gosim,         cost: 40 },
  { id: 3,  name: '사심이',         image: sasim,         cost: 50 },
  { id: 4,  name: '토심이',         image: tosim,         cost: 35 },
];

const basicSeries = [
  { id: 11, name: 'basic_그림',     image: basicDrawing,  cost: 10 },
  { id: 12, name: 'basic_약국',     image: basicPharmacy, cost: 10 },
  { id: 13, name: 'basic_자전거',   image: basicBicycle,  cost: 10 },
  { id: 14, name: 'basic_카메라',   image: basicCamera,   cost: 10 },
  { id: 15, name: 'basic_AI',      image: basicAI,       cost: 10 },
];

// 시리즈를 하나로 합쳐 관리(구매·포인트 계산용)
const ALL_STICKERS = [...jabSimSeries, ...basicSeries];

const ShopPage = () => {
  const [myPoint,    setMyPoint]   = useState(100);
  const [purchased, setPurchased] = useState([]);

  const handlePurchase = (sticker) => {
    if (myPoint < sticker.cost) {
      alert('💸 포인트가 부족해요!');
      return;
    }
    if (purchased.includes(sticker.id)) {
      alert('이미 구매한 스티커입니다.');
      return;
    }
    setMyPoint((prev) => prev - sticker.cost);
    setPurchased((prev) => [...prev, sticker.id]);
    alert(`🎉 '${sticker.name}' 스티커를 구매했어요!`);
  };

  // ───────────────────────── view
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar menuType="shop" />

        <main className="main" style={{ flex: 1 }}>
          <div className="container py-5">
            <h1 className="h3 fw-bold text-success mb-3">🎁 스티커 상점</h1>
            <p className="text-muted mb-4">나만의 학습 캘린더를 꾸며보세요!</p>
            <div className="mb-5 p-2 px-3 rounded bg-light border text-success fw-bold w-fit">
              🪙 내 포인트: {myPoint}P
            </div>

            {/* ───── 짭심이 시리즈 ───── */}
            <h4 className="fw-bold mb-3">🐰 짭심이 시리즈</h4>
            <div className="row mb-5">
              {jabSimSeries.map((sticker) => (
                <div key={sticker.id} className="col-6 col-md-3 mb-4">
                  <StickerCard
                    sticker={sticker}
                    onPurchase={handlePurchase}
                    purchased={purchased.includes(sticker.id)}
                    disabled={myPoint < sticker.cost}
                  />
                </div>
              ))}
            </div>

            {/* ───── 기본 스티커 ───── */}
            <h4 className="fw-bold mb-3">⭐ 기본 스티커</h4>
            <div className="row">
              {basicSeries.map((sticker) => (
                <div key={sticker.id} className="col-6 col-md-3 mb-4">
                  <StickerCard
                    sticker={sticker}
                    onPurchase={handlePurchase}
                    purchased={purchased.includes(sticker.id)}
                    disabled={myPoint < sticker.cost}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>

        <div style={{ width: '300px', borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
