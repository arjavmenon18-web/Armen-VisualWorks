/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImageGuard from "./components/ImageGuard";
import About from "./components/About";
import Projects from "./components/Projects";
import CreativeShowcase from "./components/CreativeShowcase";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import ProjectView from "./components/ProjectView";
import VisualWorks from "./components/VisualWorks";
import SoundWorks from "./components/SoundWorks";
import ScrollToTop from "./components/ScrollToTop";
import { motion, useScroll, useSpring } from "motion/react";
import { Sparkles } from "lucide-react";

import PixelChatbot from "./components/PixelChatbot";
import DisclaimerModal from "./components/DisclaimerModal";
import { useState } from "react";

interface PortfolioProps {
  isExpanded: boolean;
  onExpand: () => void;
}

function Portfolio({ isExpanded, onExpand }: PortfolioProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`relative overflow-x-hidden bg-[#F5F2EB] ${isExpanded ? "" : "h-screen w-screen overflow-hidden"}`}>
      {/* Progress Bar */}
      {isExpanded && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#f9b934] z-[60] origin-left"
          style={{ scaleX }}
        />
      )}
      
      {/* Background Grid Lines (only when expanded to keep locked view stark) */}
      {isExpanded && (
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[1] hidden md:block">
          <div className="absolute inset-y-0 left-12 border-l border-black h-full" />
          <div className="absolute inset-y-0 right-12 border-r border-black h-full" />
          <div className="absolute inset-x-0 top-10 border-t border-black w-full" />
          <div className="absolute inset-x-0 bottom-10 border-b border-black w-full" />
        </div>
      )}

      <div className="relative z-10 font-sans">
        {isExpanded && <Navbar />}
        <main>
          <Hero isExpanded={isExpanded} onExpand={onExpand} />
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <About />
              <Projects />
              <CreativeShowcase />
              <Contact />
            </motion.div>
          )}
        </main>
        {isExpanded && <Footer />}
      </div>
    </div>
  );
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <ImageGuard />
      <DisclaimerModal />
      <Routes>
        <Route path="/" element={<Portfolio isExpanded={isExpanded} onExpand={handleExpand} />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/project/:id" element={<ProjectView />} />
        <Route path="/visual" element={<VisualWorks />} />
        <Route path="/sound" element={<SoundWorks />} />
      </Routes>

      {/* Pixel Chatbot Popup */}
      <PixelChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onExpand={handleExpand} />

      {/* Floating UI Elements - Common across all pages */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group cursor-pointer"
          onClick={() => setIsChatOpen(true)}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <svg className="w-20 h-20 md:w-32 md:h-32 text-black/10 fill-current opacity-45 md:opacity-100" viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[8.5px] md:text-[9.5px] uppercase font-black tracking-[0.14em] fill-black/60">
                <textPath href="#circlePath">• Work with Armen GlobalWorks • Work with Armen GlobalWorks </textPath>
              </text>
            </svg>
          </motion.div>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 bg-[#F5F2EB] rounded-full flex items-center justify-center shadow-2xl border border-black/10 hover:border-[#f9b934] transition-all"
            id="style-advisor-trigger"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-black hover:text-[#f9b934] animate-pulse" />
          </div>
        </motion.button>
      </div>
    </Router>
  );
}
