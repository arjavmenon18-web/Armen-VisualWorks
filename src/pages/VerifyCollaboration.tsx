import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Search,
  Copy,
  Check,
  Download,
  Printer,
  ArrowLeft,
  FileText,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Calendar,
  User,
  Briefcase,
  Mail,
  Phone,
  Layers,
  Sparkles
} from "lucide-react";
import { ContributorCollaborationRecord } from "../types/collaboration";
import TermsViewerModal from "../components/TermsViewerModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function VerifyCollaboration() {
  const [searchParams] = useSearchParams();
  const [referenceKey, setReferenceKey] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<ContributorCollaborationRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Auto-verify if ref is present in URL
  useEffect(() => {
    const queryRef = searchParams.get("ref");
    if (queryRef) {
      setReferenceKey(queryRef);
      performVerification(queryRef);
    }
  }, [searchParams]);

  const performVerification = async (keyToVerify: string, emailToVerify?: string) => {
    if (!keyToVerify.trim()) {
      setErrorMessage("Please enter an AVW Collaboration Reference Key.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setRecord(null);

    const cleanKey = keyToVerify.trim().toUpperCase();

    try {
      // 1. Check Server Registry API
      try {
        const res = await fetch("/api/collaborations/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceKey: cleanKey,
            email: emailToVerify?.trim() || undefined
          })
        });

        let data: any = null;
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const rawText = await res.text();
          try {
            data = JSON.parse(rawText);
          } catch {
            data = null;
          }
        }

        if (res.ok && data && data.success && data.record) {
          setRecord(data.record);
          setLoading(false);
          return;
        }
      } catch (apiErr) {
        console.warn("API verification failed, checking local register backup:", apiErr);
      }

      // 2. Check Local Storage Backup (Allows instant offline and client verification)
      try {
        const raw = localStorage.getItem("avw_collaborations_backup");
        if (raw) {
          const list = JSON.parse(raw);
          const matched = list.find((r: any) => {
            const keyMatches = r.referenceKey?.toUpperCase() === cleanKey;
            if (!emailToVerify || !emailToVerify.trim()) return keyMatches;
            return keyMatches && r.email?.toLowerCase() === emailToVerify.trim().toLowerCase();
          });

          if (matched) {
            setRecord({
              referenceKey: matched.referenceKey,
              projectName: matched.projectName,
              collaborationTypes: matched.collaborationTypes,
              organisation: matched.organisation,
              representativeName: matched.representativeName,
              representativeRole: matched.representativeRole,
              email: matched.email,
              phone: matched.phone,
              status: matched.status || "active",
              registeredAt: matched.registeredAt,
              termsVersion: matched.termsVersion,
              termsAcceptedAt: matched.termsAcceptedAt || matched.registeredAt,
              signature: matched.signature
            });
            setLoading(false);
            return;
          }
        }
      } catch (storageErr) {
        console.warn("Error reading local registration backup:", storageErr);
      }

      setErrorMessage("We couldn't find that collaboration record. Please check the Reference Key (e.g. AVW-COLL-XXXX-26) and try again.");
    } catch (err) {
      console.error("Verification failed:", err);
      setErrorMessage("We couldn't find that collaboration record. Please check the Reference Key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(referenceKey, email);
  };

  const handleCopyKey = () => {
    if (record?.referenceKey) {
      navigator.clipboard.writeText(record.referenceKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleDownloadSummary = () => {
    if (!record) return;
    const textContent = `========================================================================
ARMEN VISUALWORKS [AVW] — COLLABORATION VERIFICATION RECORD
========================================================================
REFERENCE KEY       : ${record.referenceKey}
RECORD STATUS       : ${record.status.toUpperCase()} (VERIFIED ON OFFICIAL REGISTRY)
REGISTERED AT       : ${record.registeredAt}
TERMS VERSION       : ${record.termsVersion} (ACKNOWLEDGED & BOUND)

1. PROJECT INFORMATION
------------------------------------------------------------------------
Project Name        : ${record.projectName}
Collaboration Types : ${record.collaborationTypes.join(", ")}
${record.organisation ? `Organisation/Label  : ${record.organisation}` : ""}

2. REPRESENTATIVE & VERIFICATION
------------------------------------------------------------------------
Full Name           : ${record.representativeName}
Role                : ${record.representativeRole}
Email               : ${record.email}
${record.phone ? `Phone / WhatsApp    : ${record.phone}` : ""}

3. ENGAGEMENT ACKNOWLEDGEMENT
------------------------------------------------------------------------
Terms Acknowledged  : YES
Terms Version       : ${record.termsVersion}
Terms Binding Date  : ${record.termsAcceptedAt}
Digital Signature   : Captured and verified by registered representative

========================================================================
Official Studio Portal: https://armenvisualworks.com
Direct Studio Inquiries: armenvisualworks@gmail.com
========================================================================`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AVW-Collaboration-${record.referenceKey}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col justify-between selection:bg-accent selection:text-black">
      {/* Top Studio Header */}
      <header className="border-b border-white/10 bg-[#0E0E0E]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/visual"
            className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/70 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to VisualWorks</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/60">
              AVW REGISTRY PORTAL // VERIFY
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 w-full flex-grow space-y-10">
        {/* Intro Section */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] uppercase tracking-widest text-accent">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OFFICIAL COLLABORATION VERIFICATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
            Verify Collaboration Record
          </h1>

          <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed">
            Enter your formal AVW Collaboration Reference Key to view and verify your registered engagement record, terms binding, and digital representative acknowledgement.
          </p>
        </div>

        {/* Verification Lookup Form */}
        <div className="bg-[#121212] border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-8 space-y-1.5">
                <label className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                  AVW Reference Key <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={referenceKey}
                    onChange={(e) => setReferenceKey(e.target.value.toUpperCase())}
                    placeholder="e.g. AVW-COLL-7K4M-26"
                    className="w-full bg-[#181818] border border-white/15 rounded-2xl px-4 py-3 sm:py-3.5 pl-11 text-sm sm:text-base font-mono uppercase text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20 tracking-wider"
                  />
                  <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 sm:py-3.5 px-6 min-h-[48px] bg-accent hover:bg-white text-black font-mono font-black text-[10px] sm:text-[11px] tracking-widest uppercase rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Verify Record</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Optional Email Secondary Match */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white/40 font-mono text-[8.5px] sm:text-[9px]">
              <span>Tip: Reference keys follow the format <strong className="text-white/70">AVW-COLL-XXXX-26</strong>.</span>
              <span className="text-white/30">Secure non-enumerated verification</span>
            </div>
          </form>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3 text-red-300 font-mono text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">{errorMessage}</p>
                  <p className="text-[10px] text-red-300/70">
                    If you recently registered, please ensure you have entered the exact Reference Key provided on your confirmation screen.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* VERIFIED DOSSIER RESULT */}
        <AnimatePresence>
          {record && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#121212] border border-accent/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-8 relative overflow-hidden"
            >
              {/* Subtle Verified Watermark & Accent Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] pointer-events-none" />

              {/* Dossier Header Banner */}
              <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
                      OFFICIAL COLLABORATION RECORD // VERIFIED
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white">
                    Armen VisualWorks Record
                  </h2>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider font-bold border ${
                      record.status === "active"
                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                        : record.status === "completed"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        : "bg-white/10 text-white/60 border-white/20"
                    }`}
                  >
                    STATUS: {record.status}
                  </span>
                </div>
              </div>

              {/* Key Plaque */}
              <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 block">
                    REFERENCE IDENTIFIER
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-accent tracking-widest">
                    {record.referenceKey}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyKey}
                    className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 font-mono text-[9px] uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer flex-1 sm:flex-none"
                  >
                    {copiedKey ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-accent" />}
                    <span>{copiedKey ? "COPIED" : "COPY KEY"}</span>
                  </button>
                  <button
                    onClick={handleDownloadSummary}
                    className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 font-mono text-[9px] uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer flex-1 sm:flex-none"
                  >
                    <Download className="w-3 h-3 text-accent" />
                    <span>DOWNLOAD</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 font-mono text-[9px] uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer hidden md:flex"
                  >
                    <Printer className="w-3 h-3 text-accent" />
                    <span>PRINT</span>
                  </button>
                </div>
              </div>

              {/* Grid: Project & Representative Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* 1. PROJECT INFORMATION */}
                <div className="space-y-4 bg-[#161616]/60 border border-white/10 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-accent font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/10 pb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>PROJECT INFORMATION</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block">Project Name</span>
                      <p className="text-lg sm:text-xl font-display font-black text-white uppercase">{record.projectName}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block mb-1">Collaboration Types</span>
                      <div className="flex flex-wrap gap-1.5">
                        {record.collaborationTypes.map((type) => (
                          <span
                            key={type}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-white/90 uppercase"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {record.organisation && (
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block">Organisation / Label</span>
                        <p className="text-xs sm:text-sm font-mono text-white/80">{record.organisation}</p>
                      </div>
                    )}

                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block">Registered Timestamp</span>
                      <p className="text-xs font-mono text-white/60 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-accent" />
                        {record.registeredAt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. REPRESENTATIVE & VERIFICATION */}
                <div className="space-y-4 bg-[#161616]/60 border border-white/10 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-accent font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/10 pb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>REGISTERED REPRESENTATIVE</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block">Full Name</span>
                      <p className="text-base sm:text-lg font-mono font-bold text-white">{record.representativeName}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block">Role / Designation</span>
                      <p className="text-xs sm:text-sm font-mono text-accent">{record.representativeRole}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block">Contact Email</span>
                      <p className="text-xs font-mono text-white/80 flex items-center gap-1.5 truncate">
                        <Mail className="w-3 h-3 text-white/40 shrink-0" />
                        {record.email}
                      </p>
                    </div>

                    {record.phone && (
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-white/40 block">Phone / WhatsApp</span>
                        <p className="text-xs font-mono text-white/80 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-white/40 shrink-0" />
                          {record.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. TERMS ACKNOWLEDGEMENT & SIGNATURE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 border-t border-white/10 pt-6">
                {/* Terms Acknowledged */}
                <div className="space-y-3 bg-[#161616]/60 border border-white/10 rounded-2xl p-5">
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-accent block">
                    TERMS ACKNOWLEDGEMENT
                  </span>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="font-mono text-xs text-white font-bold">
                      Terms Version: {record.termsVersion}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 font-light">
                    The registered representative formally reviewed and acknowledged the 7 core principles of engagement before initiating this collaboration.
                  </p>

                  <button
                    onClick={() => setTermsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent hover:underline pt-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Acknowledged Terms & Principles →</span>
                  </button>
                </div>

                {/* Digital Signature */}
                <div className="space-y-3 bg-[#161616]/60 border border-white/10 rounded-2xl p-5">
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-white/40 block">
                    REPRESENTATIVE DIGITAL SIGNATURE
                  </span>

                  {record.signature ? (
                    <div className="h-20 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center p-2 overflow-hidden shadow-inner">
                      <img
                        src={record.signature}
                        alt="Digital Signature"
                        className="max-h-full max-w-full object-contain filter invert brightness-125"
                      />
                    </div>
                  ) : (
                    <div className="h-20 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center text-white/30 font-mono text-xs">
                      [Signature on file]
                    </div>
                  )}

                  <p className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-wider">
                    Digitally recorded and binding for collaboration scope.
                  </p>
                </div>
              </div>

              {/* Dossier Footer Reassurance */}
              <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white/40 font-mono text-[9px] sm:text-[10px]">
                <p>
                  Need to update your details or discuss project scope? Contact us at{" "}
                  <a href="mailto:armenvisualworks@gmail.com" className="text-accent hover:underline">
                    armenvisualworks@gmail.com
                  </a>
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>ARMEN VISUALWORKS [AVW]</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Terms Viewer Modal */}
      <TermsViewerModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
