import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Skull, Dna, Moon, ShieldAlert, Laptop, Calendar, MessageSquare, Quote } from "lucide-react";
import soundEngine from "../utils/audio";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  curatorNote: string;
  archivalExcerpt: string;
  modernLesson: string;
  quote: string;
  quoteAuthor: string;
  colorClass: string;
}

export const BeliefTimeline: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<string>("galileo");

  const events: TimelineEvent[] = [
    {
      id: "galileo",
      year: "1633",
      title: "The Celestial Heretic",
      subtitle: "Galileo vs The Geocentric Dogma",
      icon: <Eye className="w-5 h-5" />,
      curatorNote: "Galileo Galilei pointed a glass lens at the skies and observed the moons of Jupiter. His empiricism proved that the Earth was not the center of the universe, directly contradicting medieval theological models.",
      archivalExcerpt: "‘We pronounce, judge, and declare, that you, the said Galileo, have rendered yourself in the judgment of this Holy Office vehemently suspected of heresy, namely, of having held and believed the doctrine which is false and contrary to the sacred and divine Scriptures, that the Sun is the center of the world...’ — Trial record of Galileo Galilei, Roman Inquisition.",
      modernLesson: "Scientific models are often rejected when they threaten the comforting delusion that humanity holds a unique, centralized importance in the cosmos.",
      quote: "Eppur si muove. (And yet it moves.)",
      quoteAuthor: "Galileo Galilei",
      colorClass: "border-gold-glowing/30 text-gold-glowing"
    },
    {
      id: "witches",
      year: "1692",
      title: "Salem Mass Hysteria",
      subtitle: "Superstition as Law",
      icon: <Skull className="w-5 h-5" />,
      curatorNote: "The Salem Witch Trials demonstrated how severe social anxieties, crop failures, and isolated diseases are blamed on supernatural conspiracies when early botanical or clinical sciences are absent.",
      archivalExcerpt: "‘The afflicted children fell into strange fits, screaming and throwing things about... they accused simple herbalists and outcasts of signing the Devil’s black book, binding them in chains...’ — Salem Magistrate Archives.",
      modernLesson: "In times of severe systemic fear, society will always manufacture visible scapegoats rather than accept cold, impersonal natural explanations.",
      quote: "Superstition is the imagination of weak minds.",
      quoteAuthor: "Francis Bacon",
      colorClass: "border-crimson-bright/30 text-crimson-bright"
    },
    {
      id: "darwin",
      year: "1860",
      title: "The Descent of Man",
      subtitle: "Darwin & The Primordial Backlash",
      icon: <Dna className="w-5 h-5" />,
      curatorNote: "Charles Darwin proposed that all life descended from a common ancestor via natural selection. The public and religious elites revolted against the idea that humans shared ancestry with primates.",
      archivalExcerpt: "‘Is it credible that all the varieties of dogs, or of man, have sprung from one wild stock? Are we to believe that the human intellect, with all its godlike powers, is merely the refined product of an ape's survival?’ — The British Association Review.",
      modernLesson: "Humans naturally resist biological realities that dismantle their perceived spiritual superiority over the animal kingdom.",
      quote: "Ignorance more frequently begets confidence than does knowledge.",
      quoteAuthor: "Charles Darwin",
      colorClass: "border-gold-glowing/30 text-gold-glowing"
    },
    {
      id: "moon",
      year: "1969",
      title: "The Apollo Backyard",
      subtitle: "The Cold War Distrust",
      icon: <Moon className="w-5 h-5" />,
      curatorNote: "Apollo 11 landed humans on the Moon, witnessed by half a billion people and documented by hundreds of pounds of lunar material. Yet, distrust in government institutions birthed a powerful staged-hoax conspiracy myth.",
      archivalExcerpt: "‘How could the flag flutter in a vacuum? Why are there no stars in the photographs? It is a Hollywood staging, filmed in Area 51 under military locks...’ — Early Conspiracy pamphlet.",
      modernLesson: "When citizens lose trust in their governing institutions, they will reject even the most physically verifiable achievements of those institutions.",
      quote: "The truth has no defense against a fool determined to believe a lie.",
      quoteAuthor: "Unknown Archival Record",
      colorClass: "border-parchment/30 text-parchment"
    },
    {
      id: "vaccines",
      year: "1998",
      title: "The Wakefield Fraud",
      subtitle: "The Viral Birth of Pseudoscience",
      icon: <ShieldAlert className="w-5 h-5" />,
      curatorNote: "A single fraudulent, heavily retracted paper by Andrew Wakefield falsely linked the MMR vaccine to autism, triggering decades of vaccine hesitancy and the resurgence of eradicated infectious diseases.",
      archivalExcerpt: "‘We identified an associated gastrointestinal disease and developmental regression in twelve children...’ — The Lancet (Later Retracted & Exposed as Fabricated).",
      modernLesson: "A single piece of bad science, if it plays on parental fears, can trigger global mass movements that years of rigorous scientific consensus cannot easily dismantle.",
      quote: "Vaccination is the most significant medical achievement of mankind.",
      quoteAuthor: "World Health Organization",
      colorClass: "border-crimson-bright/30 text-crimson-bright"
    },
    {
      id: "modern",
      year: "2026",
      title: "The Algorithmic Abyss",
      subtitle: "The Digitization of Misinformation",
      icon: <Laptop className="w-5 h-5" />,
      curatorNote: "Today, digital algorithms are coded to prioritize engagement over accuracy. Because outrage and confirmation bias keep users clicking, misinformation spreads six times faster than scientific truth.",
      archivalExcerpt: "‘Flat Earth groups, climate denial rings, and extreme wellness cults grow exponentially through recommendation feeds designed solely to extract advertising capital...’ — Digital Humanities Report.",
      modernLesson: "Pseudoscience has been weaponized into highly profitable economic loops. We no longer battle simple ignorance; we battle artificial intelligence designed to feed us lies.",
      quote: "If we are not able to ask skeptical questions, we are up for grabs.",
      quoteAuthor: "Carl Sagan",
      colorClass: "border-gold-glowing/30 text-gold-glowing"
    }
  ];

  const currentEvent = events.find((e) => e.id === activeEvent) || events[0];

  const handleEventClick = (id: string) => {
    soundEngine.playClick();
    setActiveEvent(id);
  };

  return (
    <section
      id="timeline-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 bg-sepia-dark/65 z-20 overflow-hidden"
    >
      {/* Decorative vertical lines and seals */}
      <div className="absolute top-1/4 right-1/10 w-96 h-96 bg-gold-glowing/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-96 h-96 bg-crimson-deep/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none">
        <span className="font-cinzel text-[10px] text-gold-glowing tracking-[0.3em] uppercase mb-4 block font-bold">
          Chapter II • Chronology of Friction
        </span>
        <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-parchment tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          The Archival Timeline
        </h2>
        <div className="w-24 h-[1px] bg-gold-glowing/30 mx-auto my-6" />
        <p className="font-lora text-sm sm:text-base text-parchment-dark/80 max-w-xl mx-auto leading-relaxed">
          Traverse the historical milestones of public skepticism. Step inside the curated museum archives to witness how breakthroughs consistently encounter societal pushback.
        </p>
      </div>

      {/* Vertical Interactive Exhibition Track */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start select-none">
        
        {/* Timeline Navigation Sidebar */}
        <div className="lg:col-span-4 flex flex-col relative py-2">
          {/* Vertical wood post track line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gold-glowing/15 hidden lg:block" />

          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-4 lg:gap-6 scrollbar-none">
            {events.map((evt) => {
              const isSelected = activeEvent === evt.id;
              return (
                <button
                  key={evt.id}
                  onClick={() => handleEventClick(evt.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`flex items-center gap-4 text-left px-3 py-2 rounded-xl transition-all duration-300 min-w-[200px] lg:min-w-0 cursor-pointer ${
                    isSelected
                      ? "bg-sepia-medium border border-gold-glowing/30 shadow-gold-glow"
                      : "bg-transparent border border-transparent hover:border-gold-glowing/15 hover:bg-sepia-medium/25"
                  }`}
                >
                  {/* Glowing Node Button */}
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ${
                    isSelected
                      ? "bg-gold-glowing/10 border-gold-glowing text-gold-glowing scale-110 shadow-gold-glow animate-pulse"
                      : "bg-sepia-dark border-parchment/15 text-parchment-dark"
                  }`}>
                    {evt.icon}
                  </div>

                  <div>
                    <span className={`font-cinzel text-[10px] tracking-widest font-extrabold transition-colors ${
                      isSelected ? "text-gold-glowing" : "text-parchment-dark/40"
                    }`}>
                      A.D. {evt.year}
                    </span>
                    <h4 className={`font-cinzel text-xs tracking-wider transition-colors mt-0.5 ${
                      isSelected ? "text-parchment" : "text-parchment-dark/70"
                    }`}>
                      {evt.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Archival Entry Panel */}
        <div className="lg:col-span-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="parchment-card rounded-2xl p-6 md:p-10 relative overflow-hidden"
            >
              {/* Corner scroll borders */}
              <div className="absolute top-4 left-4 flex gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold-dim" />
                <span className="font-cinzel text-[8px] tracking-[0.25em] text-gold-dim font-bold">
                  ARCHIVE ENTRY // {currentEvent.year}
                </span>
              </div>

              {/* Major Display */}
              <div className="mt-4 mb-8">
                <h3 className="font-cinzel font-bold text-xl md:text-3xl text-parchment tracking-wide uppercase">
                  {currentEvent.title}
                </h3>
                <span className="font-playfair text-xs sm:text-sm text-gold-glowing italic tracking-wide mt-1 block">
                  {currentEvent.subtitle}
                </span>
              </div>

              {/* Layout Content Grid */}
              <div className="flex flex-col gap-6">
                
                {/* Curator note */}
                <div className="border-l-2 border-gold-glowing/40 pl-4 py-1">
                  <span className="font-cinzel text-[8px] tracking-[0.2em] text-gold-glowing/80 uppercase font-bold block mb-1">
                    Exhibition Curator's Note
                  </span>
                  <p className="font-lora text-sm leading-relaxed text-parchment-dark text-justify">
                    {currentEvent.curatorNote}
                  </p>
                </div>

                {/* Primary archival document */}
                <div className="bg-sepia-dark/80 border border-gold-glowing/10 rounded-xl p-5 md:p-6 relative">
                  <div className="absolute -top-2.5 left-4 px-2 bg-sepia-dark border border-gold-glowing/10 rounded font-cinzel text-[7px] tracking-[0.2em] text-crimson-bright font-bold">
                    UNPRINTED ARCHIVAL RECORD
                  </div>
                  <MessageSquare className="absolute right-4 top-4 w-4 h-4 text-gold-glowing/10" />
                  <p className="font-playfair text-xs sm:text-sm leading-relaxed text-parchment-dark/75 italic text-justify">
                    {currentEvent.archivalExcerpt}
                  </p>
                </div>

                {/* Modern sociological lesson */}
                <div className="border-t border-gold-glowing/10 pt-5">
                  <span className="font-cinzel text-[8px] tracking-[0.2em] text-crimson-bright uppercase font-bold block mb-1">
                    The Epistemic Lesson
                  </span>
                  <p className="font-lora text-xs sm:text-sm leading-relaxed text-parchment-dark/90 text-justify">
                    {currentEvent.modernLesson}
                  </p>
                </div>

                {/* Famous quote slide */}
                <div className="mt-4 pt-5 border-t border-dashed border-gold-glowing/10 flex flex-col items-center text-center">
                  <Quote className="w-5 h-5 text-gold-glowing/25 mb-2" />
                  <blockquote className="font-playfair text-sm sm:text-base text-gold-glowing font-bold italic tracking-wide max-w-md">
                    “{currentEvent.quote}”
                  </blockquote>
                  <cite className="font-cinzel text-[9px] tracking-widest text-parchment-dark/60 block mt-2 uppercase font-semibold not-italic">
                    — {currentEvent.quoteAuthor}
                  </cite>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="max-w-4xl mx-auto w-full text-center mt-20 text-[9px] font-cinzel text-gold-dim/40 tracking-[0.3em] uppercase select-none">
        Exhibition Room II • Interactive Glass Vitrines • Museum Catalog SS-026
      </div>
    </section>
  );
};

export default BeliefTimeline;
