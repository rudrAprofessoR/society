import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Compass, ShieldAlert } from "lucide-react";
import soundEngine from "../utils/audio";

interface CardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  text: string;
  details: string;
  points: string[];
  color: string;
  sealText: string;
}

export const SocietyIntro: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards: CardData[] = [
    {
      id: "science",
      icon: <Compass className="w-5 h-5 text-gold-glowing" />,
      title: "Science as Doubt",
      subtitle: "The Empirical Path",
      text: "Science is not an absolute repository of static truths, but a rigorous methodology of persistent doubt. It operates on the radical premise that any theory, no matter how cherished, must be abandoned if the evidence demands it.",
      details: "In the scientific method, doubt is the supreme virtue. By subjecting every claim to harsh empirical testing and peer scrutiny, science protects society from individual biases. It is comfortable with 'not knowing' until proof is established, valuing structural uncertainty over comfortable delusions.",
      points: ["Systematic Falsifiability", "Double-Blind Verification", "Self-Correcting Consensus"],
      color: "border-gold-glowing/20 hover:border-gold-glowing/60 text-gold-glowing shadow-gold-glow",
      sealText: "VERITAS"
    },
    {
      id: "antiscience",
      icon: <ShieldAlert className="w-5 h-5 text-crimson-bright" />,
      title: "Anti-Science as Fear",
      subtitle: "Ideological Immunity",
      text: "Anti-science is the active rejection of empirical consensus. It is not simply a lack of knowledge, but an emotional counter-movement driven by tribal identities that construct mental barriers against uncomfortable facts.",
      details: "When scientific truth threatens a person's religious, political, or financial status, their brain registers the data as a physical threat. To protect their identity, they reject the consensus, citing isolated anomalies, conspiracy networks, or unverified anecdotal experiences as absolute proof.",
      points: ["Anecdotal Immunity Filters", "Tribal Consensus Denial", "Erosion of Institutional Trust"],
      color: "border-crimson-bright/20 hover:border-crimson-bright/60 text-crimson-bright shadow-crimson-glow",
      sealText: "DOGMA"
    },
    {
      id: "psychology",
      icon: <HelpCircle className="w-5 h-5 text-parchment-dark" />,
      title: "The Cognitive Bridge",
      subtitle: "Comfort of Patterns",
      text: "Our minds evolved on ancient savannas where noticing false patterns was safer than missing real threats. Today, this cognitive bias leads us to mistake chaotic coincidences for hidden, deliberate conspiracies.",
      details: "Conspiracies and pseudoscience thrive because they offer immediate, emotional comfort. In a cold and complex universe, believing that a secret group is pulling the strings feels far safer than accepting that no one is in control. Pseudoscience exploits this hunger for order.",
      points: ["Pattern-Seeking Fallacy", "Intentional Agency Bias", "Outrage-Driven Algorithms"],
      color: "border-parchment/10 hover:border-gold-glowing/40 text-parchment-dark shadow-inner-shadow",
      sealText: "MYTHUS"
    }
  ];

  const handleCardClick = (id: string) => {
    if (activeCard === id) {
      soundEngine.playClick();
      setActiveCard(null);
    } else {
      soundEngine.playWarning();
      setActiveCard(id);
    }
  };

  return (
    <section
      id="intro-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 md:px-12 bg-sepia-dark/40 z-20 overflow-hidden"
    >
      {/* Background radial gradients for candlelit museum aura */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-crimson-deep/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-gold-glowing/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-20 select-none">
        <span className="font-cinzel text-[10px] text-gold-glowing tracking-[0.3em] uppercase mb-4 block font-bold">
          Chapter I • The Foundational Divide
        </span>
        <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-parchment tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          The Anatomy of Belief
        </h2>
        <div className="w-24 h-[1px] bg-gold-glowing/30 mx-auto my-6" />
        <p className="font-playfair text-base sm:text-lg text-parchment-dark/80 italic leading-relaxed">
          “It is far better to grasp the universe as it really is than to persist in delusion, however satisfying and reassuring.”
          <span className="block font-cinzel text-xs text-gold-dim tracking-widest mt-2 not-italic">— Carl Sagan</span>
        </p>
      </div>

      {/* Interactive Museum Cards Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start select-none">
        {cards.map((card) => {
          const isExpanded = activeCard === card.id;

          return (
            <motion.div
              key={card.id}
              layout
              onClick={() => handleCardClick(card.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`parchment-card p-8 rounded-2xl cursor-pointer ${
                isExpanded ? "parchment-card-active lg:col-span-1" : ""
              } flex flex-col justify-between`}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              {/* Parchment background texture effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,239,226,0.02),transparent)] pointer-events-none" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold-glowing/10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sepia-dark border border-gold-glowing/25">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-cinzel font-bold text-sm sm:text-base tracking-wider text-parchment">
                        {card.title}
                      </h3>
                      <span className="font-playfair text-[10px] text-gold-dim tracking-widest uppercase italic block mt-0.5">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  {/* Wax Seal look-alike */}
                  <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border-2 border-dashed border-crimson-deep/40 bg-crimson-deep/10 text-crimson-bright font-cinzel text-[7px] tracking-wider font-extrabold select-none opacity-60">
                    {card.sealText}
                  </div>
                </div>

                {/* Body Text */}
                <p className="font-lora text-sm leading-relaxed text-parchment-dark/85 text-justify">
                  {card.text}
                </p>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gold-glowing/10 overflow-hidden"
                    >
                      <p className="font-lora text-xs leading-relaxed text-gold-dim italic text-justify">
                        {card.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer / Bullet points */}
              <div className="relative z-10 mt-8 pt-6 border-t border-gold-glowing/10 flex flex-col gap-2.5">
                {card.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-glowing/60" />
                    <span className="font-cinzel text-[9px] text-parchment/70 tracking-[0.2em] uppercase font-bold">
                      {pt}
                    </span>
                  </div>
                ))}
                
                <span className="font-cinzel text-[8px] tracking-[0.2em] text-gold-glowing/50 uppercase mt-4 text-right block hover:text-gold-glowing transition-colors">
                  {isExpanded ? "Click Card to Seal" : "Click to Unroll Document"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative curatorial marker */}
      <div className="max-w-4xl mx-auto w-full text-center mt-20 text-[9px] font-cinzel text-gold-dim/40 tracking-[0.3em] uppercase select-none">
        Exhibition Document Shelf • Cabinet of Skeptics • Year 2026
      </div>
    </section>
  );
};

export default SocietyIntro;
