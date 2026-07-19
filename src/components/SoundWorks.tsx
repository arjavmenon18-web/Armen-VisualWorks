import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, ExternalLink, Disc } from "lucide-react";
// @ts-ignore
import aadhyaCover from "../assets/images/aadhya_cover_1784455915106.jpg";

export default function SoundWorks() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white/90 pt-28 pb-36 font-sans relative overflow-hidden select-none">
      {/* Immersive Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f9b934]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/[0.02] blur-[150px] pointer-events-none" />

      {/* Top Header Navigation Line */}
      <div className="fixed top-0 inset-x-0 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 py-6 px-6 md:px-12 flex justify-between items-center z-50">
        <Link 
          to="/"
          className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white hover:text-black rounded-full border border-white/10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white"
        >
          <ArrowLeft className="w-4 h-4 text-white hover:text-black" />
          <span>[ RETURN TO CORE INDEX ]</span>
        </Link>
        <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-white/40 uppercase hidden sm:inline">
          ASW // SOUNDWORKS LAB
        </span>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#f9b934] animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.3em] font-black text-[#f9b934] uppercase">
            STUDIO ENHANCED MUSIC
          </span>
        </div>
      </div>

      <div className="max-w-[95vw] mx-auto px-6 md:px-12 lg:px-16">
        {/* Banner Section */}
        <div className="mb-20 border-b border-white/10 pb-12 pt-8">
          <div className="flex items-center gap-3 text-[#f9b934] mb-4">
            <Disc className="w-5 h-5 animate-spin [animation-duration:15s] text-[#f9b934]" />
            <span className="text-[10px] font-mono font-black tracking-[0.4em] uppercase">SEC-03 // AUDIO MASTERING & RELEASES</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tight text-white leading-none mb-6">
            SOUNDWORKS
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed font-light">
            Armen SoundWorks (ASW) produces high-end foley capture packages, original musical masters, and customized atmospheric film scores. Explore our premier releases and acoustic enhancement services below.
          </p>
        </div>

        {/* ASW Premier Original Releases & Collaboration Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* Left Block: The Debut Release Card (lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#f9b934]/30 to-transparent" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#f9b934]/5 blur-[100px] pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[9px] font-mono tracking-[0.3em] text-[#f9b934] font-black uppercase">
                  ASW // DEBUT STUDIO RELEASE
                </span>
                <span className="text-[9px] font-mono tracking-[0.3em] text-white/40 font-black uppercase">
                  CATALOG: ASW-001
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Album Cover Frame */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#f9b934]/20 blur-xl rounded-2xl group-hover:bg-[#f9b934]/30 transition-all duration-500 opacity-60" />
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-square w-52 h-52 md:w-48 md:h-48 lg:w-56 lg:h-56 shrink-0 cursor-pointer"
                    >
                      <img 
                        src={aadhyaCover} 
                        alt="Aadhya Notathil Cover" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Song Meta Information */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-white leading-none">
                      Aadhya Notathil
                    </h3>
                    <p className="text-base font-serif italic text-[#f9b934] opacity-90 font-light">
                      Memories in the Rain
                    </p>
                  </div>

                  <div className="font-mono text-[10px] space-y-1 text-white/60 tracking-wider">
                    <div>COMPOSER: <span className="text-[#F5F2EB] font-bold">JAYARAJ MENON</span></div>
                    <div>VOCALS: <span className="text-[#F5F2EB] font-bold">JINS GOPINATH</span></div>
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                    Our inaugural studio release, <strong className="text-white font-medium">Aadhya Notathil</strong>, marks the dawn of our original music portfolio. While our signature <strong className="text-white font-medium">NOVA system</strong> remains the dedicated spatializer for film and video, every musical master we produce is crafted and polished using our proprietary studio enhancement models to achieve pristine quality and immense headroom.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-relaxed">
                [ FORMAT: 24-BIT 96KHZ FLAC // ATMOS READY ]
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://open.spotify.com/track/2Gi8GJCsnMhg84esG4VBnh?si=768a66e6b4594b1e"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#1DB954] hover:bg-[#1ed760] text-black font-mono text-xs font-black tracking-widest px-6 py-3 uppercase rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#1DB954]/10"
              >
                <Disc className="w-4 h-4 animate-spin [animation-duration:4s]" />
                <span>LISTEN ON SPOTIFY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Block: Collaboration & Custom Grading Service (lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#f9b934]/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#f9b934]/5 blur-[100px] pointer-events-none" />

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[9px] font-mono tracking-[0.3em] text-[#f9b934] font-black uppercase">
                  ASW // GLOBAL CO-PRODUCTION PIPELINE
                </span>
              </div>

              <div className="space-y-4 text-left">
                <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight text-white leading-none">
                  GRADE YOUR SOUND WITH ARMEN MODELS
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                  Bring your acoustic masterpieces, foley capture packages, or live vocal multitracks to the ASW audio laboratories. 
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                  Our proprietary, class-leading sound enhance models intelligently calibrate, grade, and enrich spatial resonance and frequency dynamics. We preserve maximum headroom while elevating transient definition.
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                  Once finalized, your tracks bypass third-party latency to be distributed loss-free through our global publishing and streaming network.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/#contact"
                className="w-full bg-[#F5F2EB] hover:bg-[#E5E2DB] text-black font-mono text-xs font-black tracking-[0.2em] px-6 py-4 uppercase rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>INITIATE LAB COLLABORATION</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* Acoustic Terminal Footer */}
        <div className="mt-12 text-center border-t border-b border-white/10 py-6 font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">
          [ SYNTHESIS MODULES DEPLOYED SUCCESSFULLY // ASW AUDIO TERMINAL READY ]
        </div>
      </div>
    </div>
  );
}
