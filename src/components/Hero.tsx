import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import soundEngine from "../utils/audio";

export const Hero: React.FC = () => {
  const handleEnterExhibition = () => {
    soundEngine.playClick();
    const element = document.getElementById("intro-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-height-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden aged-paper-overlay vintage-scanlines">
      
      {/* Decorative Ancient Framing corners */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-gold-glowing/25 pointer-events-none" />
      <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-gold-glowing/25 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-gold-glowing/25 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-gold-glowing/25 pointer-events-none" />

      {/* Decorative parchment background elements (SVGs representing aged astronomical and compass systems) */}
      <div className="absolute w-[800px] h-[800px] rounded-full border border-gold-glowing/5 flex items-center justify-center opacity-30 pointer-events-none select-none z-0">
        <div className="w-[600px] h-[600px] rounded-full border border-dashed border-gold-glowing/5 flex items-center justify-center" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-gold-glowing/10 flex items-center justify-center animate-spin" style={{ animationDuration: "120s" }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center select-none">
        
        {/* Curatorial Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-glowing/15 bg-sepia-medium/40 backdrop-blur-md mb-8"
        >
          <BookOpen className="w-3.5 h-3.5 text-gold-glowing animate-pulse" />
          <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.25em] text-gold-glowing/80 uppercase font-bold">
            Interactive Curated Exhibition
          </span>
        </motion.div>

        {/* Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl tracking-[0.12em] uppercase leading-tight select-none mb-4"
        >
          <span className="block text-parchment drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">SCIENCE</span>
          <span className="block text-[14px] sm:text-[18px] tracking-[0.6em] text-gold-glowing/60 my-3 font-medium font-lora italic lowercase">versus</span>
          <span className="block text-crimson-bright drop-shadow-[0_2px_10px_rgba(92,24,24,0.3)]">ANTI-SCIENCE</span>
        </motion.h1>

        {/* Elegant Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-playfair text-lg sm:text-2xl md:text-3xl text-parchment-dark tracking-wide italic mb-10 max-w-2xl"
        >
          “How Society Reacts to New Ideas”
        </motion.p>

        {/* Museum Curatorial Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-2xl mb-12"
        >
          <p className="font-lora text-sm sm:text-base leading-relaxed text-parchment-dark/85 dropcap text-justify">
            Throughout history, the arrival of scientific enlightenment has repeatedly collided with societal inertia, dogmatic fears, and the comforting shadows of myth. This interactive archival exhibition documents that eternal struggle: how empirical truth is forged through trial and rejection, and why the human mind remains uniquely susceptible to beliefs without evidence.
          </p>
        </motion.div>

        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={handleEnterExhibition}
            onMouseEnter={() => soundEngine.playHover()}
            className="group relative px-8 py-3.5 rounded-full border border-gold-glowing bg-sepia-medium/60 text-gold-glowing hover:text-parchment shadow-gold-glow hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:bg-gold-glowing/15 transition-all duration-500 font-cinzel text-xs tracking-[0.25em] uppercase font-bold cursor-pointer overflow-hidden"
          >
            {/* Slide glow reflection */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
            Enter Exhibition
          </button>
        </motion.div>
      </div>

      {/* Floating indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.6, repeat: Infinity, repeatType: "reverse" }}
        onClick={handleEnterExhibition}
        className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer select-none group z-10"
      >
        <span className="font-cinzel text-[8px] tracking-[0.3em] uppercase text-gold-dim group-hover:text-gold-glowing transition-colors">
          Scroll to Begin
        </span>
        <ChevronDown className="w-4 h-4 text-gold-dim group-hover:text-gold-glowing transition-transform duration-300 group-hover:translate-y-1" />
      </motion.div>

    </section>
  );
};

export default Hero;
