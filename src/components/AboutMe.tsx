import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-ink">
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:text-bg transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Back to Work</span>
        </Link>
        <div className="text-xs uppercase font-bold tracking-widest">About me :)</div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-12">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-[clamp(48px,12vw,140px)] font-black leading-[0.8] tracking-tighter uppercase mb-12 md:mb-20"
           >
             About<br />
             <span className="text-accent underline underline-offset-[16px] decoration-accent/20 italic">me :)</span>
           </motion.h1>
        </div>

        <div className="col-span-12 lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="rounded-[3rem] overflow-hidden aspect-[4/5] bg-ink shadow-2xl sticky top-40"
          >
            <img 
              src="https://i.postimg.cc/jSRYZTB0/mee.png" 
              alt="Arjav Menon" 
              className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">The intersection of Art & Logic.</h2>
            <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium">
              I'm Arjav Menon, an independent designer and creative director focused on building high-fidelity digital products. I'm currently a student in Class 11th at Pearl Wisdom School Dubai. My work is defined by a deep curiosity for how aesthetics influence human behavior.
            </p>
            <p className="text-base md:text-lg text-ink/40 leading-relaxed">
              With over 4 years of experience in the industry, I've delivered 20 projects that challenge the norms of grid systems and typography. I believe that every pixel should serve a purpose—whether that's to guide a user through a flow or to evoke a specific emotional response.
            </p>
            <p className="text-base md:text-lg text-ink/40 leading-relaxed">
              I'm currently based in Dubai, UAE, focused on redefining digital presences through strategic design and immersive development.
            </p>
          </motion.div>

          <div className="pt-12 border-t border-ink/5">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-ink/30 mb-4">Core Competencies</p>
              <ul className="space-y-2 font-bold text-sm">
                <li>Art Direction</li>
                <li>Interaction Design</li>
                <li>Full-Stack Engineering</li>
                <li>Motion Design</li>
                <li>Brand Strategy</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-ink/5">
            <p className="text-[10px] uppercase font-bold tracking-widest text-ink/30 mb-8 text-center italic">
              "Design is the silent ambassador of your brand."
            </p>
          </div>
        </div>
      </main>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[1]">
        <div className="absolute inset-y-0 left-12 border-l border-ink h-full" />
        <div className="absolute inset-y-0 right-12 border-r border-ink h-full" />
        <div className="absolute inset-x-0 top-10 border-t border-ink w-full" />
      </div>
    </div>
  );
}
