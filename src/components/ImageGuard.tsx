import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';

export default function ImageGuard() {
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleContext = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        triggerPopup();
      }
    };

    // Global listener for images
    window.addEventListener('contextmenu', handleContext as any);

    return () => {
      window.removeEventListener('contextmenu', handleContext as any);
    };
  }, []);

  const triggerPopup = () => {
    if (timer) clearTimeout(timer);
    setShowPopup(true);
    const newTimer = setTimeout(() => setShowPopup(false), 3000);
    setTimer(newTimer);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
        >
          <div className="bg-ink text-bg px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-bg/10 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold uppercase tracking-wider">Source picture cannot be shown</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
