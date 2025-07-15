import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NetflixIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const nLetterRef = useRef(null);
  const aLetterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const nLetter = nLetterRef.current;
    const aLetter = aLetterRef.current;

    if (!container || !nLetter || !aLetter) return;

    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = 'auto';
          onComplete?.();
        }, 500);
      }
    });

    // Initial setup
    gsap.set([nLetter, aLetter], { opacity: 0, scale: 0.5 });
    gsap.set(container, { backgroundColor: '#000' });

    // Animation sequence
    tl.to(container, { duration: 0.5, backgroundColor: '#000' })
      .to(nLetter, { 
        duration: 1, 
        opacity: 1, 
        scale: 1, 
        ease: "back.out(1.7)",
        rotation: 360 
      })
      .to(nLetter, { 
        duration: 0.8, 
        morphSVG: aLetter, 
        ease: "power2.inOut" 
      }, "-=0.3")
      .to(aLetter, { 
        duration: 0.6, 
        opacity: 1, 
        scale: 1.2, 
        ease: "elastic.out(1, 0.3)" 
      })
      .to(aLetter, { 
        duration: 0.4, 
        scale: 1, 
        ease: "power2.out" 
      })
      .to(container, { 
        duration: 0.8, 
        opacity: 0, 
        ease: "power2.inOut" 
      }, "+=0.5");

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className="absolute top-8 right-8 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {soundEnabled ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5 7h4l5-5v16l-5-5H5V7z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          )}
        </svg>
      </button>

      {/* Letter Animation Container */}
      <div className="relative">
        {/* N Letter */}
        <svg
          ref={nLetterRef}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute inset-0"
        >
          <path
            d="M40 40 L40 160 L60 160 L60 90 L140 160 L160 160 L160 40 L140 40 L140 110 L60 40 Z"
            fill="#FFB800"
            stroke="#FFB800"
            strokeWidth="2"
          />
        </svg>

        {/* A Letter */}
        <svg
          ref={aLetterRef}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute inset-0"
        >
          <path
            d="M100 40 L60 160 L80 160 L88 130 L112 130 L120 160 L140 160 L100 40 Z M94 110 L106 110 L100 90 Z"
            fill="#FFB800"
            stroke="#FFB800"
            strokeWidth="2"
          />
        </svg>

        {/* CineAI Text */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold tracking-wider">
          CineAI
        </div>
      </div>

      {/* Loading Animation */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NetflixIntro;