import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useScrollLightHit } from "../hooks/useScrollLightHit";

export const projects = [
  {
    id: 1,
    title: "URBAN ROAD",
    category: "Road",
    image: "https://i.postimg.cc/nr10Ly2v/Whats-App-Image-2026-05-02-at-10-44-44-PM.jpg",
    description: "A sharp study of verticality and brutalist rhythm within urban structural voids.",
    year: "2024",
    cols: "col-span-12 md:col-span-8",
  },
  {
    id: 2,
    title: "AVIAN HORIZON / ICELAND",
    category: "Landscape",
    image: "https://i.postimg.cc/nr10Ly2q/Whats-App-Image-2026-05-02-at-10-45-22-PM.jpg",
    description: "Capturing the graceful patterns of bird flight across the vast, misty horizons of the North.",
    year: "2023",
    cols: "col-span-12 md:col-span-4",
  },
  {
    id: 3,
    title: "WINDING ARTERY / ICELAND",
    category: "Road",
    image: "https://i.postimg.cc/T1cCPz0g/Whats-App-Image-2026-05-02-at-10-45-51-PM.jpg",
    description: "The rhythmic curves of asphalt cutting through the raw, volcanic textures of the Icelandic highlands.",
    year: "2024",
    cols: "col-span-12 md:col-span-4",
  },
  {
    id: 4,
    title: "TERRA BOREALIS / ICELAND",
    category: "Landscape",
    image: "https://i.postimg.cc/brR3v7gn/Whats-App-Image-2026-05-02-at-10-46-23-PM.jpg",
    description: "An expansive study of the rugged, moss-covered terrains that define the heart of Iceland.",
    year: "2024",
    cols: "col-span-12 md:col-span-8",
  },
  {
    id: 5,
    title: "ONYX SHORE / REYNISFJARA",
    category: "Landscape",
    image: "https://i.postimg.cc/tJz2gKkx/Whats-App-Image-2026-05-02-at-10-46-57-PM.jpg",
    description: "The haunting beauty of black sand meeting the violent, rhythmic waves of the Atlantic.",
    year: "2023",
    cols: "col-span-12 md:col-span-6",
  },
  {
    id: 6,
    title: "FOSSEN FALLS / ICELAND",
    category: "Landscape",
    image: "https://i.postimg.cc/x8Ptdw5N/Whats-App-Image-2026-05-02-at-10-47-31-PM.jpg",
    description: "The cinematic velocity of glacial meltwater plunging into the deep basalt canyons.",
    year: "2024",
    cols: "col-span-12 md:col-span-6",
  },
  {
    id: 7,
    title: "ARCTIC VESTIGE / ICELAND",
    category: "Landscape",
    image: "https://i.postimg.cc/yxTvNMjJ/Whats-App-Image-2026-05-02-at-10-47-39-9-PM.jpg",
    description: "Exploring the ancient, topological layers and raw erosion within the Arctic landscape.",
    year: "2024",
    cols: "col-span-12 md:col-span-12",
  },
  {
    id: 8,
    title: "NORDIC RHYTHM / ICELAND",
    category: "Landscape",
    image: "https://i.postimg.cc/8cbtC24c/Whats-App-Image-2026-05-02-at-10-48-07-PM.jpg",
    description: "Where light meets volume—capturing the sharp, natural angles of contemporary Nordic design.",
    year: "2024",
    cols: "col-span-12 md:col-span-4",
  },
  {
    id: 9,
    title: "UBUD MIST / BALI",
    category: "Landscape",
    image: "https://i.postimg.cc/ZnLVqGHR/Whats-App-Image-2026-05-02-at-10-49-34-PM.jpg",
    description: "Finding tranquility in the humid, ethereal layers of the Balinese jungle at dawn.",
    year: "2024",
    cols: "col-span-12 md:col-span-4",
  },
  {
    id: 10,
    title: "PURA SPIRIT / BALI",
    category: "Landscape",
    image: "https://i.postimg.cc/1XSvsmG6/Whats-App-Image-2026-05-02-at-10-50-09-PM.jpg",
    description: "The imposing weight of sacred silhouettes set against the vibrant skies of Bali.",
    year: "2023",
    cols: "col-span-12 md:col-span-4",
  },
  {
    id: 11,
    title: "SIDEMEN VALLEY / BALI",
    category: "Landscape",
    image: "https://i.postimg.cc/gjpgmzVZ/Whats-App-Image-2026-05-02-at-10-52-36-PM.jpg",
    description: "Vast narratives of green found in the emerald rice terraces and tropical ironwood.",
    year: "2024",
    cols: "col-span-12 md:col-span-7",
  },
  {
    id: 12,
    title: "VERDANT MACRO / BALI",
    category: "Closeup",
    image: "https://i.postimg.cc/QCDfh8QK/Whats-App-Image-2026-05-02-at-10-54-15-PM.jpg",
    description: "The rhythmic alignment of tropical flora and biological patterns in the heart of the island.",
    year: "2024",
    cols: "col-span-12 md:col-span-5",
  },
  {
    id: 13,
    title: "TROPICAL FRAGMENTS / BALI",
    category: "Closeup",
    image: "https://i.postimg.cc/6qKMtWr3/Whats-App-Image-2026-05-02-at-10-55-45-PM.jpg",
    description: "Capturing the intricate, micro-details of Balinese craft and natural erosion.",
    year: "2024",
    cols: "col-span-12 md:col-span-5",
  },
  {
    id: 14,
    title: "ROCK FORMATION",
    category: "Landscape",
    image: "https://i.postimg.cc/T1xtfdVh/Whats-App-Image-2026-05-02-at-10-56-06-PM.jpg",
    description: "Finding the architectural curves within natural landscapes and rock formations.",
    year: "2023",
    cols: "col-span-12 md:col-span-7",
  },
  {
    id: 15,
    title: "TROPIC TEXTURES / BALI",
    category: "Closeup",
    image: "https://i.postimg.cc/Bb3m4STb/Whats-App-Image-2026-05-02-at-10-57-20-PM.jpg",
    description: "A macro study of the raw, breathing surfaces found across the Balinese province.",
    year: "2024",
    cols: "col-span-12 md:col-span-12",
  },
  {
    id: 16,
    title: "GLASS FRAGMENTS",
    category: "Closeup",
    image: "https://i.postimg.cc/yxKLs1m4/Whats-App-Image-2026-05-02-at-10-57-45-PM.jpg",
    description: "Layered perspectives using glass and depth to create complex urban tapestries.",
    year: "2024",
    cols: "col-span-12 md:col-span-12",
  },
];

interface MarqueeProps {
  baseVelocity: number;
}

function Marquee({ baseVelocity = 100 }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${((v + 100) % 100) - 100}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-10 mt-20 border-y border-ink/5">
      <motion.div className="flex whitespace-nowrap flex-nowrap text-[clamp(16px,5vw,120px)] font-black uppercase tracking-tighter leading-none" style={{ x }}>
        <span className="mr-20">INDUSTRIAL • RAW • TEXTURED • </span>
        <span className="mr-20">INDUSTRIAL • RAW • TEXTURED • </span>
        <span className="mr-20">INDUSTRIAL • RAW • TEXTURED • </span>
        <span className="mr-20">INDUSTRIAL • RAW • TEXTURED • </span>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, i, navigate, toggleTitle, hiddenTitles }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isHit = useScrollLightHit(cardRef, isMobile ? 200 : 0, false);

  return (
    <motion.div
      key={project.id}
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: i % 2 * 0.1 }}
      className="group relative will-change-transform"
    >
      <motion.div 
        className="relative rounded-[2.5rem] overflow-hidden bg-ink shadow-2xl transition-all duration-700 aspect-square cursor-pointer z-10 will-change-transform"
        whileHover={{ scale: 1.05, zIndex: 40 }}
        animate={isHit ? { scale: 1.05, zIndex: 40 } : { scale: 1, zIndex: 10 }}
        onClick={() => toggleTitle(project.id)}
        onDoubleClick={() => navigate(`/project/${project.id}`)}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1
        }}
      >
        {/* Image Wrap */}
        <div className="w-full h-full relative">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-1000 ${isHit ? 'grayscale-0 scale-105 opacity-90' : 'grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-60 group-hover:opacity-90'}`}
            referrerPolicy="no-referrer"
          />
          {/* Color Tint Overlay */}
          <div className={`absolute inset-0 bg-accent/5 mix-blend-overlay transition-opacity duration-1000 ${isHit ? 'opacity-0' : 'group-hover:opacity-0'}`} />
          
          {/* Expanded reveal indicator */}
          <div className={`absolute bottom-6 right-6 transition-opacity duration-500 ${isHit ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-[9px] uppercase font-bold tracking-widest text-white">Double Tap</span>
            </div>
          </div>
        </div>

        {/* Info Overlay removed as per user request to avoid overlap */}
      </motion.div>

      {/* Title Outside */}
      <div className={`mt-6 flex justify-between items-start transition-all duration-500 ${isHit ? 'opacity-20' : 'group-hover:opacity-20'} ${hiddenTitles.includes(project.id) ? 'opacity-0 h-0 overflow-hidden mt-0' : 'opacity-100'}`}>
        <div className="flex-1 min-w-0 pr-6">
           <h3 className="text-xs md:text-base font-display font-black leading-tight uppercase tracking-tight break-words">{project.title}</h3>
           <p className="text-[8px] font-bold uppercase tracking-widest text-ink/40 mt-2">{project.category}</p>
        </div>
        <div className="flex flex-col items-end shrink-0 pt-1">
           <span className="text-[9px] font-mono opacity-20">0{project.id}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const navigate = useNavigate();
  const [hiddenTitles, setHiddenTitles] = useState<number[]>([]);

  const toggleTitle = (id: number) => {
    setHiddenTitles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="projects" className="pb-40 pt-0 px-6 lg:px-12 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-12 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start">
            <p className="text-[11px] uppercase tracking-[0.4em] font-bold mb-6 flex items-center justify-center md:justify-start">
              <span className="w-10 h-[1px] bg-ink mr-4"></span> 
              Portfolio
            </p>
            <h2 className="text-[clamp(18px,7vw,80px)] font-black leading-none tracking-tighter uppercase group cursor-default">
              <motion.span 
                initial={{ opacity: 1 }}
                whileHover={{ x: 20, color: "var(--color-accent)" }}
                className="block transition-colors duration-500"
              >
                PHOTO
              </motion.span>
              <motion.span 
                initial={{ opacity: 1 }}
                whileHover={{ x: -20 }}
                className="block text-accent transition-transform duration-500 md:ml-20"
              >
                GRAPHY
              </motion.span>
            </h2>
          </div>
          <div className="pb-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.6em] text-ink/30 mb-2">The Archive Series</p>
            <div className="w-24 h-[2px] bg-accent" />
          </div>
        </div>

        {/* Marquee Section */}
        <div className="mb-40">
          <Marquee baseVelocity={-2} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-24 md:gap-y-32">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.id}
              project={project}
              i={i}
              navigate={navigate}
              toggleTitle={toggleTitle}
              hiddenTitles={hiddenTitles}
            />
          ))}
        </div>

        <div className="mt-40 flex flex-col items-center">
           <div className="w-px h-24 bg-ink/10 mb-12" />
           <button className="group flex flex-col items-center gap-6">
             <span className="text-xs font-bold uppercase tracking-[0.5em] text-ink/40 group-hover:text-accent transition-colors">View All Works</span>
             <div className="w-20 h-20 border border-ink/10 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all transform group-hover:scale-110">
                <ArrowUpRight className="w-8 h-8 group-rotate-0 group-hover:-rotate-45 transition-transform" />
             </div>
           </button>
        </div>
      </div>
    </section>
  );
}

