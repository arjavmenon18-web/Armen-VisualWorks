import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden pt-20"
    >
      {/* Background Decorative Element */}
      <motion.div
        id="hero-bg-text"
        style={{ y: y1 }}
        className="absolute top-1/4 -left-20 text-[20vw] font-black text-ink/[0.03] whitespace-nowrap pointer-events-none select-none"
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
            <h1 className="text-[clamp(64px,18vw,140px)] leading-[0.8] font-black tracking-tighter uppercase mb-8 md:mb-12">
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

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <div className="w-14 h-14 rounded-full border border-ink flex items-center justify-center cursor-pointer hover:bg-ink hover:text-bg transition-all">
                <ArrowDown className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-ink">Scroll to Explore</span>
            </motion.div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 relative mt-12 lg:mt-0 lg:ml-auto">
          <motion.div
            id="hero-image-container"
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "circOut" }}
            className="relative z-10 w-full max-w-[480px]"
          >
            {/* Main Card - Update to Link and remove text */}
            <Link to="/about-me" className="block w-full aspect-[4/5] bg-ink rounded-[48px] shadow-2xl overflow-hidden relative group">
              {/* Clean Picture Background */}
              <img 
                src="https://i.postimg.cc/jSRYZTB0/mee.png" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
                alt="About me"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md">
                 <motion.span 
                   initial={{ y: 10, opacity: 0 }}
                   whileHover={{ y: 0, opacity: 1 }}
                   className="text-white text-[10px] uppercase font-bold tracking-[0.5em] border border-white/20 px-8 py-4 rounded-full"
                 >
                   View Profile :)
                 </motion.span>
              </div>
            </Link>

            {/* Floating Accent Shape */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent rounded-full blur-[60px] opacity-20" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="uppercase text-[10px] font-bold tracking-[0.5em] text-ink/40">Scroll</span>
        <div className="w-px h-12 bg-ink/10 relative overflow-hidden">
          <motion.div
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
