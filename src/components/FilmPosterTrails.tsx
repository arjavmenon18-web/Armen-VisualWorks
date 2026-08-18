import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, ArrowUpRight, Clapperboard, Maximize2, Compass, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

export interface FilmPoster {
  id: string;
  trailCode: string;
  title: string;
  subtitle: string;
  tag: string;
  year: string;
  webp: string;
  image: string;
  fallbackSrc: string;
  conceptDesign: string;
  styleApproach: string;
  division: string;
  aspectRatio: string;
  printSpec: string;
  description: string;
  palette: string[];
  billingBlock: string;
}

export const filmPosters: FilmPoster[] = [
  {
    id: "trail-01",
    trailCode: "TRAIL 01 // SAVANNAH EPIC",
    title: "THE PRIDE",
    subtitle: "ARMEN PRODUCTIONWORKS // FICTIONAL CINEMA EPIC",
    tag: "WILDLIFE CINEMA DRAMA",
    year: "2026",
    webp: "/images/film_trail_01.webp",
    image: "/images/film_trail_01.png",
    fallbackSrc: "https://i.ibb.co/YTXsyz4b/Whats-App-Image-2026-08-18-at-7-38-22-PM.png",
    conceptDesign: "Arjav Menon (Armen VisualWorks)",
    styleApproach: "Naturalistic Golden Hour Lighting & Volumetric Dust Atmosphere",
    division: "AVW // KEY ART DIRECTION",
    aspectRatio: "2:3 Theatrical One-Sheet (1024 × 1536)",
    printSpec: "Archival Metallic Luster on 310gsm Cotton Rag with 35mm Micro-Grain",
    description: "A cinematic key art exploration for the fictional wildlife drama 'The Pride'. Depicts a battle-worn male lion resting on the savannah floor with piercing golden eyes, backlit by the setting sun with pride sentinels on distant rock ridges. Built around dramatic volumetric lighting, drifting embers, and disciplined theatrical typography.",
    palette: ["#E5A93C", "#7C4A1E", "#2B1A0E", "#0B0704"],
    billingBlock: "ARMEN PRODUCTIONWORKS IN ASSOCIATION WITH ARMEN SOUNDWORKS • 'THE PRIDE' • FICTIONAL CONCEPT BY ARMEN VISUALWORKS • ART DIRECTION BY ARJAV MENON • COMING SOON"
  },
  {
    id: "trail-02",
    trailCode: "TRAIL 02 // ABYSSAL SCI-FI",
    title: "THE DEPTHS",
    subtitle: "ARMEN PRODUCTIONWORKS // FICTIONAL SCI-FI THRILLER",
    tag: "NAUTICAL SCI-FI THRILLER",
    year: "2026",
    webp: "/images/film_trail_02.webp",
    image: "/images/film_trail_02.png",
    fallbackSrc: "https://i.ibb.co/nqPMVVVC/Chat-GPT-Image-Aug-18-2026-07-27-27-PM.png",
    conceptDesign: "Arjav Menon (Armen VisualWorks)",
    styleApproach: "Abyssal Cyan Lighting, Bioluminescent Dust & Sculpted Serif Carving",
    division: "AVW // KEY ART DIRECTION",
    aspectRatio: "2:3 Theatrical One-Sheet (1024 × 1536)",
    printSpec: "Deep Matte Indigo Pigment Print with Spot High-Gloss Resin on Title Typography",
    description: "An atmospheric teaser poster for 'The Depths'—a fictional underwater sci-fi thriller. Features chiseled, serif-carved display typography emerging from the dark oceanic abyss, surrounded by submerged planetary contours, bioluminescent particulates, and high-contrast cerulean textures.",
    palette: ["#6CB6D8", "#1E475A", "#0B1D28", "#03080D"],
    billingBlock: "ARMEN PRODUCTIONWORKS IN ASSOCIATION WITH ARMEN SOUNDWORKS • 'THE DEPTHS' • FICTIONAL CONCEPT BY ARMEN VISUALWORKS • SOUND DESIGN ARMEN SOUNDWORKS • COMING SOON"
  }
];

export default function FilmPosterTrails() {
  const [selectedPoster, setSelectedPoster] = useState<FilmPoster | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="mt-36 border-t border-white/10 pt-20 relative">
      {/* Section Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#f9b934]/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span className="w-6 h-[1px] bg-accent/40 inline-block" />
            <span>AVW // EXPERIMENTAL POSTER LAB</span>
          </div>

          <h2 className="text-[clamp(32px,6vw,68px)] font-black leading-[0.9] tracking-tighter uppercase font-display text-white">
            FILM POSTER <span className="text-accent">TRAILS</span>
          </h2>

          <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
            While Armen VisualWorks is primarily dedicated to strategic brand identity, this section is all about trying different things—an alternative creative approach exploring fictional poster designs and experimental visual concepts for cinema.
          </p>
        </div>

        {/* Division Badge */}
        <div className="flex items-center gap-3 bg-[#121212] px-5 py-2.5 rounded-full border border-white/10">
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span className="font-mono text-[10px] font-bold tracking-widest text-white/70 uppercase">
            2 EXPERIMENTAL TRAILS
          </span>
        </div>
      </div>

      {/* 2-Column Primary Film Posters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {filmPosters.map((poster, index) => (
          <motion.div
            key={poster.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            onClick={() => {
              setSelectedPoster(poster);
              setIsZoomed(false);
            }}
            className="group relative bg-[#111111]/90 rounded-3xl border border-white/10 hover:border-accent/50 p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_rgba(249,185,52,0.15)] transition-all duration-500 cursor-pointer"
          >
            {/* Top Card Badge */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-[10px] font-black uppercase text-accent tracking-widest">
                {poster.trailCode}
              </span>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                {poster.tag}
              </span>
            </div>

            {/* Poster Image Frame - Crystal Clear with Zero Dimming */}
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center group-hover:border-accent/50 transition-colors shadow-inner">
              <OptimizedImage
                webpSrc={poster.webp}
                src={poster.image}
                fallbackSrc={poster.fallbackSrc}
                alt={poster.title}
                priority={true}
                containerClassName="w-full h-full flex items-center justify-center bg-black"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              
              {/* Quick Inspect Floating Overlay */}
              <div className="absolute bottom-5 right-5 bg-black/90 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-[9px] font-mono font-bold uppercase tracking-widest text-accent shadow-2xl">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>INSPECT BLUEPRINT</span>
              </div>
            </div>

            {/* Poster Info Footer */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                  {poster.title}
                </h3>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  {poster.year}
                </span>
              </div>

              <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed">
                {poster.description}
              </p>

              {/* Design context banner */}
              <div className="bg-black/50 rounded-xl p-3 border border-white/5 font-mono text-[9px] text-white/60 space-y-1">
                <div className="flex justify-between">
                  <span className="text-white/40">DESIGN LEAD:</span>
                  <span className="text-white font-bold">{poster.conceptDesign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">STYLE APPROACH:</span>
                  <span className="text-white font-bold">{poster.styleApproach}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/40">
                <span>{poster.division}</span>
                <span className="text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 font-bold">
                  EXPAND SPECS <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Poster Inspection Modal with Full Zoom Support */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] overflow-y-auto px-4 sm:px-6 py-8 md:py-14 flex justify-center items-start cursor-zoom-out"
            onClick={() => {
              setSelectedPoster(null);
              setIsZoomed(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className={`w-full ${isZoomed ? 'max-w-7xl' : 'max-w-5xl'} bg-[#0F0F0F] text-[#F5F2EB] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl cursor-default transition-all duration-500`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 md:px-8 py-5 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <Clapperboard className="w-4 h-4 text-accent" />
                  <span className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-white/70">
                    [ FICTIONAL FILM POSTER TRAIL // REF: {selectedPoster.trailCode} ]
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {isZoomed ? <ZoomOut className="w-3.5 h-3.5 text-accent" /> : <ZoomIn className="w-3.5 h-3.5 text-accent" />}
                    <span>{isZoomed ? "DEFAULT VIEW" : "FULL RES 100% ZOOM"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPoster(null);
                      setIsZoomed(false);
                    }}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group text-white"
                  >
                    <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className={`grid grid-cols-1 ${isZoomed ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-8 p-6 md:p-10 items-start`}>
                {/* Left: Poster View - Completely Unobstructed Crystal Clarity */}
                <div className={`${isZoomed ? 'lg:col-span-8' : 'lg:col-span-6'} flex flex-col items-center justify-center transition-all duration-500`}>
                  <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl group flex items-center justify-center">
                    <OptimizedImage
                      webpSrc={selectedPoster.webp}
                      src={selectedPoster.image}
                      fallbackSrc={selectedPoster.fallbackSrc}
                      alt={selectedPoster.title}
                      priority={true}
                      containerClassName="w-full h-full flex items-center justify-center bg-black"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Palette Indicators */}
                  <div className="w-full mt-4 flex items-center justify-between px-2">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">COLOR PALETTE MATRIX:</span>
                    <div className="flex items-center gap-2">
                      {selectedPoster.palette.map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Technical Specs & Concept Details */}
                <div className={`${isZoomed ? 'lg:col-span-4' : 'lg:col-span-6'} flex flex-col justify-between space-y-6`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.35em] text-accent font-black uppercase block mb-1">
                        {selectedPoster.tag} // {selectedPoster.year}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white leading-none">
                        {selectedPoster.title}
                      </h2>
                      <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                        {selectedPoster.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-white/80 leading-relaxed font-light">
                      {selectedPoster.description}
                    </p>
                  </div>

                  {/* Metadata Specs Table */}
                  <div className="border-t border-white/10 pt-4 font-mono text-[10px] space-y-2.5 text-white/60">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>CONCEPT LEAD:</span>
                      <span className="font-bold text-white text-right">{selectedPoster.conceptDesign}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>STYLE APPROACH:</span>
                      <span className="font-bold text-white text-right">{selectedPoster.styleApproach}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>STUDIO DIVISION:</span>
                      <span className="font-bold text-accent text-right">{selectedPoster.division}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>RAW RESOLUTION:</span>
                      <span className="font-bold text-white text-right">1024 × 1536 (Lossless)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>PRINT SPECIMEN:</span>
                      <span className="font-bold text-white text-right">{selectedPoster.printSpec}</span>
                    </div>
                  </div>

                  {/* Billing Block */}
                  <div className="bg-black/60 p-4 rounded-xl border border-white/5">
                    <div className="text-[8px] font-mono uppercase tracking-[0.18em] text-white/50 leading-relaxed text-center font-semibold">
                      {selectedPoster.billingBlock}
                    </div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <a
                      href={selectedPoster.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 border border-white/10 text-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-accent" />
                      <span>OPEN UNCOMPRESSED MASTER IN NEW TAB</span>
                    </a>

                    <button
                      onClick={() => {
                        setSelectedPoster(null);
                        setIsZoomed(false);
                      }}
                      className="w-full py-3.5 bg-white hover:bg-accent text-black font-mono font-black text-[10px] tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 cursor-pointer text-center"
                    >
                      [ RETURN TO FILM POSTER TRAILS ]
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
