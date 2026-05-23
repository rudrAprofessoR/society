import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Infinity, ShieldAlert, Sparkles } from "lucide-react";
import soundEngine from "../utils/audio";

interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  equation: string;
  summary: string;
  details: string;
  color: string;
  badge?: string;
}

export const GravityTimeline: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>("newton");

  const milestones: Milestone[] = [
    {
      id: "newton",
      year: "1687",
      title: "Newton's Gravity",
      subtitle: "Universal Attraction",
      icon: <Apple className="w-5 h-5" />,
      equation: "F = G * (m₁ * m₂) / r²",
      summary: "Gravity is defined as an instantaneous invisible pull between all massive bodies in the universe.",
      details: "Sir Isaac Newton's Principia Mathematica proposed that gravity is an attractive force proportional to the product of two masses and inversely proportional to the square of the distance between them. While mathematically precise for orbital calculations, it left an open question: how does gravity act across empty space instantaneously?",
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: "einstein",
      year: "1915",
      title: "Einstein's Relativity",
      subtitle: "Warped Spacetime",
      icon: <Infinity className="w-5 h-5" />,
      equation: "G_μν + Λg_μν = (8πG / c⁴) * T_μν",
      summary: "Gravity is not a pull, but the bending of 4D spacetime fabric caused by mass and energy.",
      details: "Albert Einstein's General Theory of Relativity shattered the Newtonian view. He demonstrated that space and time are fused into a four-dimensional fabric. Mass and energy warp this fabric, and objects in gravitational fields are simply following straight paths through curved spacetime. Earth orbits the Sun because the Sun warps space around it.",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: "quantum",
      year: "1970s",
      title: "Quantum Gravity",
      subtitle: "The Graviton Search",
      icon: <Sparkles className="w-5 h-5" />,
      equation: "Ĥ |Ψ⟩ = E |Ψ⟩  [Planck Scale Unified]",
      summary: "The attempt to unify gravity with quantum mechanics using a hypothetical spin-2 particle: the graviton.",
      details: "Standard quantum mechanics defines forces via exchange particles (bosons). The search for Quantum Gravity aims to reconcile General Relativity with quantum fields. It proposes the 'Graviton'—a massless, spin-2 gauge boson mediating gravity at the subatomic scale. Modern candidates include String Theory and Loop Quantum Gravity.",
      color: "from-purple-600 to-fuchsia-500"
    },
    {
      id: "speculative",
      year: "Future?",
      title: "Anti-Gravity Theories",
      subtitle: "Speculative Breakthroughs",
      icon: <ShieldAlert className="w-5 h-5" />,
      equation: "T_μν = -ρ g_μν  [Negative Energy Density]",
      summary: "Manipulating spacetime curvature or using exotic matter to generate repulsive gravitational forces.",
      details: "True anti-gravity requires generating a gravitational repulsive field. Speculative theories explore creating negative energy densities (like Casimir vacuum states), exploiting high-frequency rotating superconductors (Podkletnov claims), or manipulating quantum electromagnetic fields. While mathematically modeled in concepts like the Alcubierre warp drive, it currently lacks peer-reviewed empirical evidence.",
      color: "from-fuchsia-500 to-neon-orange",
      badge: "Speculative"
    }
  ];

  const activeMilestone = milestones.find((m) => m.id === selectedNode) || milestones[0];

  const handleNodeClick = (id: string) => {
    soundEngine.playClick();
    setSelectedNode(id);
  };

  return (
    <section
      id="timeline-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-dark-bg/40 z-20 overflow-hidden"
    >
      {/* Dynamic Glowing Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="font-orbitron text-xs text-neon-blue tracking-[0.25em] uppercase mb-3">
          Chronological Evolution
        </h3>
        <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-wide uppercase">
          Gravity Timeline
        </h2>
        <p className="font-inter font-light text-metal-silver max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
          Traverse the milestones of physical understanding, from falling apples to curved spacetime and hypothetical quantum levitation.
        </p>
      </div>

      {/* Timeline Track & Cards Container */}
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        {/* Horizontal Node Track */}
        <div className="relative w-full flex items-center justify-between mb-16 py-6 overflow-x-auto scrollbar-none">
          {/* Continuous Glowing Vector Beam */}
          <div className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-orange-500/20 z-0" />
          
          {milestones.map((node) => {
            const isSelected = selectedNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className="relative z-10 flex flex-col items-center gap-3 focus:outline-none cursor-pointer group min-w-[120px] md:min-w-[180px]"
              >
                {/* Year Badge */}
                <span className={`font-orbitron text-xs tracking-wider transition-all duration-300 ${
                  isSelected ? "text-neon-blue font-bold shadow-neon-cyan" : "text-metal-silver/60 group-hover:text-metal-silver"
                }`}>
                  {node.year}
                </span>

                {/* Node Orb */}
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                  isSelected 
                    ? "bg-dark-bg border-2 border-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.4)] text-neon-blue scale-110"
                    : "bg-dark-bg/60 border border-white/10 text-metal-silver group-hover:border-neon-blue/40 group-hover:text-white"
                }`}>
                  {node.icon}
                  {/* Subtle pulsing orbit rings */}
                  {isSelected && (
                    <span className="absolute inset-0 rounded-xl border border-neon-blue animate-ping opacity-25" />
                  )}
                </div>

                {/* Title */}
                <span className={`font-orbitron text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 ${
                  isSelected ? "text-white font-medium" : "text-metal-silver/50 group-hover:text-metal-silver"
                }`}>
                  {node.title.split("'s")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Detail Hologram Panel */}
        <div className="relative w-full z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-panel w-full rounded-2xl border border-white/10 p-6 md:p-10 relative overflow-hidden scanlines"
            >
              {/* Radial gradient background accent matching node */}
              <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${activeMilestone.color} opacity-[0.03] rounded-full blur-[80px] pointer-events-none`} />

              {/* Holographic Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-orbitron text-[10px] tracking-widest text-neon-blue uppercase px-2.5 py-1 rounded bg-neon-blue/10 border border-neon-blue/20">
                      Phase {milestones.indexOf(activeMilestone) + 1}
                    </span>
                    {activeMilestone.badge && (
                      <span className="font-orbitron text-[10px] tracking-widest text-neon-orange uppercase px-2.5 py-1 rounded bg-neon-orange/10 border border-neon-orange/20 animate-pulse">
                        {activeMilestone.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-orbitron font-bold text-2xl md:text-3xl text-white tracking-wide uppercase mt-3">
                    {activeMilestone.title}
                  </h4>
                  <span className="font-inter font-light text-metal-silver/80 text-xs tracking-wider">
                    {activeMilestone.subtitle}
                  </span>
                </div>

                {/* Mathematical Equation Display */}
                <div className="glass-panel rounded-xl border border-neon-blue/15 px-5 py-3 text-right max-w-sm w-full md:w-auto">
                  <span className="font-orbitron text-[8px] tracking-[0.25em] text-neon-blue/60 uppercase block mb-1">
                    Fundamental Equation
                  </span>
                  <code className="font-mono text-neon-blue text-xs md:text-sm bg-transparent p-0 block shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                    {activeMilestone.equation}
                  </code>
                </div>
              </div>

              {/* Main Text Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1 border-r border-white/5 pr-0 md:pr-8 flex flex-col justify-center h-full">
                  <span className="font-orbitron text-[9px] tracking-widest text-neon-purple uppercase mb-2 block">
                    Core Concept
                  </span>
                  <p className="font-inter text-white text-sm md:text-base leading-relaxed font-light">
                    {activeMilestone.summary}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="font-orbitron text-[9px] tracking-widest text-metal-silver/60 uppercase mb-2 block">
                    Scientific Analysis & Implications
                  </span>
                  <p className="font-inter text-metal-silver text-sm md:text-base leading-relaxed font-light mb-6">
                    {activeMilestone.details}
                  </p>
                  
                  {/* Decorative Science Grid Data */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                    <div className="glass-panel rounded-lg border border-white/5 p-3 text-left">
                      <span className="font-orbitron text-[7px] text-metal-silver/40 tracking-widest uppercase block">
                        Space Curvature
                      </span>
                      <span className="font-orbitron text-xs text-white/90">
                        {activeMilestone.id === "newton" ? "N/A (Flat)" : activeMilestone.id === "einstein" ? "Riemannian 4D" : activeMilestone.id === "quantum" ? "Planck Warped" : "repulsive field"}
                      </span>
                    </div>
                    <div className="glass-panel rounded-lg border border-white/5 p-3 text-left">
                      <span className="font-orbitron text-[7px] text-metal-silver/40 tracking-widest uppercase block">
                        Speed of Effect
                      </span>
                      <span className="font-orbitron text-xs text-white/90">
                        {activeMilestone.id === "newton" ? "Instantaneous" : "Light Speed (c)"}
                      </span>
                    </div>
                    <div className="glass-panel rounded-lg border border-white/5 p-3 text-left col-span-2 sm:col-span-1">
                      <span className="font-orbitron text-[7px] text-metal-silver/40 tracking-widest uppercase block">
                        Empirical Status
                      </span>
                      <span className={`font-orbitron text-xs ${activeMilestone.id === "speculative" ? "text-neon-orange" : "text-neon-blue"}`}>
                        {activeMilestone.id === "speculative" ? "Theoretical" : "100% Proven"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
export default GravityTimeline;
