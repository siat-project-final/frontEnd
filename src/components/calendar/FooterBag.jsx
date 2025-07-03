import React, { useState, useEffect } from 'react';
import { Draggable } from '@fullcalendar/interaction';

const MAX_SLOTS = 10;
let draggableInstance = null; // 중복 생성을 막기 위한 전역 변수

export default function FooterBag() {
  const [isOpen, setIsOpen] = useState(false);
  const [bagItems, setBagItems] = useState([]);

  // ─────────────────────────────────────────────────────
  //  localStorage에서 가방 아이템 로드
  const syncBag = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('calendarBag') || '[]');
      if (Array.isArray(stored)) {
        setBagItems(stored.slice(0, MAX_SLOTS));
      } else {
        setBagItems([]);
      }
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

  // ─────────────────────────────────────────────────────
  // 🧲 FullCalendar 드래그 소스 등록 (중복 생성 방지 포함)
  useEffect(() => {
    const container = document.getElementById('my-footer-bag-slot');
    if (!container) return;

    // 기존 Draggable 인스턴스 제거
    if (draggableInstance) {
      draggableInstance.destroy();
      draggableInstance = null;
    }

    // 새 Draggable 인스턴스 등록
    draggableInstance = new Draggable(container, {
      itemSelector: '.bag-slot',
      eventData: (el) => {
        const { id, name, image } = el.dataset;
        if (!id || !image) {
          console.warn('⚠️ 드래그 대상 누락: ', el.dataset);
          return null;
        }

        return {
          title: '',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textColor: 'transparent',
          id: `sticker-${id}-${Date.now()}`, // FullCalendar 내부 중복 방지용
          extendedProps: {
            type: 'STICKER',
            stickerId: id,
            name,
            image,
          },
        };
      },
    });

    // 언마운트 시 제거
    return () => {
      if (draggableInstance) {
        draggableInstance.destroy();
        draggableInstance = null;
      }
    };
  }, [bagItems, isOpen]);

  // ─────────────────────────────────────────────────────
  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 9999 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#fff',
          color: '#4CAF50',
          padding: 12,
          borderRadius: '50%',
          border: '2px solid #4CAF50',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          transition: 'transform 0.3s',
          transform: isOpen ? 'rotate(20deg)' : 'rotate(0deg)',
          fontSize: 20,
          lineHeight: 0,
        }}
        title={isOpen ? '가방 닫기' : '가방 열기'}
      >
        🎒
      </button>

      <div
        style={{
          maxHeight: isOpen ? 320 : 0,
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          marginTop: isOpen ? 12 : 0,
        }}
      >
        <div
          id="my-footer-bag-slot"
          style={{
            background: '#fff',
            padding: 12,
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            maxWidth: 340,
          }}
        >
          {Array.from({ length: MAX_SLOTS }).map((_, idx) => {
            const item = bagItems[idx];
            return (
              <div
                key={idx}
                className="bag-slot"
                data-id={item?.id}
                data-name={item?.name}
                data-image={item?.image}
                style={{
                  width: 44,
                  height: 44,
                  border: '1px solid #ccc',
                  borderRadius: 6,
                  background: '#f8f9fa',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  cursor: item ? 'grab' : 'default',
                }}
                title={item ? item.name : ''}
              >
                {item ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      pointerEvents: 'none',
                    }}
                  />
                ) : (
                  <span style={{ fontSize: 12, color: '#aaa' }}>{idx + 1}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
