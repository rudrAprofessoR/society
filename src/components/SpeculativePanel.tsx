import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertOctagon, HelpCircle, BookOpen, AlertTriangle } from "lucide-react";
import soundEngine from "../utils/audio";

interface CaseFile {
  id: string;
  title: string;
  origin: string;
  claim: string;
  scientificReality: string;
  warnings: string[];
}

export const SpeculativePanel: React.FC = () => {
  const [openFileId, setOpenFileId] = useState<string | null>("ufo");

  const caseFiles: CaseFile[] = [
    {
      id: "ufo",
      title: "Element 115 & UFO Propulsion",
      origin: "Bob Lazar / S4 Claims (1989)",
      claim: "Exotic Element 115 (Moscovium) is bombarded with protons, creating antimatter which reacts with matter to generate an intense gravitational wave, bending space around the craft to allow instantaneous travel.",
      scientificReality: "Moscovium was successfully synthesized in 2003. Like all superheavy elements, its isotopes are highly unstable and decay in milliseconds. It does not possess gravity-warping properties. Generating gravity waves requires massive celestial scale masses, not subatomic particles.",
      warnings: ["NOT SCIENTIFICALLY PROVEN", "VIOLATES CONSERVATION OF ENERGY", "NO EMPIRICAL EVIDENCE"]
    },
    {
      id: "electrogravitics",
      title: "The Biefeld-Brown Effect",
      origin: "Thomas Townsend Brown (1920s)",
      claim: "An asymmetrical capacitor charged with high voltage (tens of kilovolts) experiences a thrust force in the direction of the positive electrode. Supporters claimed this demonstrated a link between electromagnetism and gravity.",
      scientificReality: "Rigorous testing in vacuum chambers has proven that the Biefeld-Brown thrust is entirely caused by 'ion wind' (asymmetrical ionization of surrounding air particles kicking the capacitor). In space vacuums, no electrogravitic thrust occurs.",
      warnings: ["ION WIND MECHANISM CONFINED", "NO SPACETIME BENDING EFFECT"]
    },
    {
      id: "dieglocke",
      title: "Die Glocke (The Nazi Bell)",
      origin: "Conspiracy Theories / Igor Witkowski (2000)",
      claim: "A secret superweapon consisting of counter-rotating cylinders filled with a highly toxic violet liquid metal called 'Xerum 525' spinning at extreme speeds, allegedly bending spacetime and causing anti-gravity levitation.",
      scientificReality: "Die Glocke belongs entirely to post-war mythology and conspiracy literature. No physical schematics, credible military archives, or operational remnants exist. It violates nearly all fundamental principles of modern quantum mechanics and relativity.",
      warnings: ["CONSPIRACY LEGEND", "ZERO PHYSICAL RECORD", "PSEUDOSCIENTIFIC CLAIMS"]
    }
  ];

  const handleToggleFile = (id: string) => {
    if (openFileId === id) {
      soundEngine.playClick();
      setOpenFileId(null);
    } else {
      soundEngine.playWarning(); // Play warning alert sound
      setOpenFileId(id);
    }
  };

  return (
    <section
      id="anti-science-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-dark-bg/20 z-20"
    >
      {/* Visual background details */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-neon-orange/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="font-orbitron text-xs text-neon-orange tracking-[0.25em] uppercase mb-3">
          Speculative Archives
        </h3>
        <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white tracking-wide uppercase">
          Speculative Theory & Anti-Science
        </h2>
        <p className="font-inter font-light text-metal-silver max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
          Examine high-profile anti-gravity claims and conspiracy theories. Learn why peer-reviewed science categorizes them as unproven or physically impossible.
        </p>
      </div>

      {/* Main Holographic Terminal Layout */}
      <div className="max-w-4xl mx-auto w-full glass-panel border border-neon-orange/20 rounded-2xl p-6 md:p-10 relative overflow-hidden scanlines shadow-[0_0_25px_rgba(255,92,0,0.06)]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-neon-orange/15">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-neon-orange/10 border border-neon-orange/30 text-neon-orange animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-orbitron font-black text-sm text-white uppercase tracking-wider">
                Classified Speculative Files
              </h4>
              <span className="font-inter text-[9px] text-neon-orange uppercase tracking-widest font-semibold">
                Restriction Level: Critical Inquiry
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-neon-orange/15 border border-neon-orange/30 text-[9px] font-orbitron text-neon-orange tracking-widest uppercase">
            <AlertOctagon className="w-3.5 h-3.5" />
            Empirical Proof Absent
          </div>
        </div>

        {/* Restricted Dossier Files Accordion */}
        <div className="flex flex-col gap-4">
          {caseFiles.map((file) => {
            const isOpen = openFileId === file.id;
            return (
              <div
                key={file.id}
                className={`glass-panel rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-neon-orange/40 bg-dark-bg/60 shadow-[0_0_15px_rgba(255,92,0,0.1)]"
                    : "border-white/5 bg-dark-bg/25 hover:border-neon-orange/20"
                }`}
              >
                {/* File tab trigger */}
                <button
                  onClick={() => handleToggleFile(file.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 cursor-pointer text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-neon-orange animate-ping" : "bg-metal-silver/40"}`} />
                    <div>
                      <h5 className="font-orbitron font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                        {file.title}
                      </h5>
                      <span className="font-inter text-[10px] text-metal-silver/50 tracking-wide">
                        Origin: {file.origin}
                      </span>
                    </div>
                  </div>

                  {/* Restricted warning indicator */}
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline font-orbitron text-[8px] text-neon-orange/60 tracking-wider uppercase">
                      {isOpen ? "Decrypting" : "Encrypted"}
                    </span>
                    <AlertTriangle className={`w-4 h-4 text-neon-orange/70 ${isOpen ? "rotate-180" : ""} transition-transform duration-300`} />
                  </div>
                </button>

                {/* Expanded holographic document details */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-neon-orange/15 flex flex-col gap-6">
                        
                        {/* Warnings Row */}
                        <div className="flex flex-wrap gap-2">
                          {file.warnings.map((warn, i) => (
                            <span
                              key={i}
                              className="font-orbitron text-[8px] tracking-widest text-neon-orange uppercase px-2 py-0.5 rounded bg-neon-orange/10 border border-neon-orange/25"
                            >
                              {warn}
                            </span>
                          ))}
                        </div>

                        {/* Claims & Reality columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                          {/* Claim box */}
                          <div className="glass-panel border border-white/5 rounded-lg p-4 bg-dark-bg/25">
                            <div className="flex items-center gap-2 mb-2 text-metal-silver">
                              <HelpCircle className="w-4 h-4" />
                              <span className="font-orbitron font-bold text-[9px] uppercase tracking-wider">
                                Speculative Claim
                              </span>
                            </div>
                            <p className="font-inter font-light text-metal-silver text-xs leading-relaxed">
                              {file.claim}
                            </p>
                          </div>

                          {/* Scientific proof box */}
                          <div className="glass-panel border border-neon-orange/15 rounded-lg p-4 bg-neon-orange/5">
                            <div className="flex items-center gap-2 mb-2 text-neon-orange">
                              <BookOpen className="w-4 h-4" />
                              <span className="font-orbitron font-black text-[9px] uppercase tracking-wider">
                                Empirical Evaluation
                              </span>
                            </div>
                            <p className="font-inter font-light text-white text-xs leading-relaxed">
                              {file.scientificReality}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Warning label footer */}
        <div className="flex items-center gap-2 text-center justify-center mt-8 font-orbitron text-[8px] sm:text-[9px] text-neon-orange/45 tracking-[0.2em] uppercase">
          <AlertOctagon className="w-4 h-4" />
          Science relies on rigorous peer-review and mathematical reproducibility. Beware pseudoscientific shortcuts.
        </div>
      </div>
    </section>
  );
};
export default SpeculativePanel;
