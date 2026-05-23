import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp, BookOpen, Globe, Mail } from "lucide-react";
import soundEngine from "../utils/audio";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

export const Conclusion: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const maxStars = 60;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 420;
      initStars();
    };

    const initStars = () => {
      if (!canvas) return;
      stars = [];
      for (let i = 0; i < maxStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.3 + 0.3,
          speed: 0.08 + Math.random() * 0.15
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(212, 175, 55, 0.45)";

      stars.forEach((s) => {
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    drawStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleRestart = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="conclusion-section"
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-center py-24 px-6 bg-sepia-dark border-t border-gold-glowing/15 z-20 overflow-hidden select-none"
    >
      {/* Floating Gold Motes Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-sepia-dark via-transparent to-sepia-dark/80 pointer-events-none" />
      </div>

      {/* Central Philosophical Quote Container */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center px-4">
        
        {/* Curatorial Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-sepia-medium border border-gold-glowing/25 text-gold-glowing shadow-gold-glow mb-8"
        >
          <BookOpen className="w-5 h-5 animate-pulse" />
        </motion.div>

        {/* Fading parchment quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="parchment-card rounded-2xl p-8 md:p-12 mb-12 border-gold-glowing/25"
        >
          <p className="font-playfair text-lg sm:text-xl md:text-2xl text-parchment leading-relaxed tracking-wider italic font-bold">
            “Progress begins when society chooses curiosity over fear.”
          </p>
          <div className="w-24 h-[1px] bg-gold-glowing/30 mx-auto mt-6" />
        </motion.div>

        {/* Restart Journey Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={handleRestart}
          onMouseEnter={() => soundEngine.playHover()}
          className="group relative flex items-center gap-2.5 px-6 py-3 rounded-full border border-gold-glowing bg-sepia-medium/60 font-cinzel text-[10px] tracking-widest text-gold-glowing uppercase transition-all duration-300 shadow-gold-glow hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:border-gold-glowing hover:text-parchment hover:bg-gold-glowing/15 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          <span>Restart Journey</span>
        </motion.button>

        {/* Credits and Links */}
        <div className="flex flex-col items-center gap-4 mt-20 pt-8 border-t border-gold-glowing/10 w-full text-gold-dim/40 font-cinzel text-[9px] tracking-widest uppercase">
          <span>Science vs Anti-Science • A Society & Science Project © 2026</span>
          <div className="flex items-center gap-4 text-gold-dim/30">
            <a href="#" className="hover:text-gold-glowing transition-colors duration-300 flex items-center gap-1.5 cursor-pointer">
              <Globe className="w-3.5 h-3.5" /> Exhibition Log
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gold-glowing transition-colors duration-300 flex items-center gap-1.5 cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> Curator Cabinets
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Conclusion;
