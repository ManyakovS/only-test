import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { SlideType } from "../data/slides";

// Константы геометрии
const RADIUS = 265;
const TARGET_ANGLE = -45;

const animationProperties = {
  duration: 0.6,
  ease: "power1.inOut",
};

const animationDotScaleUp = {
  ...animationProperties,
  width: 56,
  height: 56,
};

const animationDotScaleDown = {
  ...animationProperties,
  width: 6,
  height: 6,
};

interface CircularSwiperProps {
  slides: SlideType[];
}

export default function CircularSwiper({ slides }: CircularSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(0);
  const [showTextIndex, setShowTextIndex] = useState<number | null>(0);

  const circleRef = useRef<HTMLDivElement>(null);
  const currentRotation = useRef(TARGET_ANGLE);
  const previousIndex = useRef(0);

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
      ...animationProperties,
      onComplete: () => {
        // Как только приехали в точку — разрешаем показ текста
        setShowTextIndex(activeIndex);
      },
    });

    gsap.to(".dot", {
      rotation: -currentRotation.current,
      ...animationDotScaleDown,
    });

    gsap.to(".dot.active", { ...animationDotScaleUp });

    previousIndex.current = activeIndex;
  }, [activeIndex, slides.length]);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setHoverIndex(index);
    if (index !== activeIndex) {
      gsap.to(e.currentTarget, { ...animationDotScaleUp });
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setHoverIndex(null);
    if (index !== activeIndex) {
      gsap.to(e.currentTarget, {
        ...animationDotScaleDown,
      });
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const currentSlide = slides[activeIndex];

  return (
    <>
      <div className="circle-wrapper">
        <div className="circle-axis" ref={circleRef}>
          {slides.map((item, index) => {
            const angleDeg = index * (360 / slides.length);
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = RADIUS * Math.cos(angleRad);
            const y = RADIUS * Math.sin(angleRad);
            const isActive = index === activeIndex;

            return (
              <div
                key={item.title}
                className="dot-wrapper"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <button
                  className={`dot ${isActive ? "active" : ""} ${
                    hoverIndex === index ? "hover" : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                  onMouseEnter={(e) => handleMouseEnter(e, index)}
                  onMouseLeave={(e) => handleMouseLeave(e, index)}
                >
                  <div className="text-p">
                    <span className="">{index + 1}</span>
                    {isActive && (
                      <b
                        className={`dot-title ${
                          index === showTextIndex ? "visible" : ""
                        }`}
                      >
                        {item.title}
                      </b>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="circle-periods">
        <b className="circle-periods__start">{currentSlide.periodStart}</b> 
        &nbsp;&nbsp; 
        <b className="circle-periods__end">{currentSlide.periodEnd}</b> 
      </div>

      <div className="circle-controllers">
        <div className="navigation-controls">
          <button className="nav-btn prev" onClick={handlePrev}>
            ←
          </button>
          <button className="nav-btn next" onClick={handleNext}>
            →
          </button>
        </div>

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
    </>
  );
}
