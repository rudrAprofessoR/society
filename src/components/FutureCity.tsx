import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Eye, ShieldCheck, Milestone } from "lucide-react";
import soundEngine from "../utils/audio";

interface Hovercraft {
  x: number;
  y: number;
  speed: number;
  size: number;
  trail: { x: number; y: number }[];
  color: string;
}

export const FutureCity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const stories = [
    {
      icon: <Milestone className="w-5 h-5 text-neon-blue" />,
      title: "2100: Transit Revolution",
      desc: "Local gravity field nullifiers replace wheels and combustion engines. Levitating vehicles cruise smoothly along high-altitude magnetic vectors. Friction is eliminated, cutting global transit energy costs by 98%."
    },
    {
      icon: <Compass className="w-5 h-5 text-neon-purple" />,
      title: "2150: Levitating Architecture",
      desc: "Civil engineering breaks free from load-bearing bedrock. Cities expand vertically into the sky, utilizing anti-gravity base pillars. Floating platforms, sky bridges, and hovering botanical reserves define the horizon."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neon-orange" />,
      title: "2200: Direct Space Elevation",
      desc: "Rockets are relics of the past. Heavy interstellar cargo ships levitate directly from ground coordinates into stable orbits. Space launch towers act as localized gravity wells, pulling ships into space without combustion."
    }
  ];

  // Listen to container scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementHeight = containerRef.current.offsetHeight;
      
      // Calculate how far container is scrolled (0 to 1)
      const scrolled = -rect.top / (elementHeight - window.innerHeight);
      const clampScrolled = Math.max(0, Math.min(1, scrolled));
      setScrollProgress(clampScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let hovercrafts: Hovercraft[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initHovercrafts();
    };

    const initHovercrafts = () => {
      hovercrafts = [];
      const colors = ["rgba(0, 240, 255,", "rgba(189, 0, 255,", "rgba(255, 92, 0,"];
      
      for (let i = 0; i < 15; i++) {
        hovercrafts.push({
          x: Math.random() * canvas.width,
          y: 100 + Math.random() * (canvas.height - 250),
          speed: 1.5 + Math.random() * 3,
          size: 4 + Math.random() * 4,
          trail: [],
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Render loop
    const drawFuture = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle horizon lines & grid
      const horizonY = canvas.height * 0.7;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.02)";
      ctx.lineWidth = 1;
      
      // Perspective grid stretching toward the bottom
      for (let y = horizonY; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw towering futuristic buildings (skeletons in neon)
      ctx.strokeStyle = "rgba(0, 240, 255, 0.035)";
      ctx.fillStyle = "rgba(3, 3, 8, 0.4)";
      
      const buildingWidth = 90;
      const bPositions = [0.1, 0.25, 0.4, 0.6, 0.75, 0.9];
      
      bPositions.forEach((pos, idx) => {
        const x = canvas.width * pos;
        const bHeight = 220 + Math.sin(idx * 5) * 80 + (scrollProgress * 40); // slight scroll shift
        
        // Draw building block
        ctx.beginPath();
        ctx.rect(x - buildingWidth / 2, horizonY - bHeight, buildingWidth, bHeight);
        ctx.stroke();
        ctx.fill();

        // High tower spire antenna
        ctx.beginPath();
        ctx.moveTo(x, horizonY - bHeight);
        ctx.lineTo(x, horizonY - bHeight - 40);
        ctx.strokeStyle = "rgba(189, 0, 255, 0.15)";
        ctx.stroke();

        // Pulsing antenna beacons
        ctx.beginPath();
        ctx.arc(x, horizonY - bHeight - 40, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${0.3 + Math.sin(Date.now() * 0.005 + idx) * 0.45})`;
        ctx.fill();

        // Sky bridges connecting towers
        if (idx < bPositions.length - 1) {
          const nextX = canvas.width * bPositions[idx + 1];
          const nextHeight = 220 + Math.sin((idx + 1) * 5) * 80 + (scrollProgress * 40);
          
          ctx.beginPath();
          ctx.moveTo(x + buildingWidth / 2, horizonY - bHeight + 40);
          ctx.lineTo(nextX - buildingWidth / 2, horizonY - nextHeight + 40);
          ctx.strokeStyle = "rgba(0, 240, 255, 0.015)";
          ctx.stroke();
        }
      });

      // Update and Draw hovercrafts (flying cars)
      hovercrafts.forEach((hc) => {
        // Move horizontal
        hc.x += hc.speed;
        if (hc.x > canvas.width + 100) {
          hc.x = -100;
          hc.y = 100 + Math.random() * (canvas.height - 250);
          hc.trail = [];
        }

        // Slight vertical floating weave LFO
        hc.y += Math.sin(hc.x * 0.01) * 0.2;

        // Log trail coordinates
        hc.trail.push({ x: hc.x, y: hc.y });
        if (hc.trail.length > 25) hc.trail.shift();

        // Draw exhaust trail
        if (hc.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(hc.trail[0].x, hc.trail[0].y);
          for (let i = 1; i < hc.trail.length; i++) {
            ctx.lineTo(hc.trail[i].x, hc.trail[i].y);
          }
          ctx.strokeStyle = `${hc.color}0.12)`;
          ctx.lineWidth = hc.size * 0.4;
          ctx.stroke();
        }

        // Draw hover car core
        ctx.beginPath();
        ctx.arc(hc.x, hc.y, hc.size, 0, Math.PI * 2);
        ctx.fillStyle = `${hc.color}0.85)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = hc.color.includes("189") ? "#bd00ff" : "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(drawFuture);
    };

    drawFuture();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <section
      id="future-section"
      ref={containerRef}
      className="relative min-h-[220vh] w-full bg-dark-bg z-20 flex flex-col justify-start"
    >
      {/* Stick canvas viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg/95 pointer-events-none" />
      </div>

      {/* Floating Story Panels Overlay (Fades in based on scroll progression) */}
      <div className="relative z-10 w-full flex flex-col items-center gap-64 max-w-4xl mx-auto px-6 -mt-[180vh] pb-[30vh] select-none pointer-events-none">
        
        {/* Visual Cue */}
        <div className="flex flex-col items-center text-center max-w-lg mb-12">
          <Eye className="w-5 h-5 text-neon-blue animate-pulse mb-3" />
          <h4 className="font-orbitron font-black text-sm text-white tracking-[0.2em] uppercase">
            AI Future Vision
          </h4>
          <span className="font-inter text-[9px] text-metal-silver uppercase tracking-widest mt-1">
            Scroll to Navigate Timeline 2100 - 2200
          </span>
        </div>

        {stories.map((story, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-120px" }}
              transition={{ duration: 0.65 }}
              onViewportEnter={() => soundEngine.playHover()}
              className="glass-panel border border-neon-blue/20 rounded-2xl p-6 md:p-8 max-w-xl w-full scanlines shadow-[0_0_20px_rgba(0,240,255,0.03)] pointer-events-auto"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
                  {story.icon}
                </div>
                <h5 className="font-orbitron font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                  {story.title}
                </h5>
              </div>
              <p className="font-inter font-light text-metal-silver text-xs sm:text-sm leading-relaxed">
                {story.desc}
              </p>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};
export default FutureCity;
