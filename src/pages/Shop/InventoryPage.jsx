import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Todo from '../../components/common/Todo';
import { getInventory } from '../../api/shop';

export default function InventoryPage() {
  const memberId = localStorage.getItem('memberId');
  const [selectedId, setSelectedId] = useState(null);
  const [bagItems, setBagItems] = useState([]);
  const [inventory, setInventory] = useState([]);

  const syncBag = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('calendarBag') || '[]');
      setBagItems(Array.isArray(stored) ? stored.slice(0, 10) : []);
    } catch {
      setBagItems([]);
    }
  };

  useEffect(() => {
    syncBag();
    const onStorage = (e) => {
      if (e.key === 'calendarBag') syncBag();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const result = await getInventory(memberId);
        console.log('[1] getInventory 결과:', result);

        const enriched = (result?.stickers || []).map((sticker) => ({
          ...sticker,
          image: sticker.imageUrl,
        }));

        console.log('[2] 정리된 인벤토리 배열:', enriched);
        setInventory(enriched);
      } catch (err) {
        console.error('[3] 인벤토리 조회 실패:', err);
      }
    };

    fetchInventory();
  }, [memberId]);

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const addToBag = () => {
    if (!selectedId) return;
    const sticker = inventory.find((s) => s.id === selectedId);
    if (!sticker) return;

    try {
      const current = JSON.parse(localStorage.getItem('calendarBag') || '[]');
      if (current.some((i) => i.id === sticker.id)) {
        alert('이미 가방에 있습니다.');
        return;
      }
      const updated = [...current, sticker].slice(0, 10);
      localStorage.setItem('calendarBag', JSON.stringify(updated));
      setBagItems(updated);
      alert(`${sticker.name} 스티커를 가방에 담았어요!`);
    } catch (e) {
      console.error('가방 저장 오류', e);
    }
  };

  const removeFromBag = (idx) => {
    try {
      const current = JSON.parse(localStorage.getItem('calendarBag') || '[]');
      current.splice(idx, 1);
      localStorage.setItem('calendarBag', JSON.stringify(current));
      setBagItems(current);
    } catch (e) {
      console.error('가방 제거 오류', e);
    }
  };

  const renderInventory = () => (
    <div className="mb-5">
      <h4 className="fw-bold mb-3">🧸 내가 구매한 스티커</h4>
      <div className="row g-4">
        {inventory.map((sticker) => {
          const active = selectedId === sticker.id;
          return (
            <div key={sticker.id} className="col-6 col-md-3">
              <div
                className={`sticker-card position-relative p-3 rounded-4 shadow-sm h-100 bg-white cursor-pointer ${
                  active ? 'border-primary border-3' : 'border border-secondary-subtle'
                }`}
                style={{ transition: 'transform .25s', transform: active ? 'translateY(-6px)' : 'none' }}
                onClick={() => handleSelect(sticker.id)}
              >
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  className="img-fluid mb-3"
                  style={{ height: 110, objectFit: 'contain' }}
                />
                <h5 className="fw-semibold mb-0">{sticker.name}</h5>
                {active && (
                  <span
                    className="position-absolute top-0 end-0 badge rounded-pill bg-primary shadow"
                    style={{ transform: 'translate(30%, -30%)' }}
                  >
                    ✓
                  </span>
                )}
                <div className="hover-overlay d-flex align-items-center justify-content-center">
                  <i className="bi bi-bag-plus-fill text-white fs-2" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar menuType="inventory" />
        <main style={{ flex: 1 }}>
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-backpack-fill text-warning fs-2" />
                <div>
                  <h1 className="h3 fw-bold text-primary mb-1">내 인벤토리</h1>
                  <p className="text-muted mb-0">스티커를 가방(퀵슬롯)에 관리하세요!</p>
                </div>
              </div>
              <button
                className="btn btn-success d-flex align-items-center gap-2 px-3 shadow"
                disabled={!selectedId}
                onClick={addToBag}
              >
                <i className="bi bi-bag-plus-fill fs-5" />
                가방에 담기
              </button>
            </div>

            {/* 퀵슬롯 */}
            <div className="d-flex gap-2 mb-5 flex-nowrap" style={{ overflowX: 'auto' }}>
              {Array.from({ length: 10 }).map((_, idx) => {
                const item = bagItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => item && removeFromBag(idx)}
                    className="d-flex align-items-center justify-content-center border rounded bg-light position-relative"
                    style={{ width: 48, height: 48, cursor: item ? 'pointer' : 'default' }}
                    title={item ? '클릭하여 제거' : ''}
                  >
                    {item ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span className="text-muted fw-bold" style={{ fontSize: 14 }}>{idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 인벤토리 목록 */}
            {renderInventory()}
          </div>
        </main>

        <div style={{ width: 300, borderLeft: '1px solid #eee' }}>
          <Todo />
        </div>
      </div>

      <style>{`
        .sticker-card { overflow: visible; }
        .hover-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,.35); opacity: 0; transition: opacity .3s; pointer-events: none;
        }
        .sticker-card:hover .hover-overlay { opacity: 1; }
      `}</style>
    </div>
  );
}
