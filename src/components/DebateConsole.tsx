import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldAlert, Award as Compass } from "lucide-react";
import soundEngine from "../utils/audio";

interface DebateTopic {
  id: string;
  name: string;
  scienceTitle: string;
  scienceText: string;
  sciencePoints: string[];
  scienceMetrics: { label: string; val: number }[];
  specTitle: string;
  specText: string;
  specPoints: string[];
  specMetrics: { label: string; val: number }[];
}

export const DebateConsole: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>("evidence");

  const topics: DebateTopic[] = [
    {
      id: "evidence",
      name: "Empirical Consensus vs Anecdotal Myth",
      scienceTitle: "Empirical Consensus",
      scienceText: "Science relies on systematic replication. Hypotheses must be tested in controlled experiments and reviewed by independent experts. Claims are only validated if multiple global teams can replicate the exact results under identical parameters.",
      sciencePoints: [
        "Double-blind peer-reviewed gatekeeping",
        "Empirical measurement under mathematical models",
        "Public data transparency and methodology audits"
      ],
      scienceMetrics: [
        { label: "Statistical Replication Index", val: 98 },
        { label: "Rigorous Peer Review Level", val: 95 }
      ],
      specTitle: "Anecdotal Testimonies",
      specText: "Anti-science and conspiracies rely heavily on emotional storytelling, isolated unverified demonstrations, or claims of classified cover-ups where the 'proof is locked away.' They emphasize individual belief over public, repeatable methodology.",
      specPoints: [
        "Rely on isolated eyewitness accounts",
        "Home experiments with massive unchecked variables",
        "Circular logic: 'The government hid the evidence'"
      ],
      specMetrics: [
        { label: "Statistical Replication Index", val: 8 },
        { label: "Rigorous Peer Review Level", val: 5 }
      ]
    },
    {
      id: "correction",
      name: "Self-Correction vs Dogmatic Immunity",
      scienceTitle: "Self-Correction Engine",
      scienceText: "Science thrives on error-correction. When new empirical evidence contradicts an established theory, the scientific consensus shifts (e.g., Einstein replacing Newton). Outliers invite deep exploration and adjustment, not defensive cover-ups.",
      sciencePoints: [
        "Constant testing for flaws in old models",
        "Open publishing of refutations and corrections",
        "Error-minimizing peer-review standards"
      ],
      scienceMetrics: [
        { label: "Error-Correction Frequency", val: 95 },
        { label: "Consensus Adaptability Rate", val: 92 }
      ],
      specTitle: "Echo Chamber Immunity",
      specText: "Pseudoscience structures are completely immune to refutations. If an experiment fails to prove an anti-science claim, supporters argue that external agents tampered with their equipment, creating an un-falsifiable loop.",
      specPoints: [
        "Failed tests blamed on corporate sabotage",
        "Immunized against conflicting data audits",
        "Circular logic: 'Proof is absent because they hid it'"
      ],
      specMetrics: [
        { label: "Error-Correction Frequency", val: 4 },
        { label: "Consensus Adaptability Rate", val: 6 }
      ]
    },
    {
      id: "skepticism",
      name: "Empirical Skepticism vs Cynical Denial",
      scienceTitle: "Empirical Skepticism",
      scienceText: "Science encourages questioning authority, but requires alternative models to be backed by stronger mathematics and better measurements. Skepticism is a precise tool to extract truth, not to deny objective reality.",
      sciencePoints: [
        "Questions dogmas using empirical variables",
        "Demands higher-precision mathematical proofs",
        "Collaborates globally to build scientific trust"
      ],
      scienceMetrics: [
        { label: "Scientific Integrity Index", val: 96 },
        { label: "Data Openness Rate", val: 98 }
      ],
      specTitle: "Cynical Denial",
      specText: "Pseudoscience shifts skepticism from the *claim* to the *institutions*. Any scientific validation, peer consensus, or university refutation is dismissed simply because it comes from an established 'corrupt' authority.",
      specPoints: [
        "Institutional consensus dismissed as brainwashing",
        "Universities and labs labeled corporate shills",
        "Cynical skepticism: 'No institutional source is real'"
      ],
      specMetrics: [
        { label: "Scientific Integrity Index", val: 5 },
        { label: "Data Openness Rate", val: 12 }
      ]
    }
  ];

  const activeTopic = topics.find((t) => t.id === activeTopicId) || topics[0];

  const handleTopicClick = (id: string) => {
    soundEngine.playWarning();
    setActiveTopicId(id);
  };

  return (
    <section
      id="debate-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-sepia-dark/50 z-20 overflow-hidden"
    >
      {/* Dynamic atmospheric filter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-glowing/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none">
        <span className="font-cinzel text-[10px] text-gold-glowing tracking-[0.3em] uppercase mb-4 block font-bold">
          Chapter V • The Epistemic Scales
        </span>
        <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-parchment tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          The Pillars of Proof
        </h2>
        <div className="w-24 h-[1px] bg-gold-glowing/30 mx-auto my-6" />
        <p className="font-lora text-sm sm:text-base text-parchment-dark/80 max-w-xl mx-auto leading-relaxed">
          Contrast scientific methodology directly against dogmatic immune systems. Trace why empirical doubt succeeds while conspiratorial skepticism breeds intellectual echo chambers.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center select-none">
        <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-xl bg-sepia-dark border border-gold-glowing/10 mb-12 z-20">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTopicClick(t.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-5 py-3 rounded-lg font-cinzel text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTopicId === t.id
                  ? "bg-sepia-medium border border-gold-glowing/30 text-gold-glowing shadow-gold-glow"
                  : "border border-transparent text-parchment-dark/60 hover:text-parchment"
              }`}
            >
              {t.name.split(" vs ")[0]}
            </button>
          ))}
        </div>

        {/* Battleground Panels */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch z-10">
          
          {/* Faint VS Indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-sepia-dark border border-gold-glowing/25 z-30 shadow-gold-glow text-gold-glowing">
            <span className="font-cinzel font-black text-xs">VS</span>
          </div>

          {/* Left Column: Scientific Consensus */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTopic.id}-science`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="parchment-card rounded-2xl p-6 sm:p-10 border-gold-glowing/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gold-glowing/15 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Compass className="w-5 h-5 text-gold-glowing" />
                    <h4 className="font-cinzel font-bold text-xs text-parchment tracking-widest uppercase">
                      Empirical Consensus
                    </h4>
                  </div>
                  <span className="font-cinzel text-[8px] text-gold-glowing tracking-widest uppercase px-2 py-0.5 rounded bg-gold-glowing/10 border border-gold-glowing/20">
                    Scientific Core
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-base sm:text-lg text-parchment tracking-wide uppercase mb-3">
                  {activeTopic.scienceTitle}
                </h3>
                <p className="font-lora text-xs sm:text-sm leading-relaxed text-parchment-dark/85 text-justify mb-6">
                  {activeTopic.scienceText}
                </p>

                {/* Points */}
                <div className="flex flex-col gap-3">
                  {activeTopic.sciencePoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-gold-glowing mt-0.5 flex-shrink-0" />
                      <span className="font-lora text-xs leading-relaxed text-parchment-dark/75">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="border-t border-gold-glowing/10 pt-6 mt-8 flex flex-col gap-4">
                {activeTopic.scienceMetrics.map((sm, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-cinzel text-[8px] text-gold-dim tracking-wider uppercase">
                      <span>{sm.label}</span>
                      <span className="font-mono text-gold-glowing">{sm.val}%</span>
                    </div>
                    <div className="w-full h-1 bg-sepia-dark rounded-full overflow-hidden border border-gold-glowing/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sm.val}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gold-glowing shadow-gold-glow"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Column: Speculative Dogma */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTopic.id}-spec`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="parchment-card rounded-2xl p-6 sm:p-10 border-crimson-bright/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-crimson-bright/15 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-crimson-bright animate-pulse" />
                    <h4 className="font-cinzel font-bold text-xs text-parchment tracking-widest uppercase">
                      Dogmatic Isolation
                    </h4>
                  </div>
                  <span className="font-cinzel text-[8px] text-crimson-bright tracking-widest uppercase px-2 py-0.5 rounded bg-crimson-deep/10 border border-crimson-bright/20 animate-pulse">
                    Pseudoscience Core
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-base sm:text-lg text-parchment tracking-wide uppercase mb-3">
                  {activeTopic.specTitle}
                </h3>
                <p className="font-lora text-xs sm:text-sm leading-relaxed text-parchment-dark/85 text-justify mb-6">
                  {activeTopic.specText}
                </p>

                {/* Points */}
                <div className="flex flex-col gap-3">
                  {activeTopic.specPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-crimson-bright mt-0.5 flex-shrink-0" />
                      <span className="font-lora text-xs leading-relaxed text-parchment-dark/75">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="border-t border-gold-glowing/10 pt-6 mt-8 flex flex-col gap-4">
                {activeTopic.specMetrics.map((sm, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-cinzel text-[8px] text-crimson-bright/70 tracking-wider uppercase">
                      <span>{sm.label}</span>
                      <span className="font-mono text-crimson-bright">{sm.val}%</span>
                    </div>
                    <div className="w-full h-1 bg-sepia-dark rounded-full overflow-hidden border border-crimson-bright/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sm.val}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-crimson-bright shadow-crimson-glow"
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

export default DebateConsole;
