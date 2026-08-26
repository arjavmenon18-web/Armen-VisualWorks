import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, FileText, Sparkles, Lock, ExternalLink } from "lucide-react";
import CollaborationRegistrationModal from "./CollaborationRegistrationModal";

export default function AlreadyWithAVW() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 sm:mt-24 md:mt-32 max-w-5xl mx-auto px-2 sm:px-4 md:px-0"
      >
        <div className="relative bg-[#101010]/95 backdrop-blur-md rounded-3xl sm:rounded-[2.5rem] border border-white/10 p-5 sm:p-8 md:p-14 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-accent/5 blur-[100px] sm:blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-white/5 blur-[80px] sm:blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Discreet Framing */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-pulse shrink-0" />
                <span className="text-[8px] sm:text-[10px] font-mono font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase text-accent truncate">
                  FORMAL ENGAGEMENT PORTAL // SEC-05
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-[0.98] sm:leading-[0.95]">
                Already With AVW?
              </h2>

              <p className="text-sm sm:text-base md:text-lg font-light text-white/80 leading-relaxed">
                For collaborators, clients and partners already in active conversation with us.
              </p>

              <p className="text-[10px] sm:text-xs md:text-sm font-mono text-white/40 uppercase tracking-wider sm:tracking-widest">
                A simple formal step before we begin creating together.
              </p>

              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 font-mono text-[8px] sm:text-[9px] text-white/60 uppercase tracking-wider">
                <span className="flex items-center gap-1 sm:gap-1.5 bg-white/5 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md border border-white/5 sm:border-0">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent shrink-0" />
                  CONFIDENTIAL RECORD
                </span>
                <span className="hidden sm:inline text-white/30">•</span>
                <span className="flex items-center gap-1 sm:gap-1.5 bg-white/5 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md border border-white/5 sm:border-0">
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent shrink-0" />
                  7 GUIDING PRINCIPLES
                </span>
                <span className="hidden sm:inline text-white/30">•</span>
                <span className="flex items-center gap-1 sm:gap-1.5 bg-white/5 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md border border-white/5 sm:border-0">
                  <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent shrink-0" />
                  DIGITAL SIGNATURE
                </span>
              </div>
            </div>

            {/* Right Column: Discrete Action Plaque */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
              <div className="w-full bg-[#161616]/95 border border-white/10 rounded-2xl p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-xl text-left">
                <div className="space-y-1.5">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-accent font-bold block">
                    COLLABORATION RECORD
                  </span>
                  <p className="text-[11px] sm:text-xs text-white/70 font-light leading-relaxed">
                    If we have already discussed your project, enter here to review our way of working, record essential project details, and provide your formal representative signature.
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full min-h-[48px] py-3.5 sm:py-4 px-5 bg-white hover:bg-accent active:bg-accent text-black font-mono font-black text-[10px] sm:text-[11px] tracking-widest uppercase rounded-full shadow-lg hover:shadow-[0_10px_30px_rgba(249,185,52,0.25)] transition-all duration-300 transform active:scale-[0.98] sm:hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Register Collaboration</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="pt-1 flex flex-col items-center gap-1.5 text-center">
                  <Link
                    to="/verify"
                    className="font-mono text-[9px] text-white/60 hover:text-accent uppercase tracking-wider transition-colors inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Already Registered? Verify Record</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                  <div className="font-mono text-[7.5px] sm:text-[8px] tracking-widest text-white/30 uppercase">
                    Est. 1–2 Minutes • Direct Studio Archival
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full Dossier Overlay Modal */}
      <CollaborationRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
