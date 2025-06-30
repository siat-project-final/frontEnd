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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 mb-3">
          🎒 내 스티커 인벤토리
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          사용하고 싶은 스티커를 클릭하세요!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {myInventory.map((sticker) => {
            const isSelected = selectedId === sticker.id;

            return (
              <div
                key={sticker.id}
                onClick={() => handleSelect(sticker.id)}
                className={`relative cursor-pointer rounded-2xl shadow-xl p-5 bg-white dark:bg-neutral-800 flex flex-col items-center transition-all hover:scale-105 ${
                  isSelected ? 'ring-4 ring-indigo-500' : 'ring-1 ring-gray-200 dark:ring-gray-700'
                }`}
              >
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  className="w-28 h-28 object-contain mb-3 drop-shadow-xl"
                />
                <h3 className="text-xl font-semibold text-center text-zinc-800 dark:text-white">
                  {sticker.name}
                </h3>
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    ✅ 선택됨
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
