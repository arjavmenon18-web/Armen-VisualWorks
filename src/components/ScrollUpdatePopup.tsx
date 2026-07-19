import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Globe, ShieldAlert, Sparkles, X, RefreshCw, ChevronRight } from "lucide-react";

export default function ScrollUpdatePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [percentDone, setPercentDone] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Total duration: 2 hours (7200 seconds)
  const TOTAL_DURATION = 7200;

  useEffect(() => {
    // Scroll detection to trigger popup
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 15) {
        setHasScrolled(true);
        setIsVisible(true);
        // Save first trigger time if not already set
        if (!localStorage.getItem("domain_update_start_time")) {
          localStorage.setItem("domain_update_start_time", Date.now().toString());
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  useEffect(() => {
    // If we have a start time stored, use it to calculate exact time left
    const startStr = localStorage.getItem("domain_update_start_time");
    let initialTimeLeft = TOTAL_DURATION;

    if (startStr) {
      const startTime = parseInt(startStr, 10);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      if (elapsed < TOTAL_DURATION) {
        initialTimeLeft = TOTAL_DURATION - elapsed;
      } else {
        // If 2 hours passed, let it sit at 0 so it stays complete and irreversible
        initialTimeLeft = 0;
      }
    }

    setTimeLeft(initialTimeLeft);
    setPercentDone(((TOTAL_DURATION - initialTimeLeft) / TOTAL_DURATION) * 100);

    // Live Ticking
    timerRef.current = setInterval(() => {
      const currentStartStr = localStorage.getItem("domain_update_start_time");
      if (currentStartStr) {
        const startTime = parseInt(currentStartStr, 10);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = TOTAL_DURATION - elapsed;

        if (remaining > 0) {
          setTimeLeft(remaining);
          setPercentDone(((TOTAL_DURATION - remaining) / TOTAL_DURATION) * 100);
        } else {
          // Keep at zero/completed state
          setTimeLeft(0);
          setPercentDone(100);
        }
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hrs.toString().padStart(2, "0"),
      minutes: mins.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <>
      {/* Scroll Indicator helper when page loads */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-ink text-bg px-5 py-3 rounded-full border border-white/20 shadow-xl flex items-center gap-3 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-[10px] uppercase font-black tracking-widest">Scroll to start UI Update</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Alert Modal Overlay */}
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            {/* Blurry Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/75 backdrop-blur-xl"
              onClick={() => setIsMinimized(true)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg bg-bg text-ink rounded-[2.5rem] border-2 border-accent/30 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] z-10"
            >
              {/* Gold Glow Header Pattern */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent via-yellow-300 to-accent" />
              
              <div className="p-8 md:p-10 flex flex-col items-center text-center">
                
                {/* Globe / Lock Icon Indicator */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse" />
                  <div className="w-20 h-20 bg-ink text-accent rounded-full flex items-center justify-center shadow-lg border border-accent/30 relative">
                    <Globe className="w-9 h-9 animate-spin [animation-duration:15s]" />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent text-ink rounded-full flex items-center justify-center shadow-md border-2 border-bg">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="text-xl md:text-3xl font-display font-black uppercase tracking-tight text-ink mb-3 leading-none">
                  {timeLeft === 0 ? "UI UPGRADE" : "UI UPGRADE"}<br />
                  <span className="text-accent">{timeLeft === 0 ? "COMPLETED" : "IN PROGRESS"}</span>
                </h3>

                {/* Subtext explaining the new purchased domain */}
                <p className="text-xs md:text-sm font-sans text-ink/70 max-w-sm mb-8 leading-relaxed">
                  {timeLeft === 0 
                    ? "The fresh, remastered user interface has successfully deployed! Re-establishing database sockets and syncing asset pipelines."
                    : "I recently bought a custom domain and am rolling out an entirely fresh, remastered user interface! Please wait 2 hours while the system update deploys globally."}
                </p>

                {/* Live Digital Clock Countdown */}
                <div className="w-full bg-ink text-bg py-5 px-6 rounded-2xl mb-6 shadow-inner relative overflow-hidden border border-white/10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(245,179,53,0.15),transparent_70%)] pointer-events-none" />
                  <div className="flex justify-center items-center gap-4 font-mono select-none">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-black text-accent tracking-widest">{hours}</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/40 mt-1">Hours</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-accent/50 animate-pulse -translate-y-2">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-black text-accent tracking-widest">{minutes}</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/40 mt-1">Mins</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-accent/50 animate-pulse -translate-y-2">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-black text-accent tracking-widest">{seconds}</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/40 mt-1">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full mb-8">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-ink/50 mb-2 tracking-widest">
                    <span>{timeLeft === 0 ? "UI Remaster Live" : "Deploying UI Remaster"}</span>
                    <span>{percentDone.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentDone}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="w-full flex flex-col gap-3">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="w-full py-4 bg-ink text-bg font-sans font-black text-xs uppercase tracking-widest rounded-xl hover:bg-accent hover:text-ink transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{timeLeft === 0 ? "Enter Remastered Site" : "Browse with upgrade warning"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex justify-end items-center px-2 mt-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>{timeLeft === 0 ? "Systems Operational" : "SSL Certified"}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistent Bottom Float Banner when Minimized */}
      <AnimatePresence>
        {(isMinimized || (isVisible && !isMinimized)) && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: isMinimized ? 1 : 0, 
              y: isMinimized ? 0 : 50,
              scale: isMinimized ? 1 : 0.9,
              pointerEvents: isMinimized ? "auto" : "none"
            }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 left-6 z-[200]"
          >
            <button
              onClick={() => setIsMinimized(false)}
              className="bg-ink hover:bg-accent border border-white/10 hover:border-accent text-bg hover:text-ink p-4 rounded-3xl flex items-center gap-4 shadow-2xl transition-all duration-300 group"
            >
              <div className="relative">
                <Globe className="w-5 h-5 animate-spin [animation-duration:10s]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent border-2 border-ink rounded-full group-hover:bg-ink group-hover:border-accent" />
              </div>
              <div className="flex flex-col items-start pr-2">
                <span className="text-[8px] uppercase tracking-widest font-black opacity-50">
                  {timeLeft === 0 ? "Remaster Live" : "UI Update"}
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-accent group-hover:text-ink">
                  {timeLeft === 0 ? "Active" : `${hours}:${minutes}:${seconds}`}
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
