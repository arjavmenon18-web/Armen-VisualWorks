import { motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,padding,border-color] duration-500 force-gpu ${
        isScrolled ? "bg-bg/80 backdrop-blur-xl border-b border-ink/5 py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.a
          id="logo"
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[clamp(14px,4.5vw,20px)] md:text-xl font-black tracking-tighter uppercase flex items-center gap-1 max-w-[60vw]"
        >
          Armen VisualWorks
        </motion.a>

        {/* Desktop Links */}
        <div id="desktop-nav" className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                i === 0 ? "border-b border-ink" : "opacity-40 hover:opacity-100"
              }`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-toggle"
          className="md:hidden flex items-center justify-center p-2 text-ink group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            y: isMobileMenuOpen ? 0 : -20
          }}
          className={`md:hidden absolute top-full left-0 w-full bg-bg border-b border-ink/10 px-6 py-12 transition-all duration-300 pointer-events-none z-50 shadow-2xl ${isMobileMenuOpen ? "pointer-events-auto block" : "hidden"}`}
        >
          <div className="flex flex-col gap-8 items-center max-w-[90vw] mx-auto text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-ink active:scale-95 transition-transform py-2 w-full"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full max-w-xs mt-4 py-5 bg-accent text-ink rounded-full text-sm font-black uppercase tracking-[0.3em] active:scale-95 transition-transform">
              Start a project
            </button>
          </div>
        </motion.div>
    </nav>
  );
}
