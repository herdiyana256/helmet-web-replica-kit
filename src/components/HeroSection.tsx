"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const slides = ["/carousel1.png", "/carousel2.png", "/carousel3.png"];

const HeroSection = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    duration: 2000,
    drag: false,
    created: () => {
      setInterval(() => {
        if (instanceRef.current) instanceRef.current.next();
      }, 5000);
    },
  });

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Carousel Slider */}
      <div ref={sliderRef} className="keen-slider absolute inset-0 z-0">
        {slides.map((src, i) => (
          <div key={i} className="keen-slider__slide min-h-screen">
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content on top */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="space-y-8 text-white max-w-xl animate-slide-up">
          <Badge 
            variant="outline" 
            className="border-white text-white bg-white/10 px-4 py-2 text-sm font-medium"
          >
            EXCLUSIVE LAUNCHING
          </Badge>

          <h1 className="text-6xl lg:text-8xl font-black tracking-tight">ODEZZY</h1>

          <div className="text-xl font-bold space-y-1">
            <p>12 COLORS TO</p>
            <p>CHECK YOUR VIBE!!</p>
          </div>

          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-bold rounded-full shadow-helmet hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            #OdezzyVibeCheck
          </Button>
        </div>
      </div>

      {/* Optional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
