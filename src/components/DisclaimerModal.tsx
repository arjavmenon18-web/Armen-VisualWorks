import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, ArrowRight, ShieldAlert } from "lucide-react";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged the disclaimer in the current session
    const acknowledged = sessionStorage.getItem("asw_disclaimer_acknowledged");
    if (!acknowledged) {
      // Small delay for entrance effect
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("asw_disclaimer_acknowledged", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={handleDismiss} // Allow clicking outside to dismiss as well for convenience
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative w-full max-w-xl border border-white/10 bg-[#0E0E0E] text-[#F5F2EB] p-8 md:p-10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#f9b934]/10 blur-[80px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f9b934]/50 to-transparent" />

            <div className="space-y-6 relative z-10">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#f9b934] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#f9b934] font-black uppercase">
                    ARMEN GLOBALWORKS // PUBLIC NOTICE
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">
                  STATUS: LIVE DEPLOY
                </span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-white leading-tight">
                  STUDIO UPGRADES IN PROGRESS
                </h2>
                <div className="h-[1px] w-12 bg-[#f9b934]" />
              </div>

              {/* Message */}
              <div className="space-y-4 text-xs md:text-sm text-white/70 leading-relaxed font-sans font-light">
                <p>
                  We are actively shipping and refining our digital portfolio, sound engines, and creative showcases.
                </p>
                <p>
                  While several custom-graded acoustic archives, high-fidelity film pipelines, and specialized interactive interfaces are still undergoing final calibration inside our laboratories, we have initiated public deployment to allow immediate access to finished spaces.
                </p>
                <p className="text-white/40">
                  Thank you for your understanding as we complete the final phases of our studio installation.
                </p>
              </div>

              {/* Control Action Block */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  [ BUILD v1.4.8 // DEPLOY ACTIVE ]
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="w-full sm:w-auto bg-[#F5F2EB] hover:bg-[#E5E2DB] text-black font-mono text-xs font-black tracking-widest px-6 py-3.5 uppercase rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <span>PROCEED TO PORTFOLIO</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
