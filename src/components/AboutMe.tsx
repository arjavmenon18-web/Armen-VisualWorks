import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";

export const archivePhotos = [
  {
    id: "p-01",
    title: "OSLO EXPEDITION",
    category: "HIGHLIGHT PROJECT",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
    description: "An atmospheric exploration into the dense, mist-enshrouded evergreen canopies of Oslo, capturing the pure majesty and rhythmic patterns of wild conifers.",
    year: "2025",
  },
  {
    id: "p-02",
    title: "FOSSEN FALLS / ICELAND",
    category: "CINEMATIC LANDSCAPE",
    image: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?q=80&w=1200",
    description: "The cinematic velocity of glacial meltwater plunging into the deep basalt canyons.",
    year: "2024",
  },
  {
    id: "p-03",
    title: "URBAN ROAD / ROAD",
    category: "URBAN STUDIES",
    image: "https://i.postimg.cc/nr10Ly2v/Whats-App-Image-2026-05-02-at-10-44-44-PM.jpg",
    description: "A sharp study of verticality and brutalist rhythm within urban structural voids.",
    year: "2024",
  },
  {
    id: "p-04",
    title: "AVIAN HORIZON / ICELAND",
    category: "LANDSCAPE",
    image: "https://i.postimg.cc/nr10Ly2q/Whats-App-Image-2026-05-02-at-10-45-22-PM.jpg",
    description: "Capturing the graceful patterns of bird flight across the vast, misty horizons of the North.",
    year: "2023",
  },
  {
    id: "p-05",
    title: "WINDING ARTERY / ICELAND",
    category: "LANDSCAPE",
    image: "https://i.postimg.cc/T1cCPz0g/Whats-App-Image-2026-05-02-at-10-45-51-PM.jpg",
    description: "The rhythmic curves of asphalt cutting through the raw, volcanic textures of the Icelandic highlands.",
    year: "2024",
  },
  {
    id: "p-06",
    title: "ONYX SHORE / REYNISFJARA",
    category: "KINETIC SHORES",
    image: "https://i.postimg.cc/tJz2gKkx/Whats-App-Image-2026-05-02-at-10-46-57-PM.jpg",
    description: "The haunting beauty of black sand meeting the violent, rhythmic waves of the Atlantic.",
    year: "2023",
  },
  {
    id: "p-07",
    title: "TERRA BOREALIS / ICELAND",
    category: "GEOLOGICAL SHAPE",
    image: "https://i.postimg.cc/brR3v7gn/Whats-App-Image-2026-05-02-at-10-46-23-PM.jpg",
    description: "An expansive study of the rugged, moss-covered terrains that define the heart of Iceland.",
    year: "2024",
  }
];

export default function AboutMe() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  
  // Lightbox State
  const [selectedPhoto, setSelectedPhoto] = useState<typeof archivePhotos[0] | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const distance = Math.abs(x - startX);
    setDragDistance(distance);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
    }
  };

  const handleMouseUp = (photo: typeof archivePhotos[0]) => {
    setIsDragging(false);
    if (dragDistance < 6) {
      setSelectedPhoto(photo);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const currentIndex = archivePhotos.findIndex((p) => p.id === selectedPhoto.id);
    let nextIndex = currentIndex;
    if (direction === "prev") {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : archivePhotos.length - 1;
    } else {
      nextIndex = currentIndex < archivePhotos.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedPhoto(archivePhotos[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#f4f2e9] text-[#0A0A0A] relative overflow-hidden font-sans select-none">
      
      {/* Top Navigation Line */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center bg-[#f4f2e9]/90 backdrop-blur-md border-b border-black/5">
        <Link 
          to="/" 
          className="flex items-center gap-3 group px-4 py-2 bg-white hover:bg-black hover:text-[#f4f2e9] rounded-full border border-black/5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-[10px] font-mono font-black uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ BACK TO CORE INDEX ]</span>
        </Link>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] bg-black/5 px-4 py-2 rounded-full border border-black/5">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>PORTAL SEC-04 // DEEP DIVE</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[95vw] mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-24 space-y-24">
        
        {/* Intro Biography Block */}
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-start border-b border-black/10 pb-16">
          <div className="col-span-12 lg:col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-[10px] font-mono tracking-[0.4em] text-accent font-black uppercase block">
                [ UNLOCKED BIOGRAPHICAL INDEX ]
              </span>
              <h1 className="text-[clamp(44px,10vw,120px)] font-black leading-[0.85] tracking-tight uppercase">
                ARJAV<br />
                <span className="text-accent italic font-display">MENON</span>
              </h1>
            </motion.div>
          </div>

          {/* Left bio column */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="relative group overflow-hidden rounded-2xl border border-black/10 shadow-2xl aspect-[4/5] bg-black">
              <img 
                src="https://i.postimg.cc/jSRYZTB0/mee.png" 
                alt="Arjav Menon" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[8px] bg-black text-[#F5F2EB] px-3 py-1 uppercase tracking-widest border border-white/10 rounded-md">
                DIRECTOR_REF_01
              </div>
            </div>
            <div className="flex justify-between font-mono text-[9px] text-black/40 px-1">
              <span>UAE RESIDENCY // DUBAI</span>
              <span>EST. STATUS: UNLOCKED</span>
            </div>
          </div>

          {/* Right bio column */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between h-full py-2 space-y-8">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-black leading-tight">
                Operating at the intersection of stark visuals, atmospheric acoustics, and digital logic.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-black/70 leading-relaxed font-light">
                <p>
                  I'm Arjav Menon, an independent designer, filmmaker, and director managing the multi-sensory visual (AVW), sound (ASW), and cinematic (AFW) output of Armen GlobalWorks (AGW). Currently a student in Class 11th at Pearl Wisdom School Dubai, my work is defined by a deep curiosity for how aesthetics shape human emotions and architectural environments.
                </p>
                <p>
                  Over the past four years, I've rescaled visuals and delivered high-end digital solutions that challenge typical layout patterns and typography. I believe that every element—be it a geometric line, a modular synthesizer pulse, or a heavy black volcanic sand visual plate—should carry genuine creative weight.
                </p>
                <p>
                  My vision is to maintain absolute aesthetic integrity, bringing top-tier cinematic storytelling and modern structural design to brands who aren't afraid of being bold, stark, and memorable.
                </p>
              </div>
            </div>

            {/* Competencies */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-black/10 font-mono text-[10px]">
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest">ART DIRECTION</div>
                <div className="text-sm font-black text-black mt-1">CINEMATIC SCALES</div>
              </div>
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest">ACOUSTIC STUDY</div>
                <div className="text-sm font-black text-black mt-1">MODULAR SYNTH</div>
              </div>
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest">FILMMAKING</div>
                <div className="text-sm font-black text-black mt-1">8K DIRECTED RAW</div>
              </div>
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest">DEVELOPMENT</div>
                <div className="text-sm font-black text-black mt-1">TYPESCRIPT VITE</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PHOTOGRAPHY SECTION - Re-designed to match Screenshot 3 */}
        <div className="space-y-12 pt-6">
          
          {/* Header styled exactly like Screenshot 3 */}
          <div className="text-left space-y-4 border-b border-black/10 pb-8">
            <h2 className="text-[clamp(44px,10vw,120px)] font-black leading-[0.8] tracking-tighter uppercase font-display">
              PHOTO <br className="sm:hidden" />
              <span className="text-[#f9b934]">GRAPHY</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-2">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-black/40">
                <span className="w-12 h-[1px] bg-black/20 inline-block"></span>
                <span>ORIGINAL PHOTOGRAPH FROM AROUND THE WORLD</span>
              </div>
            </div>
          </div>

          {/* Oslo Expedition - Highlight Spotlight Project Card as shown in Screenshot 3 */}
          <div 
            onClick={() => setSelectedPhoto(archivePhotos[0])}
            className="relative group overflow-hidden rounded-[2.5rem] border border-black/10 shadow-2xl bg-black aspect-[21/10] min-h-[350px] cursor-zoom-in"
          >
            <img 
              src={archivePhotos[0].image} 
              alt={archivePhotos[0].title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            {/* Subtle light leak style overlay */}
            <div className="absolute inset-0 bg-[#f9b934]/5 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            
            {/* Spotlight Annotations */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-xl space-y-2 text-white">
              <div className="font-mono text-[9px] text-[#f9b934] uppercase tracking-[0.3em] bg-[#f9b934]/10 border border-[#f9b934]/20 px-3 py-1 rounded-md inline-block">
                HIGHLIGHT PROJECT
              </div>
              <h3 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tight leading-none text-white">
                {archivePhotos[0].title}
              </h3>
              <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed hidden sm:block">
                {archivePhotos[0].description}
              </p>
            </div>

            {/* Explore Detail yellow button on bottom right */}
            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12">
              <button className="px-6 py-3 md:px-8 md:py-4 bg-[#f9b934] hover:bg-white text-black font-mono font-black text-[9px] md:text-[10px] tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2">
                <span>EXPLORE DETAIL</span>
              </button>
            </div>
          </div>

          {/* Interactive Marquee banner as shown in Screenshot 2 */}
          <div className="w-full overflow-hidden py-8 border-y border-black/10 flex relative bg-[#ebe7d9]/30">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex whitespace-nowrap text-4xl md:text-6xl font-display font-black text-[#f9b934] tracking-[0.15em] uppercase gap-12"
            >
              <span>INDUSTRIAL</span>
              <span>•</span>
              <span>RAW</span>
              <span>•</span>
              <span>TEXTURED</span>
              <span>•</span>
              <span>INDUSTRIAL</span>
              <span>•</span>
              <span>RAW</span>
              <span>•</span>
              <span>TEXTURED</span>
              <span>•</span>
              <span>INDUSTRIAL</span>
              <span>•</span>
              <span>RAW</span>
              <span>•</span>
              <span>TEXTURED</span>
              <span>•</span>
              <span>INDUSTRIAL</span>
              <span>•</span>
              <span>RAW</span>
              <span>•</span>
              <span>TEXTURED</span>
            </motion.div>
          </div>

          {/* Glide Media Stream of Landscape works - Fossen Falls, Avian Horizon, etc. (Screenshot 1 & 2) */}
          <div className="space-y-6 pt-6">
            <div className="flex justify-between items-center font-mono text-[10px] text-black/50">
              <span className="uppercase tracking-widest font-bold">[ VAULT SERIES PHOTO LISTING ]</span>
              <span className="hidden md:inline">[ GRAB AND SWIPE OR DRAG TO TRAVEL ]</span>
            </div>

            <div className="relative group/glide">
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={handleMouseLeave}
                className={`flex gap-8 overflow-x-auto pb-12 snap-x scrollbar-hide select-none relative z-10 ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
              >
                {/* Render photos 1 onwards (exclude first item spotlight or include all for comprehensive stream) */}
                {archivePhotos.map((photo, i) => (
                  <div
                    key={photo.id}
                    onMouseUp={() => handleMouseUp(photo)}
                    className="snap-center shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] flex flex-col space-y-4 group/photo pointer-events-auto"
                  >
                    {/* Photo Frame */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-black border border-black/10 rounded-3xl shadow-lg transition-all duration-500 group-hover/photo:shadow-[0_15px_40px_rgba(249,185,52,0.15)]">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/photo:scale-105"
                        draggable="false"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#f9b934]/5 mix-blend-overlay pointer-events-none" />
                      
                      {/* Corner Expand Hint */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-3.5 h-3.5 text-white" />
                      </div>

                      <div className="absolute bottom-4 left-4 font-mono text-[8px] bg-black text-[#F5F2EB] px-3 py-1 uppercase tracking-widest border border-white/10 rounded-md">
                        PLATE 0{i + 1} // AVW_RAW
                      </div>
                    </div>

                    {/* Photo Details */}
                    <div className="space-y-1.5 px-1 text-left">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="text-[#f9b934] font-black tracking-widest uppercase">{photo.category}</span>
                        <span className="text-black/40 font-bold">YEAR: {photo.year}</span>
                      </div>
                      <h3 className="text-base font-bold uppercase tracking-tight text-black">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-black/60 font-light leading-relaxed max-w-sm line-clamp-2">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual indicator lines */}
              <div className="flex justify-between items-center pt-4 border-t border-black/5 font-mono text-[9px] text-black/40">
                <span>SWIPE OR DRAG TRAVEL DIRECTIONAL</span>
                <span className="animate-pulse">ONLINE ARCHIVE PIPELINE ESTABLISHED // OPTICAL EXTREME</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Lightbox Magnification Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200] flex items-center justify-center p-6 select-none"
          >
            {/* Close trigger boundary */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedPhoto(null)} />

            {/* Left controller */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right controller */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Top Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 md:top-12 md:right-12 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Core Card */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full flex flex-col gap-6 z-10 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Aspect frame */}
              <div className="w-full bg-[#0d0d0d] flex items-center justify-center p-4 sm:p-6 overflow-hidden border border-white/10 rounded-3xl max-h-[65vh] aspect-[16/10] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-full object-contain select-none pointer-events-none rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Annotation Plaque below image */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white/95 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl text-left">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-3 font-mono text-[10px]">
                    <span className="text-[#f9b934] font-black tracking-widest">{selectedPhoto.category}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40">YEAR: {selectedPhoto.year}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40">REF: {selectedPhoto.id}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                </div>
                <div className="font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                  AVW_8K_OPT_RAW
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
