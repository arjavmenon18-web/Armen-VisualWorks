import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Maximize2 } from "lucide-react";
import { projects } from "./Projects";
import { useEffect } from "react";

export default function ProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">Project not found</h1>
          <button 
            onClick={() => navigate("/")}
            className="text-accent hover:underline uppercase text-sm font-bold tracking-widest"
          >
            Back to gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ink text-bg selection:bg-accent selection:text-ink"
    >
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-4 text-bg hover:text-accent transition-colors"
        >
          <div className="w-10 h-10 border border-bg/20 rounded-full flex items-center justify-center group-hover:border-accent">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.3em]">Back</span>
        </motion.button>

        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate("/")}
          className="w-10 h-10 border border-bg/20 rounded-full flex items-center justify-center hover:border-accent hover:text-accent transition-all"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </nav>

      {/* Main Content */}
      <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Text Info */}
          <div className="lg:col-span-4 sticky top-40">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-accent font-mono text-sm leading-none">{project.year}</span>
                <div className="w-8 h-[1px] bg-bg/20" />
                <span className="text-bg/40 uppercase text-[10px] font-bold tracking-[0.4em] leading-none">{project.category}</span>
              </div>
              
              <h1 className="text-[clamp(48px,10vw,100px)] font-black tracking-tighter uppercase mb-12 leading-[0.85]">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>

              <div className="space-y-8 max-w-sm">
                <div className="pt-12">
                   <div className="inline-block px-10 py-5 bg-accent text-ink rounded-full text-xs font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                      Scale View
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full Image */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[3rem] overflow-hidden shadow-2xl bg-bg/5"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover min-h-[400px] md:min-h-[600px]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Technical Detail Section (Just aesthetic) */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { label: "ISO", value: "100" },
                 { label: "Lens", value: "35mm Prime" },
                 { label: "Aperture", value: "f/1.8" },
                 { label: "Exposure", value: "1/250s" }
               ].map((spec, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 + (i * 0.1) }}
                   className="p-6 border border-bg/10 rounded-2xl"
                 >
                    <p className="text-[9px] uppercase font-bold tracking-widest text-bg/30 mb-2">{spec.label}</p>
                    <p className="text-xl font-black text-bg/80">{spec.value}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </main>

      {/* Aesthetic Footer Label */}
      <div className="fixed bottom-8 left-12 lg:left-12 opacity-10 pointer-events-none md:rotate-90 origin-left hidden md:block">
        <span className="text-[10px] uppercase font-black tracking-[1em]">Arjav Menon • Visual Series 0{project.id}</span>
      </div>
    </motion.div>
  );
}
