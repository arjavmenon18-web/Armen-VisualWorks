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
import { motion, useScroll, useSpring } from "motion/react";
import { Sparkles } from "lucide-react";

import PixelChatbot from "./components/PixelChatbot";
import { useState } from "react";

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-x-hidden bg-bg">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />
      
      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[1] hidden md:block">
        <div className="absolute inset-y-0 left-12 border-l border-ink h-full" />
        <div className="absolute inset-y-0 right-12 border-r border-ink h-full" />
        <div className="absolute inset-x-0 top-10 border-t border-ink w-full" />
        <div className="absolute inset-x-0 bottom-10 border-b border-ink w-full" />
      </div>

      <div className="relative z-10 font-sans">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <CreativeShowcase />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <ImageGuard />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/project/:id" element={<ProjectView />} />
      </Routes>

      {/* Pixel Chatbot Popup */}
      <PixelChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating UI Elements - Common across all pages */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative pointer-events-auto cursor-pointer scale-75 md:scale-100"
          onClick={() => setIsChatOpen(true)}
        >
          <svg className="w-32 h-32 text-ink/10 fill-current" viewBox="0 0 100 100">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text className="text-[12px] uppercase font-black tracking-widest">
              <textPath href="#circlePath">Work with Armen VisualWorks • </textPath>
            </text>
          </svg>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg border-4 border-bg group"
            id="style-advisor-trigger"
          >
            <Sparkles className="w-5 h-5 text-ink animate-pulse" />
          </div>
        </motion.div>
      </div>
    </Router>
  );
}

