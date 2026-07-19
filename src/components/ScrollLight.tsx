import { motion, useScroll, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";

export default function ScrollLight() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the movement
  const springConfig = { damping: 30, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // For mobile: light follows scroll progress down the screen using percentage-based viewport heights
  const mobileY = useTransform(scrollYProgress, [0, 1], ["10vh", "90vh"]);

  // Determine which values to use based on machine state
  const x = isMobile ? "-50%" : smoothX;
  const y = isMobile ? mobileY : smoothY;

  return (
    <motion.div
      className="fixed pointer-events-none z-0 force-gpu"
      style={{
        width: isMobile ? "600px" : "800px",
        height: isMobile ? "600px" : "800px",
        background: isMobile 
          ? "radial-gradient(circle, rgba(235, 255, 107, 0.15) 0%, transparent 70%)" 
          : "radial-gradient(circle, rgba(235, 255, 107, 0.08) 0%, transparent 70%)",
        left: isMobile ? "50%" : 0,
        top: isMobile ? 0 : 0,
        x,
        y,
        translateX: isMobile ? 0 : "-50%",
        translateY: isMobile ? 0 : "-50%",
      }}
    />
  );
}
