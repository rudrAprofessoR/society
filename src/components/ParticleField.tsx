import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 120;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const colors = [
        "rgba(0, 240, 255,", // Cyan
        "rgba(189, 0, 255,", // Purple
        "rgba(138, 153, 173," // Silver
      ];

      for (let i = 0; i < maxParticles; i++) {
        const size = Math.random() * 2 + 0.5;
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size,
          color: colorPrefix,
          alpha: Math.random() * 0.4 + 0.2
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      particles.forEach((p, idx) => {
        // Apply physics
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Gravitational pull force
            const force = (mouse.radius - dist) / mouse.radius;
            // Pull particles slightly towards the mouse
            p.vx += (dx / dist) * force * 0.03;
            p.vy += (dy / dist) * force * 0.03;

            // Speed limit (terminal velocity)
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 1.2) {
              p.vx = (p.vx / speed) * 1.2;
              p.vy = (p.vy / speed) * 1.2;
            }
          } else {
            // Apply slight friction to slow down to normal
            p.vx *= 0.98;
            p.vy *= 0.98;
          }
        } else {
          // Slow decay back to normal drift speed
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Bounce/Wrap boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.size > 1.5 ? 8 : 0;
        ctx.shadowColor = p.color.includes("189") ? "#bd00ff" : "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Constellation connections (glowing force strings)
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-dark-bg"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
