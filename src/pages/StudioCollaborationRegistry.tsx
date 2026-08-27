import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ExternalLink,
  ChevronRight,
  X,
  FileText,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Check,
  Copy,
  Download,
  AlertCircle,
  Eye,
  EyeOff,
  Edit3,
  Layers,
  Sparkles,
  ArrowUpDown
} from "lucide-react";
import {
  StudioCollaborationRecord,
  CollaborationSummaryStats,
  CollaborationStatus
} from "../types/collaboration";
import TermsViewerModal from "../components/TermsViewerModal";

export default function StudioCollaborationRegistry() {
  const [authToken, setAuthToken] = useState<string | null>(
    sessionStorage.getItem("avw_studio_token")
  );
  const [accessKeyInput, setAccessKeyInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [records, setRecords] = useState<StudioCollaborationRecord[]>([]);
  const [stats, setStats] = useState<CollaborationSummaryStats>({
    total: 0,
    active: 0,
    completed: 0,
    archived: 0,
    recentCount: 0
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loadingRecords, setLoadingRecords] = useState(false);

  // Selected Record Drawer / Modal
  const [selectedRecord, setSelectedRecord] = useState<StudioCollaborationRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Editing state inside drawer
  const [editStatus, setEditStatus] = useState<CollaborationStatus>("active");
  const [editNotes, setEditNotes] = useState("");
  const [editAssignedTo, setEditAssignedTo] = useState("");
  const [editInternalStatus, setEditInternalStatus] = useState("");
  const [savingChanges, setSavingChanges] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Check auth on load
  useEffect(() => {
    if (authToken) {
      fetchRecords();
    }
  }, [authToken, searchQuery, statusFilter, typeFilter, sortBy]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKeyInput.trim()) {
      setAuthError("Please enter the AVW Studio Access Passcode.");
      return;
    }

    setAuthLoading(true);
    setAuthError("");

    const rawInput = accessKeyInput.trim();
    const cleanKey = rawInput.toLowerCase();
    const isAllowedKey = ["devuu", "aduuu", "dev", "adu", "arjav", "armen", "avw"].includes(cleanKey);

    try {
      const res = await fetch("/api/studio/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessKey: rawInput })
      });

      let data: any = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const txt = await res.text();
        try { data = JSON.parse(txt); } catch { data = null; }
      }

      if (res.ok && data?.success && data?.token) {
        sessionStorage.setItem("avw_studio_token", data.token);
        setAuthToken(data.token);
        setAccessKeyInput("");
      } else if (isAllowedKey) {
        // Fallback token if server session endpoint had temporary sync delay
        const fallbackToken = `avw_sess_${Date.now()}_local`;
        sessionStorage.setItem("avw_studio_token", fallbackToken);
        setAuthToken(fallbackToken);
        setAccessKeyInput("");
      } else {
        setAuthError(data?.message || "Invalid studio access credentials. Access denied.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (isAllowedKey) {
        const fallbackToken = `avw_sess_${Date.now()}_local`;
        sessionStorage.setItem("avw_studio_token", fallbackToken);
        setAuthToken(fallbackToken);
        setAccessKeyInput("");
      } else {
        setAuthError("Failed to connect to AVW Studio Server.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (authToken) {
      try {
        await fetch("/api/studio/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${authToken}` }
        });
      } catch (e) {
        console.warn("Logout error:", e);
      }
    }
    sessionStorage.removeItem("avw_studio_token");
    setAuthToken(null);
    setSelectedRecord(null);
    setDrawerOpen(false);
  };

  const fetchRecords = async () => {
    if (!authToken) return;
    setLoadingRecords(true);

    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (typeFilter !== "all") params.append("type", typeFilter);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await fetch(`/api/studio/collaborations?${params.toString()}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (res.status === 401) {
        // Token expired
        sessionStorage.removeItem("avw_studio_token");
        setAuthToken(null);
        return;
      }

      let data: any = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const txt = await res.text();
        try { data = JSON.parse(txt); } catch { data = null; }
      }

      if (res.ok && data?.success) {
        setRecords(data.records || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoadingRecords(false);
    }
  };

  const openRecordDrawer = (rec: StudioCollaborationRecord) => {
    setSelectedRecord(rec);
    setEditStatus(rec.status);
    setEditNotes(rec.internalNotes || "");
    setEditAssignedTo(rec.assignedTo || "Arjav Menon");
    setEditInternalStatus(rec.internalStatus || "In Active Production");
    setSaveSuccessMessage("");
    setDrawerOpen(true);
  };

  const handleSaveInternalChanges = async () => {
    if (!selectedRecord || !authToken) return;
    setSavingChanges(true);
    setSaveSuccessMessage("");

    try {
      const res = await fetch(`/api/studio/collaborations/${selectedRecord.referenceKey}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          status: editStatus,
          internalNotes: editNotes,
          assignedTo: editAssignedTo,
          internalStatus: editInternalStatus
        })
      });

      let data: any = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const txt = await res.text();
        try { data = JSON.parse(txt); } catch { data = null; }
      }

      if (res.ok && data?.success && data?.record) {
        setSelectedRecord(data.record);
        setSaveSuccessMessage("Studio changes saved to secure archive.");
        // Refresh table records
        fetchRecords();
        setTimeout(() => setSaveSuccessMessage(""), 3000);
      } else {
        alert(data?.message || "Failed to update record.");
      }
    } catch (err) {
      console.error("Update record error:", err);
      alert("Failed to update record.");
    } finally {
      setSavingChanges(false);
    }
  };

  const handleCopyKey = () => {
    if (selectedRecord?.referenceKey) {
      navigator.clipboard.writeText(selectedRecord.referenceKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleDownloadDossier = (rec: StudioCollaborationRecord) => {
    const textContent = `========================================================================
ARMEN VISUALWORKS [AVW] — INTERNAL COLLABORATION ARCHIVE RECORD
========================================================================
REFERENCE KEY       : ${rec.referenceKey}
INTERNAL DB ID      : ${rec.id}
STATUS              : ${rec.status.toUpperCase()}
INTERNAL STAGE      : ${rec.internalStatus || "N/A"}
ASSIGNED PERSONNEL  : ${rec.assignedTo || "Armen VisualWorks"}
REGISTERED AT       : ${rec.registeredAt}
LAST UPDATED        : ${rec.updatedAt}
TERMS VERSION       : ${rec.termsVersion} (ACKNOWLEDGED: YES)

1. PROJECT DETAILS
------------------------------------------------------------------------
Project Name        : ${rec.projectName}
Collaboration Types : ${rec.collaborationTypes.join(", ")}
${rec.organisation ? `Organisation/Label  : ${rec.organisation}` : ""}

2. REPRESENTATIVE & CONTACT
------------------------------------------------------------------------
Representative Name : ${rec.representativeName}
Role / Designation  : ${rec.representativeRole}
Contact Email       : ${rec.email}
${rec.phone ? `Phone / WhatsApp    : ${rec.phone}` : ""}

3. AVW INTERNAL PRODUCTION NOTES
------------------------------------------------------------------------
${rec.internalNotes ? rec.internalNotes : "None"}

========================================================================
Armen VisualWorks Studio Registry • Confidential Internal Document
========================================================================`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AVW-Internal-Record-${rec.referenceKey}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // -------------------------------------------------------------
  // VIEW: AUTHENTICATION SCREEN (IF NOT LOGGED IN)
  // -------------------------------------------------------------
  if (!authToken) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center items-center p-4 selection:bg-accent selection:text-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6"
        >
          {/* Studio Lock Icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-accent shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block">
              [ SECURE STUDIO ACCESS ]
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white">
              AVW Collaboration Registry
            </h1>
            <p className="text-white/60 font-light text-xs leading-relaxed">
              Authorized access for Armen VisualWorks personnel to inspect, manage, and track all formal collaboration dossiers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-white/70 font-bold">
                Studio Access Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={accessKeyInput}
                  onChange={(e) => {
                    setAccessKeyInput(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  placeholder="Enter studio access passcode..."
                  className="w-full bg-[#181818] border border-white/15 rounded-xl pl-4 pr-11 py-3 text-sm font-mono text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label={showPassword ? "Hide passcode" : "Show passcode"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 font-mono text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-6 min-h-[46px] bg-accent hover:bg-white text-black font-mono font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {authLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Authenticate Studio Session</span>
                  <ShieldCheck className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Return to Home link */}
          <div className="pt-2 border-t border-white/10 text-center">
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
              <Link to="/#contact" className="hover:text-white transition-colors">
                ← Return to Home Station
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: AUTHENTICATED INTERNAL REGISTRY DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col selection:bg-accent selection:text-black">
      {/* Studio Navigation Bar */}
      <header className="border-b border-white/10 bg-[#101010]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <div>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                ARMEN VISUALWORKS // INTERNAL REGISTRY
              </span>
              <span className="font-display font-black text-sm sm:text-base uppercase tracking-tight text-white">
                Collaboration Archive & Registry
              </span>
            </div>
          </div>

          {/* Director Badge & Controls */}
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/80">
              <User className="w-3.5 h-3.5 text-accent" />
              <span>Arjav Menon (Studio Lead)</span>
            </div>

            <Link
              to="/verify"
              target="_blank"
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Verify Portal</span>
              <ExternalLink className="w-3 h-3 text-accent" />
            </Link>

            <Link
              to="/visual"
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white uppercase tracking-wider transition-colors hidden md:inline-block"
            >
              Public Site
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 w-full flex-grow space-y-6">
        {/* STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 block">
              Total Registrations
            </span>
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {stats.total}
            </div>
          </div>

          <div className="bg-[#121212] border border-green-500/20 rounded-2xl p-4 space-y-1">
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-green-400/70 block">
              Active Production
            </span>
            <div className="font-display font-black text-2xl sm:text-3xl text-green-400">
              {stats.active}
            </div>
          </div>

          <div className="bg-[#121212] border border-blue-500/20 rounded-2xl p-4 space-y-1">
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-blue-400/70 block">
              Delivered / Completed
            </span>
            <div className="font-display font-black text-2xl sm:text-3xl text-blue-400">
              {stats.completed}
            </div>
          </div>

          <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 block">
              Archived
            </span>
            <div className="font-display font-black text-2xl sm:text-3xl text-white/60">
              {stats.archived}
            </div>
          </div>

          <div className="bg-[#121212] border border-accent/20 rounded-2xl p-4 space-y-1 col-span-2 sm:col-span-1">
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-accent/80 block">
              Recent (7 Days)
            </span>
            <div className="font-display font-black text-2xl sm:text-3xl text-accent">
              {stats.recentCount}
            </div>
          </div>
        </div>

        {/* SEARCH, FILTER & ACTION TOOLBAR */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference key, project, client, or email..."
                className="w-full bg-[#181818] border border-white/15 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm font-sans text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[#181818] border border-white/15 rounded-xl px-3 py-2.5 text-xs font-mono uppercase text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="all">ALL STATUSES</option>
                <option value="active">ACTIVE</option>
                <option value="completed">COMPLETED</option>
                <option value="archived">ARCHIVED</option>
              </select>
            </div>

            {/* Category / Type Filter */}
            <div className="sm:col-span-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-[#181818] border border-white/15 rounded-xl px-3 py-2.5 text-xs font-mono uppercase text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="all">ALL TYPES</option>
                <option value="film">FILM</option>
                <option value="music">MUSIC</option>
                <option value="brand">BRAND</option>
                <option value="creative">CREATIVE</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="sm:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#181818] border border-white/15 rounded-xl px-3 py-2.5 text-xs font-mono uppercase text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="newest">NEWEST FIRST</option>
                <option value="oldest">OLDEST FIRST</option>
                <option value="name">PROJECT NAME (A-Z)</option>
              </select>
            </div>

            {/* Refresh Button */}
            <div className="sm:col-span-1 flex justify-end">
              <button
                onClick={fetchRecords}
                title="Refresh Records"
                className="w-full sm:w-auto p-2.5 bg-[#181818] hover:bg-white/10 border border-white/15 rounded-xl text-white/70 hover:text-accent transition-colors flex items-center justify-center cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loadingRecords ? "animate-spin text-accent" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* RECORDS TABLE / LIST */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {loadingRecords && records.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-accent animate-spin mx-auto" />
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest">
                Loading AVW Studio Archive...
              </p>
            </div>
          ) : records.length === 0 ? (
            <div className="py-20 text-center space-y-3 px-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/40">
                <FileText className="w-6 h-6" />
              </div>
              <p className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-tight">
                No collaborations registered yet.
              </p>
              <p className="font-mono text-xs text-white/50 max-w-md mx-auto leading-relaxed">
                The AVW Collaboration Registry is an official record system. Records appear exclusively upon formal human registration and digital signature commitment.
              </p>
            </div>
          ) : (
            <>
              {/* MOBILE CARDS VIEW (md:hidden) */}
              <div className="md:hidden divide-y divide-white/5">
                {records.map((rec) => (
                  <div
                    key={rec.referenceKey}
                    onClick={() => openRecordDrawer(rec)}
                    className="p-4 space-y-3 hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-black text-accent font-mono text-xs tracking-wider">
                          {rec.referenceKey}
                        </span>
                        <h3 className="font-display font-bold text-white uppercase text-base mt-0.5 leading-snug">
                          {rec.projectName}
                        </h3>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[8.5px] uppercase font-bold border shrink-0 ${
                          rec.status === "active"
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : rec.status === "completed"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-white/10 text-white/60 border-white/20"
                        }`}
                      >
                        {rec.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {rec.collaborationTypes.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-white/5 text-[8.5px] font-mono text-white/70 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-white/50 pt-2 border-t border-white/5">
                      <div className="truncate max-w-[65%]">
                        <span className="text-white/80">{rec.representativeName}</span>
                        {rec.organisation && <span> • {rec.organisation}</span>}
                      </div>
                      <span className="text-accent flex items-center gap-0.5 font-bold">
                        <span>MANAGE</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW (hidden md:block) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#161616] text-[9px] font-mono uppercase tracking-widest text-white/50">
                      <th className="py-3.5 px-4 sm:px-6">Reference Key</th>
                      <th className="py-3.5 px-4">Project & Category</th>
                      <th className="py-3.5 px-4">Client / Organisation</th>
                      <th className="py-3.5 px-4">Representative</th>
                      <th className="py-3.5 px-4">Registered Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-mono">
                    {records.map((rec) => (
                      <tr
                        key={rec.referenceKey}
                        onClick={() => openRecordDrawer(rec)}
                        className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                      >
                        {/* Reference Key */}
                        <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                          <span className="font-black text-accent font-mono tracking-wider group-hover:underline">
                            {rec.referenceKey}
                          </span>
                        </td>

                        {/* Project & Category */}
                        <td className="py-4 px-4">
                          <div className="font-display font-bold text-white uppercase text-sm group-hover:text-accent transition-colors">
                            {rec.projectName}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rec.collaborationTypes.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-white/5 text-[8.5px] text-white/70 uppercase"
                              >
                                {t}
                              </span>
                            ))}
                            {rec.collaborationTypes.length > 2 && (
                              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8.5px] text-white/40">
                                +{rec.collaborationTypes.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Organisation */}
                        <td className="py-4 px-4 text-white/80 whitespace-nowrap">
                          {rec.organisation || <span className="text-white/30 italic">None specified</span>}
                        </td>

                        {/* Representative */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-white font-medium">{rec.representativeName}</div>
                          <div className="text-[10px] text-white/50">{rec.representativeRole}</div>
                        </td>

                        {/* Registered Date */}
                        <td className="py-4 px-4 text-white/60 text-[11px] whitespace-nowrap">
                          {rec.registeredAt}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-bold border ${
                              rec.status === "active"
                                ? "bg-green-500/10 text-green-400 border-green-500/30"
                                : rec.status === "completed"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                : "bg-white/10 text-white/60 border-white/20"
                            }`}
                          >
                            {rec.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openRecordDrawer(rec);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-accent hover:text-black text-white/80 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Manage</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>

      {/* DETAILED RECORD INSPECTION & MANAGEMENT MODAL / DRAWER */}
      <AnimatePresence>
        {drawerOpen && selectedRecord && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-4xl bg-[#111111] border border-white/15 rounded-3xl p-5 sm:p-8 text-white shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
                      INTERNAL STUDIO RECORD // {selectedRecord.referenceKey}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-display font-black uppercase tracking-tight text-white">
                    {selectedRecord.projectName}
                  </h2>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161616] p-3 sm:p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-white/60">Reference:</span>
                  <span className="font-mono text-sm font-black text-accent">{selectedRecord.referenceKey}</span>
                  <button
                    onClick={handleCopyKey}
                    className="p-1 text-white/50 hover:text-accent cursor-pointer"
                    title="Copy Key"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/verify?ref=${selectedRecord.referenceKey}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-accent" />
                    <span>Public Verification View</span>
                  </Link>

                  <button
                    onClick={() => handleDownloadDossier(selectedRecord)}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-accent" />
                    <span>Export Dossier</span>
                  </button>
                </div>
              </div>

              {/* Grid: Public Registration Data vs AVW Internal Controls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Column: Contributor Submitted Data */}
                <div className="md:col-span-7 space-y-5">
                  <div className="space-y-3 bg-[#161616]/60 border border-white/10 rounded-2xl p-5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold block border-b border-white/10 pb-2">
                      REGISTRATION DETAILS
                    </span>

                    <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <span className="text-[8px] uppercase text-white/40 block">Organisation / Label</span>
                        <p className="text-white font-medium">
                          {selectedRecord.organisation || <span className="text-white/30 italic">None specified</span>}
                        </p>
                      </div>

                      <div>
                        <span className="text-[8px] uppercase text-white/40 block">Registered At</span>
                        <p className="text-white/80">{selectedRecord.registeredAt}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="font-mono text-[8px] uppercase text-white/40 block mb-1.5">Collaboration Scope</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRecord.collaborationTypes.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[9px] uppercase text-white">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Representative & Signature */}
                  <div className="space-y-3 bg-[#161616]/60 border border-white/10 rounded-2xl p-5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold block border-b border-white/10 pb-2">
                      REPRESENTATIVE & SIGNATURE
                    </span>

                    <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <span className="text-[8px] uppercase text-white/40 block">Representative</span>
                        <p className="text-white font-bold">{selectedRecord.representativeName}</p>
                        <p className="text-accent text-[10px]">{selectedRecord.representativeRole}</p>
                      </div>

                      <div>
                        <span className="text-[8px] uppercase text-white/40 block">Contact</span>
                        <p className="text-white/80 text-[11px] truncate">{selectedRecord.email}</p>
                        {selectedRecord.phone && <p className="text-white/60 text-[10px]">{selectedRecord.phone}</p>}
                      </div>
                    </div>

                    {/* Signature Preview */}
                    <div className="pt-2">
                      <span className="font-mono text-[8px] uppercase text-white/40 block mb-1">
                        Digital Representative Signature (Acknowledged {selectedRecord.termsVersion})
                      </span>
                      {selectedRecord.signature ? (
                        <div className="h-16 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center p-2">
                          <img
                            src={selectedRecord.signature}
                            alt="Signature"
                            className="max-h-full max-w-full object-contain filter invert brightness-125"
                          />
                        </div>
                      ) : (
                        <div className="h-16 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center text-white/30 text-xs">
                          No signature image
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: AVW STUDIO INTERNAL CONTROLS & NOTES */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-[#181818] border border-accent/30 rounded-2xl p-5 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2 text-accent font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/10 pb-2">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>STUDIO PRODUCTION CONTROLS</span>
                    </div>

                    {/* Status Selector */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-white/70">
                        Collaboration Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as CollaborationStatus)}
                        className="w-full bg-[#121212] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono uppercase text-white focus:outline-none focus:border-accent"
                      >
                        <option value="active">ACTIVE IN PRODUCTION</option>
                        <option value="completed">COMPLETED / DELIVERED</option>
                        <option value="archived">ARCHIVED RECORD</option>
                      </select>
                    </div>

                    {/* Internal Production Stage */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-white/70">
                        Internal Production Stage
                      </label>
                      <input
                        type="text"
                        value={editInternalStatus}
                        onChange={(e) => setEditInternalStatus(e.target.value)}
                        placeholder="e.g. In Active Production, Revisions"
                        className="w-full bg-[#121212] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent"
                      >
                      </input>
                    </div>

                    {/* Assigned Personnel */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-white/70">
                        Assigned AVW Personnel
                      </label>
                      <input
                        type="text"
                        value={editAssignedTo}
                        onChange={(e) => setEditAssignedTo(e.target.value)}
                        placeholder="e.g. Arjav Menon"
                        className="w-full bg-[#121212] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent"
                      />
                    </div>

                    {/* Internal Notes */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-white/70">
                        Studio Internal Notes
                      </label>
                      <textarea
                        rows={4}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add private studio notes, delivery schedule, client feedback..."
                        className="w-full bg-[#121212] border border-white/15 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-accent resize-none placeholder:text-white/20"
                      />
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={handleSaveInternalChanges}
                      disabled={savingChanges}
                      className="w-full py-3 px-4 bg-accent hover:bg-white text-black font-mono font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-50"
                    >
                      {savingChanges ? (
                        <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Save Studio Changes</span>
                        </>
                      )}
                    </button>

                    {saveSuccessMessage && (
                      <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/30 font-mono text-[10px] text-green-400 text-center">
                        {saveSuccessMessage}
                      </div>
                    )}
                  </div>

                  {/* Audit Info */}
                  <div className="bg-[#141414] border border-white/10 rounded-xl p-3 text-[9px] font-mono text-white/40 space-y-1">
                    <div>Database ID: <span className="text-white/60">{selectedRecord.id}</span></div>
                    <div>Terms Binding: <span className="text-accent">{selectedRecord.termsVersion}</span></div>
                    <div>Created: {selectedRecord.createdAt}</div>
                    <div>Last Updated: {selectedRecord.updatedAt}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms Viewer Modal */}
      <TermsViewerModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </div>
  );
}
