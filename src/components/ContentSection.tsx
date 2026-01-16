import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import NavigationControl from "./NavigationControl";
import { SlideType } from "../data/slides";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { animationProperties } from "../data/animations";


import "swiper/css";
import "swiper/css/navigation";

interface ContentSectionProps {
  currentSlide: SlideType;
}

const ContentSection = ({ currentSlide }: ContentSectionProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.2,
        ...animationProperties
      }
    );
  }, [currentSlide.id]);

  return (
    <div className="content-section" ref={containerRef}>
      <div className="swiper-controls desktop-only">
        <NavigationControl
          className="navigation-control--prev"
          direction="left"
        />
        <NavigationControl
          className="navigation-control--next"
          direction="right"
        />
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".navigation-control--prev",
          nextEl: ".navigation-control--next",
          disabledClass: "navigation-control--disabled",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 25, width: 250 },
          480: { width: 350 },
          720: { slidesPerView: 2, spaceBetween: 40 },
          1280: { slidesPerView: 3, spaceBetween: 80 },
        }}
        watchSlidesProgress={true}
        grabCursor={true}
        key={currentSlide.id}
      >
        {currentSlide.details.map((detail) => (
          <SwiperSlide key={detail.date}>
            <div className="detail-item">
              <p className="text-p-xl detail-item__date">{detail.date}</p>
              <p className="text-p">{detail.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentSection;
