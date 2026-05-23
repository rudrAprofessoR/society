import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, HelpCircle, AlertTriangle, Eye, Flame, ShieldAlert } from "lucide-react";
import soundEngine from "../utils/audio";

interface CognitiveNode {
  id: string;
  name: string;
  x: number; // Percent coordinates for brain schematic
  y: number;
  icon: React.ReactNode;
  concept: string;
  mechanism: string;
  evolutionaryOrigin: string;
  curatorReflection: string;
}

export const Simulator3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<string>("confirmation");

  const nodes: CognitiveNode[] = [
    {
      id: "confirmation",
      name: "Confirmation Filter",
      x: 0.35,
      y: 0.38,
      icon: <Eye className="w-4 h-4" />,
      concept: "Confirmation Bias",
      mechanism: "The human neural pathway is optimized for energy efficiency. When confronted with information, the brain selectively absorbs facts that fit its pre-existing models while actively deleting or forgetting contradictory data.",
      evolutionaryOrigin: "Ancient hunters needed rapid, absolute decisions in high-stress situations. Hesitating to debate alternative possibilities meant physical death.",
      curatorReflection: "We do not seek the truth; we seek the comforting feeling of being right."
    },
    {
      id: "tribal",
      name: "Tribal Conformity",
      x: 0.65,
      y: 0.42,
      icon: <Flame className="w-4 h-4" />,
      concept: "Tribal Consensus Reflex",
      mechanism: "Social rejection registers in the human anterior cingulate cortex as literal physical pain. Humans rarely evaluate facts individually; instead, we outsource our beliefs to our chosen group to maintain safety and belonging.",
      evolutionaryOrigin: "Exile from the prehistoric tribe was an absolute death sentence. Conforming to the group’s shared reality—even if irrational—was a critical survival mechanism.",
      curatorReflection: "To a human brain, belonging is far more vital than objective accuracy."
    },
    {
      id: "immunity",
      name: "Ego Shielding",
      x: 0.5,
      y: 0.25,
      icon: <ShieldAlert className="w-4 h-4" />,
      concept: "Cognitive Dissonance Immunity",
      mechanism: "When presented with undeniable, physical proof that contradicts a core belief, the brain undergoes severe emotional stress. To protect the ego, it doubles down, constructing conspiracy rationales to explain away the evidence.",
      evolutionaryOrigin: "Admitting absolute error compromises a leader or hunter's social status within the hierarchy, reducing their evolutionary reproductive success.",
      curatorReflection: "Presented with proof, the rational mind will often choose conspiracy over confession."
    },
    {
      id: "pattern",
      name: "Pattern Engine",
      x: 0.5,
      y: 0.65,
      icon: <AlertTriangle className="w-4 h-4" />,
      concept: "Hyperactive Agency Detection",
      mechanism: "The brain is an advanced pattern-matching processor. When it encounters chaotic, random, or complex events (diseases, economic drops), it struggles to accept indifference, projecting active masterminds and secret plans behind the scenes.",
      evolutionaryOrigin: "It was safer to mistake a rustling leaf for a predator (false positive) than to mistake a predator for a rustling leaf (false negative). We are descendants of paranoid survivors.",
      curatorReflection: "We prefer a hostile master plan over cold, uncaring randomness."
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener("resize", handleResize);

    const drawBrainSchema = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw faint background grid lines mimicking ancient manuscript pages
      ctx.strokeStyle = "rgba(212, 175, 55, 0.015)";
      ctx.lineWidth = 1;
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw faded mathematical circles behind the brain
      ctx.strokeStyle = "rgba(212, 175, 55, 0.03)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.stroke();

      // Draw the stylized hand-drawn brain outline using bezier curves (woodcut look)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.06)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      // Cerebrum curve
      ctx.moveTo(centerX - 130, centerY);
      ctx.bezierCurveTo(centerX - 130, centerY - 110, centerX - 60, centerY - 130, centerX, centerY - 120);
      ctx.bezierCurveTo(centerX + 60, centerY - 130, centerX + 130, centerY - 110, centerX + 130, centerY);
      ctx.bezierCurveTo(centerX + 135, centerY + 60, centerX + 80, centerY + 80, centerX + 40, centerY + 80);
      
      // Cerebellum curve
      ctx.bezierCurveTo(centerX + 30, centerY + 110, centerX - 30, centerY + 110, centerX - 40, centerY + 80);
      ctx.bezierCurveTo(centerX - 80, centerY + 80, centerX - 130, centerY + 60, centerX - 130, centerY);
      ctx.stroke();

      // Internal brain divisions (extremely faint)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 120);
      ctx.bezierCurveTo(centerX - 20, centerY - 40, centerX + 20, centerY + 40, centerX, centerY + 80);
      ctx.stroke();

      // Draw active connections between hubs
      ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
      ctx.lineWidth = 1.2;
      
      // Draw lines between specific percentage nodes
      const getPos = (n: CognitiveNode) => ({
        x: centerX + (n.x - 0.5) * 260,
        y: centerY + (n.y - 0.5) * 200
      });

      const pConfirmation = getPos(nodes[0]);
      const pTribal = getPos(nodes[1]);
      const pImmunity = getPos(nodes[2]);
      const pPattern = getPos(nodes[3]);

      ctx.beginPath();
      ctx.moveTo(pConfirmation.x, pConfirmation.y);
      ctx.lineTo(pImmunity.x, pImmunity.y);
      ctx.lineTo(pTribal.x, pTribal.y);
      ctx.lineTo(pPattern.x, pPattern.y);
      ctx.lineTo(pConfirmation.x, pConfirmation.y);
      
      // Cross lines
      ctx.moveTo(pImmunity.x, pImmunity.y);
      ctx.lineTo(pPattern.x, pPattern.y);
      ctx.moveTo(pConfirmation.x, pConfirmation.y);
      ctx.lineTo(pTribal.x, pTribal.y);
      ctx.stroke();

      // Draw node connection halos for selected nodes
      const activeNode = nodes.find((n) => n.id === selectedNode);
      if (activeNode) {
        const activePos = getPos(activeNode);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
        ctx.beginPath();
        ctx.arc(activePos.x, activePos.y, 22 + Math.sin(Date.now() * 0.005) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(drawBrainSchema);
    };

    drawBrainSchema();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [selectedNode]);

  const handleSelectNode = (id: string) => {
    soundEngine.playWarning();
    setSelectedNode(id);
  };

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <section
      id="simulator-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-sepia-dark/40 z-20 overflow-hidden"
    >
      {/* Immersive candlelight overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-glowing/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none">
        <span className="font-cinzel text-[10px] text-gold-glowing tracking-[0.3em] uppercase mb-4 block font-bold">
          Chapter V • The Cognitive Labyrinth
        </span>
        <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-parchment tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          The Skeptical Mind-Map
        </h2>
        <div className="w-24 h-[1px] bg-gold-glowing/30 mx-auto my-6" />
        <p className="font-lora text-sm sm:text-base text-parchment-dark/80 max-w-xl mx-auto leading-relaxed">
          Why do our brains naturally resist factual corrections? Step into the cognitive layout to analyze the evolutionary defenses of the human ego.
        </p>
      </div>

      {/* Interface Container */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch select-none">
        
        {/* Left Side: Brain Schema Canvas */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="w-full flex items-center justify-between bg-sepia-medium/80 border border-gold-glowing/15 px-5 py-4 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-gold-glowing animate-pulse" />
              <h5 className="font-cinzel text-[10px] text-parchment tracking-[0.18em] uppercase font-bold">
                Anatomy of Denial
              </h5>
            </div>
            <span className="font-cinzel text-[8px] text-gold-dim tracking-widest uppercase">
              Exhib. Chamber V
            </span>
          </div>

          <div className="relative w-full h-[360px] bg-sepia-dark/85 border-x border-b border-gold-glowing/15 rounded-b-2xl overflow-hidden flex items-center justify-center">
            {/* Interactive Canvas Schematic */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
            
            {/* Overlay interactive buttons on top of percentage canvas nodes */}
            <div className="absolute inset-0 z-10">
              {nodes.map((n) => {
                const isActive = selectedNode === n.id;
                
                // Position mappings matched with canvas ratios
                const leftPercent = `${n.x * 100}%`;
                const topPercent = `${n.y * 100}%`;

                return (
                  <button
                    key={n.id}
                    onClick={() => handleSelectNode(n.id)}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                    style={{ left: leftPercent, top: topPercent }}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-gold-glowing border-gold-glowing text-sepia-dark shadow-gold-glow scale-110"
                        : "bg-sepia-dark/95 border-gold-glowing/25 text-gold-glowing hover:border-gold-glowing/60"
                    }`}>
                      {n.icon}
                    </div>
                    <span className={`font-cinzel text-[7px] sm:text-[8px] tracking-wider uppercase mt-1 px-1.5 py-0.5 rounded transition-all ${
                      isActive
                        ? "bg-gold-glowing/15 text-gold-glowing border border-gold-glowing/20 font-bold"
                        : "bg-sepia-dark/80 text-parchment-dark/60 border border-transparent group-hover:text-parchment"
                    }`}>
                      {n.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 pointer-events-none text-[8px] font-cinzel text-gold-dim/40 tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              Hover & Click brain nodes to dissect cognitive barriers
            </div>
          </div>
        </div>

        {/* Right Side: Psychological Concept Detail Panel */}
        <div className="lg:col-span-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="parchment-card rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 text-gold-glowing">
                  <Brain className="w-5 h-5 animate-pulse" />
                  <span className="font-cinzel font-bold text-xs uppercase tracking-wider">
                    Cognitive Bias Dissection
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-lg sm:text-2xl text-parchment tracking-wide uppercase mb-2">
                  {currentNode.concept}
                </h3>
                <div className="w-12 h-[1px] bg-gold-glowing/30 my-4" />

                <div className="flex flex-col gap-6">
                  {/* Mechanism */}
                  <div>
                    <h4 className="font-cinzel text-[8px] tracking-[0.2em] text-gold-glowing font-bold uppercase mb-1">
                      Neural Mechanism
                    </h4>
                    <p className="font-lora text-xs sm:text-sm leading-relaxed text-parchment-dark/85 text-justify">
                      {currentNode.mechanism}
                    </p>
                  </div>

                  {/* Evolutionary origin */}
                  <div className="border-t border-gold-glowing/10 pt-4">
                    <h4 className="font-cinzel text-[8px] tracking-[0.2em] text-crimson-bright font-bold uppercase mb-1">
                      Prehistoric Evolutionary Purpose
                    </h4>
                    <p className="font-lora text-xs sm:text-sm leading-relaxed text-parchment-dark/80 text-justify">
                      {currentNode.evolutionaryOrigin}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reflection bottom */}
              <div className="border-t border-dashed border-gold-glowing/10 pt-5 mt-6">
                <span className="font-cinzel text-[8px] tracking-[0.25em] text-gold-dim block mb-1">
                  Exhibition Curator Reflection
                </span>
                <p className="font-playfair text-xs sm:text-sm text-gold-glowing italic tracking-wide">
                  “{currentNode.curatorReflection}”
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Simulator3D;
