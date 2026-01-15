import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { SlideType } from "../data/slides";

// Константы геометрии
const RADIUS = 265;
const TARGET_ANGLE = -45;

interface CircularSwiperProps {
  slides: SlideType[];
}

export default function CircularSwiper({ slides }: CircularSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const circleRef = useRef<HTMLDivElement>(null);
  const currentRotation = useRef(TARGET_ANGLE);
  const previousIndex = useRef(0);

  // --- АНИМАЦИЯ GSAP ---
  useGSAP(() => {
    const anglePerSlide = 360 / slides.length;
    let diff = activeIndex - previousIndex.current;

    // Логика кратчайшего пути
    if (diff > slides.length / 2) {
      diff -= slides.length;
    } else if (diff < -slides.length / 2) {
      diff += slides.length;
    }

    currentRotation.current -= diff * anglePerSlide;

    // Вращение оси
    gsap.to(circleRef.current, {
      rotation: currentRotation.current,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Контр-вращение текста внутри кругов
    gsap.to(".dot", {
      rotation: -currentRotation.current,
      duration: 0.8,
      ease: "power1.inOut",
    });

    previousIndex.current = activeIndex;
  }, [activeIndex, slides.length]);

  // --- ОБРАБОТЧИКИ КЛИКОВ ---
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Текущий активный слайд для отображения контента
  const currentSlide = slides[activeIndex];

  return (
    <div className="circular-swiper__container">
      {/* 1. Блок с кругом */}
      <div className="circle-wrapper">
        <div className="circle-axis" ref={circleRef}>
          {slides.map((item, index) => {
            const angleDeg = index * (360 / slides.length);
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = RADIUS * Math.cos(angleRad);
            const y = RADIUS * Math.sin(angleRad);
            const isActive = index === activeIndex;

            return (
              <button
                key={item.title}
                className={`dot ${isActive ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <div className="target-marker" />
      </div>

      {/* 3. Кнопки управления */}
      <div className="navigation-controls">
        <button className="nav-btn prev" onClick={handlePrev}>
          ←
        </button>
        <button className="nav-btn next" onClick={handleNext}>
          →
        </button>
      </div>

      {/* 2. Блок контента (вместо Swiper) */}
      <div className="content-section">
        <div className="slide-content">
          {currentSlide.details.map((detail, idx) => (
            <div key={idx} className="detail-item">
              <span className="detail-date">{detail.date}</span>
              <p className="detail-desc">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
