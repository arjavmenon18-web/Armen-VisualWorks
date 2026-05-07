import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollLightHit } from "../hooks/useScrollLightHit";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isHit = useScrollLightHit(heroImageRef, isMobile ? 200 : 0, false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-6 overflow-hidden pt-20"
    >
      {/* Background Decorative Element */}
      <motion.div
        id="hero-bg-text"
        style={{ y: y1 }}
        className="absolute top-1/4 -left-20 text-[20vw] font-black text-ink/[0.03] whitespace-nowrap pointer-events-none select-none force-gpu"
      >
        ARMEN VISUALWORKS
      </motion.div>

      <div className="max-w-7xl mx-auto w-full editorial-grid relative z-10">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[11px] uppercase tracking-[0.4em] font-bold mb-6 flex items-center">
              <span className="w-10 h-[1px] bg-ink mr-4"></span> 
              Independent Designer & Director
            </p>
            <h1 className="text-[clamp(20px,8vw,140px)] leading-[0.8] font-black tracking-tighter uppercase mb-8 md:mb-12">
              Arjav<br />
              <span className="text-accent">Menon</span>
            </h1>
          </motion.div>

          <div className="w-full max-w-sm md:max-w-md">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-base md:text-lg leading-[1.4] font-medium text-ink/80 mb-8 md:mb-10"
            >
              Crafting high-end digital experiences for brands that value aesthetic precision and strategic storytelling.
            </motion.p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 relative mt-12 lg:mt-0 lg:ml-auto">
          <motion.div
            id="hero-image-container"
            ref={heroImageRef}
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHit ? { opacity: 1, scale: 1.05 } : { opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 30,
              mass: 1,
              opacity: { duration: 1.2, ease: "circOut" }
            }}
            className="relative z-10 w-full max-w-[480px] will-change-transform"
          >
            {/* Main Card - Update to Link and remove text */}
            <Link to="/about-me" className="block w-full aspect-[4/5] bg-ink rounded-[48px] shadow-2xl overflow-hidden relative group">
              {/* Clean Picture Background */}
              <img 
                src="https://i.postimg.cc/jSRYZTB0/mee.png" 
                className={`w-full h-full object-cover transition-[filter,transform,opacity] duration-1000 ${isHit ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`} 
                alt="About me"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
              />
              
              {/* Image Overlay */}
              <div className={`absolute inset-0 bg-accent/5 mix-blend-overlay transition-opacity duration-1000 ${isHit ? 'opacity-0' : 'group-hover:opacity-0'}`} />

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-ink/40 transition-opacity flex items-center justify-center backdrop-blur-md ${isHit ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                 <motion.span 
                   initial={{ y: 10, opacity: 0 }}
                   animate={isHit ? { y: 0, opacity: 1 } : {}}
                   whileHover={{ y: 0, opacity: 1 }}
                   className="text-white text-[10px] uppercase font-bold tracking-[0.5em] border border-white/20 px-8 py-4 rounded-full"
                 >
                   View Profile :)
                 </motion.span>
              </div>
            </Link>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center gap-4 justify-center md:justify-start force-gpu"
            >
              <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center">
                <ArrowDown className="w-3 h-3 text-accent" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-ink/60">Scroll to Explore</span>
            </motion.div>

            {/* Floating Accent Shape */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent rounded-full blur-[60px] opacity-20" />
          </motion.div>
        </div>
      </div>

      {/* Removed bottom scroll indicator for cleaner UI */}
    </section>
  );
}
