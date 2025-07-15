import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations
 */
export const useGSAP = (animationFn, dependencies = []) => {
  const elementRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && typeof animationFn === 'function') {
      timelineRef.current = animationFn(elementRef.current);
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, dependencies);

  return elementRef;
};

/**
 * Fade in animation hook
 */
export const useFadeIn = (delay = 0, duration = 1) => {
  return useGSAP((element) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration,
        delay,
        ease: "power2.out"
      }
    );
  });
};

/**
 * Slide in animation hook
 */
export const useSlideIn = (direction = 'left', delay = 0, duration = 1) => {
  return useGSAP((element) => {
    const x = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
    const y = direction === 'up' ? -100 : direction === 'down' ? 100 : 0;

    gsap.fromTo(element,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power2.out"
      }
    );
  });
};

/**
 * Scale animation hook
 */
export const useScaleIn = (delay = 0, duration = 1) => {
  return useGSAP((element) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: "back.out(1.7)"
      }
    );
  });
};

/**
 * Stagger animation hook for multiple elements
 */
export const useStaggerAnimation = (staggerDelay = 0.1, duration = 1) => {
  return useGSAP((element) => {
    const children = element.children;
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger: staggerDelay,
        ease: "power2.out"
      }
    );
  });
};

/**
 * Scroll trigger animation hook
 */
export const useScrollTrigger = (animationConfig) => {
  return useGSAP((element) => {
    return gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...animationConfig.scrollTrigger
      },
      ...animationConfig.animation
    });
  });
};

/**
 * Parallax scroll effect hook
 */
export const useParallax = (speed = 0.5) => {
  return useGSAP((element) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
};

/**
 * Hover animation hook
 */
export const useHoverAnimation = (hoverConfig = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultConfig = {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    };

    const config = { ...defaultConfig, ...hoverConfig };

    const onMouseEnter = () => {
      gsap.to(element, config);
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: config.duration,
        ease: config.ease
      });
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [hoverConfig]);

  return elementRef;
};

/**
 * Loading animation hook
 */
export const useLoadingAnimation = (isLoading) => {
  return useGSAP((element) => {
    if (isLoading) {
      return gsap.to(element, {
        rotation: 360,
        duration: 1,
        ease: "none",
        repeat: -1
      });
    }
  }, [isLoading]);
};

export default useGSAP;