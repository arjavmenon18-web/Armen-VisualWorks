import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MagnifierProps {
  src: string;
  zoomLevel?: number;
  magnifierSize?: number;
}

export default function Magnifier({ 
  src, 
  zoomLevel = 2.5, 
  magnifierSize = 250 
}: MagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, offsetY: 0 });
  const [imgBounds, setImgBounds] = useState<DOMRect | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imgRef.current) return;
    
    const elem = imgRef.current;
    const bounds = elem.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Relative to the image element
    const relX = clientX - bounds.left;
    const relY = clientY - bounds.top;

    // Detect if this is a touch event or mouse event
    // The user requested to swap the behavior
    const isTouch = 'touches' in e;
    const verticalOffset = isTouch ? 0 : -140; 

    // Constrain within image bounds
    if (relX < 0 || relY < 0 || relX > bounds.width || relY > bounds.height) {
      setShowMagnifier(false);
      return;
    }

    setMousePos({ 
      x: relX, 
      y: relY,
      offsetY: verticalOffset 
    });
    setImgBounds(bounds);
    setShowMagnifier(true);
  };

  return (
    <div className="relative inline-block cursor-crosshair touch-none">
      <img
        ref={imgRef}
        src={src}
        alt="Magnifiable"
        className="max-w-full max-h-[40vh] md:max-h-[60vh] lg:max-h-[75vh] w-auto h-auto object-contain block mx-auto shadow-2xl rounded-xl md:rounded-[2rem]"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMove}
        onTouchStart={handleMove}
        onTouchMove={handleMove}
        onTouchEnd={() => setShowMagnifier(false)}
        referrerPolicy="no-referrer"
      />

      <AnimatePresence>
        {showMagnifier && imgBounds && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-none absolute z-50 border-[0.5px] border-bg/30 rounded-full shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.1)] overflow-hidden bg-ink ring-8 ring-accent/10"
            style={{
              width: magnifierSize,
              height: magnifierSize,
              left: mousePos.x - magnifierSize / 2,
              top: mousePos.y - magnifierSize / 2 + mousePos.offsetY,
            }}
          >
            {/* Lens Reflection Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50" />
            
            <div
              className="absolute"
              style={{
                width: imgBounds.width * zoomLevel,
                height: imgBounds.height * zoomLevel,
                left: -mousePos.x * zoomLevel + magnifierSize / 2,
                top: -mousePos.y * zoomLevel + magnifierSize / 2,
                backgroundImage: `url(${src})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
