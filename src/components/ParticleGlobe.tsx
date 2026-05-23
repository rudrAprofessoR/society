import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color: string;
}

export const ParticleGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point3D[] = [];
    const numPoints = 250;
    const sphereRadius = 150;
    
    let angleX = 0.002;
    let angleY = 0.003;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 650;
      initGlobe();
    };

    // Mathematically generate points on a 3D sphere (Fibonacci lattice for even distribution)
    const initGlobe = () => {
      points = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      
      const colors = [
        "rgba(0, 240, 255,", // Cyan
        "rgba(189, 0, 255,", // Purple
        "rgba(138, 153, 173," // Silver
      ];

      for (let i = 0; i < numPoints; i++) {
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
        
        const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
        const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
        const z = sphereRadius * Math.cos(phi);

        points.push({
          x,
          y,
          z,
          color: colors[i % colors.length]
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left - canvas.width / 2;
      mouseRef.current.y = e.clientY - rect.top - canvas.height / 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // 3D Rotation helper
    const rotateX = (p: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = p.y * cos - p.z * sin;
      const z = p.y * sin + p.z * cos;
      p.y = y;
      p.z = z;
    };

    const rotateY = (p: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = p.x * cos + p.z * sin;
      const z = -p.x * sin + p.z * cos;
      p.x = x;
      p.z = z;
    };

    // Render loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouse = mouseRef.current;

      // Draw background spacetime grid warped slightly by mouse
      ctx.strokeStyle = "rgba(0, 240, 255, 0.015)";
      ctx.lineWidth = 1;
      const step = 45;
      for (let y = step; y < canvas.height; y += step) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 15) {
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let offset = 0;

          if (dist < 300) {
            const force = (300 - dist) / 300;
            offset = -30 * force * force * (dy / dist);
            if (mouse.active) {
              offset *= 1.5; // increase warping under cursor
            }
          }
          ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
      }

      // Dynamic rotation speed based on mouse position
      let currentAngleX = angleX;
      let currentAngleY = angleY;
      if (mouse.active) {
        currentAngleY += mouse.x * 0.00001;
        currentAngleX += mouse.y * 0.00001;
      }

      // Project and draw 3D points
      const perspective = 400;

      // Sort points by Z (depth) for correct painter's algorithm rendering
      const sortedPoints = [...points].sort((a, b) => b.z - a.z);

      sortedPoints.forEach((p) => {
        // Rotate point in 3D
        rotateX(p, currentAngleX);
        rotateY(p, currentAngleY);

        // Apply mouse deformation (perceived warp field)
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let warpX = p.x;
        let warpY = p.y;

        if (mouse.active && dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Warp particles away from mouse to simulate social repulsion/distortion
          warpX += (dx / dist) * force * 25;
          warpY += (dy / dist) * force * 25;
        }

        // Perspective Projection calculation
        const scale = perspective / (perspective + p.z);
        const screenX = centerX + warpX * scale;
        const screenY = centerY + warpY * scale;

        // Size based on depth
        const size = Math.max(0.5, (sphereRadius + p.z) / sphereRadius * 2.2);
        
        // Alpha based on depth
        const alpha = Math.max(0.12, (sphereRadius + p.z) / (sphereRadius * 2) * 0.7);

        // Draw node
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        
        // Glowing highlights for front particles
        if (p.z > 50) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = p.color.includes("189") ? "#bd00ff" : "#00f0ff";
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // Ambient orbit rings around the globe
      ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, sphereRadius + 60, 25, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
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
export default ParticleGlobe;
