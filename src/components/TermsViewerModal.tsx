import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { TERMS_SLIDES_DATA, TERMS_VERSION } from "../types/collaboration";

interface TermsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsViewerModal({ isOpen, onClose }: TermsViewerModalProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!isOpen) return null;

  const current = TERMS_SLIDES_DATA[activeSlide];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/15 rounded-3xl p-5 sm:p-8 text-white shadow-2xl z-10 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
              <div>
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                  AVW COLLABORATIVE TERMS ({TERMS_VERSION})
                </span>
                <span className="font-display font-black text-sm sm:text-base uppercase tracking-tight text-white">
                  Principles of Engagement
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Indicator Dots / Bar */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {TERMS_SLIDES_DATA.map((slide, idx) => (
              <button
                key={slide.number}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeSlide
                    ? "bg-accent"
                    : idx < activeSlide
                    ? "bg-white/40"
                    : "bg-white/10"
                }`}
                title={`Principle ${slide.number}: ${slide.title}`}
              />
            ))}
          </div>

          {/* Active Principle Card */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-4 min-h-[220px] sm:min-h-[240px] flex flex-col justify-between shadow-inner">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-accent font-bold">
                  PRINCIPLE {current.number} OF {current.total} // {current.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
                {current.title}
              </h3>
              <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed">
                {current.body}
              </p>
            </div>

            {current.closing && (
              <div className="pt-3 border-t border-white/10 font-mono text-[10px] sm:text-[11px] text-accent/90 italic">
                "{current.closing}"
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
              disabled={activeSlide === 0}
              className={`px-4 py-2 rounded-full border border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeSlide === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "bg-white/5 hover:bg-white/15 text-white"
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>

            <span className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">
              {activeSlide + 1} / {TERMS_SLIDES_DATA.length}
            </span>

            {activeSlide < TERMS_SLIDES_DATA.length - 1 ? (
              <button
                onClick={() => setActiveSlide((prev) => Math.min(TERMS_SLIDES_DATA.length - 1, prev + 1))}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-accent hover:bg-white text-black font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>CLOSE TERMS</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
