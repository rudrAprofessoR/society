import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, AlertTriangle, Scroll, HelpCircle } from "lucide-react";
import soundEngine from "../utils/audio";

interface HysteriaCase {
  id: string;
  year: string;
  title: string;
  fearSource: string;
  historicalPanic: string;
  scientificReality: string;
  newspaperTitle: string;
  headline: string;
}

export const GravityCaseStudy: React.FC = () => {
  const [activeCase, setActiveCase] = useState<string>("steam");

  const hysterias: HysteriaCase[] = [
    {
      id: "steam",
      year: "A.D. 1830",
      title: "The Steam Engine Demise",
      fearSource: "Mechanical Velocity",
      historicalPanic: "When early railways were built, editorial newspapers warned that travelling at the speed of 30 miles per hour would cause the human body to suffer immediate physical dissolution, lung collapse, or violent brain hemorrhaging due to the high-velocity air currents.",
      scientificReality: "Modern high-speed trains operate comfortably at over 200 mph. This panic demonstrates how human biology is frequently believed to be too fragile for technological leaps.",
      newspaperTitle: "The London Daily Gazette",
      headline: "DIABOLICAL IRON HORSE TO CURDLE LUNGS AT 30 MPH!"
    },
    {
      id: "electric",
      year: "A.D. 1889",
      title: "The Invisible Killer",
      fearSource: "Alternating Current",
      historicalPanic: "As electric streetlights were installed in cities, cartoons and opinion pieces depicted electricity leaking from wires, turning citizens into smoking skeletons, drawing lightning storms directly into bedrooms, and transmitting diseases through home light fixtures.",
      scientificReality: "Strict copper insulation and ground wires made electrical grids globally safe. This show of alarm proves how invisible electromagnetic forces are naturally primed for supernatural projections.",
      newspaperTitle: "The New York Chronicle",
      headline: "COPPERS SNAKES IN THE STREETS! THE DEATH SPARK OUTLAWED!"
    },
    {
      id: "fluoride",
      year: "A.D. 1950",
      title: "Water Fluoridation Outrage",
      fearSource: "Chemical Enrichment",
      historicalPanic: "The public introduction of trace fluoride to drinking water to strengthen teeth was met with extreme geopolitical panic. Conspiracy pamphlets declared it a Soviet brain-washing chemical engineered to sap the willpower of citizens.",
      scientificReality: "Decades of global clinical trials proved that public fluoridation reduced tooth decay by over 25% with zero cognitive side effects. It represents a classic case of public health framed as absolute state tyranny.",
      newspaperTitle: "The Patriotic Observer",
      headline: "SECRET SOVIET POWDERS POISONING PUBLIC RESERVOIRS!"
    },
    {
      id: "towers",
      year: "A.D. 2003",
      title: "Radio Mast Curdlers",
      fearSource: "Electromagnetic Signals",
      historicalPanic: "With the roll-out of 3G and 4G masts, rural communities accused the radio waves of curdling cows' milk, causing localized bird drops, and causing severe, unexplainable physical headaches among residents who lived miles away.",
      scientificReality: "Non-ionizing radio frequencies operate far below biological cellular damage thresholds. Yet, public anxieties frequently translate psychological stress into real, felt physical illnesses.",
      newspaperTitle: "The Rural Herald",
      headline: "SIGNAL ANTENNAS CAUSING BIRDS TO FALL FROM CLOUDS!"
    }
  ];

  const currentCase = hysterias.find((c) => c.id === activeCase) || hysterias[0];

  const handleSelectCase = (id: string) => {
    soundEngine.playWarning();
    setActiveCase(id);
  };

  return (
    <section
      id="case-study-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-sepia-dark/55 z-20 overflow-hidden"
    >
      {/* Visual background layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-deep/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none">
        <span className="font-cinzel text-[10px] text-gold-glowing tracking-[0.3em] uppercase mb-4 block font-bold">
          Chapter III • The Cabinet of Hysteria
        </span>
        <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-parchment tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Mass Hysterias & Panic
        </h2>
        <div className="w-24 h-[1px] bg-gold-glowing/30 mx-auto my-6" />
        <p className="font-lora text-sm sm:text-base text-parchment-dark/80 max-w-xl mx-auto leading-relaxed">
          Explore the historical pattern of societal rejection. How does the arrival of an invisible force—velocity, electricity, chemicals, or wireless signals—inevitably trigger mass public terror?
        </p>
      </div>

      {/* Split Interactive Exhibition Layout */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch select-none">
        
        {/* Left Column: Historical Newspaper Clipping Drawer */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="w-full flex items-center justify-between bg-sepia-medium/80 border border-gold-glowing/15 px-5 py-4 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-gold-glowing animate-pulse" />
              <h5 className="font-cinzel font-bold text-[10px] text-parchment tracking-[0.18em] uppercase">
                Archival Newspaper Drawer
              </h5>
            </div>
            <span className="font-cinzel text-[8px] text-gold-dim tracking-widest uppercase">
              Exhib. Shelf III
            </span>
          </div>

          {/* Newspaper Visual Frame */}
          <div className="relative w-full h-[380px] bg-sepia-dark/80 border-x border-b border-gold-glowing/15 rounded-b-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between">
            {/* Aging noise overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sepia-dark/20 to-black/90 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,239,226,0.01),transparent)] pointer-events-none" />

            <div className="relative z-10 text-center border-b border-double border-gold-glowing/30 pb-4">
              <span className="font-playfair text-[9px] text-gold-dim uppercase tracking-[0.2em] font-extrabold italic block mb-1">
                — {currentCase.newspaperTitle} —
              </span>
              <span className="font-cinzel text-[7px] text-gold-dim/50 tracking-widest uppercase block">
                Published {currentCase.year} // Price: One Half-Penny
              </span>
            </div>

            <div className="relative z-10 my-auto text-center py-6">
              <h4 className="font-playfair text-xl sm:text-2xl font-black text-parchment leading-tight tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] italic uppercase">
                “{currentCase.headline}”
              </h4>
              <div className="w-12 h-[1px] bg-crimson-bright/40 mx-auto my-4" />
              <span className="font-cinzel text-[8px] tracking-[0.25em] text-crimson-bright font-bold uppercase animate-pulse">
                • Public Safety Warnings Declared •
              </span>
            </div>

            <div className="relative z-10 text-center border-t border-gold-glowing/10 pt-4 flex justify-between items-center text-[8px] font-cinzel text-gold-dim/40 tracking-wider">
              <span>VOL. XLIV NO. 1892</span>
              <span>MICROFILM REPRODUCTION 2026</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Panic Details */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Timeline selector tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-sepia-dark border border-gold-glowing/10">
            {hysterias.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectCase(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-4 py-2 rounded-lg font-cinzel text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeCase === item.id
                    ? "bg-sepia-medium border border-gold-glowing/35 text-gold-glowing shadow-gold-glow"
                    : "border border-transparent text-parchment-dark/60 hover:text-parchment"
                }`}
              >
                {item.year.split(" ")[1]}s
              </button>
            ))}
          </div>

          {/* Exhibition panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="parchment-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 text-crimson-bright">
                  <Skull className="w-5 h-5 animate-pulse" />
                  <span className="font-cinzel font-bold text-xs uppercase tracking-wider">
                    Historic Panic Analysis
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-lg sm:text-2xl text-parchment tracking-wide uppercase mb-2">
                  {currentCase.title}
                </h3>
                <span className="font-playfair text-xs text-gold-glowing/75 italic block mb-6">
                  Fear Source: {currentCase.fearSource}
                </span>

                <div className="flex flex-col gap-6">
                  {/* The Panic */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-crimson-deep/10 border border-crimson-bright/20 text-crimson-bright">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-cinzel font-bold text-[10px] text-parchment tracking-wider uppercase">
                        The Societal Panic
                      </h4>
                      <p className="font-lora text-xs sm:text-sm leading-relaxed text-parchment-dark/85 text-justify mt-1">
                        {currentCase.historicalPanic}
                      </p>
                    </div>
                  </div>

                  {/* The Reality */}
                  <div className="flex gap-4 border-t border-gold-glowing/10 pt-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gold-glowing/10 border border-gold-glowing/20 text-gold-glowing">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-cinzel font-bold text-[10px] text-gold-glowing tracking-wider uppercase">
                        The Scientific Reality
                      </h4>
                      <p className="font-lora text-xs sm:text-sm leading-relaxed text-parchment-dark/85 text-justify mt-1">
                        {currentCase.scientificReality}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-right border-t border-gold-glowing/10 pt-4">
                <span className="font-cinzel text-[8px] tracking-[0.2em] text-gold-dim/40 uppercase">
                  Subject Cabinet III-A • Curator Approved
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default GravityCaseStudy;
