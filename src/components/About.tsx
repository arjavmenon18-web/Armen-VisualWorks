import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Unlock } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate("/about-me");
  };

  return (
    <section 
      id="about" 
      onDoubleClick={handleDoubleClick}
      className="bg-[#F5F2EB] text-black py-24 md:py-36 border-t border-black/10 cursor-pointer select-none relative group/section transition-colors duration-500 hover:bg-[#F5F2EB]/95"
      title="Double-click to unlock personal deep-dive"
    >
      <div className="max-w-[95vw] mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Plaque Header */}
        <div className="mb-16 border-b border-black/10 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.4em] font-black uppercase text-black/60">
              [ REGISTRY PLATE 02 // IDENTITY REGISTER ]
            </span>
          </div>
          <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full border border-black/5 animate-pulse hover:bg-[#f9b934]/10 transition-colors">
            <Unlock className="w-3.5 h-3.5 text-[#f9b934]" />
            <span className="text-[9px] font-mono tracking-widest font-black uppercase text-[#f9b934]">
              DOUBLE-CLICK TO DEEP DIVE & GRAPHIC VAULT
            </span>
          </div>
        </div>

        {/* The Broad Widescreen Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-b border-black/10 py-16">
          
          {/* Column Left: High-End Photo of Me (Arjav Menon) */}
          <div className="xl:col-span-5 relative group w-full">
            <div className="aspect-[4/5] bg-black overflow-hidden relative border border-black/5 rounded-2xl shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(249,185,52,0.15)]">
              <img 
                src="https://i.postimg.cc/jSRYZTB0/mee.png" 
                alt="Arjav Menon" 
                className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
              
              {/* Geometric Corner Tech Accent */}
              <div className="absolute top-4 left-4 font-mono text-[8px] bg-black text-[#F5F2EB] px-3 py-1 uppercase tracking-widest border border-white/10 rounded-md">
                FOUNDER REF: AGW_M01
              </div>

              {/* Dynamic Bubbly Action Prompt */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-[#F5F2EB] text-black px-4 py-3 rounded-xl border border-black shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-mono tracking-wider font-bold">CLICK TWICE TO REVEAL</span>
                <Unlock className="w-4 h-4 text-[#f9b934] animate-bounce" />
              </div>
            </div>
            
            <div className="mt-4 flex justify-between font-mono text-[9px] text-black/40">
              <span>LOC: DUBAI / GLOBAL</span>
              <span>BIOMETRIC STATUS: ACTIVE</span>
            </div>
          </div>

          {/* Column Right: Profile details structured dynamically into a broad column layout */}
          <div className="xl:col-span-7 w-full px-4 sm:px-6 md:px-8 xl:px-0 flex flex-col justify-between h-full space-y-12 text-center xl:text-left items-center xl:items-start">
            
            {/* Top Identity Block */}
            <div className="space-y-6 w-full">
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#f9b934] font-black uppercase block">
                [ STAGE 01 IDENTITY REGISTER ]
              </span>
              <h2 className="text-5xl md:text-7xl font-sans font-extrabold uppercase tracking-tight text-black leading-none group-hover/section:text-[#f9b934] transition-colors duration-300">
                ARJAV<br />
                <span className="text-black/30">MENON</span>
              </h2>
              <p className="text-xs font-mono tracking-[0.3em] font-black text-black/50 uppercase">
                FOUNDER & CREATIVE DIRECTOR
              </p>
            </div>

            {/* Narrative with Premium Typography */}
            <div className="space-y-8 max-w-2xl w-full">
              <p className="font-sans text-lg md:text-xl text-black/90 font-medium leading-relaxed tracking-tight">
                An independent designer, filmmaker, and director leading Armen GlobalWorks.
              </p>
              <p className="font-sans text-xs md:text-sm text-black/60 leading-relaxed font-light">
                Specializing in visual design, media production, and sound—crafting clean, intentional systems for brands and projects that value strong aesthetic integrity and clarity.
              </p>
            </div>

            {/* Extended Details Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-black/10 font-mono text-[10px] w-full">
              <div className="text-center sm:text-left">
                <div className="text-[9px] uppercase font-bold text-black/40 tracking-widest">ESTABLISHED</div>
                <div className="text-base font-black text-black mt-1">2022</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[9px] uppercase font-bold text-black/40 tracking-widest">PROJECT DEPTH</div>
                <div className="text-base font-black text-black mt-1">GLOBAL SENSORY</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[9px] uppercase font-bold text-black/40 tracking-widest">CREATIVE DIRECTION</div>
                <div className="text-base font-black text-black mt-1">PRINCIPAL SYSTEMS</div>
              </div>
            </div>

          </div>

        </div>

        {/* Archival Note Footer */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[9px] font-mono tracking-widest text-black/40 uppercase">
          <span>CODENAME: AGW-DIRECTOR-REVISED</span>
          <span>© ARMEN GLOBALWORKS [AGW]. ALL SERVICES SYNCHRONIZED</span>
        </div>
        
      </div>
    </section>
  );
}
