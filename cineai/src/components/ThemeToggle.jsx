import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from './AppIcon';

const ThemeToggle = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleRef = React.useRef(null);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('cineai-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--color-background', '#0A0A0A');
      document.documentElement.style.setProperty('--color-foreground', '#FFFFFF');
      document.documentElement.style.setProperty('--color-card', '#1A1A1A');
      document.documentElement.style.setProperty('--color-muted', '#2D2D2D');
      document.documentElement.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--color-background', '#FAFAFA');
      document.documentElement.style.setProperty('--color-foreground', '#1A1A1A');
      document.documentElement.style.setProperty('--color-card', '#F5F5F5');
      document.documentElement.style.setProperty('--color-muted', '#E5E5E5');
      document.documentElement.style.setProperty('--color-border', 'rgba(0, 0, 0, 0.1)');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('cineai-theme', newTheme ? 'dark' : 'light');

    // GSAP animation for theme transition
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        rotation: 360,
        duration: 0.5,
        ease: "power2.out"
      });
    }

    // Smooth transition animation
    const body = document.body;
    gsap.to(body, {
      opacity: 0.7,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(body, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    });
  };

  return (
    <button
      ref={toggleRef}
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-full transition-all duration-300 
        ${isDark 
          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' :'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
        }
        ${className}
      `}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Icon 
          name={isDark ? "Sun" : "Moon"} 
          size={20} 
          className="transition-all duration-300"
        />
      </div>
    </button>
  );
};

export default ThemeToggle;