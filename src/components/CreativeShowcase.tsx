import { motion } from "motion/react";

export default function CreativeShowcase() {
  return (
    <section className="py-0 relative overflow-hidden bg-ink h-[80vh] flex items-center">
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <h2 className="text-[20vw] font-black text-white/5 whitespace-nowrap leading-none select-none">
          CREATIVE CREATIVE CREATIVE
        </h2>
      </div>

      <div className="max-w-[95vw] mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative"
        >
          <div className="absolute -inset-8 bg-white/5 blur-2xl opacity-30 animate-pulse" />
          <h2 className="text-[clamp(20px,6vw,90px)] font-black text-bg mb-8 tracking-tighter leading-[0.9]">
            PUSHING<br />THE<br />
            <span className="text-accent underline decoration-white/20 underline-offset-[20px]">LIMITS</span>.
          </h2>
        </motion.div>

        <div className="mt-12 flex gap-4 overflow-hidden mask-fade-edges">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
             className="flex gap-8 whitespace-nowrap force-gpu"
           >
             {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="flex items-center gap-8">
                  <span className="text-3xl md:text-5xl font-display font-black text-white/10 uppercase tracking-tighter">Editorial Design</span>
                  <div className="w-6 h-6 bg-accent rounded-full" />
                  <span className="text-3xl md:text-5xl font-display font-black text-white/10 uppercase tracking-tighter">3D Interaction</span>
                  <div className="w-6 h-6 bg-accent rounded-full" />
                  <span className="text-3xl md:text-5xl font-display font-black text-white/10 uppercase tracking-tighter">Brand Strategy</span>
                  <div className="w-6 h-6 bg-accent rounded-full" />
                </div>
             ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
}
