import React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, Radio, ShieldCheck } from "lucide-react";
import SpacetimeGrid from "./SpacetimeGrid";
import soundEngine from "../utils/audio";

export const SciencePanel: React.FC = () => {
  const techCards = [
    {
      icon: <Radio className="w-5 h-5 text-neon-blue" />,
      title: "LISA Interferometer",
      desc: "Laser Interferometer Space Antenna (LISA) is a planned space-based gravitational wave detector. Flying millions of kilometers apart, satellites will measure subatomic shifts to observe collisions of massive black holes across the cosmos."
    },
    {
      icon: <Cpu className="w-5 h-5 text-neon-blue" />,
      title: "Atom Gravimeters",
      desc: "Using quantum superposition, atomic gravimeters measure the acceleration of falling clouds of ultra-cold rubidium atoms. These allow researchers to detect mineral deposits or map aquifers with hyper-precision."
    },
    {
      icon: <Compass className="w-5 h-5 text-neon-blue" />,
      title: "Frame Dragging",
      desc: "Proven by Gravity Probe B, Earth literally drags spacetime along with it as it rotates (the Lense-Thirring effect). This space twist is a direct validation of Einstein's General Relativity warping."
    }
  ];

  return (
    <section
      id="science-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-dark-bg/60 z-20"
    >
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="font-orbitron text-xs text-neon-blue tracking-[0.25em] uppercase mb-3">
          Empirical Reality
        </h3>
        <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-wide uppercase">
          Scientific Reality
        </h2>
        <p className="font-inter font-light text-metal-silver max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
          Explore the proven laws governing mass and spacetime curvature. Real gravity research has inspired our most advanced astronomical sensors.
        </p>
      </div>

      {/* Grid Content Layout */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Gravity Realities Write-up */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Main Scientific Reality Card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-panel border border-white/10 rounded-2xl p-6 md:p-8 scanlines relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-neon-blue" />
              <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                Space Physics Database
              </span>
            </div>
            
            <h4 className="font-orbitron font-bold text-xl text-white uppercase tracking-wider mb-3">
              The Reality of Gravity
            </h4>
            <p className="font-inter font-light text-metal-silver text-xs sm:text-sm leading-relaxed mb-6">
              Gravity is the universal tapestry binding the cosmos. While Isaac Newton gave us the math to compute attractive forces, Albert Einstein completed the model by showing that mass literally deforms spacetime.
            </p>

            {/* Rotating 3D Planet CSS Animation */}
            <div className="relative flex items-center justify-center h-32 w-full glass-panel border border-white/5 rounded-xl mb-6 overflow-hidden bg-dark-bg/40">
              {/* Planetary Orbit Ring */}
              <div className="absolute w-56 h-8 rounded-full border border-neon-blue/25 rotate-[15deg] animate-[pulse_2s_infinite]" />
              
              {/* Star Center */}
              <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_20px_rgba(0,240,255,0.65)] animate-pulse" />
              
              {/* Orbiting Moon */}
              <div className="absolute w-3 h-3 rounded-full bg-white border border-neon-blue/50 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-[spin_5s_linear_infinite]" style={{ transformOrigin: "100px center" }} />
              
              <span className="absolute bottom-2 right-3 font-orbitron text-[7px] text-metal-silver/45 tracking-widest uppercase">
                Orbital Vector Model
              </span>
            </div>

            {/* Scientific Consensus List */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-1.5" />
                <p className="font-inter text-xs text-metal-silver leading-relaxed">
                  <strong className="text-white font-medium">Newtonian Mechanics:</strong> Perfect for solar orbits and rocket launches. Fails at intense gravitational limits or light bending.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-1.5" />
                <p className="font-inter text-xs text-metal-silver leading-relaxed">
                  <strong className="text-white font-medium">General Relativity:</strong> Confirmed by black hole lensing, orbital decays of binary pulsars, and hyper-precise GPS corrections.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subcard listing real technologies */}
          <div className="flex flex-col gap-4">
            <span className="font-orbitron text-[9px] text-metal-silver/50 tracking-widest uppercase ml-1">
              Empirical Technologies
            </span>
            
            {techCards.map((tc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel border border-white/5 rounded-xl p-4 flex gap-4 hover:border-neon-blue/20 hover:shadow-neon-cyan/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                  {tc.icon}
                </div>
                <div>
                  <h5 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                    {tc.title}
                  </h5>
                  <p className="font-inter font-light text-metal-silver text-[11px] leading-relaxed mt-1">
                    {tc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Spacetime Warp Simulation */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 w-full"
        >
          <SpacetimeGrid />
        </motion.div>

      </div>
    </section>
  );
};
export default SciencePanel;
