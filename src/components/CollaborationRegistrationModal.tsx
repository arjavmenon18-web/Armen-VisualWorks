import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Lock,
  Copy,
  Download,
  AlertCircle,
  Clapperboard,
  Music,
  Briefcase,
  PenTool,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ExternalLink
} from "lucide-react";
import SignatureCanvas from "./SignatureCanvas";
import {
  CollaborationRecord,
  COLLABORATION_TYPES,
  TERMS_VERSION,
  CollaborationCategory
} from "../types/collaboration";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type ModalPhase =
  | "intro"
  | "terms"
  | "terms-aligned"
  | "record"
  | "signature"
  | "review"
  | "submitting"
  | "success";

const TERMS_SLIDES = [
  {
    number: "01",
    total: "07",
    category: "CREATIVE PARTNERSHIP",
    title: "We Create With You.",
    body: "AVW approaches collaborations as creative partnerships rather than conventional agency-client transactions. We want to understand the project, the people behind it and what you're trying to achieve so we can contribute meaningfully—not simply deliver a brief.",
    closing: "We don't just work for projects. We work with the people behind them."
  },
  {
    number: "02",
    total: "07",
    category: "COMMUNICATION",
    title: "Talk To Us.",
    body: "Budgets change. Timelines move. Ideas evolve. If something becomes difficult, the direction isn't working, or circumstances change, tell us. If pricing becomes difficult, we'd much rather have an honest conversation and explore another route than lose communication.",
    closing: "Conversation comes before cancellation."
  },
  {
    number: "03",
    total: "07",
    category: "AVW RECOGNITION",
    title: "Let People Know Who Made It.",
    body: "AVW puts genuine creative thought into the work we create. Unless otherwise agreed, appropriate AVW attribution should remain with publicly released work. Where applicable, the official AVW presence should be tagged or credited. If a particular platform, print format, theatrical use or commercial requirement makes attribution impractical, simply discuss it with us beforehand. We are reasonable.",
    closing: null
  },
  {
    number: "04",
    total: "07",
    category: "WATERMARK & ATTRIBUTION",
    title: "Our Mark Stays With The Work.",
    body: "Where an AVW watermark or signature is included in an approved creative, it should remain visible, intact and reasonably legible. It should not be intentionally cropped, removed, covered, obscured, or altered without prior agreement. If a clean version is required for a legitimate theatrical, broadcast, print, advertising or commercial use, the requirement can be discussed with AVW beforehand.",
    closing: "The AVW watermark identifies our creative contribution. It does not claim ownership of the client's film, brand or underlying intellectual property."
  },
  {
    number: "05",
    total: "07",
    category: "SCOPE & DELIVERABLES",
    title: "Let's Keep Things Clear.",
    body: "Every collaboration has an agreed scope. That may include number of deliverables, formats, revisions, timeline, and creative requirements. We are happy to accommodate reasonable changes. If the project grows beyond what was originally agreed, we'll discuss the change before proceeding.",
    closing: "No surprise bills. No silent scope changes."
  },
  {
    number: "06",
    total: "07",
    category: "FLEXIBLE PRICING",
    title: "Budgets Are Real.",
    body: "AVW packages are starting frameworks rather than rigid rules. Project complexity, timeline, deliverables and available budget can all influence the final arrangement. If something doesn't fit financially, tell us. Where appropriate, AVW may adjust the scope, package or approach to find something workable.",
    closing: null
  },
  {
    number: "07",
    total: "07",
    category: "LONG-TERM RELATIONSHIP",
    title: "More Than A Transaction.",
    body: "AVW values long-term creative relationships. We want to understand the people and projects we work with and build relationships that can continue beyond one deliverable. If we're working together, we're invested in making the collaboration stronger.",
    closing: "We don't simply want to complete a project. We want to create something worth being part of."
  }
];

const ROLE_OPTIONS = [
  "Producer",
  "Director",
  "Artist",
  "Founder",
  "Representative",
  "Creative Lead",
  "Other"
];

export default function CollaborationRegistrationModal({ isOpen, onClose }: Props) {
  const [phase, setPhase] = useState<ModalPhase>("intro");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Form State
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [customType, setCustomType] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [representativeRole, setRepresentativeRole] = useState(ROLE_OPTIONS[0]);
  const [customRole, setCustomRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);

  // Submission / Result State
  const [collaborationId, setCollaborationId] = useState("");
  const [submissionTimestamp, setSubmissionTimestamp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  // Reset when closing
  const handleClose = () => {
    if (phase === "success") {
      setPhase("intro");
      setCurrentSlideIndex(0);
      setTermsAccepted(false);
      setProjectName("");
      setSelectedTypes([]);
      setCustomType("");
      setOrganisation("");
      setRepresentativeName("");
      setRepresentativeRole(ROLE_OPTIONS[0]);
      setCustomRole("");
      setEmail("");
      setPhone("");
      setSignatureData(null);
    }
    onClose();
  };

  const toggleType = (label: string) => {
    setSelectedTypes((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const validateRecord = () => {
    if (!projectName.trim()) {
      setErrorMessage("Please specify the Project Name.");
      return false;
    }
    if (selectedTypes.length === 0 && !customType.trim()) {
      setErrorMessage("Please select at least one Collaboration Type.");
      return false;
    }
    if (!representativeName.trim()) {
      setErrorMessage("Please provide the Representative's Full Name.");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid business email address.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleFormaliseSubmission = async () => {
    if (!termsAccepted) {
      setErrorMessage("Terms acknowledgement is required to formalise collaboration.");
      setPhase("review");
      return;
    }
    if (!signatureData) {
      setErrorMessage("Representative digital signature is required. No record may be created without a valid signature.");
      setPhase("signature");
      return;
    }
    if (!projectName.trim() || selectedTypes.length === 0 && !customType.trim() || !representativeName.trim() || !email.trim()) {
      setErrorMessage("All required registration fields must be completed.");
      setPhase("record");
      return;
    }

    setPhase("submitting");
    setErrorMessage("");

    const finalTypes = [...selectedTypes];
    if (customType.trim() && !finalTypes.includes(customType.trim())) {
      finalTypes.push(customType.trim());
    }

    const finalRole = representativeRole === "Other" && customRole.trim() ? customRole.trim() : representativeRole;

    try {
      // 1. Submit to AVW Studio Server Registry API (Mandatory Source of Truth)
      const apiRes = await fetch("/api/collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: projectName.trim(),
          collaborationTypes: finalTypes,
          organisation: organisation.trim() || undefined,
          representativeName: representativeName.trim(),
          representativeRole: finalRole,
          email: email.trim(),
          phone: phone.trim() || undefined,
          signature: signatureData,
          termsVersion: TERMS_VERSION,
          termsAccepted: true
        })
      });

      const apiData = await apiRes.json();

      if (!apiRes.ok || !apiData.success || !apiData.referenceKey) {
        throw new Error(apiData.message || "Failed to persist collaboration record to official AVW registry.");
      }

      const verifiedReferenceKey = apiData.referenceKey;
      const verifiedTimestamp = apiData.registeredAt || new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

      // 2. Transmit to Web3Forms Notification Pipeline (Non-blocking notification)
      try {
        const accessKey =
          (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY ||
          "ffa429b4-988a-49b0-97ab-9ce4ef0294ec";

        const payload = {
          access_key: accessKey,
          subject: `[FORMAL COLLABORATION RECORD] ${verifiedReferenceKey} - ${projectName.trim()}`,
          name: representativeName.trim(),
          email: email.trim(),
          message: `ARMEN VISUALWORKS [AVW] FORMAL COLLABORATION RECORD\n` +
            `====================================================\n` +
            `REFERENCE KEY:   ${verifiedReferenceKey}\n` +
            `DATE / TIMESTAMP: ${verifiedTimestamp}\n` +
            `TERMS VERSION:    ${TERMS_VERSION} (Acknowledged: YES)\n\n` +
            `PROJECT DETAILS:\n` +
            `- Project Name:       ${projectName.trim()}\n` +
            `- Collaboration Types:${finalTypes.join(", ")}\n` +
            `- Organisation/Label: ${organisation.trim() || "None specified"}\n\n` +
            `REPRESENTATIVE DETAILS:\n` +
            `- Full Name:          ${representativeName.trim()}\n` +
            `- Role:               ${finalRole}\n` +
            `- Email:              ${email.trim()}\n` +
            `- Phone/WhatsApp:     ${phone.trim() || "Not provided"}\n\n` +
            `VERIFICATION LINK:    https://armenvisualworks.com/verify?ref=${encodeURIComponent(verifiedReferenceKey)}\n` +
            `====================================================`
        };

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        }).catch((e) => console.warn("Notification transmission:", e));
      } catch (err) {
        console.warn("Web3Forms error:", err);
      }

      // 3. Set verified state and show official confirmation
      setCollaborationId(verifiedReferenceKey);
      setSubmissionTimestamp(verifiedTimestamp);
      setPhase("success");
    } catch (err: any) {
      console.error("Formal registration failed:", err);
      setErrorMessage(err.message || "Could not complete formal registration. Please check your connection and try again.");
      setPhase("review");
    }
  };

  const handleCopyId = () => {
    if (collaborationId) {
      navigator.clipboard.writeText(collaborationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handleDownloadDossier = () => {
    const finalTypes = [...selectedTypes];
    if (customType.trim() && !finalTypes.includes(customType.trim())) {
      finalTypes.push(customType.trim());
    }
    const finalRole = representativeRole === "Other" && customRole.trim() ? customRole.trim() : representativeRole;

    const summaryText = `ARMEN VISUALWORKS [AVW] — COLLABORATION ACKNOWLEDGEMENT RECORD
========================================================================
COLLABORATION ID   : ${collaborationId}
RECORDED AT        : ${submissionTimestamp || new Date().toISOString()}
TERMS VERSION      : ${TERMS_VERSION} (ACKNOWLEDGED & BOUND)
STATUS             : FORMALLY RECORDED & VERIFIED

1. PROJECT INFORMATION
------------------------------------------------------------------------
Project Name       : ${projectName}
Collaboration Types: ${finalTypes.join(", ")}
Organisation/Label : ${organisation || "Independent"}

2. REPRESENTATIVE & CONTACT
------------------------------------------------------------------------
Full Name          : ${representativeName}
Role               : ${finalRole}
Email              : ${email}
Phone / WhatsApp   : ${phone || "Not provided"}

3. CREATIVE ENGAGEMENT PRINCIPLES (ACKNOWLEDGED)
------------------------------------------------------------------------
• Creative Partnership : Genuine collaborative engagement over transactional brief-taking.
• Communication        : Open, early dialogue on scope and financial adjustments.
• AVW Recognition      : Appropriate creator credit & attribution on public releases.
• Watermark Integrity  : Preservation of AVW creative watermark on approved masters.
• Scope Discipline     : Clear deliverables with transparent discussion prior to changes.
• Flexible Framework   : Practical budget alignment without compromising quality.
• Long-Term Value      : Investment in ongoing creative relationships.

========================================================================
ARMEN VISUALWORKS [AVW] // ALL RIGHTS RESERVED
`;

    const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${collaborationId}-COLLABORATION-RECORD.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/90 sm:bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[100dvh] sm:h-auto max-w-4xl sm:max-h-[90vh] bg-[#0D0D0D] border-0 sm:border border-white/15 rounded-none sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.8)] text-[#F5F2EB] overflow-hidden flex flex-col"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/5 blur-[100px] pointer-events-none" />

          {/* Top Bar / Progress Ribbon */}
          <div className="px-4 sm:px-8 md:px-10 py-3.5 sm:py-5 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md flex justify-between items-center z-20 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 truncate max-w-[70%] sm:max-w-none">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="font-mono text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/70 truncate">
                ARMEN VISUALWORKS // COLLABORATION DOSSIER
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Minimal Phase Tracker */}
              {phase !== "intro" && phase !== "success" && (
                <>
                  {/* Desktop tracker */}
                  <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/40 uppercase">
                    <span className={phase === "terms" || phase === "terms-aligned" ? "text-accent font-bold" : ""}>
                      01 TERMS
                    </span>
                    <span>→</span>
                    <span className={phase === "record" ? "text-accent font-bold" : ""}>
                      02 RECORD
                    </span>
                    <span>→</span>
                    <span className={phase === "signature" || phase === "review" ? "text-accent font-bold" : ""}>
                      03 SIGN
                    </span>
                  </div>
                  {/* Mobile compact phase indicator */}
                  <div className="sm:hidden font-mono text-[8px] tracking-widest text-accent font-bold uppercase bg-white/5 px-2 py-1 rounded-md border border-white/10">
                    {phase === "terms" || phase === "terms-aligned" ? "01/03" : phase === "record" ? "02/03" : "03/03"}
                  </div>
                </>
              )}

              <button
                onClick={handleClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black active:bg-white active:text-black transition-all cursor-pointer group text-white/80"
                aria-label="Close"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-14 py-5 sm:py-8 overscroll-contain">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-3.5 sm:p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-red-200 text-xs font-mono"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* SCREEN 1: INTRO */}
            {phase === "intro" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 sm:space-y-8 max-w-2xl py-2 sm:py-4"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-accent block">
                    [ CONFIDENTIAL CREATIVE RECORD ]
                  </span>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
                    Good to have you here.
                  </h1>
                </div>

                <div className="space-y-3 sm:space-y-4 text-white/80 font-light text-sm sm:text-base md:text-lg leading-relaxed">
                  <p>
                    This isn't a standard client form.
                  </p>
                  <p className="text-white/60 text-xs sm:text-sm md:text-base">
                    We already know the project and the conversation behind it. This little step simply puts the important details on record, makes sure we're aligned on how we work, and formally acknowledges the collaboration.
                  </p>
                </div>

                {/* Trust Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-white/10 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/60">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-accent block mb-1">01 / WAY OF WORKING</span>
                    7 Short Principles
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-accent block mb-1">02 / RECORD</span>
                    Essential Details Only
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-accent block mb-1">03 / SIGNATURE</span>
                    Formal Verification
                  </div>
                </div>

                <div className="pt-4 sm:pt-6">
                  <button
                    onClick={() => {
                      setErrorMessage("");
                      setPhase("terms");
                      setCurrentSlideIndex(0);
                    }}
                    className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 bg-white hover:bg-accent active:bg-accent text-black font-mono font-black text-[10px] sm:text-[11px] tracking-widest uppercase rounded-full shadow-xl hover:shadow-[0_10px_30px_rgba(249,185,52,0.25)] transition-all duration-300 transform active:scale-[0.98] sm:hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3"
                  >
                    <span>Let's make it official</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: TERMS SLIDES */}
            {phase === "terms" && (
              <div className="space-y-6 sm:space-y-8 max-w-2xl py-1 sm:py-2">
                {/* Slide Header & Counter */}
                <div className="flex justify-between items-end border-b border-white/10 pb-3 sm:pb-4">
                  <div className="space-y-1 truncate max-w-[75%]">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent block truncate">
                      OUR WAY OF WORKING // {TERMS_SLIDES[currentSlideIndex].category}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-widest block">
                      PRINCIPLE {TERMS_SLIDES[currentSlideIndex].number} OF {TERMS_SLIDES[currentSlideIndex].total}
                    </span>
                  </div>
                  <div className="font-mono text-lg sm:text-2xl font-black text-white/90 shrink-0">
                    <span className="text-accent">{TERMS_SLIDES[currentSlideIndex].number}</span>
                    <span className="text-white/30"> / {TERMS_SLIDES[currentSlideIndex].total}</span>
                  </div>
                </div>

                {/* Slide Card Animated */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 sm:space-y-6 min-h-[190px] sm:min-h-[220px] flex flex-col justify-center"
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white leading-tight">
                      {TERMS_SLIDES[currentSlideIndex].title}
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed">
                      {TERMS_SLIDES[currentSlideIndex].body}
                    </p>

                    {TERMS_SLIDES[currentSlideIndex].closing && (
                      <div className="p-3.5 sm:p-4 bg-[#141414] border-l-2 border-accent rounded-r-xl font-sans text-xs sm:text-sm text-white/90 font-medium italic">
                        "{TERMS_SLIDES[currentSlideIndex].closing}"
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Slide Progress Dots & Navigation Controls */}
                <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Dots */}
                  <div className="flex items-center gap-2">
                    {TERMS_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentSlideIndex
                            ? "w-8 bg-accent"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    {currentSlideIndex > 0 && (
                      <button
                        onClick={() => setCurrentSlideIndex((prev) => prev - 1)}
                        className="px-4 sm:px-5 py-3 min-h-[44px] rounded-full border border-white/15 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>PREV</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (currentSlideIndex < TERMS_SLIDES.length - 1) {
                          setCurrentSlideIndex((prev) => prev + 1);
                        } else {
                          setPhase("terms-aligned");
                        }
                      }}
                      className="flex-1 sm:flex-initial px-6 sm:px-7 py-3 min-h-[44px] bg-white hover:bg-accent active:bg-accent text-black font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                    >
                      <span>
                        {currentSlideIndex < TERMS_SLIDES.length - 1 ? "CONTINUE" : "VIEW ACKNOWLEDGEMENT"}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: TERMS ACKNOWLEDGEMENT (ALIGNED?) */}
            {phase === "terms-aligned" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 sm:space-y-8 max-w-2xl py-1 sm:py-2"
              >
                <div className="space-y-2 sm:space-y-3">
                  <span className="font-mono text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-accent block">
                    [ TERMS VERIFICATION // {TERMS_VERSION} ]
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
                    Aligned?
                  </h1>
                </div>

                <p className="text-white/80 font-light text-sm sm:text-base md:text-lg leading-relaxed">
                  By continuing, you confirm that you have read and understood AVW's collaborative working principles and agree to the applicable project scope, pricing and terms discussed with AVW.
                </p>

                {/* Core Principles Pill Recap */}
                <div className="bg-[#121212] p-4 sm:p-5 rounded-2xl border border-white/10 space-y-2 font-mono text-[9px] sm:text-[10px] text-white/70">
                  <div className="text-white/40 uppercase tracking-widest mb-2.5">
                    [ PRINCIPLES SUMMARY ]
                  </div>
                  <div className="flex items-start sm:items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 sm:mt-0" />
                    <span>Creative Partnership over agency-client brief-taking</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 sm:mt-0" />
                    <span>Honest, early communication before cancellation or friction</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 sm:mt-0" />
                    <span>Appropriate AVW credit attribution & watermark preservation</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 sm:mt-0" />
                    <span>Transparent scope agreements with zero surprise bills</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 sm:mt-0" />
                    <span>Flexible frameworks built for lasting artistic relationships</span>
                  </div>
                </div>

                {/* Mandatory Checkbox */}
                <label className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/15 hover:border-accent/40 cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (e.target.checked) setErrorMessage("");
                    }}
                    className="mt-0.5 w-5 h-5 accent-[#F9B934] rounded cursor-pointer shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wide text-white group-hover:text-accent transition-colors block">
                      I have read and understand the AVW Collaborative Engagement Terms.
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-widest block">
                      Binding Acknowledgement Version {TERMS_VERSION}
                    </span>
                  </div>
                </label>

                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      setPhase("terms");
                      setCurrentSlideIndex(TERMS_SLIDES.length - 1);
                    }}
                    className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>REVIEW SLIDES</span>
                  </button>

                  <button
                    disabled={!termsAccepted}
                    onClick={() => {
                      if (!termsAccepted) {
                        setErrorMessage("Please check the box to acknowledge the terms before continuing.");
                        return;
                      }
                      setErrorMessage("");
                      setPhase("record");
                    }}
                    className={`w-full sm:w-auto px-8 py-3.5 sm:py-4 min-h-[48px] font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl ${
                      termsAccepted
                        ? "bg-white hover:bg-accent active:bg-accent text-black active:scale-[0.98] sm:hover:-translate-y-0.5"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: COLLABORATION RECORD */}
            {phase === "record" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 sm:space-y-8 max-w-3xl py-1 sm:py-2"
              >
                <div className="space-y-1.5 sm:space-y-2 border-b border-white/10 pb-4 sm:pb-5">
                  <span className="font-mono text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-accent block">
                    [ PHASE 02 // COLLABORATION RECORD ]
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
                    Let's Put This On Record.
                  </h1>
                  <p className="text-white/60 font-light text-xs sm:text-base">
                    We already know the project. We just need the essentials for our records.
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {/* SECTION A: PROJECT INFO */}
                  <div className="space-y-5 sm:space-y-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                        Project Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g. The Film / Campaign / Album / Brand Project"
                        className="w-full bg-[#141414] border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-[16px] sm:text-sm font-sans text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                      />
                    </div>

                    {/* Collaboration Type Visual Grid */}
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex justify-between items-baseline">
                        <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                          Collaboration Type(s) <span className="text-accent">*</span>
                        </label>
                        <span className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase">
                          Select all that apply
                        </span>
                      </div>

                      {/* Categorized Chips */}
                      {(["FILM", "MUSIC", "BRAND", "CREATIVE"] as CollaborationCategory[]).map((cat) => {
                        const items = COLLABORATION_TYPES.filter((t) => t.category === cat);
                        return (
                          <div key={cat} className="space-y-1.5">
                            <span className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-[0.25em] text-accent/70 font-bold block">
                              {cat}
                            </span>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {items.map((item) => {
                                const active = selectedTypes.includes(item.label);
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => toggleType(item.label)}
                                    className={`px-3 py-2 sm:px-3.5 sm:py-2 min-h-[38px] rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center gap-1.5 active:scale-95 ${
                                      active
                                        ? "bg-accent text-black font-bold border-accent shadow-md"
                                        : "bg-white/5 hover:bg-white/10 active:bg-white/15 text-white/70 border-white/10"
                                    }`}
                                  >
                                    {active && <Check className="w-3 h-3" />}
                                    <span>{item.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      {/* Custom Type Field */}
                      <div className="pt-1.5 sm:pt-2">
                        <input
                          type="text"
                          value={customType}
                          onChange={(e) => setCustomType(e.target.value)}
                          placeholder="Other / Custom collaboration scope (optional)"
                          className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-[16px] sm:text-xs font-mono text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                        />
                      </div>
                    </div>

                    {/* Organisation / Label */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                        Production / Company / Label{" "}
                        <span className="text-white/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        placeholder="Name of production company, label or brand (optional)"
                        className="w-full bg-[#141414] border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-[16px] sm:text-sm font-sans text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  {/* SECTION B: REPRESENTATIVE */}
                  <div className="pt-5 sm:pt-6 border-t border-white/10 space-y-4 sm:space-y-6">
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-accent">
                        REPRESENTATIVE
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                        Who Are We Recording This With?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                          Full Name <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={representativeName}
                          onChange={(e) => setRepresentativeName(e.target.value)}
                          placeholder="e.g. Jane Doe / Christopher"
                          className="w-full bg-[#141414] border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-[16px] sm:text-sm font-sans text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                          Role <span className="text-accent">*</span>
                        </label>
                        <select
                          value={representativeRole}
                          onChange={(e) => setRepresentativeRole(e.target.value)}
                          className="w-full bg-[#141414] border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-[16px] sm:text-sm font-mono text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                        >
                          {ROLE_OPTIONS.map((role) => (
                            <option key={role} value={role} className="bg-black text-white">
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {representativeRole === "Other" && (
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                          Specify Role
                        </label>
                        <input
                          type="text"
                          value={customRole}
                          onChange={(e) => setCustomRole(e.target.value)}
                          placeholder="e.g. Executive Producer / Showrunner"
                          className="w-full bg-[#141414] border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-[16px] sm:text-xs font-mono text-white focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {/* SECTION C: CONTACT */}
                  <div className="pt-5 sm:pt-6 border-t border-white/10 space-y-4 sm:space-y-6">
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-accent">
                        CONTACT DETAILS
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                        Direct Channels
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                          Email <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="direct@studio.com"
                          className="w-full bg-[#141414] border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-[16px] sm:text-sm font-sans text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                          Phone / WhatsApp{" "}
                          <span className="text-white/40 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-[#141414] border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-[16px] sm:text-sm font-sans text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Controls */}
                <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      setErrorMessage("");
                      setPhase("terms-aligned");
                    }}
                    className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>BACK TO TERMS</span>
                  </button>

                  <button
                    onClick={() => {
                      if (validateRecord()) {
                        setPhase("signature");
                      }
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 sm:py-4 min-h-[48px] bg-white hover:bg-accent active:bg-accent text-black font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] sm:hover:-translate-y-0.5"
                  >
                    <span>Proceed to Signature</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: SIGNATURE */}
            {phase === "signature" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 sm:space-y-8 max-w-2xl py-1 sm:py-2"
              >
                <div className="space-y-1.5 sm:space-y-2 border-b border-white/10 pb-4 sm:pb-5">
                  <span className="font-mono text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-accent block">
                    [ PHASE 03 // DIGITAL SIGNATURE ]
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
                    Representative Signature
                  </h1>
                  <p className="text-white/70 font-light text-xs sm:text-base leading-relaxed">
                    Your signature confirms that the information represents the collaboration discussed with Armen VisualWorks.
                  </p>
                </div>

                {/* Brief Signatory Context */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 bg-[#141414] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 font-mono text-[9px] sm:text-[10px]">
                  <div>
                    <span className="text-white/40 block">SIGNING FOR:</span>
                    <span className="text-white font-bold truncate block">{projectName}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">REPRESENTATIVE:</span>
                    <span className="text-accent font-bold truncate block">
                      {representativeName} ({representativeRole === "Other" && customRole ? customRole : representativeRole})
                    </span>
                  </div>
                </div>

                {/* Signature Canvas Component */}
                <SignatureCanvas
                  onSignatureChange={(data) => {
                    setSignatureData(data);
                    if (data) setErrorMessage("");
                  }}
                  initialDataUrl={signatureData}
                />

                {/* Controls */}
                <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      setErrorMessage("");
                      setPhase("record");
                    }}
                    className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>EDIT DETAILS</span>
                  </button>

                  <button
                    disabled={!signatureData}
                    onClick={() => {
                      if (!signatureData) {
                        setErrorMessage("Please sign inside the box to continue.");
                        return;
                      }
                      setErrorMessage("");
                      setPhase("review");
                    }}
                    className={`w-full sm:w-auto px-8 py-3.5 sm:py-4 min-h-[48px] font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl ${
                      signatureData
                        ? "bg-white hover:bg-accent active:bg-accent text-black active:scale-[0.98] sm:hover:-translate-y-0.5"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    <span>Review Collaboration Record</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 6: REVIEW */}
            {phase === "review" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 sm:space-y-8 max-w-3xl py-1 sm:py-2"
              >
                <div className="space-y-1.5 sm:space-y-2 border-b border-white/10 pb-4 sm:pb-5">
                  <span className="font-mono text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-accent block">
                    [ FINAL VERIFICATION // COLLABORATION DOSSIER ]
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
                    Final Review
                  </h1>
                  <p className="text-white/60 font-light text-xs sm:text-sm">
                    Please inspect your collaboration record before formal submission.
                  </p>
                </div>

                {/* Structured Review Dossier Card */}
                <div className="bg-[#121212] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 space-y-4 sm:space-y-6 shadow-2xl">
                  {/* COLLABORATION */}
                  <div className="border-b border-white/10 pb-4 sm:pb-5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-accent">
                        COLLABORATION
                      </span>
                      <button
                        onClick={() => setPhase("record")}
                        className="font-mono text-[9px] sm:text-[10px] text-white/60 hover:text-accent uppercase underline cursor-pointer p-1"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-lg sm:text-2xl font-display font-black text-white uppercase break-words">
                      {projectName}
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {selectedTypes.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] sm:text-[10px] font-mono text-white/80 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                      {customType && (
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] sm:text-[10px] font-mono text-white/80 uppercase">
                          {customType}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ORGANISATION */}
                  <div className="border-b border-white/10 pb-4 sm:pb-5 space-y-1">
                    <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 block">
                      ORGANISATION / PRODUCTION
                    </span>
                    <div className="font-mono text-xs sm:text-sm text-white font-medium">
                      {organisation || "Independent"}
                    </div>
                  </div>

                  {/* REPRESENTATIVE & CONTACT */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-b border-white/10 pb-4 sm:pb-5">
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 block">
                        REPRESENTATIVE
                      </span>
                      <div className="font-mono text-xs sm:text-sm text-white font-bold">
                        {representativeName}
                      </div>
                      <div className="font-mono text-[11px] sm:text-xs text-accent">
                        {representativeRole === "Other" && customRole ? customRole : representativeRole}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 block">
                        CONTACT
                      </span>
                      <div className="font-mono text-xs text-white truncate">
                        {email}
                      </div>
                      {phone && (
                        <div className="font-mono text-xs text-white/60">
                          {phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ACKNOWLEDGEMENT */}
                  <div className="border-b border-white/10 pb-4 sm:pb-5 space-y-1">
                    <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 block">
                      TERMS ACKNOWLEDGEMENT
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-accent font-bold">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>AVW Collaborative Engagement Terms ({TERMS_VERSION}) Accepted</span>
                    </div>
                  </div>

                  {/* SIGNATURE PREVIEW */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                        DIGITAL SIGNATURE
                      </span>
                      <button
                        onClick={() => setPhase("signature")}
                        className="font-mono text-[9px] sm:text-[10px] text-white/60 hover:text-accent uppercase underline cursor-pointer p-1"
                      >
                        Re-sign
                      </button>
                    </div>
                    {signatureData && (
                      <div className="w-full h-24 sm:h-28 bg-[#0A0A0A] border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center p-2.5 sm:p-3 overflow-hidden shadow-inner">
                        <img
                          src={signatureData}
                          alt="Signature Preview"
                          className="max-h-full max-w-full object-contain filter invert brightness-125"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Controls */}
                <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setPhase("signature")}
                    className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>BACK TO SIGNATURE</span>
                  </button>

                  <button
                    onClick={handleFormaliseSubmission}
                    className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 min-h-[48px] bg-accent hover:bg-white active:bg-white text-black font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 shadow-[0_10px_35px_rgba(249,185,52,0.3)] active:scale-[0.98] sm:hover:-translate-y-0.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Formalise Collaboration →</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 7: SUBMITTING STATE */}
            {phase === "submitting" && (
              <div className="py-14 sm:py-20 flex flex-col items-center justify-center text-center space-y-5 sm:space-y-6">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                    RECORDING COLLABORATION DOSSIER...
                  </h3>
                  <p className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest max-w-sm">
                    Generating cryptographic reference & archiving engagement record
                  </p>
                </div>
              </div>
            )}

            {/* SCREEN 8: SUCCESS STATE (IT'S OFFICIAL) */}
            {phase === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 sm:space-y-8 max-w-2xl py-3 sm:py-4 text-center mx-auto"
              >
                {/* Official Seal Emblem */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(249,185,52,0.2)]">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-accent animate-bounce" />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <span className="font-mono text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-accent block">
                    [ OFFICIAL ENGAGEMENT SEALED ]
                  </span>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                    It's Official.
                  </h1>
                </div>

                <div className="space-y-2 font-light text-sm sm:text-base md:text-lg text-white/80 max-w-lg mx-auto leading-relaxed">
                  <p>
                    The collaboration has been formally recorded with <strong className="text-white font-medium">Armen VisualWorks</strong>.
                  </p>
                  <p className="text-white/60 font-sans italic text-xs sm:text-base">
                    "We look forward to creating together."
                  </p>
                </div>

                {/* Collaboration ID Banner */}
                <div className="bg-[#141414] border border-white/15 rounded-2xl p-4 sm:p-6 max-w-md mx-auto space-y-3.5 shadow-2xl">
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-white/40 block">
                    COLLABORATION REFERENCE KEY
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-black text-accent tracking-widest">
                    {collaborationId}
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-white/40">
                    RECORDED: {submissionTimestamp} • {TERMS_VERSION} BOUND
                  </div>
                  
                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                    <button
                      onClick={handleCopyId}
                      className="px-4 py-2.5 min-h-[38px] bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-wider text-white/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3 h-3 text-accent" />
                      <span>{copiedId ? "COPIED!" : "COPY KEY"}</span>
                    </button>
                    <button
                      onClick={handleDownloadDossier}
                      className="px-4 py-2.5 min-h-[38px] bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-wider text-white/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-accent" />
                      <span>DOWNLOAD DOSSIER</span>
                    </button>
                  </div>

                  {/* Direct Link to Verification Portal */}
                  <div className="pt-2 border-t border-white/10">
                    <Link
                      to={`/verify?ref=${encodeURIComponent(collaborationId)}`}
                      className="w-full py-2.5 px-4 bg-accent/15 hover:bg-accent/25 border border-accent/40 rounded-xl text-accent font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>View & Verify My Record</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6">
                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 min-h-[48px] bg-white hover:bg-accent active:bg-accent text-black font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-full shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    Return to VisualWorks
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
