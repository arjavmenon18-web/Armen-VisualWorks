import { motion } from "motion/react";

interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  subtitle?: string;
  content: string;
  meta?: string;
  tags?: string[];
  span?: string;
}

const newsItems: NewsItem[] = [
  {
    id: "philosophy-01",
    category: "IDENTITY MANIFESTO",
    date: "19.07.2026",
    title: "ON THE NAMING OF ARMEN",
    subtitle: "The deliberate choice of moniker and identity.",
    content: "The name ARMEN—derived from founder Arjav Menon—stands as a seal of creative authorship. Specifically, the formulation of 'Armen - Works' with its deliberate hyphen acts as an architectural spacer, indicating that our horizons are infinitely expandable. While today we craft exclusively in cinema and spatial audio, the hyphen stands ready to link 'Armen' with any physical, digital, or physical domain we choose to conquer in the future.",
    meta: "BY ARJAV MENON // FOUNDER",
    tags: ["NOMENCLATURE", "IDENTITY", "FUTURE"],
    span: "col-span-12 lg:col-span-4"
  },
  {
    id: "filmworks-01",
    category: "AFW // CO-PRODUCTION",
    date: "28.06.2026",
    title: "AFW (ARMEN FILMWORKS) X SWISS FILM COMMISSION",
    subtitle: "Strategic alliance forged for atmospheric European cinematic ventures.",
    content: "Armen FilmWorks (AFW) is proud to announce a landmark strategic partnership with the Swiss Film Commission to co-produce atmospheric cinematic works across Europe. Under this co-production alliance, we are launching our inaugural project reveal: 'The Awakening'—a high-stakes corporate thriller screenplay co-authored with Navaneeth Pramod. Set in the razor-sharp glass corridors of elite financial power, this premier script pipeline bypasses traditional agency latency.",
    meta: "CO-PRODUCED WITH SWISS FILM COMMISSION & NAVANEETH PRAMOD",
    tags: ["SWISS COMMISSION", "THE AWAKENING", "CO-PRODUCTION", "AFW"],
    span: "col-span-12 lg:col-span-8"
  },
  {
    id: "soundworks-01",
    category: "ASW // SIGNAL",
    date: "08.05.2026",
    title: "NOVA: SPATIAL AUDIO REVOLUTION BY ASW",
    subtitle: "The next era of multi-dimensional acoustics and global distribution.",
    content: "Armen SoundWorks (ASW) is proud to unveil NOVA, our flagship spatial audio development ecosystem designed to pioneer three-dimensional acoustic environments. NOVA utilizes specialized vector-based amplitude panning and real-time modular synthesis to deliver immersive sonic architecture. To support this launch, our department is aggressively executing plans to partner with leading digital distributors and streaming platforms, bridging high-fidelity spatial masters directly to global audiences without compression loss.",
    meta: "DEVELOPED BY ASW (ARMEN SOUNDWORKS LABS)",
    tags: ["NOVA", "SPATIAL AUDIO", "ASW", "PARTNERSHIP"],
    span: "col-span-12 lg:col-span-6"
  },
  {
    id: "philosophy-02",
    category: "DESIGN ETHOS",
    date: "28.04.2026",
    title: "THE POWER OF NEGATIVE SPACE",
    subtitle: "Embracing maximum negative space to foster visual authority.",
    content: "True premium visual identity comes from what we leave out. Negative space is not empty space; it is a physical asset that anchors attention and provides layout authority. By utilizing a pristine, highly controlled Cream-White (#f4f2e9) background, we allow each individual structural component to exist on its own merits, resulting in a clean, uncluttered, and deeply memorable reading experience.",
    meta: "STUDIO NOTE #03",
    tags: ["SPACE", "TYPOGRAPHY", "MINIMALISM"],
    span: "col-span-12 lg:col-span-6"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#F5F2EB] text-black border-t border-black/10">
      {/* Colossal Tracked Headline */}
      <div className="w-full border-b border-black/10 overflow-hidden select-none bg-[#F5F2EB] py-16 md:py-24 text-center">
        <span className="text-[10px] font-mono tracking-[0.4em] font-black uppercase text-[#f9b934] mb-3 block">
          [ ARCHIVAL TRANSMISSION FEED ]
        </span>
        <h2 className="text-5xl md:text-8xl font-display font-black tracking-tight text-black uppercase leading-none">
          ARMEN <span className="text-[#f9b934]">NEWZ</span>
        </h2>
        <p className="text-xs font-sans text-black/50 max-w-md mx-auto mt-6 leading-relaxed px-4">
          Philosophical manifestos, design documentation, and production updates from the core ARMEN GLOBALWORKS [AGW] design lab.
        </p>
      </div>

      <div className="max-w-[95vw] mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24">
        {/* Newspaper Sub-Header Plate */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-black/10 pb-4 mb-12 gap-4">
          <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/50">
            CHRONICLE // ISSUE 044 • EURO DEPLOYMENT
          </div>
          <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/50">
            GLOBAL PROPAGATION READY • ALL CHANNELS ACTIVE
          </div>
          <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#f9b934]">
            [ LAST COMPILATION: LIVE ]
          </div>
        </div>

        {/* The Bubbly News Grid */}
        <div className="grid grid-cols-12 gap-8 md:gap-10">
          {newsItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`${item.span} bg-white/40 backdrop-blur-md border border-black/10 rounded-[2.5rem] flex flex-col justify-between shadow-lg hover:shadow-[0_20px_50px_rgba(249,185,52,0.12)] hover:bg-white overflow-hidden transition-colors duration-300`}
            >
              {/* Card Meta Top */}
              <div className="flex items-center justify-between border-b border-black/5 p-8 font-mono text-[9px] font-bold text-black/40 bg-black/[0.01]">
                <span className="uppercase tracking-[0.2em]">{item.category}</span>
                <span className="tracking-[0.1em]">{item.date}</span>
              </div>

              {/* Card Body */}
              <div className="p-10 md:p-14 space-y-6 flex-grow">
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-black leading-tight uppercase">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#f9b934]">
                    {item.subtitle}
                  </p>
                )}
                <p className="text-xs md:text-sm text-black/60 leading-relaxed font-sans pt-2">
                  {item.content}
                </p>
              </div>

              {/* Card Footer */}
              <div className="border-t border-black/5 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[9px] bg-black/[0.01]">
                <span className="font-medium text-black/40 tracking-wider">
                  {item.meta}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="border border-black/10 px-3 py-1 font-bold tracking-widest text-black/60 uppercase rounded-full bg-black/5 text-[8px] hover:bg-[#f9b934]/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid Archival Note */}
        <div className="mt-16 text-center border-b border-t border-black/10 py-4 font-mono text-[9px] tracking-[0.4em] text-black/40 uppercase">
          [ INDEX END // STREAM DE-ENVELOPE // ACTIVE FORWARD CHANNELS ]
        </div>
      </div>
    </section>
  );
}

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
    cols: "col-span-12 md:col-span-4"
  },
  {
    id: 6,
    title: "ARCHIVE_1 // MUNICH",
    category: "Commercial Graphics",
    image: "https://i.postimg.cc/hGK9FYff/Archive-1.png",
    description: "From the original Archive Series representing absolute layout rectitude, premium grid design, and bold typography.",
    year: "2024",
    cols: "col-span-12 md:col-span-4"
  },
  {
    id: 7,
    title: "ARCHIVE_2 // CONCRETE STUDY",
    category: "Commercial Branding",
    image: "https://i.postimg.cc/d0nGJ9ys/Archive-02.png",
    description: "From the original Archive Series capturing spatial visual compositions and hyper-focused structural patterns.",
    year: "2025",
    cols: "col-span-12 md:col-span-8"
  }
];

