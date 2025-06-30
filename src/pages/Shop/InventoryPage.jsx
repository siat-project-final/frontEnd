// src/pages/Shop/InventoryPage.jsx
import React, { useState } from 'react';
import kangsim from '../../assets/img/stickers/강심이.png';
import gosim from '../../assets/img/stickers/고심이.png';
import sasim from '../../assets/img/stickers/사심이.png';
import tosim from '../../assets/img/stickers/토심이.png';

const myInventory = [
  { id: 1, name: '강심이', image: kangsim },
  { id: 2, name: '고심이', image: gosim },
  { id: 3, name: '사심이', image: sasim },
  { id: 4, name: '토심이', image: tosim },
];

const InventoryPage = () => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-white to-zinc-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-2">
          🎒 내 스티커 인벤토리
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-300 mb-8">
          사용하고 싶은 스티커를 선택하세요!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {myInventory.map((sticker) => (
            <div
              key={sticker.id}
              onClick={() => handleSelect(sticker.id)}
              className={`cursor-pointer bg-white dark:bg-neutral-800 rounded-xl shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg border-2 ${
                selectedId === sticker.id ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                src={sticker.image}
                alt={sticker.name}
                className="w-20 h-20 object-contain mb-2 drop-shadow"
              />
              <h3 className="text-lg font-semibold text-center text-zinc-700 dark:text-white">
                {sticker.name}
              </h3>
              {selectedId === sticker.id && (
                <p className="text-sm text-blue-500 mt-2">✅ 선택됨</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
