import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ShieldAlert, Award } from "lucide-react";
import soundEngine from "../utils/audio";

interface DebateTopic {
  id: string;
  name: string;
  scienceTitle: string;
  scienceText: string;
  sciencePoints: string[];
  scienceMetrics: { label: string; val: number; color: string }[];
  specTitle: string;
  specText: string;
  specPoints: string[];
  specMetrics: { label: string; val: number; color: string }[];
}

export const DebateSection: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>("repulsion");

  const topics: DebateTopic[] = [
    {
      id: "repulsion",
      name: "Repulsion Force",
      scienceTitle: "Curvature & Dark Energy",
      scienceText: "In Einstein's General Relativity, gravity is purely attractive for normal mass-energy. However, dark energy acts as a cosmic repulsive force, expanding the universe. Recreating this locally requires exotic matter with negative energy density—which has not been isolated.",
      sciencePoints: [
        "Governed by Einstein Field Equations",
        "Requires mathematically exotic negative energy density",
        "Cosmic expansion driven by dark energy is verified"
      ],
      scienceMetrics: [
        { label: "Math Consistency", val: 100, color: "bg-neon-blue" },
        { label: "Peer Review Count", val: 95, color: "bg-neon-blue" }
      ],
      specTitle: "Electromagnet Levitation",
      specText: "Speculative theories argue that gravity is merely an electromagnetic side-effect. They claim high-frequency magnetic resonance fields or rotating superconductors can create a localized 'gravitational shielding' effect, canceling mass.",
      specPoints: [
        "Claims gravity can be shielded like magnetism",
        "Violates the Weak Equivalence Principle",
        "No verified peer-reviewed local gravity cancels"
      ],
      specMetrics: [
        { label: "Math Consistency", val: 15, color: "bg-neon-purple" },
        { label: "Peer Review Count", val: 5, color: "bg-neon-purple" }
      ]
    },
    {
      id: "energy",
      name: "Energy Costs",
      scienceTitle: "Astronomical Thresholds",
      scienceText: "Warping space enough to cancel gravity or generate a bubble (like the Alcubierre warp drive) requires astronomical amounts of energy. The original Alcubierre model required more negative energy than the mass of the observable universe.",
      sciencePoints: [
        "Requires Planck-scale energy densities",
        "Exotic matter must be stable at high densities",
        "Violates quantum energy inequalities currently"
      ],
      scienceMetrics: [
        { label: "Energy Feasibility", val: 5, color: "bg-neon-blue" },
        { label: "Stability Model", val: 90, color: "bg-neon-blue" }
      ],
      specTitle: "Zero-Point Free Energy",
      specText: "Conspiracy models propose that anti-gravity craft run on 'zero-point energy' harvested directly from the quantum vacuum using highly compact onboard cold fusion reactors or spinning perpetual motion engines.",
      specPoints: [
        "Claims infinite vacuum energy extraction",
        "Violates the Second Law of Thermodynamics",
        "No operating zero-point extractors exist"
      ],
      specMetrics: [
        { label: "Energy Feasibility", val: 95, color: "bg-neon-purple" }, // Speculative claim is 'infinite'
        { label: "Stability Model", val: 5, color: "bg-neon-purple" }
      ]
    },
    {
      id: "evidence",
      name: "Empirical Proof",
      scienceTitle: "LIGO & Planetary Orbits",
      scienceText: "Gravitational physics is backed by centuries of rigorous observations. Modern gravitational wave detectors (LIGO/Virgo) confirm spacetime ripples to the width of a proton. Planetary telemetry matches general relativity to 14 decimal places.",
      sciencePoints: [
        "LIGO gravitational wave confirmation",
        "Subatomic precision laser interferometers",
        "Black hole shadow imaging (Event Horizon Telescope)"
      ],
      scienceMetrics: [
        { label: "Reproducibility", val: 100, color: "bg-neon-blue" },
        { label: "Instrument Precision", val: 98, color: "bg-neon-blue" }
      ],
      specTitle: "Anecdotal & UFO Claims",
      specText: "Speculative proofs rely heavily on military pilot testimonies (UAP footage), historical conspiracy theories (Operation Paperclip / Die Glocke), or claims of reverse-engineered extraterrestrial wreckage in restricted labs.",
      specPoints: [
        "Rely on pilot eyewitness testimonies",
        "Military radar artifacts and sensor anomalies",
        "Declassified government UFO tracking projects"
      ],
      specMetrics: [
        { label: "Reproducibility", val: 5, color: "bg-neon-purple" },
        { label: "Instrument Precision", val: 20, color: "bg-neon-purple" }
      ]
    }
  ];

  const activeTopic = topics.find((t) => t.id === activeTopicId) || topics[0];

  const handleTopicClick = (id: string) => {
    soundEngine.playClick();
    setActiveTopicId(id);
  };

  return (
    <section
      id="debate-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-dark-bg/60 z-20"
    >
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="font-orbitron text-xs text-neon-blue tracking-[0.25em] uppercase mb-3">
          Holographic Debate Console
        </h3>
        <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-wide uppercase">
          Science vs Anti-Science
        </h2>
        <p className="font-inter font-light text-metal-silver max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
          Pitting peer-reviewed physical evidence directly against speculative claims. Select a debate topic below to analyze the direct scientific counters.
        </p>
      </div>

      {/* Main Console Interface */}
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        {/* Topic Selector Tabs */}
        <div className="flex items-center gap-2 glass-panel border border-white/10 px-3 py-2 rounded-full mb-12 z-20 flex-wrap justify-center">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTopicClick(t.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-6 py-2 rounded-full font-orbitron text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTopicId === t.id
                  ? "bg-gradient-to-r from-neon-blue/15 to-neon-purple/15 border border-neon-blue/30 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  : "border border-transparent text-metal-silver hover:text-white"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Split Screen Battle Ground */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch z-10">
          
          {/* Animated Central VS Core Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-dark-bg border border-white/15 z-30 shadow-[0_0_20px_rgba(255,255,255,0.05)] animate-pulse">
            <span className="font-orbitron font-black text-xs text-white tracking-widest uppercase">
              VS
            </span>
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full border border-neon-blue/20 animate-ping opacity-35" />
          </div>

          <AnimatePresence mode="wait">
            {/* Left Column: Empirical Science (Cyan Theme) */}
            <motion.div
              key={`${activeTopic.id}-science`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="glass-panel border border-neon-blue/25 rounded-2xl p-6 md:p-10 relative overflow-hidden scanlines shadow-[0_0_25px_rgba(0,240,255,0.04)] flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-neon-blue/15">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-neon-blue" />
                    <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-widest">
                      Empirical Science
                    </h4>
                  </div>
                  <span className="font-orbitron text-[8px] text-neon-blue tracking-widest uppercase px-2 py-0.5 rounded bg-neon-blue/10 border border-neon-blue/20">
                    Consensus Confirmed
                  </span>
                </div>

                {/* Body Content */}
                <h5 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider mb-3">
                  {activeTopic.scienceTitle}
                </h5>
                <p className="font-inter font-light text-metal-silver text-xs sm:text-sm leading-relaxed mb-6">
                  {activeTopic.scienceText}
                </p>

                {/* Verifications Checklist */}
                <div className="flex flex-col gap-3 mb-8">
                  {activeTopic.sciencePoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-neon-blue/80 mt-0.5 flex-shrink-0" />
                      <span className="font-inter font-light text-metal-silver text-xs">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Metrics Bar */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-6 mt-4">
                {activeTopic.scienceMetrics.map((sm, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-orbitron text-[8px] text-metal-silver tracking-wider uppercase">
                      <span>{sm.label}</span>
                      <span className="font-mono text-white">{sm.val}%</span>
                    </div>
                    <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sm.val}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full ${sm.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Right Column: Speculative Theory (Magenta Theme) */}
            <motion.div
              key={`${activeTopic.id}-spec`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="glass-panel border border-neon-purple/25 rounded-2xl p-6 md:p-10 relative overflow-hidden scanlines shadow-[0_0_25px_rgba(189,0,255,0.04)] flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-neon-purple/15">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-neon-purple" />
                    <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-widest">
                      Speculative Theory
                    </h4>
                  </div>
                  <span className="font-orbitron text-[8px] text-neon-purple tracking-widest uppercase px-2 py-0.5 rounded bg-neon-purple/10 border border-neon-purple/20 animate-pulse">
                    Peer-Review absent
                  </span>
                </div>

                {/* Body Content */}
                <h5 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider mb-3">
                  {activeTopic.specTitle}
                </h5>
                <p className="font-inter font-light text-metal-silver text-xs sm:text-sm leading-relaxed mb-6">
                  {activeTopic.specText}
                </p>

                {/* Counters Checklist */}
                <div className="flex flex-col gap-3 mb-8">
                  {activeTopic.specPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-neon-purple/80 mt-0.5 flex-shrink-0" />
                      <span className="font-inter font-light text-metal-silver text-xs">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Metrics Bar */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-6 mt-4">
                {activeTopic.specMetrics.map((sm, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-orbitron text-[8px] text-metal-silver tracking-wider uppercase">
                      <span>{sm.label}</span>
                      <span className="font-mono text-white">{sm.val}%</span>
                    </div>
                    <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sm.val}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full ${sm.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
export default DebateSection;
