import { useState, RefObject, useEffect } from "react";

export function useScrollLightHit(ref: RefObject<HTMLElement>, tolerance = 0, mobileOnly = true, label?: string) {
  const [isHit, setIsHit] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const checkHit = () => {
      requestAnimationFrame(() => {
        if (!el) return;

        // Basic screen-size check if requested
        if (mobileOnly && window.innerWidth >= 768) {
          setIsHit(false);
          el.removeAttribute('data-is-hit');
          return;
        }
        
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const elementCenter = rect.top + rect.height / 2;
        const hit = elementCenter > viewportHeight * 0.1 - tolerance && elementCenter < viewportHeight * 0.9 + tolerance;
        
        setIsHit(hit);
        if (hit) {
          el.setAttribute('data-is-hit', 'true');
          if (label) el.setAttribute('data-view-label', label);
        } else {
          el.removeAttribute('data-is-hit');
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', checkHit, { passive: true });
          checkHit();
        } else {
          window.removeEventListener('scroll', checkHit);
          setIsHit(false);
        }
      });
    }, { threshold: [0, 0.1, 0.5, 0.9, 1] });

    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkHit);
    };
  }, [ref, tolerance, mobileOnly]);

  return isHit;
}
