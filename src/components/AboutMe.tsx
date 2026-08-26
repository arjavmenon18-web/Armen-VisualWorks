import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";

export const archivePhotos = [
  {
    id: "p-01",
    title: "OSLO EXPEDITION // CANOPY",
    category: "HIGHLIGHT PROJECT",
    webp: "/images/p01.webp",
    image: "/images/p01.jpg",
    remoteFallback: "https://i.postimg.cc/fLZ4Mh16/Whats-App-Image-2026-05-02-at-10-44-44-PM.jpg",
    description: "Deep visual immersion into the dense, mist-enshrouded pine canopies of Oslo, capturing the raw majesty and repeating architectural symmetries of conifer clusters.",
    year: "2025",
    aspect: "landscape",
  },
  {
    id: "p-02",
    title: "MIST OVER HORIZON",
    category: "CINEMATIC LANDSCAPE",
    webp: "/images/p02.webp",
    image: "/images/p02.jpg",
    remoteFallback: "https://i.postimg.cc/pTxNPt3w/Whats-App-Image-2026-05-02-at-10-45-22-PM.jpg",
    description: "Low-lying atmospheric fog clinging to dark pine ridges under early morning cold northern exposure.",
    year: "2025",
    aspect: "landscape",
  },
  {
    id: "p-03",
    title: "GLACIAL BASALT FLOW",
    category: "RAW CAPTURE",
    webp: "/images/p03.webp",
    image: "/images/p03.jpg",
    remoteFallback: "https://i.postimg.cc/B6sWJGRR/Whats-App-Image-2026-05-02-at-10-45-51-PM.jpg",
    description: "The velocity of crystalline glacial meltwater cascading down sheer basalt stone pillars.",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "p-04",
    title: "URBAN ELEVATION",
    category: "METROPOLITAN VOIDS",
    webp: "/images/p04.webp",
    image: "/images/p04.jpg",
    remoteFallback: "https://i.postimg.cc/zB5mq14P/Whats-App-Image-2026-05-02-at-10-46-23-PM.jpg",
    description: "A stark study of vertical architectural alignments and brutalist rhythms in metropolitan centers.",
    year: "2025",
    aspect: "portrait",
  },
  {
    id: "p-05",
    title: "RHYTHMIC CURVES // VOLCANIC ROAD",
    category: "ROADS & VISIONS",
    webp: "/images/p05.webp",
    image: "/images/p05.jpg",
    remoteFallback: "https://i.postimg.cc/k49r7dLY/Whats-App-Image-2026-05-02-at-10-46-57-PM.jpg",
    description: "Capturing severe winding highways cutting through the pure, dark ash-rich sands of volcanic expanses.",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "p-06",
    title: "THE BLACK SHORELINE",
    category: "KINETIC SHORES",
    webp: "/images/p06.webp",
    image: "/images/p06.jpg",
    remoteFallback: "https://i.postimg.cc/Y9kctwTd/Whats-App-Image-2026-05-02-at-10-47-31-PM.jpg",
    description: "Stark monochrome coastline textures where the absolute dark of volcanic sand meets violent Atlantic crests.",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "p-07",
    title: "TERRA BOREALIS // SUMMIT",
    category: "GEOLOGICAL SHAPES",
    webp: "/images/p07.webp",
    image: "/images/p07.jpg",
    remoteFallback: "https://i.postimg.cc/26mpCfgw/Whats-App-Image-2026-05-02-at-10-47-39-PM.jpg",
    description: "Expansive patterns of moss-covered plateaus and cold ridges illustrating pure scale.",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "p-08",
    title: "MISTY MONUMENTS",
    category: "ATMOSPHERIC LANDSCAPE",
    webp: "/images/p08.webp",
    image: "/images/p08.jpg",
    remoteFallback: "https://i.postimg.cc/QtsLjrvJ/Whats-App-Image-2026-05-02-at-10-48-07-PM.jpg",
    description: "Ancient stone peaks looming through heavy, low-hanging early-winter cloud formations.",
    year: "2024",
    aspect: "portrait",
  },
  {
    id: "p-09",
    title: "INDUSTRIAL PATTERNS",
    category: "METROPOLITAN GEOMETRY",
    webp: "/images/p09.webp",
    image: "/images/p09.jpg",
    remoteFallback: "https://i.postimg.cc/26mpCfg4/Whats-App-Image-2026-05-02-at-10-49-34-PM.jpg",
    description: "Structural concrete partitions and negative spaces composing clean brutalist frames.",
    year: "2025",
    aspect: "portrait",
  },
  {
    id: "p-10",
    title: "EVERGREEN SILHOUETTE",
    category: "NATURE MINIMALISM",
    webp: "/images/p10.webp",
    image: "/images/p10.jpg",
    remoteFallback: "https://i.postimg.cc/4dZCXTjH/Whats-App-Image-2026-05-02-at-10-50-09-PM.jpg",
    description: "Cold conifer peaks standing sharply outlined against clear, pale sub-zero horizons.",
    year: "2025",
    aspect: "landscape",
  },
  {
    id: "p-11",
    title: "FOSSEN HYDROLOGY",
    category: "KINETIC LANDSCAPE",
    webp: "/images/p11.webp",
    image: "/images/p11.jpg",
    remoteFallback: "https://i.postimg.cc/Ssq0mpHz/Whats-App-Image-2026-05-02-at-10-52-36-PM.jpg",
    description: "A precision high-shutter study isolating free-falling droplets of pure glacial meltwater.",
    year: "2024",
    aspect: "landscape",
  },
  {
    id: "p-12",
    title: "VOLCANIC ROADWAY // PATHWAY",
    category: "ROADS & VISIONS",
    webp: "/images/p12.webp",
    image: "/images/p12.jpg",
    remoteFallback: "https://i.postimg.cc/zB5mq14h/Whats-App-Image-2026-05-02-at-10-54-15-PM.jpg",
    description: "The sharp yellow vector line of a highway cutting through frozen Icelandic lava fields.",
    year: "2024",
    aspect: "portrait",
  },
  {
    id: "p-13",
    title: "MONOCHROME BRUTALISM",
    category: "ARCHITECTURAL STUDY",
    webp: "/images/p13.webp",
    image: "/images/p13.jpg",
    remoteFallback: "https://i.postimg.cc/HxHGTCFc/Whats-App-Image-2026-05-02-at-10-55-45-PM.jpg",
    description: "Heavy concrete shadows composing high-contrast diagonal structures under natural overhead light.",
    year: "2025",
    aspect: "portrait",
  },
  {
    id: "p-14",
    title: "BASALT CATHEDRALS",
    category: "GEOLOGICAL FORMATIONS",
    webp: "/images/p14.webp",
    image: "/images/p14.jpg",
    remoteFallback: "https://i.postimg.cc/Zq6tkqs8/Whats-App-Image-2026-05-02-at-10-56-06-PM.jpg",
    description: "Magnificent hexagonal columns forming natural basalt sea walls along Reynisfjara.",
    year: "2024",
    aspect: "portrait",
  },
  {
    id: "p-15",
    title: "THE ISOLATED PINNACLE",
    category: "ATMOSPHERIC STUDY",
    webp: "/images/p15.webp",
    image: "/images/p15.jpg",
    remoteFallback: "https://i.postimg.cc/vm5FRm2W/Whats-App-Image-2026-05-02-at-10-57-20-PM.jpg",
    description: "An isolated evergreen spear reaching up through thick layer fog layers.",
    year: "2025",
    aspect: "portrait",
  },
  {
    id: "p-16",
    title: "COLD PEAK TRANSITION",
    category: "CINEMATIC LANDSCAPE",
    webp: "/images/p16.webp",
    image: "/images/p16.jpg",
    remoteFallback: "https://i.postimg.cc/Dz1kVzpQ/Whats-App-Image-2026-05-02-at-10-57-45-PM.jpg",
    description: "Cinematic desaturation and cold blue tones draping steep volcanic ridges.",
    year: "2025",
    aspect: "portrait",
  },
  {
    id: "p-17",
    title: "ATMOSPHERIC ISOLATION",
    category: "RAW CAPTURE",
    webp: "/images/p17.webp",
    image: "/images/p17.jpg",
    remoteFallback: "https://i.postimg.cc/nLqb8LSY/Whats-App-Image-2026-05-05-at-6-53-00-PM.jpg",
    description: "The chilling still air of mountain valleys cloaked in heavy low clouds.",
    year: "2026",
    aspect: "landscape",
  },
  {
    id: "p-18",
    title: "ELEVATED PERSPECTIVE",
    category: "MOUNTAIN VOYAGE",
    webp: "/images/p18.webp",
    image: "/images/p18.jpg",
    remoteFallback: "https://i.postimg.cc/hGVWFGZJ/Whats-App-Image-2026-05-05-at-7-29-37-PM.jpg",
    description: "Distant ridges and mountain contours dissolving softly into the high atmospheric twilight.",
    year: "2026",
    aspect: "square",
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
      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 z-50 flex justify-between items-center bg-[#f4f2e9]/90 backdrop-blur-md border-b border-black/5">
        <Link 
          to="/" 
          className="flex items-center gap-2 md:gap-3 group px-3.5 py-2 md:px-4 md:py-2 bg-white hover:bg-black hover:text-[#f4f2e9] rounded-full border border-black/5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.15em] md:tracking-[0.2em]"
        >
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>[ <span className="hidden md:inline">BACK TO CORE </span>INDEX ]</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] bg-black/5 px-4 py-2 rounded-full border border-black/5">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>PORTAL SEC-04 // DEEP DIVE</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[95vw] mx-auto px-4 md:px-12 lg:px-16 pt-24 md:pt-40 pb-24 space-y-16 md:space-y-24">
        
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
              <h1 className="text-[clamp(36px,8vw,120px)] font-black leading-[0.85] tracking-tight uppercase">
                ARJAV<br />
                <span className="text-accent italic font-display">MENON</span>
              </h1>
            </motion.div>
          </div>

          {/* Left bio column */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="relative group overflow-hidden rounded-2xl border border-black/10 shadow-2xl aspect-[4/5] max-h-[55vh] md:max-h-none bg-black">
              <OptimizedImage 
                webpSrc="/images/mee.webp"
                src="/images/mee.png"
                fallbackSrc="https://i.postimg.cc/jSRYZTB0/mee.png"
                alt="Arjav Menon" 
                priority={true}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[8px] bg-black text-[#F5F2EB] px-3 py-1 uppercase tracking-widest border border-white/10 rounded-md z-10">
                DIRECTOR_REF_01
              </div>
            </div>
            <div className="flex justify-between font-mono text-[9px] text-black/40 px-1">
              <span>UAE RESIDENCY // DUBAI</span>
              <span>EST. STATUS: UNLOCKED</span>
            </div>
          </div>

          {/* Right bio column */}
          <div className="col-span-12 lg:col-span-7 w-full px-4 sm:px-6 md:px-8 lg:px-0 flex flex-col justify-between h-full py-2 space-y-8 text-center items-center">
            <div className="space-y-6 md:space-y-8 w-full max-w-2xl mx-auto">
              <h2 className="text-xl md:text-4xl font-display font-bold tracking-tight text-black leading-tight text-center">
                Operating at the intersection of stark visuals, atmospheric acoustics, and digital logic.
              </h2>
              <div className="space-y-4 text-xs md:text-base text-black/70 leading-relaxed font-light text-center">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-black/10 font-mono text-[9px] md:text-[10px] w-full text-center">
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest text-[8px] md:text-[9px]">ART DIRECTION</div>
                <div className="text-xs md:text-sm font-black text-black mt-1">CINEMATIC SCALES</div>
              </div>
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest text-[8px] md:text-[9px]">ACOUSTIC STUDY</div>
                <div className="text-xs md:text-sm font-black text-black mt-1">MODULAR SYNTH</div>
              </div>
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest text-[8px] md:text-[9px]">FILMMAKING</div>
                <div className="text-xs md:text-sm font-black text-black mt-1">8K DIRECTED RAW</div>
              </div>
              <div>
                <div className="font-bold text-black/40 uppercase tracking-widest text-[8px] md:text-[9px]">DEVELOPMENT</div>
                <div className="text-xs md:text-sm font-black text-black mt-1">TYPESCRIPT VITE</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PHOTOGRAPHY SECTION */}
        <div className="space-y-12 pt-6">
          
          <div className="text-left space-y-4 border-b border-black/10 pb-8">
            <h2 className="text-[clamp(36px,8vw,120px)] font-black leading-[0.8] tracking-tighter uppercase font-display">
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

          {/* Oslo Expedition - Highlight Spotlight Project Card */}
          <div 
            onClick={() => setSelectedPhoto(archivePhotos[0])}
            className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-black/10 shadow-2xl bg-black aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/10] min-h-[350px] md:min-h-[480px] cursor-zoom-in"
          >
            <OptimizedImage 
              webpSrc={archivePhotos[0].webp}
              src={archivePhotos[0].image}
              fallbackSrc={archivePhotos[0].remoteFallback}
              alt={archivePhotos[0].title}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-102"
              priority={true}
            />
            {/* Subtle light leak style overlay */}
            <div className="absolute inset-0 bg-[#f9b934]/5 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            
            {/* Spotlight Annotations */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left z-10 pointer-events-none">
              <div className="space-y-2 max-w-xl text-white">
                <div className="font-mono text-[9px] text-[#f9b934] uppercase tracking-[0.3em] bg-[#f9b934]/10 border border-[#f9b934]/20 px-3 py-1 rounded-md inline-block">
                  HIGHLIGHT PROJECT
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight leading-none text-white break-words">
                  {archivePhotos[0].title}
                </h3>
                <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed hidden sm:block">
                  {archivePhotos[0].description}
                </p>
              </div>

              {/* Explore Detail yellow button */}
              <button className="px-5 py-2.5 md:px-8 md:py-4 bg-[#f9b934] hover:bg-white text-black font-mono font-black text-[8px] md:text-[10px] tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 shrink-0 pointer-events-auto">
                <span>EXPLORE DETAIL</span>
              </button>
            </div>
          </div>

          {/* Interactive Marquee banner */}
          <div className="w-full overflow-hidden py-4 md:py-8 border-y border-black/10 flex relative bg-[#ebe7d9]/30">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex whitespace-nowrap text-2xl md:text-6xl font-display font-black text-[#f9b934] tracking-[0.15em] uppercase gap-6 md:gap-12"
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

          {/* Glide Media Stream of Landscape & Portrait works */}
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
                className={`flex gap-4 sm:gap-8 overflow-x-auto pb-8 sm:pb-12 snap-x scroll-touch scrollbar-hide select-none relative z-10 overscroll-x-contain ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
              >
                {archivePhotos.map((photo, i) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      if (!isDragging) {
                        setSelectedPhoto(photo);
                      }
                    }}
                    onMouseUp={() => handleMouseUp(photo)}
                    className={`snap-start sm:snap-center shrink-0 flex flex-col space-y-3 sm:space-y-4 group/photo pointer-events-auto cursor-pointer ${
                      photo.aspect === "landscape" 
                        ? "w-[260px] sm:w-[320px] md:w-[453px]" 
                        : photo.aspect === "portrait" 
                        ? "w-[175px] sm:w-[210px] md:w-[255px]" 
                        : "w-[210px] sm:w-[260px] md:w-[340px]"
                    }`}
                  >
                    {/* Photo Frame with dynamic aspect ratio */}
                    <div className={`relative overflow-hidden bg-black border border-black/10 rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-500 group-hover/photo:shadow-[0_15px_40px_rgba(249,185,52,0.15)] h-[190px] sm:h-[240px] md:h-[340px] w-full ${
                      photo.aspect === "landscape" 
                        ? "aspect-[4/3]" 
                        : photo.aspect === "portrait" 
                        ? "aspect-[3/4]" 
                        : "aspect-square"
                    }`}>
                      <OptimizedImage
                        webpSrc={photo.webp}
                        src={photo.image}
                        fallbackSrc={photo.remoteFallback}
                        alt={photo.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/photo:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-[#f9b934]/5 mix-blend-overlay pointer-events-none" />
                      
                      {/* Corner Expand Hint */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center sm:opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 z-10">
                        <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                      </div>

                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 font-mono text-[7.5px] sm:text-[8px] bg-black text-[#F5F2EB] px-2.5 sm:px-3 py-1 uppercase tracking-widest border border-white/10 rounded-md z-10">
                        PLATE 0{i + 1} // AVW_RAW
                      </div>
                    </div>

                    {/* Photo Details */}
                    <div className="space-y-1 sm:space-y-1.5 px-1 text-left w-full">
                      <div className="flex justify-between items-center text-[8.5px] sm:text-[9px] font-mono">
                        <span className="text-[#f9b934] font-black tracking-widest uppercase truncate max-w-[130px]">{photo.category}</span>
                        <span className="text-black/40 font-bold">{photo.year}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-tight text-black truncate">
                        {photo.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-black/60 font-light leading-relaxed line-clamp-2">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual indicator lines */}
              <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-black/5 font-mono text-[8px] sm:text-[9px] text-black/40">
                <span>← SWIPE TO BROWSE 18+ PLATES →</span>
                <span className="hidden sm:inline animate-pulse">ONLINE ARCHIVE PIPELINE ESTABLISHED // OPTICAL EXTREME</span>
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
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto"
            style={{
              paddingTop: 'calc(1rem + env(safe-area-inset-top))',
              paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))'
            }}
          >
            {/* Close trigger boundary */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedPhoto(null)} />

            {/* Left controller (hidden on very small screens, visible on tablet/desktop) */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
              className="hidden sm:flex absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 items-center justify-center text-white transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              aria-label="Previous plate"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right controller */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
              className="hidden sm:flex absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 items-center justify-center text-white transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              aria-label="Next plate"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Top Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/20 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer z-30 shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Core Card */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full flex flex-col gap-3 sm:gap-5 z-10 pointer-events-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Aspect frame */}
              <div className="w-full bg-[#0d0d0d] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl max-h-[52vh] sm:max-h-[60vh] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                <OptimizedImage
                  webpSrc={selectedPhoto.webp}
                  src={selectedPhoto.image}
                  fallbackSrc={selectedPhoto.remoteFallback}
                  alt={selectedPhoto.title}
                  priority={true}
                  containerClassName="max-w-full max-h-[48vh] sm:max-h-[55vh] flex items-center justify-center"
                  className="max-w-full max-h-[48vh] sm:max-h-[55vh] object-contain select-none pointer-events-none rounded-lg sm:rounded-xl"
                />
              </div>

              {/* Mobile Next/Prev Pill Bar */}
              <div className="flex sm:hidden justify-between items-center px-1">
                <button
                  onClick={() => navigateLightbox("prev")}
                  className="px-4 py-2 bg-white/10 active:bg-white/20 rounded-full text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/15"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>PREV</span>
                </button>

                <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">
                  {archivePhotos.findIndex(p => p.id === selectedPhoto.id) + 1} / {archivePhotos.length}
                </span>

                <button
                  onClick={() => navigateLightbox("next")}
                  className="px-4 py-2 bg-white/10 active:bg-white/20 rounded-full text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/15"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Annotation Plaque below image */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 text-white/95 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl text-left">
                <div className="space-y-1 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[8.5px] sm:text-[10px]">
                    <span className="text-[#f9b934] font-black tracking-widest">{selectedPhoto.category}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40">YEAR: {selectedPhoto.year}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40">REF: {selectedPhoto.id}</span>
                  </div>
                  <h3 className="text-base sm:text-xl md:text-2xl font-display font-black uppercase tracking-tight text-white leading-snug">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                </div>
                <div className="hidden sm:block font-mono text-[8.5px] sm:text-[9px] text-white/40 tracking-[0.25em] uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
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
