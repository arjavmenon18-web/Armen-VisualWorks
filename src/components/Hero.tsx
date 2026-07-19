import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowDown, Radio, Camera, Compass } from "lucide-react";

interface HeroProps {
  isExpanded: boolean;
  onExpand: () => void;
}

export default function Hero({ isExpanded, onExpand }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full h-[100vh] select-none bg-[#F5F2EB] overflow-hidden"
    >
      {/* 1. THE INVERTED HEMISPHERE (THE VAULT) SPLIT MECHANICAL GATES */}
      {/* LEFT GATE */}
      <motion.div
        id="hero-vault-left"
        initial={{ x: "0%" }}
        animate={{ x: isExpanded ? "-100%" : "0%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-1/2 h-[90vh] bg-gradient-to-b from-[#f9b934] via-[#f5b127] to-[#e09b12] z-20 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.15)] force-gpu"
        style={{
          clipPath: "ellipse(180% 100% at 100% 0%)"
        }}
      >
        {/* Subtle geometric grid lines inside the left vault */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-y-0 left-1/4 border-l border-black h-full" />
          <div className="absolute inset-y-0 left-1/2 border-l border-black h-full" />
          <div className="absolute inset-y-0 left-3/4 border-l border-black h-full" />
        </div>
      </motion.div>

      {/* RIGHT GATE */}
      <motion.div
        id="hero-vault-right"
        initial={{ x: "0%" }}
        animate={{ x: isExpanded ? "100%" : "0%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-1/2 h-[90vh] bg-gradient-to-b from-[#f9b934] via-[#f5b127] to-[#e09b12] z-20 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.15)] force-gpu"
        style={{
          clipPath: "ellipse(180% 100% at 0% 0%)"
        }}
      >
        {/* Subtle geometric grid lines inside the right vault */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-y-0 left-1/4 border-l border-black h-full" />
          <div className="absolute inset-y-0 left-1/2 border-l border-black h-full" />
          <div className="absolute inset-y-0 left-3/4 border-l border-black h-full" />
        </div>
      </motion.div>

      {/* 2. THE TYPOGRAPHY OVERLAY (STAGE 01 & 02) */}
      <motion.div
        id="hero-typography-container"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ 
          opacity: isExpanded ? 0 : 1,
          scale: isExpanded ? 1.05 : 1,
          pointerEvents: isExpanded ? "none" : "auto"
        }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center z-30"
      >
        <h1 className="text-[clamp(28px,8.5vw,110px)] font-display font-black uppercase text-black flex items-center justify-center whitespace-nowrap tracking-tighter">
          ARMEN
          {/* Tactile, Bubbly Hyphen Trigger Button */}
          <span className="relative inline-flex items-center justify-center mx-4 md:mx-8 select-none">
            <motion.button
              id="hyphen-trigger"
              onClick={onExpand}
              whileHover={{ 
                scale: 1.15,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
              }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer w-12 h-12 md:w-20 md:h-20 bg-black text-[#F5F2EB] hover:bg-white hover:text-black font-display font-black text-2xl md:text-5xl rounded-full shadow-2xl transition-all duration-300 relative z-10 flex items-center justify-center border-2 border-black"
            >
              -
            </motion.button>
            
            {/* Elegant Micro-Interaction Hint */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-8 md:mt-12 whitespace-nowrap text-[9px] font-mono tracking-[0.4em] text-black font-black uppercase pointer-events-none animate-pulse bg-[#F5F2EB] px-3 py-1 rounded-full shadow-md border border-black/5">
              [ click hyphen to enter ]
            </span>
          </span>
          WORKS
        </h1>
      </motion.div>

      {/* 3. THE GATEWAY REVEAL */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="gateway-reveal"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6"
          >
            <div className="text-center mb-12 max-w-xl">
              <span className="text-[10px] uppercase font-mono font-black tracking-[0.4em] text-accent block mb-3 bg-black text-[#F5F2EB] px-4 py-1.5 rounded-full inline-block shadow-md">
                ARMEN GLOBALWORKS // SYSTEMS CORE
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-black leading-none mt-2">
                SELECT ARCHITECTURAL PORTFOLIO
              </h2>
              <p className="text-xs md:text-sm text-black/50 font-mono tracking-widest mt-3 uppercase">
                CODENAME: STAGE_02_GATEWAY_ACTIVE
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full max-w-3xl justify-center px-4">
              {/* Dynamic visualworks button */}
              <Link
                to="/visual"
                className="w-full sm:w-auto text-center group relative px-12 py-6 bg-black text-[#F5F2EB] hover:text-black rounded-full font-mono text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_45px_rgba(249,185,52,0.3)] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  [ VISUALWORKS ]
                </span>
                <div className="absolute inset-0 bg-[#f9b934] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </Link>

              {/* Dynamic soundworks button */}
              <Link
                to="/sound"
                className="w-full sm:w-auto text-center group relative px-12 py-6 bg-[#F5F2EB] text-black hover:text-[#F5F2EB] border-2 border-black rounded-full font-mono text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Radio className="w-4 h-4 text-black group-hover:text-accent group-hover:animate-spin" />
                  [ SOUNDWORKS ]
                </span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </Link>
            </div>

            {/* Scroll Indication Arrow once Gate is split */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-16 flex flex-col items-center gap-2"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#f9b934] font-black bg-black px-4 py-1 rounded-full shadow-lg">
                Scroll to enter database index
              </span>
              <ArrowDown className="w-4 h-4 text-black animate-bounce" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10vh Bottom Flat Floor visualizer indicator */}
      <div className="absolute bottom-0 left-0 w-full h-[10vh] border-t border-black/5 bg-[#F5F2EB] z-10 flex items-center justify-between px-6 md:px-12">
        <span className="text-[8px] font-mono tracking-[0.3em] text-black/30 font-bold uppercase">AGW // PLATFORM SEC-01</span>
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-accent animate-spin [animation-duration:10s]" />
          <span className="text-[8px] font-mono tracking-[0.3em] text-black/30 font-bold uppercase">CREATIVE DIRECTORY</span>
        </div>
      </div>
    </section>
  );
}
