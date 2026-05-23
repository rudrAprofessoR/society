import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Compass, Lightbulb, Heart, HelpCircle } from "lucide-react";
import soundEngine from "../utils/audio";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
}

export const FutureSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const narrates = [
    {
      icon: <Compass className="w-4 h-4 text-gold-glowing" />,
      title: "The Copernican Shift",
      desc: "Though Galileo spent his final years under lock and key, the objective reality of the skies could not be caged. By the 18th century, heliocentrism moved from outlawed heretic dogma to the literal foundation of global sea navigation and celestial astrophysics."
    },
    {
      icon: <Lightbulb className="w-4 h-4 text-gold-glowing" />,
      title: "Botanical Integration",
      desc: "The 'witches' and herbalists of Salem were persecuted, but their botanical and pharmaceutical insights eventually evolved into modern clinical pharmacology. Superstition was dismantled by chemistry, turning Salem’s fear into modern medicine."
    },
    {
      icon: <Heart className="w-4 h-4 text-crimson-bright" />,
      title: "Curiosity Over Fear",
      desc: "History proves that while society repeatedly rejects and fears new empirical discoveries, curiosity eventually triumphs. Every modern luxury we possess—electricity, vaccines, radio frequencies—was once declared a curse. Truth is hard-won, but it is the only vehicle that carries humanity forward."
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const stars: Star[] = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      if (!canvas) return;
      stars.length = 0;
      for (let i = 0; i < 60; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.7 + 0.1,
          speed: Math.random() * 0.02 + 0.005
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let sphereAngle = 0;

    const drawArmillarySphere = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.28;

      // Draw faint twinkling parchment stars
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 0.85 || star.alpha < 0.05) {
          star.speed = -star.speed;
        }
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Slowly spin the Armillary Brass Sphere
      sphereAngle += 0.004;

      // Armillary Sphere center golden core (The Sun)
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
      ctx.fillStyle = "rgba(212, 175, 55, 0.85)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 1.5;

      // Outer stationary horizon ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating meridians (ellipse projection)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, baseRadius, baseRadius * Math.abs(Math.sin(sphereAngle)), sphereAngle, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(212, 175, 55, 0.09)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, baseRadius, baseRadius * Math.abs(Math.cos(sphereAngle + 1)), -sphereAngle * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      // Equator band (diagonal brass band)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, baseRadius * 0.95, baseRadius * 0.3, Math.PI / 6 + sphereAngle * 0.1, 0, Math.PI * 2);
      ctx.stroke();

      // Axis pole line
      ctx.strokeStyle = "rgba(212, 175, 55, 0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - baseRadius * 1.15 * Math.cos(Math.PI / 4), centerY - baseRadius * 1.15 * Math.sin(Math.PI / 4));
      ctx.lineTo(centerX + baseRadius * 1.15 * Math.cos(Math.PI / 4), centerY + baseRadius * 1.15 * Math.sin(Math.PI / 4));
      ctx.stroke();

      animationFrameId = requestAnimationFrame(drawArmillarySphere);
    };

    drawArmillarySphere();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="future-section"
      className="relative min-h-screen w-full bg-sepia-dark/80 z-20 flex flex-col justify-center py-24 overflow-hidden"
    >
      {/* Sticky Armillary Visualizer Viewport */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-65" />
        {/* Shadow overlays mimicking vintage brass candle reflections */}
        <div className="absolute inset-0 bg-gradient-to-b from-sepia-dark via-transparent to-sepia-dark pointer-events-none" />
      </div>

      {/* Narrative overlay lists */}
      <div className="relative z-10 w-full flex flex-col items-center gap-12 max-w-5xl mx-auto px-6 select-none">
        
        {/* Curatorial reflection indicator */}
        <div className="flex flex-col items-center text-center max-w-md mb-4">
          <HelpCircle className="w-5 h-5 text-gold-glowing animate-pulse mb-3" />
          <h4 className="font-cinzel font-bold text-sm text-parchment tracking-[0.25em] uppercase">
            Chapter VII • The Reconciliation
          </h4>
          <span className="font-playfair text-xs text-gold-dim uppercase tracking-widest mt-1 italic block">
            “What happens when society chooses curiosity over fear?”
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch pointer-events-auto">
          {narrates.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              onViewportEnter={() => soundEngine.playHover()}
              className="parchment-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gold-glowing/10">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sepia-dark border border-gold-glowing/25">
                    {n.icon}
                  </div>
                  <h5 className="font-cinzel font-bold text-xs text-parchment tracking-wider uppercase">
                    {n.title}
                  </h5>
                </div>
                
                <p className="font-lora text-xs leading-relaxed text-parchment-dark/85 text-justify">
                  {n.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FutureSimulation;
