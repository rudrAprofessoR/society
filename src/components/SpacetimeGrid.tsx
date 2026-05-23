import React, { useEffect, useRef, useState } from "react";
import { Orbit, RefreshCw, HelpCircle } from "lucide-react";
import soundEngine from "../utils/audio";

interface MassBody {
  id: number;
  x: number;
  y: number;
  mass: number; // positive = gravity, negative = anti-gravity
  radius: number;
  color: string;
  isDragging: boolean;
}

export const SpacetimeGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bodiesRef = useRef<MassBody[]>([
    {
      id: 1,
      x: 0, // Will be initialized to center
      y: 0,
      mass: 80, // Heavy gravity pull
      radius: 20,
      color: "#00f0ff", // Cyan Core
      isDragging: false
    }
  ]);
  const [warpMode, setWarpMode] = useState<"gravity" | "antigravity">("gravity");
  const [showWaves, setShowWaves] = useState(false);
  const dragBodyIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let waveOffset = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 420;
      
      // Center initial body if just started
      if (bodiesRef.current[0].x === 0) {
        bodiesRef.current[0].x = canvas.width / 2;
        bodiesRef.current[0].y = canvas.height / 2;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse interactions
    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getMousePos(e);
      
      // Check if clicked on an existing body
      const bodyClicked = bodiesRef.current.find((b) => {
        const dx = b.x - pos.x;
        const dy = b.y - pos.y;
        return Math.sqrt(dx * dx + dy * dy) < b.radius + 10;
      });

      if (bodyClicked) {
        soundEngine.playClick();
        bodyClicked.isDragging = true;
        dragBodyIdRef.current = bodyClicked.id;
      } else {
        // Spawn a new body of the current warpMode
        soundEngine.playClick();
        const id = Date.now();
        const isExotic = warpMode === "antigravity";
        bodiesRef.current.push({
          id,
          x: pos.x,
          y: pos.y,
          mass: isExotic ? -75 : 65,
          radius: 14,
          color: isExotic ? "#bd00ff" : "#00f0ff",
          isDragging: true
        });
        dragBodyIdRef.current = id;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragBodyIdRef.current === null) return;
      const pos = getMousePos(e);
      const activeBody = bodiesRef.current.find((b) => b.id === dragBodyIdRef.current);
      if (activeBody) {
        // Constrain to canvas
        activeBody.x = Math.max(20, Math.min(canvas.width - 20, pos.x));
        activeBody.y = Math.max(20, Math.min(canvas.height - 20, pos.y));
      }
    };

    const handleMouseUp = () => {
      if (dragBodyIdRef.current !== null) {
        const activeBody = bodiesRef.current.find((b) => b.id === dragBodyIdRef.current);
        if (activeBody) activeBody.isDragging = false;
        dragBodyIdRef.current = null;
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Grid rendering logic
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bodies = bodiesRef.current;
      waveOffset += 0.08;

      // Draw active space-time grid
      const step = 20; // Distance between grid lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
      ctx.lineWidth = 1;

      // Draw horizontal curved lines
      for (let y = step; y < canvas.height; y += step) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 10) {
          let warpedX = x;
          let warpedY = y;

          bodies.forEach((b) => {
            const dx = x - b.x;
            const dy = y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Gravitational warping field math
            if (dist > 15) {
              const influence = Math.min(1.0, 1500 / (dist * dist)); // Drop off factor
              const force = b.mass * influence; // Mass magnitude & sign (+ pull, - push)
              
              // Vector pointing toward/away from core
              const angle = Math.atan2(dy, dx);
              warpedX -= Math.cos(angle) * force * 0.45;
              warpedY -= Math.sin(angle) * force * 0.45;
            }
          });

          // Optional wave oscillations (Gravitational ripple waves)
          if (showWaves) {
            warpedY += Math.sin(x * 0.02 + waveOffset) * 3;
          }

          if (x === 0) {
            ctx.moveTo(warpedX, warpedY);
          } else {
            ctx.lineTo(warpedX, warpedY);
          }
        }
        ctx.stroke();
      }

      // Draw vertical curved lines
      for (let x = step; x < canvas.width; x += step) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 10) {
          let warpedX = x;
          let warpedY = y;

          bodies.forEach((b) => {
            const dx = x - b.x;
            const dy = y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 15) {
              const influence = Math.min(1.0, 1500 / (dist * dist));
              const force = b.mass * influence;

              const angle = Math.atan2(dy, dx);
              warpedX -= Math.cos(angle) * force * 0.45;
              warpedY -= Math.sin(angle) * force * 0.45;
            }
          });

          if (showWaves) {
            warpedX += Math.cos(y * 0.02 + waveOffset) * 2;
          }

          if (y === 0) {
            ctx.moveTo(warpedX, warpedY);
          } else {
            ctx.lineTo(warpedX, warpedY);
          }
        }
        ctx.stroke();
      }

      // Render massive stellar core spheres
      bodies.forEach((b) => {
        // Core shadow/glow
        ctx.beginPath();
        const radGlow = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, b.radius + 25);
        radGlow.addColorStop(0, b.mass > 0 ? "rgba(0, 240, 255, 0.45)" : "rgba(189, 0, 255, 0.45)");
        radGlow.addColorStop(1, "rgba(3,3,8,0)");
        ctx.fillStyle = radGlow;
        ctx.arc(b.x, b.y, b.radius + 25, 0, Math.PI * 2);
        ctx.fill();

        // Core Solid Circle
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.fill();

        // Reticle ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = b.mass > 0 ? "rgba(0, 240, 255, 0.25)" : "rgba(189, 0, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label mass type
        ctx.fillStyle = "#ffffff";
        ctx.font = "8px 'Orbitron'";
        ctx.textAlign = "center";
        ctx.fillText(
          b.mass > 0 ? `+${b.mass}G (MASS)` : `${b.mass}G (EXOTIC)`,
          b.x,
          b.y - b.radius - 12
        );
      });

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [warpMode, showWaves]);

  const handleReset = () => {
    soundEngine.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    bodiesRef.current = [
      {
        id: 1,
        x: canvas.width / 2,
        y: canvas.height / 2,
        mass: 80,
        radius: 20,
        color: "#00f0ff",
        isDragging: false
      }
    ];
  };

  const handleToggleExotic = (mode: "gravity" | "antigravity") => {
    soundEngine.playClick();
    setWarpMode(mode);
  };

  const handleToggleWaves = () => {
    soundEngine.playClick();
    setShowWaves(!showWaves);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Simulation Controls Panel */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 glass-panel border border-white/10 px-5 py-4 rounded-t-2xl z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
            <Orbit className="w-4 h-4 text-neon-blue" />
          </div>
          <div>
            <h5 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              Spacetime Mesh Simulator
            </h5>
            <span className="font-inter text-[9px] text-metal-silver uppercase tracking-widest">
              Einsteinian General Relativity Field
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Gravity toggle */}
          <button
            onClick={() => handleToggleExotic("gravity")}
            className={`px-4 py-1.5 rounded-lg font-orbitron text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              warpMode === "gravity"
                ? "bg-neon-blue/15 border border-neon-blue/40 text-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                : "border border-white/5 text-metal-silver hover:text-white"
            }`}
          >
            Normal Mass (+G)
          </button>
          
          {/* Anti-gravity toggle */}
          <button
            onClick={() => handleToggleExotic("antigravity")}
            className={`px-4 py-1.5 rounded-lg font-orbitron text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              warpMode === "antigravity"
                ? "bg-neon-purple/15 border border-neon-purple/40 text-neon-purple shadow-[0_0_10px_rgba(189,0,255,0.1)]"
                : "border border-white/5 text-metal-silver hover:text-white"
            }`}
          >
            Exotic Mass (-G)
          </button>

          {/* Gravitational ripples toggle */}
          <button
            onClick={handleToggleWaves}
            className={`px-4 py-1.5 rounded-lg font-orbitron text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              showWaves
                ? "bg-neon-orange/15 border border-neon-orange/40 text-neon-orange"
                : "border border-white/5 text-metal-silver hover:text-white"
            }`}
          >
            Waves
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-8 h-8 rounded-lg glass-panel border border-white/5 text-metal-silver hover:text-white cursor-pointer"
            title="Reset Simulator"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-[420px] bg-dark-bg/60 border-x border-b border-white/10 rounded-b-2xl overflow-hidden scanlines flex items-center justify-center">
        {/* Particle and Grid Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />
        
        {/* Floating Instruction overlay */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 pointer-events-none select-none text-[8px] sm:text-[9px] font-orbitron text-metal-silver/45 tracking-widest uppercase">
          <HelpCircle className="w-3.5 h-3.5" />
          Click to Spawn Cores • Drag to Move Spacetime Warps
        </div>
      </div>
    </div>
  );
};
export default SpacetimeGrid;
