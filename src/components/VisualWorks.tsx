import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Camera, Sparkles, X, Eye, Box, FileText, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import OptimizedImage from "./OptimizedImage";
import FilmPosterTrails from "./FilmPosterTrails";

const archiveProjects = [
  {
    id: "v-01",
    title: "Archive - 01",
    subtitle: "MUNICH // MARIENPLATZ",
    category: "COMMERCIAL GRAPHIC",
    year: "2024",
    webp: "/images/archive_01.webp",
    image: "/images/archive_01.png",
    remoteFallback: "https://i.postimg.cc/hGK9FYff/Archive-1.png",
    description: "A high-contrast architectural study of Munich's Marienplatz, capturing the sharp intersection of Gothic detail and cinematic atmosphere.",
    client: "Armen VisualWorks (Munich Division)",
    duration: "3 Months",
    output: "Limited Edition Screenprints",
    location: "MUNICH, DE"
  },
  {
    id: "v-02",
    title: "Archive - 02",
    subtitle: "COPENHAGEN // LANDSOLDATEN",
    category: "COMMERCIAL BRANDING",
    year: "2025",
    webp: "/images/archive_02.webp",
    image: "/images/archive_02.png",
    remoteFallback: "https://i.postimg.cc/d0nGJ9ys/Archive-02.png",
    description: "A study of the Landsoldaten in Copenhagen, capturing the raw, oxidized textures of history against a backdrop of urban industrial growth.",
    client: "Armen VisualWorks (Copenhagen Division)",
    duration: "4 Months",
    output: "Laser-Engraved Slate Plates",
    location: "COPENHAGEN, DK"
  }
];

export default function VisualWorks() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Private Brand Registry States
  const [brandName, setBrandName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [campaignObjective, setCampaignObjective] = useState("Promotional Content Suite");
  const [brandMessage, setBrandMessage] = useState("");
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const handleRegisterBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !brandEmail) return;

    // Construct structured message body including the Brand Name and Brand Email
    const structuredMessage = `[PRIVATE BRAND REGISTRY INQUIRY]\nBrand/Enterprise Name: ${brandName}\nBrand Contact Email: ${brandEmail}\nPrimary Campaign Objective: ${campaignObjective}\n\nBrief Specs / Desired Deliverables:\n${brandMessage || "None provided"}`;

    // Construct query parameters - Only setting message so Name & Email fields in Contact can be filled by the actual user
    const params = new URLSearchParams();
    params.set("message", structuredMessage);

    // Redirect to home and scroll to contact
    navigate(`/?${params.toString()}#contact`);
  };

  return (
    <div 
      className="min-h-screen bg-[#0A0A0A] text-[#F5F2EB] pt-28 pb-36 font-sans select-none relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
        backgroundSize: "24px 24px"
      }}
    >
      {/* Top Header Navigation Line */}
      <div className="fixed top-0 inset-x-0 bg-black/90 backdrop-blur-md border-b border-white/10 py-6 px-6 md:px-12 flex justify-between items-center z-50">
        <Link 
          to="/"
          className="flex items-center gap-3 px-4 py-2 bg-[#121212] hover:bg-[#F5F2EB] hover:text-black rounded-full border border-white/10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-[#F5F2EB]"
        >
          <ArrowLeft className="w-4 h-4 text-accent" />
          <span>[ RETURN TO CORE INDEX ]</span>
        </Link>
        <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-white/40 uppercase hidden sm:inline">
          ARMEN VISUALWORKS [AVW] // CORE ARCHIVE
        </span>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.3em] font-black text-accent uppercase">
            STAGE 02 ACTIVE
          </span>
        </div>
      </div>

      <div className="max-w-[95vw] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Banner Section - Redesigned to match Screenshot 4 perfectly */}
        <div className="mb-24 border-b border-white/10 pb-16 pt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-white/20 inline-block"></span>
              <span>SELECTED WORKS</span>
            </div>
            
            <h1 className="text-[clamp(44px,11vw,130px)] font-black leading-[0.8] tracking-tighter uppercase font-display flex flex-col">
              <span>ARCHIVE</span>
              <span className="text-[#f9b934]">SERIES</span>
            </h1>
            <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mt-3 uppercase">TYPE-DOC.01</div>
          </div>
          
          <div className="md:col-span-5 md:pt-16 flex flex-col items-start md:items-end text-left md:text-right space-y-4">
            <p className="italic text-white/60 text-sm md:text-base leading-relaxed max-w-sm font-light">
              "We don't create templates; we create digital legacies that define the next era of aesthetics."
            </p>
            <div className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">EST. 2022</div>
          </div>
        </div>

        {/* Dynamic Alternating Archive Cards - Matching Screenshot 5 & 6 */}
        <div className="space-y-28">
          {archiveProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Text Info Block - alternating layout on desktop */}
                <div className={`lg:col-span-5 flex flex-col justify-between bg-[#111111]/90 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#f9b934]/5 blur-[60px] pointer-events-none" />
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="font-mono text-[10px] font-black uppercase text-accent tracking-widest">
                        {project.title}
                      </span>
                      <span className="font-mono text-[10px] text-white/40">
                        {project.year}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-sm font-mono tracking-widest text-white/40 uppercase">
                        {project.subtitle}
                      </h2>
                      <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Table */}
                  <div className="border-t border-white/5 pt-6 mt-8 font-mono text-[10px] space-y-2 text-white/60">
                    <div className="flex justify-between">
                      <span>LOCATION:</span>
                      <span className="text-white font-bold">{project.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DIVISION:</span>
                      <span>AVW ARCHIVE SEC</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SPECS:</span>
                      <span className="text-accent">DCI-P3 TRUE COLOR</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-[#f9b934] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>LAUNCH DETAILED BLUEPRINTS</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Poster Image Card */}
                <div 
                  className={`lg:col-span-7 relative group border border-white/10 overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 lg:p-12 aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[400px] rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(249,185,52,0.15)] cursor-zoom-in ${!isEven ? 'lg:order-1' : ''}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <OptimizedImage
                    webpSrc={project.webp}
                    src={project.image}
                    fallbackSrc={project.remoteFallback}
                    alt={project.title}
                    containerClassName="max-w-full max-h-full flex items-center justify-center"
                    className="max-w-full max-h-full object-contain transition-all duration-1000 group-hover:scale-102"
                  />
                  {/* Subtle ambient light gradient overlay */}
                  <div className="absolute inset-0 bg-[#f9b934]/5 mix-blend-overlay pointer-events-none rounded-3xl" />
                  
                  {/* Label in corner matching the original screen styling */}
                  <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md text-[#F5F2EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest border border-white/10 rounded-lg z-10">
                    {project.title} // {project.location}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Film Poster Trails Section */}
        <FilmPosterTrails />

        {/* Commercial Works / Private Brand Registry Section - Styled to match the elite dark look */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-40 bg-[#111111]/90 rounded-[2.5rem] border border-white/10 p-8 md:p-12 lg:p-14 shadow-2xl max-w-5xl mx-auto space-y-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="border-b border-white/5 pb-6">
            <div className="flex items-center gap-3 text-accent mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono font-black tracking-[0.3em] uppercase">REGISTRY SEC-04 // CONFIDENTIAL PARTNERSHIPS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              PRIVATE BRAND REGISTRY
            </h2>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mt-2">
              Bespoke Asset Synthesis & Mass Campaign Distribution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6 font-sans text-sm text-white/70 leading-relaxed font-light">
              <p>
                A significant portion of our elite commercial assignments, corporate film packages, and spatial visual blueprints remain <strong className="text-white font-semibold">strictly private</strong> under non-disclosure agreements (NDAs) to safeguard exclusive market placement.
              </p>
              <p>
                We do not just compile aesthetics—we build campaigns that dominate. By registering your brand with Armen GlobalWorks [AGW], our studio will craft highly targeted <strong className="text-white font-semibold">promotional content</strong> and distribute it through elite global channels to ensure your message <strong className="text-white font-semibold">reaches the masses</strong> with maximum strategic velocity.
              </p>
              <div className="border-t border-white/10 pt-6 space-y-3 font-mono text-[9px] uppercase tracking-wider text-white/40">
                <div>[ REGISTRATION PERKS ]</div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-accent">•</span> Private Commercial Portfolio Clearance
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-accent">•</span> Bespoke Promotional Content Prototypes
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-accent">•</span> End-to-End Mass Campaigning & Media Buying
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#161616]/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8">
              {!registrationSubmitted ? (
                <form onSubmit={handleRegisterBrand} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-white/60">
                        Brand / Enterprise Name
                      </label>
                      <input
                        type="text"
                        required
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. OMNI LUXURY INC."
                        className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-accent transition-colors text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-white/60">
                        Primary Intelligence Email
                      </label>
                      <input
                        type="email"
                        required
                        value={brandEmail}
                        onChange={(e) => setBrandEmail(e.target.value)}
                        placeholder="e.g. contact@omniluxury.com"
                        className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-accent transition-colors text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-white/60">
                      Primary Campaign Objective
                    </label>
                    <select
                      value={campaignObjective}
                      onChange={(e) => setCampaignObjective(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer text-white"
                    >
                      <option value="Promotional Content Suite">Promotional Content Suite</option>
                      <option value="Mass Campaign Propagation">Mass Campaign Propagation (Reaching the Masses)</option>
                      <option value="Full Cinematic Brand Film">Full Cinematic Brand Film</option>
                      <option value="Private Portfolio Clearance">Private Portfolio Clearance</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-white/60">
                      Brief Briefing Spec / Desired Deliverables
                    </label>
                    <textarea
                      value={brandMessage}
                      onChange={(e) => setBrandMessage(e.target.value)}
                      rows={3}
                      placeholder="e.g. We require stunning photography + a 4K film campaign for our next hardware product release."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-accent transition-colors resize-none text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white hover:bg-accent text-black font-mono font-black text-[10px] tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    [ SUBMIT REGISTER DEPLOYMENT ]
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                  </div>
                  <h4 className="font-display font-black text-lg uppercase tracking-tight text-white">
                    REGISTRATION ENVELOPE SEALED
                  </h4>
                  <p className="font-sans text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white font-semibold">{brandName}</strong>. Your strategic briefing and request for <strong className="text-white font-semibold">{campaignObjective}</strong> has been logged. Our campaigning department will assemble custom promotional prototypes and contact you at <strong className="text-white font-semibold">{brandEmail}</strong> shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setRegistrationSubmitted(false);
                        setBrandName("");
                        setBrandEmail("");
                        setBrandMessage("");
                      }}
                      className="font-mono text-[8px] font-black text-accent hover:underline uppercase tracking-widest"
                    >
                      [ INITIATE NEW REGISTRATION ]
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Visual Terminal Section */}
        <div className="mt-32 border border-white/10 p-8 text-center space-y-6 bg-black text-[#F5F2EB] rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 blur-[100px] pointer-events-none" />
          <span className="text-[10px] font-mono tracking-[0.4em] font-black uppercase text-white/50 block">OPTICAL GATEWAYS CLOSED</span>
          <p className="text-xs font-mono tracking-wide text-white/70 uppercase max-w-lg mx-auto font-light">
            All photography, cinematic scripts, and vector assets are compiled within the ARMEN GLOBALWORKS [AGW] server. For physical print reproduction, contact licensing channels.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-accent hover:bg-white text-black font-mono font-black text-[10px] tracking-widest uppercase rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              [ RETURN TO HOME STATION ]
            </button>
          </div>
        </div>
      </div>

      {/* Immersive Commercial Project Specification Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] overflow-y-auto px-6 py-12 md:py-20 flex justify-center items-start cursor-zoom-out"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className="w-full max-w-5xl bg-[#0F0F0F] text-[#F5F2EB] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Line */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-white/60">
                    [ COMMERCIAL WORK SPECS // REF: {selectedProject.id} ]
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group text-white"
                >
                  <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 lg:p-12">
                {/* Image Section (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="aspect-[4/5] sm:aspect-[16/10] w-full flex items-center justify-center p-4 md:p-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] relative">
                    <OptimizedImage
                      webpSrc={selectedProject.webp}
                      src={selectedProject.image}
                      fallbackSrc={selectedProject.remoteFallback}
                      alt={selectedProject.title}
                      priority={true}
                      containerClassName="max-w-full max-h-full flex items-center justify-center"
                      className="max-w-full max-h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-[#f9b934]/5 mix-blend-overlay pointer-events-none rounded-2xl" />
                  </div>
                  <div className="flex justify-between font-mono text-[9px] text-white/40 uppercase">
                    <span>CODENAME: SWISS-AVW-{selectedProject.id}</span>
                    <span>COLOR DEPTH: 16-BIT UNCOMPRESSED</span>
                  </div>
                </div>

                {/* Specs Section (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.35em] text-accent font-black uppercase block mb-1">
                        {selectedProject.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
                        {selectedProject.title}
                      </h2>
                    </div>

                    <p className="font-sans text-sm text-white/80 leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Metadata Tech Table */}
                  <div className="border-t border-white/10 pt-6 font-mono text-[10px] space-y-3 text-white/60">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>CLIENT CONTEXT:</span>
                      <span className="font-bold text-white">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>DEVELOPMENT TIME:</span>
                      <span className="font-bold text-white">{selectedProject.duration}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>STUDIO ASSIGNMENT:</span>
                      <span className="font-bold text-white">{selectedProject.output}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>LOCATION CODE:</span>
                      <span className="font-bold text-white">{selectedProject.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LICENSING:</span>
                      <span className="font-bold text-accent uppercase">OFFICIAL COMMERCIAL LICENSE</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-full py-4 bg-white hover:bg-accent text-black font-mono font-black text-[10px] tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 cursor-pointer text-center"
                    >
                      [ CONCLUDE ARCHIVE INSPECTION ]
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
