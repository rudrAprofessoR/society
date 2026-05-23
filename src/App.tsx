import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocietyIntro from "./components/SocietyIntro";
import GravityCaseStudy from "./components/GravityCaseStudy";
import SocialMisinfo from "./components/SocialMisinfo";
import Simulator3D from "./components/Simulator3D";
import DebateConsole from "./components/DebateConsole";
import BeliefTimeline from "./components/BeliefTimeline";
import FutureSimulation from "./components/FutureSimulation";
import Conclusion from "./components/Conclusion";
import DustMotesBg from "./components/DustMotesBg";
import VintageSynth from "./components/VintageSynth";

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("UNROLLING ANCIENT MANUSCRIPTS...");

  // Loading screen simulation thrum (Historical style)
  useEffect(() => {
    const texts = [
      "UNROLLING ANCIENT HELIOCENTRIC MANUSCRIPTS...",
      "DECRYPTING INQUISITION TRIAL TRANSCRIPTS...",
      "TRANSLATING HERBALIST DIARIES...",
      "CLEANING ARCHIVAL GLASS VITRINES...",
      "TUNING THE CABINET RECORD NEEDLE...",
      "CURATING CABINET OF CURIOSITIES. COMMENCING ENTRY..."
    ];

    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 350);
          return 100;
        }
        
        const textIdx = Math.floor((next / 100) * texts.length);
        if (texts[textIdx]) {
          setLoadingText(texts[textIdx]);
        }
        
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-full bg-sepia-dark z-50 flex flex-col items-center justify-center vintage-scanlines select-none"
          >
            {/* Elegant Vintage Loader */}
            <div className="relative flex flex-col items-center max-w-sm w-full px-8 text-center">
              
              {/* Rotating Armillary Silhouette Ring */}
              <div className="relative flex items-center justify-center w-24 h-24 mb-10">
                <BookOpen className="absolute w-10 h-10 text-gold-glowing animate-pulse" />
                <div className="absolute w-20 h-20 rounded-full border border-dashed border-gold-glowing/25 animate-spin" style={{ animationDuration: "20s" }} />
                <div className="absolute w-24 h-24 rounded-full border border-gold-glowing/10 animate-spin" style={{ animationDuration: "40s", animationDirection: "reverse" }} />
              </div>

              {/* Loader Title */}
              <h1 className="font-cinzel font-black text-xl text-parchment tracking-[0.2em] uppercase mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Cabinet of Skeptics
              </h1>
              <span className="font-playfair text-[9px] text-gold-glowing/60 tracking-[0.25em] uppercase italic mb-8 block">
                Historical Society & Science Exhibition
              </span>

              {/* Progress Bar (Cast iron gold rail) */}
              <div className="w-full h-[2px] bg-sepia-medium rounded-full overflow-hidden border border-gold-glowing/5 mb-4 relative">
                <div 
                  className="h-full bg-gold-glowing shadow-gold-glow transition-all duration-100"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>

              {/* Dynamic Decrypting status */}
              <div className="h-6 flex items-center justify-center">
                <span className="font-cinzel text-[8px] text-parchment-dark/75 tracking-[0.15em] uppercase animate-pulse">
                  {loadingText}
                </span>
              </div>
              <span className="font-mono text-[9px] text-gold-glowing/50 mt-1 block">
                {loadProgress}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Experience Layout */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full flex flex-col"
        >
          {/* Universal Golden Dust Particle Field */}
          <DustMotesBg />

          {/* Universal Ambient Audio Controller */}
          <VintageSynth />

          {/* Core Floating Navigation Bar */}
          <Navbar />

          {/* Application Page Sections */}
          <div id="hero-section">
            <Hero />
          </div>

          <div id="intro-section">
            <SocietyIntro />
          </div>

          <div id="timeline-section">
            <BeliefTimeline />
          </div>

          <div id="case-study-section">
            <GravityCaseStudy />
          </div>

          <div id="misinfo-section">
            <SocialMisinfo />
          </div>

          <div id="simulator-section">
            <Simulator3D />
          </div>

          <div id="debate-section">
            <DebateConsole />
          </div>

          <div id="future-section">
            <FutureSimulation />
          </div>

          <div id="conclusion-section">
            <Conclusion />
          </div>
        </motion.div>
      )}
    </>
  );
};
export default App;
