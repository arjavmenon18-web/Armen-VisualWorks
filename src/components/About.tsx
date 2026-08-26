import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Unlock, ArrowRight, User } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

export default function About() {
  const navigate = useNavigate();

  const handleOpenDeepDive = () => {
    navigate("/about-me");
  };

  return (
    <section 
      id="about" 
      onDoubleClick={handleOpenDeepDive}
      className="bg-[#F5F2EB] text-black py-16 sm:py-24 md:py-36 border-t border-black/10 select-none relative group/section transition-colors duration-500 hover:bg-[#F5F2EB]/95"
      title="Double-click to unlock personal deep-dive"
    >
      <div className="max-w-[95vw] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        {/* Plaque Header */}
        <div className="mb-10 sm:mb-16 border-b border-black/10 pb-6 sm:pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] sm:tracking-[0.4em] font-black uppercase text-black/60">
              [ REGISTRY PLATE 02 // IDENTITY REGISTER ]
            </span>
          </div>
          
          <button
            onClick={handleOpenDeepDive}
            className="flex items-center gap-2 bg-black/5 hover:bg-[#f9b934]/20 active:bg-[#f9b934]/30 px-3.5 sm:px-4 py-2 rounded-full border border-black/10 transition-colors cursor-pointer text-left"
          >
            <Unlock className="w-3.5 h-3.5 text-[#f9b934] shrink-0" />
            <span className="text-[8.5px] sm:text-[9px] font-mono tracking-wider font-black uppercase text-[#f9b934]">
              <span className="sm:hidden">TAP TO EXPLORE BIO & VAULT</span>
              <span className="hidden sm:inline">DOUBLE-CLICK TO DEEP DIVE & GRAPHIC VAULT</span>
            </span>
          </button>
        </div>

        {/* The Broad Widescreen Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-start border-t border-b border-black/10 py-10 sm:py-16">
          
          {/* Column Left: High-End Photo of Me (Arjav Menon) */}
          <div className="xl:col-span-5 relative group w-full max-w-md mx-auto xl:max-w-none">
            <div 
              onClick={handleOpenDeepDive}
              className="aspect-[4/5] bg-black overflow-hidden relative border border-black/5 rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(249,185,52,0.15)] cursor-pointer"
            >
              <OptimizedImage 
                webpSrc="/images/mee.webp"
                src="/images/mee.png"
                fallbackSrc="https://i.postimg.cc/jSRYZTB0/mee.png"
                alt="Arjav Menon" 
                priority={true}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 pointer-events-none" />
              
              {/* Geometric Corner Tech Accent */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 font-mono text-[7.5px] sm:text-[8px] bg-black text-[#F5F2EB] px-2.5 sm:px-3 py-1 uppercase tracking-widest border border-white/10 rounded-md z-10">
                FOUNDER REF: AGW_M01
              </div>

              {/* Dynamic Action Prompt */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between bg-[#F5F2EB] text-black px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-black shadow-lg z-10">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider font-bold">
                  TAP TO VIEW VAULT
                </span>
                <Unlock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f9b934]" />
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 flex justify-between font-mono text-[8px] sm:text-[9px] text-black/40 px-1">
              <span>LOC: DUBAI / GLOBAL</span>
              <span>BIOMETRIC STATUS: ACTIVE</span>
            </div>
          </div>

          {/* Column Right: Profile details */}
          <div className="xl:col-span-7 w-full px-1 sm:px-4 md:px-8 xl:px-0 flex flex-col justify-between h-full space-y-8 sm:space-y-12 text-left items-start">
            
            {/* Top Identity Block */}
            <div className="space-y-4 sm:space-y-6 w-full">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] sm:tracking-[0.35em] text-[#f9b934] font-black uppercase block">
                [ STAGE 01 IDENTITY REGISTER ]
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold uppercase tracking-tight text-black leading-none group-hover/section:text-[#f9b934] transition-colors duration-300">
                ARJAV<br />
                <span className="text-black/30">MENON</span>
              </h2>
              <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] font-black text-black/50 uppercase">
                FOUNDER & CREATIVE DIRECTOR
              </p>
            </div>

            {/* Narrative */}
            <div className="space-y-4 sm:space-y-6 max-w-2xl w-full">
              <p className="font-sans text-base sm:text-lg md:text-xl text-black/90 font-medium leading-relaxed tracking-tight">
                An independent designer, filmmaker, and director leading Armen GlobalWorks.
              </p>
              <p className="font-sans text-xs sm:text-sm text-black/60 leading-relaxed font-light">
                Specializing in visual design, media production, and sound—crafting clean, intentional systems for brands and projects that value strong aesthetic integrity and clarity.
              </p>

              {/* Mobile Direct Action Button */}
              <div className="pt-2 sm:hidden">
                <button
                  onClick={handleOpenDeepDive}
                  className="w-full py-3.5 px-5 bg-black active:bg-[#f9b934] text-white active:text-black font-mono font-bold text-[10px] uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Explore 18+ Plates & Bio Vault</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Extended Details Table */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 pt-6 sm:pt-8 border-t border-black/10 font-mono text-[9px] sm:text-[10px] w-full">
              <div>
                <div className="text-[8px] sm:text-[9px] uppercase font-bold text-black/40 tracking-wider sm:tracking-widest">ESTABLISHED</div>
                <div className="text-sm sm:text-base font-black text-black mt-1">2022</div>
              </div>
              <div>
                <div className="text-[8px] sm:text-[9px] uppercase font-bold text-black/40 tracking-wider sm:tracking-widest">PROJECT DEPTH</div>
                <div className="text-sm sm:text-base font-black text-black mt-1">GLOBAL SENSORY</div>
              </div>
              <div>
                <div className="text-[8px] sm:text-[9px] uppercase font-bold text-black/40 tracking-wider sm:tracking-widest">CREATIVE DIRECTION</div>
                <div className="text-sm sm:text-base font-black text-black mt-1">PRINCIPAL</div>
              </div>
            </div>

          </div>

        </div>

        {/* Archival Note Footer */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 text-[8px] sm:text-[9px] font-mono tracking-widest text-black/40 uppercase">
          <span>CODENAME: AGW-DIRECTOR-REVISED</span>
          <span>© ARMEN GLOBALWORKS [AGW]. ALL SERVICES SYNCHRONIZED</span>
        </div>
        
      </div>
    </section>
  );
}
