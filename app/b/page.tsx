// CardGrid.js
'use client'
import React, { useRef, useState } from 'react';
import style from './style.module.css'
const CardGrid = () => {
  // 假设这里有一些卡片数据
  const data = [
    { id: 1, title: 'Card 1', content: 'Content for card 1' },
    { id: 2, title: 'Card 2', content: 'Content for card 2' },
    { id: 3, title: 'Card 3', content: 'Content for card 3' },
    { id: 4, title: 'Card 4', content: 'Content for card 4' },
    { id: 5, title: 'Card 5', content: 'Content for card 5' },
    { id: 6, title: 'Card 6', content: 'Content for card 6' },
    { id: 7, title: 'Card 7', content: 'Content for card 7' },
    { id: 8, title: 'Card 8', content: 'Content for card 8' },
    { id: 9, title: 'Card 9', content: 'Content for card 9' },
  ];

  const cardsRef = useRef<any>([]);
  const handleMouseMove = (e: any) => {
    requestAnimationFrame(() => {
      if (!cardsRef.current) return
      cardsRef.current.forEach((card: any) => {
        if (!card.getBoundingClientRect) return
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    })

  }

  return (
    <div className={`grid grid-cols-3 gap-4 p-10 bg-black ${style.container}`}
      onMouseMove={handleMouseMove}
    >
      {data.map(card => (
        <div key={card.id} ref={el => cardsRef.current.push(el)} className={`${style.card} card`}>
          <div className={style.inner}
          >
            <h2 className="text-lg ">{card.title}</h2>
          </div>
        </div>
      ))
      }
    </div >
  );
};

export default CardGrid;
