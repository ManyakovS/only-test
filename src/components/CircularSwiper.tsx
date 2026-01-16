import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { SlideType } from "../data/slides";
import NavigationControl from "./NavigationControl";
import ContentSection from './ContentSection'
import { animationDotScaleDown, animationDotScaleUp, animationProperties } from "../data/animations";

// Константы геометрии
const RADIUS = 265;
const TARGET_ANGLE = -45;

interface CircularSwiperProps {
  slides: SlideType[];
}

function getCurrentRotation(
  activeIndex: number,
  previousIndex: number,
  slides: SlideType[]
) {
  const anglePerSlide = 360 / slides.length;
  let diff = activeIndex - previousIndex;

  if (diff > slides.length / 2) {
    diff -= slides.length;
  } else if (diff < -slides.length / 2) {
    diff += slides.length;
  }

  return diff * anglePerSlide;
}

export default function CircularSwiper({ slides }: CircularSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(0);
  const [showTextIndex, setShowTextIndex] = useState<number | null>(0);
  const [displayYears, setDisplayYears] = useState({
    start: slides[0].periodStart,
    end: slides[0].periodEnd,
  });

  const circleRef = useRef<HTMLDivElement>(null);
  const currentRotation = useRef(TARGET_ANGLE);
  const previousIndex = useRef(0);

  useGSAP(
    () => {
      currentRotation.current -= getCurrentRotation(
        activeIndex,
        previousIndex.current,
        slides
      );

      gsap.to(circleRef.current, {
        rotation: currentRotation.current,
        ...animationProperties,
        onComplete: () => {
          setShowTextIndex(activeIndex);
        },
      });

      const fromIdx = previousIndex.current;
      const toIdx = activeIndex;

      const counter = {
        start: slides[fromIdx].periodStart,
        end: slides[fromIdx].periodEnd,
      };

      gsap.to(counter, {
        start: slides[toIdx].periodStart,
        end: slides[toIdx].periodEnd,
        ...animationProperties,
        snap: { start: 1, end: 1 },
        onUpdate: () => {
          setDisplayYears({
            start: counter.start,
            end: counter.end,
          });
        },
      });

      gsap.to(".dot", {
        rotation: -currentRotation.current,
        ...animationDotScaleDown,
      });

      gsap.to(".dot.active", { ...animationDotScaleUp });

      previousIndex.current = activeIndex;
    },
    { dependencies: [activeIndex, slides.length], scope: circleRef }
  );

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
                key={item.id}
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
        <b className="circle-periods__start">{displayYears.start}</b>
        &nbsp;&nbsp;
        <b className="circle-periods__end">{displayYears.end}</b>
      </div>

      <div className="circle-controllers">
        <b className="text-xs text-bold">{activeIndex + 1}/{slides.length}</b>
        <div className="navigation-controls">
          <NavigationControl direction="left" onClick={handlePrev} />
          <NavigationControl direction="right" onClick={handleNext} />
        </div>

        <ContentSection currentSlide={currentSlide} />
      </div>
    </>
  );
}
