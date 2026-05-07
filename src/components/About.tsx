import { motion } from "motion/react";
import { useRef } from "react";
import { useScrollLightHit } from "../hooks/useScrollLightHit";

export default function About() {
  const archive1Ref = useRef<HTMLDivElement>(null);
  const archive2Ref = useRef<HTMLDivElement>(null);
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isHit1 = useScrollLightHit(archive1Ref, isMobile ? 200 : 0, false, "Archive 01 (Munich Study)");
  const isHit2 = useScrollLightHit(archive2Ref, isMobile ? 200 : 0, false, "Archive 02 (Copenhagen Study)");

  return (
    <section id="about" className="pt-32 pb-40 px-6 bg-ink text-bg relative overflow-hidden group">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(var(--color-bg) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-32">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              <div className="inline-block px-4 py-1 border border-bg/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
                About the studio
              </div>
              <h2 className="text-[clamp(14px,4.8vw,64px)] font-black leading-[1] tracking-tighter uppercase mb-4 w-full">
                WE BELIEVE IN<br />
                <span className="text-accent italic block w-fit">INTENTIONAL</span>
                DESIGN.
              </h2>
              <p className="text-xl text-bg/60 leading-relaxed max-w-xl">
                Armen VisualWorks is a digital-first creative studio working at the intersection of brand strategy, visual storytelling, and high-performance engineering. We help brands stand out in a noisy world through immersive digital experiences that linger in the memory.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-bg/10">
                <div>
                  <p className="text-4xl font-display font-bold text-accent mb-2">04+</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-bg/40">Years Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-accent mb-2">20</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-bg/40">Projects Delivered</p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="hidden lg:block w-1/2 italic text-bg/10 text-right font-black text-9xl select-none pointer-events-none">
            AESTHETIC<br />PRECISION
          </div>
        </div>

        {/* PHOTOGRAPHY (was THE ARCHIVE SERIES) */}
        <div id="archive-series" className="pt-24 border-t border-bg/5">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 text-center md:text-left">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.4em] font-bold mb-6 flex items-center justify-center md:justify-start text-bg/40">
                <span className="w-10 h-[1px] bg-bg/20 mr-4"></span> 
                Selected Works
              </p>
            <h2 className="text-[clamp(40px,10vw,200px)] font-black leading-[0.7] tracking-[-0.07em] uppercase text-white flex flex-col items-center md:items-start">
              <span className="block opacity-90">ARCHIVE</span>
              <span className="text-accent relative">
                SERIES
                <span className="absolute -bottom-2 right-0 text-[10px] tracking-[0.5em] text-white/20 font-bold hidden md:block">TYPE-DOC.01</span>
              </span>
            </h2>
            <div className="w-full h-[1px] bg-white/10 mt-8 hidden md:block" />
            </div>
            <div className="max-w-xs space-y-6 mb-4">
              <p className="text-sm font-medium text-bg/40 leading-relaxed italic">
                "We don't create templates; we create digital legacies that define the next era of aesthetics."
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-bg/10"></div>
                 <span className="text-[10px] uppercase font-bold tracking-widest text-bg/20">Est. 2018</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <motion.div
            ref={archive1Ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 pt-12 will-change-transform"
          >
            <div className={`rounded-[2.5rem] overflow-hidden aspect-[3/4] transition-[filter,transform] duration-700 force-gpu ${isHit1 ? 'grayscale-0 scale-[1.02]' : 'grayscale hover:grayscale-0 hover:scale-[1.02]'}`}>
               <img
                src="https://i.postimg.cc/TYykr4tV/Archive-01.png"
                alt="Design work"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-bg/5 p-8 rounded-[2rem] border border-bg/5">
              <h4 className="text-lg font-bold mb-2 text-white">Archive - 01</h4>
              <p className="text-sm text-bg/40">A high-contrast architectural study of Munich’s Marienplatz, capturing the sharp intersection of Gothic detail and cinematic atmosphere.</p>
            </div>
          </motion.div>

          <motion.div
            ref={archive2Ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 will-change-transform"
          >
            <div className="bg-accent p-8 rounded-[2rem]">
              <h4 className="text-lg font-bold text-ink mb-2">Archive - 02</h4>
              <p className="text-sm text-ink/70">A study of the Landsoldaten in Copenhagen, capturing the raw, oxidized textures of history against a backdrop of urban industrial growth.</p>
            </div>
            <div className={`rounded-[2.5rem] overflow-hidden aspect-[3/4] transition-[filter,transform] duration-700 force-gpu ${isHit2 ? 'grayscale-0 scale-[1.02]' : 'grayscale hover:grayscale-0 hover:scale-[1.02]'}`}>
               <img
                src="https://i.postimg.cc/wT6NzymX/Archive-02.png"
                alt="Process"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
