import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  speedModifier: number;
}

export const DustMotesBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000)); // Adaptive count

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.35 + 0.05;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.12 - 0.04, // Slowly upward
        radius: Math.random() * 1.5 + 0.5,
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        speedModifier: Math.random() * 0.5 + 0.5,
      });
    }

    // Mouse movement influence
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create a vintage vignetted canvas look
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.2,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      vignette.addColorStop(0, "rgba(18, 14, 12, 0)");
      vignette.addColorStop(1, "rgba(5, 4, 3, 0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Render dust motes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx * p.speedModifier;
        p.y += p.vy * p.speedModifier;

        // Interaction with mouse
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const force = (150 - dist) / 1500;
            p.x += (dx / dist) * force * p.speedModifier * 2;
            p.y += (dy / dist) * force * p.speedModifier * 2;
          }
        }

        // Keep inside bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        // Draw mote with elegant glowing gold
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Dynamic slight brightness pulse
        const pulse = Math.sin(Date.now() * 0.001 + i) * 0.1;
        const currentAlpha = Math.max(0.02, Math.min(0.6, p.baseAlpha + pulse));
        
        ctx.fillStyle = `rgba(212, 175, 55, ${currentAlpha})`;
        
        // Add faint halo to larger dust pieces
        if (p.radius > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      }

      ctx.shadowBlur = 0; // Reset shadow

      // Draw faint ancient compass grid overlay lines (extremely faint)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.006)";
      ctx.lineWidth = 1;
      
      // Center circle
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.15, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default DustMotesBg;
