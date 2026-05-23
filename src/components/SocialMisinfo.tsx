import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Smartphone, Check, X, AlertTriangle, ShieldAlert } from "lucide-react";
import soundEngine from "../utils/audio";

interface RumorShift {
  id: string;
  topic: string;
  vintageYear: string;
  vintageFormat: string;
  vintageRumor: string;
  vintageRealFact: string;
  modernPlatform: string;
  modernRumor: string;
  modernRealFact: string;
  curatorInsight: string;
}

export const SocialMisinfo: React.FC = () => {
  const [activeShift, setActiveShift] = useState<string>("smallpox");

  const shifts: RumorShift[] = [
    {
      id: "smallpox",
      topic: "Inoculation Panic",
      vintageYear: "A.D. 1796",
      vintageFormat: "Printed Pamphlets",
      vintageRumor: "As Edward Jenner successfully introduced cowpox inoculation to cure smallpox, anti-vaccination leaflets spread woodcut illustrations showing inoculated children sprouting cow ears, horns, and hooves from their skin.",
      vintageRealFact: "The cowpox fluid was medically harmless to humans, successfully triggering immunity against lethal smallpox.",
      modernPlatform: "Social Algorithmic Stream",
      modernRumor: "TikTok and WhatsApp broadcasts declare that modern mRNA vaccinations alter human genetic DNA structures, insert tracking microchips, and turn patients into electromagnetic receptors.",
      modernRealFact: "mRNA strands are naturally degraded by cellular processes within hours, and possess zero microchip or magnetic properties.",
      curatorInsight: "Throughout 200 years, the fear of injecting foreign material remains identical. Only the medium has shifted: from simple woodcut drawings to algorithmic video streams."
    },
    {
      id: "fire",
      topic: "Scapegoat Outrage",
      vintageYear: "A.D. 1666",
      vintageFormat: "Broadsheet Gazettes",
      vintageRumor: "During the Great Fire of London, rumor gazettes blamed foreign Catholic conspiracies, declaring that French spies were seen throwing fireballs into bakeries to bring down Protestant England.",
      vintageRealFact: "The fire started due to an accidental, unattended oven spark in a Pudding Lane bakery during a dry drought.",
      modernPlatform: "Anonymous Forum Feeds",
      modernRumor: "X and Reddit forums declare that major environmental forest fires are secretly caused by government-directed space laser beams to force citizens into climate confinement zones.",
      modernRealFact: "Fires are scientifically driven by severe lightning strikes, drying summer winds, and structural spark failures.",
      curatorInsight: "In times of disaster, human societies desperately seek a human mastermind to blame, preferring an evil enemy over cold mechanical accidents."
    },
    {
      id: "earth",
      topic: "Flat Horizons",
      vintageYear: "A.D. 1849",
      vintageFormat: "Zetetic Pamphlets",
      vintageRumor: "Samuel Rowbotham published leaflets declaring the Earth is a flat disc, citing that rivers do not physically curve, and that the global round-Earth model is a conspiracy by elite Newtonian astronomers.",
      vintageRealFact: "Simple geometry, solar ship horizon drops, and shadow calculations proved Earth's spherical shape since ancient Greece.",
      modernPlatform: "Outrage Recommendation Feeds",
      modernRumor: "Popular YouTube conspiracy channels declare that NASA fakes all satellite images using CGI green screens to hide the colossal ice wall surrounding the flat Earth disc.",
      modernRealFact: "Thousands of independent satellites, weather cams, and international astronauts photograph Earth's curvature daily.",
      curatorInsight: "Flat-Earth skepticism is not about geometry; it is a psychological expression of extreme trust deficits in scientific authority."
    }
  ];

  const currentShift = shifts.find((s) => s.id === activeShift) || shifts[0];

  const handleSelectShift = (id: string) => {
    soundEngine.playWarning();
    setActiveShift(id);
  };

  return (
    <section
      id="misinfo-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-sepia-dark/45 z-20 overflow-hidden"
    >
      {/* Immersive radial glow filters */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-crimson-deep/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-gold-glowing/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none">
        <span className="font-cinzel text-[10px] text-gold-glowing tracking-[0.3em] uppercase mb-4 block font-bold">
          Chapter IV • The Media Engine
        </span>
        <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-parchment tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Parchment to Pixels
        </h2>
        <div className="w-24 h-[1px] bg-gold-glowing/30 mx-auto my-6" />
        <p className="font-lora text-sm sm:text-base text-parchment-dark/80 max-w-xl mx-auto leading-relaxed">
          How does rumor evolve? Compare the printed woodcuts of the Renaissance directly with modern digital feeds. Observe how the core psychological panic remains unchanged.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch select-none">
        
        {/* Left Column: Rumor Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-sepia-medium/80 border border-gold-glowing/15 px-5 py-4 rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-gold-glowing animate-pulse" />
            <h5 className="font-cinzel text-[10px] text-parchment tracking-[0.18em] uppercase font-bold">
              Evolutionary Cases
            </h5>
          </div>

          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-3">
            {shifts.map((shift) => (
              <button
                key={shift.id}
                onClick={() => handleSelectShift(shift.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 min-w-[220px] lg:min-w-0 cursor-pointer ${
                  activeShift === shift.id
                    ? "bg-sepia-medium border-gold-glowing shadow-gold-glow text-gold-glowing"
                    : "bg-sepia-dark/60 border-parchment/10 text-parchment-dark/70 hover:text-parchment hover:border-gold-glowing/20"
                }`}
              >
                <span className="font-cinzel text-[8px] tracking-widest uppercase block text-gold-dim">
                  Rumor Theme
                </span>
                <h4 className="font-cinzel text-xs tracking-wider uppercase font-bold mt-1">
                  {shift.topic}
                </h4>
              </button>
            ))}
          </div>

          <div className="hidden lg:block bg-sepia-dark/85 border border-gold-glowing/10 rounded-xl p-5">
            <span className="font-cinzel text-[8px] tracking-[0.2em] text-crimson-bright font-bold uppercase block mb-1">
              Curator Insight
            </span>
            <p className="font-lora text-[11px] leading-relaxed text-parchment-dark/70 text-justify">
              {currentShift.curatorInsight}
            </p>
          </div>
        </div>

        {/* Right Column: Fading Comparison Panels */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentShift.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
            >
              
              {/* Vintage Rumor Panel */}
              <div className="parchment-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-gold-glowing/25">
                <div>
                  <div className="flex items-center justify-between border-b border-gold-glowing/15 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-gold-glowing">
                      <Book className="w-4 h-4" />
                      <span className="font-cinzel font-bold text-[9px] tracking-widest uppercase">
                        Vintage Print
                      </span>
                    </div>
                    <span className="font-cinzel text-[8px] text-gold-dim tracking-widest">
                      {currentShift.vintageYear}
                    </span>
                  </div>

                  <h3 className="font-playfair text-lg text-parchment font-bold italic mb-3">
                    Format: {currentShift.vintageFormat}
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div className="bg-sepia-dark/70 border border-crimson-deep/20 rounded-xl p-4 flex gap-3 items-start">
                      <X className="w-4 h-4 text-crimson-bright mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-cinzel text-[8px] tracking-wider text-crimson-bright font-bold uppercase mb-1">
                          Printed Rumor
                        </h4>
                        <p className="font-lora text-xs leading-relaxed text-parchment-dark/80 text-justify">
                          {currentShift.vintageRumor}
                        </p>
                      </div>
                    </div>

                    <div className="bg-sepia-dark/70 border border-gold-glowing/20 rounded-xl p-4 flex gap-3 items-start">
                      <Check className="w-4 h-4 text-gold-glowing mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-cinzel text-[8px] tracking-wider text-gold-glowing font-bold uppercase mb-1">
                          Historic Truth
                        </h4>
                        <p className="font-lora text-xs leading-relaxed text-parchment-dark/95 text-justify">
                          {currentShift.vintageRealFact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="font-cinzel text-[8px] text-gold-dim/40 tracking-[0.2em] mt-6 block uppercase text-center border-t border-gold-glowing/10 pt-4">
                  Archive Folio III-B • Woodcut Press
                </span>
              </div>

              {/* Modern Rumor Panel */}
              <div className="parchment-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-crimson-bright/25">
                <div>
                  <div className="flex items-center justify-between border-b border-crimson-bright/15 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-crimson-bright">
                      <Smartphone className="w-4 h-4" />
                      <span className="font-cinzel font-bold text-[9px] tracking-widest uppercase">
                        Modern Pixel
                      </span>
                    </div>
                    <span className="font-cinzel text-[8px] text-crimson-bright/70 tracking-widest">
                      Year 2026
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xs text-parchment tracking-wider uppercase mb-3">
                    Format: {currentShift.modernPlatform}
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div className="bg-sepia-dark/70 border border-crimson-bright/20 rounded-xl p-4 flex gap-3 items-start">
                      <AlertTriangle className="w-4 h-4 text-crimson-bright mt-0.5 flex-shrink-0 animate-pulse" />
                      <div>
                        <h4 className="font-cinzel text-[8px] tracking-wider text-crimson-bright font-bold uppercase mb-1">
                          Algorithmic Alert
                        </h4>
                        <p className="font-lora text-xs leading-relaxed text-parchment-dark/80 text-justify">
                          {currentShift.modernRumor}
                        </p>
                      </div>
                    </div>

                    <div className="bg-sepia-dark/70 border border-gold-glowing/20 rounded-xl p-4 flex gap-3 items-start">
                      <Check className="w-4 h-4 text-gold-glowing mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-cinzel text-[8px] tracking-wider text-gold-glowing font-bold uppercase mb-1">
                          Verifiable Data
                        </h4>
                        <p className="font-lora text-xs leading-relaxed text-parchment-dark/95 text-justify">
                          {currentShift.modernRealFact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="font-cinzel text-[8px] text-crimson-bright/40 tracking-[0.2em] mt-6 block uppercase text-center border-t border-gold-glowing/10 pt-4 animate-pulse">
                  ALGORITHM TRACKING STREAM // ACTIVE
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default SocialMisinfo;
