import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Maximize2 } from "lucide-react";
import { projects } from "./Projects";
import { useEffect, useRef } from "react";
import { useScrollLightHit } from "../hooks/useScrollLightHit";

function GalleryItem({ p, i, navigate }: any) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isHit = useScrollLightHit(itemRef, isMobile ? 200 : 0, false);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      onClick={() => {
        navigate(`/project/${p.id}`);
        window.scrollTo(0, 0);
      }}
      className="group relative cursor-pointer will-change-transform"
    >
      <motion.div 
        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden border border-bg/10 transition-[transform,border-color,z-index] duration-500 z-10 relative will-change-transform force-gpu"
        animate={isHit ? { scale: 1.1, rotate: -3, borderColor: "var(--color-accent)", zIndex: 30 } : { scale: 1, rotate: 0, borderColor: "rgba(235, 240, 245, 0.1)", zIndex: 10 }}
        whileHover={{ scale: 1.1, rotate: -3, borderColor: "var(--color-accent)", zIndex: 30 }}
        transition={{ 
          type: "spring",
          stiffness: 150,
          damping: 20
        }}
      >
        <img 
          src={p.image} 
          alt={p.title} 
          className={`w-full h-full object-cover transition-[filter,opacity,transform] duration-700 ${isHit ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105'}`}
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </motion.div>
  );
}

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
      className="min-h-screen bg-ink text-bg"
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
      <main className="pt-24 md:pt-32 pb-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* Project Details (Above Image) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-mono text-sm leading-none">{project.year}</span>
              <div className="w-8 h-[1px] bg-bg/20" />
              <span className="text-bg/40 uppercase text-[10px] font-bold tracking-[0.4em] leading-none">{project.category}</span>
            </div>
            
            <h1 className="text-[clamp(32px,8vw,100px)] font-black tracking-tighter uppercase mb-8 leading-[0.85] break-words">
              {project.title}
            </h1>

            <div className="max-w-2xl">
              <p className="text-bg/70 text-base md:text-xl leading-relaxed font-medium">
                {project.description}
              </p>
            </div>
          </motion.div>

          {/* Full Image and Specs */}
          <div className="space-y-12">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/5 rounded-[2rem] md:rounded-[3rem] p-4 md:p-12 lg:p-16 flex items-center justify-center w-full overflow-hidden"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="max-w-full max-h-[40vh] md:max-h-[60vh] lg:max-h-[75vh] w-auto h-auto object-contain block mx-auto rounded-xl md:rounded-[2rem] shadow-2xl transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Technical Detail Section (Just aesthetic) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
               {[
                 { label: "ISO", value: "100" },
                 { label: "Lens", value: "35mm Prime" },
                 { label: "Aperture", value: "f/1.8" },
                 { label: "Exposure", value: "1/250s" }
               ].map((spec, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 + (i * 0.1) }}
                   className="p-5 md:p-8 border border-bg/5 rounded-2xl bg-white/[0.03] backdrop-blur-sm"
                 >
                    <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-bg/30 mb-2">{spec.label}</p>
                    <p className="text-base md:text-2xl font-black text-bg/80 leading-none">{spec.value}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>

        {/* Quick Access Gallery */}
        <div className="mt-40 border-t border-bg/10 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4">Quick Access</p>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Explore More</h2>
            </div>
            <button 
              onClick={() => navigate("/")}
              className="text-[10px] uppercase font-bold tracking-widest text-bg/40 hover:text-accent transition-colors"
            >
              Back to main index — [ESC]
            </button>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
            {projects
              .filter(p => p.id !== project.id)
              .map((p, i) => (
                <GalleryItem key={p.id} p={p} i={i} navigate={navigate} />
              ))}
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
