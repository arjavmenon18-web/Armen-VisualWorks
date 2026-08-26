import { motion } from "motion/react";
import { ArrowUpRight, Menu, X, Lock, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 force-gpu ${
        isScrolled 
          ? "bg-bg/90 backdrop-blur-2xl border-b border-ink/10 py-2.5 sm:py-3 md:py-4 shadow-sm" 
          : "bg-transparent py-4 sm:py-6 md:py-8"
      }`}
      style={{ paddingTop: `calc(${isScrolled ? '0.5rem' : '1rem'} + env(safe-area-inset-top))` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        <motion.a
          id="logo"
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[13px] sm:text-base md:text-lg font-black tracking-tighter uppercase flex items-center gap-1.5 max-w-[65vw] truncate text-ink"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
          <span>Armen GlobalWorks</span>
        </motion.a>

        {/* Desktop Links */}
        <div id="desktop-nav" className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                i === 0 ? "border-b border-ink" : "opacity-60 hover:opacity-100"
              }`}
            >
              {link.name}
            </motion.a>
          ))}
          <a
            href="/#contact"
            className="px-4 py-2 bg-ink hover:bg-accent text-white hover:text-black rounded-full font-mono text-[9px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-toggle"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-ink/5 active:bg-ink/15 text-ink transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden fixed inset-x-0 top-0 h-[100dvh] bg-[#F5F2EB] z-40 flex flex-col justify-between p-6 overflow-y-auto"
          style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top))', paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
        >
          <div className="flex flex-col gap-5 items-center w-full max-w-sm mx-auto text-center mt-4">
            <span className="text-[9px] font-mono tracking-[0.3em] font-black uppercase text-black/40">
              NAVIGATION INDEX
            </span>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-display font-black uppercase tracking-tight text-ink active:text-accent transition-colors py-2.5 w-full border-b border-black/5"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full mt-4 py-4 min-h-[48px] bg-ink text-white active:bg-accent active:text-black rounded-full font-mono font-black uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Portal Shortcuts on Mobile Drawer */}
          <div className="w-full max-w-sm mx-auto pt-6 border-t border-black/10 flex flex-col gap-3 font-mono text-[9px] uppercase tracking-wider text-black/60">
            <div className="flex justify-between items-center">
              <Link
                to="/verify"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 hover:text-black active:text-accent py-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Verify Collaboration</span>
              </Link>
              
              <Link
                to="/studio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 hover:text-black active:text-accent py-2"
              >
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span>Team Portal</span>
              </Link>
            </div>
            
            <div className="text-[8px] text-black/40 text-center">
              ARMEN GLOBALWORKS [AGW] // MOBILE VER 2.6
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
