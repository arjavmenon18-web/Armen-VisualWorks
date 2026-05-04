import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useScroll, MotionValue } from 'motion/react';

interface LightContextType {
  lightY: number; // Page Y coordinate of the light center
  lightSize: number;
  isMobile: boolean;
}

const LightContext = createContext<LightContextType>({ lightY: 0, lightSize: 600, isMobile: false });

export const LightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [lightY, setLightY] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // We update lightY based on scroll progress for mobile
    // This represents the center of the light in PAGE coordinates
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (window.innerWidth < 768) {
        // Mobile behavior: descends from 10% to 90% of current VIEWPORT as we scroll
        // But we need it in PAGE coordinates for hit detection or relative to viewport?
        // Actually, detecting if an element is in the viewport at the light's screen Y is better.
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Actually, let's keep it simpler.
  return (
    <LightContext.Provider value={{ lightY: 0, lightSize: 600, isMobile }}>
      {children}
    </LightContext.Provider>
  );
};

export const useLight = () => useContext(LightContext);
