// src/pages/Shop/ShopPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import StickerCard from '../../components/shop/StickerCard';
import kangsim from '../../assets/img/stickers/강심이.png';
import gosim from '../../assets/img/stickers/고심이.png';
import sasim from '../../assets/img/stickers/사심이.png';
import tosim from '../../assets/img/stickers/토심이.png';

const stickerList = [
  { id: 1, name: '강심이', image: kangsim, cost: 30 },
  { id: 2, name: '고심이', image: gosim, cost: 40 },
  { id: 3, name: '사심이', image: sasim, cost: 50 },
  { id: 4, name: '토심이', image: tosim, cost: 35 },
];

const ShopPage = () => {
  const [stickers, setStickers] = useState([]);
  const [myPoint, setMyPoint] = useState(100);
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    setStickers(stickerList);
  }, []);

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

            <div className="row">
              {stickers.map((sticker) => (
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
