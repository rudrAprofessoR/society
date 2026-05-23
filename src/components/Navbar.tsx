import React, { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import soundEngine from "../utils/audio";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero-section");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "intro-section", label: "I. Anatomy" },
    { id: "timeline-section", label: "II. Timeline" },
    { id: "case-study-section", label: "III. Hysterias" },
    { id: "misinfo-section", label: "IV. Media" },
    { id: "simulator-section", label: "V. Labyrinth" },
    { id: "debate-section", label: "VI. Pillars" },
    { id: "future-section", label: "VII. Progress" }
  ];

  // Set up active section observer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      // Check hero section first
      const hero = document.getElementById("hero-section");
      if (hero && scrollPos < hero.offsetTop + hero.offsetHeight) {
        setActiveSection("hero-section");
        return;
      }

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between select-none">
      {/* Translucent wood and parchment banner blur */}
      <div className="absolute inset-0 bg-sepia-dark/80 backdrop-blur-md border-b border-gold-glowing/15 pointer-events-none z-0" />

      {/* Logo */}
      <div 
        onClick={() => handleScrollTo("hero-section")}
        className="relative z-10 flex items-center gap-2 cursor-pointer group"
      >
        <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-sepia-medium border border-gold-glowing/30 group-hover:shadow-gold-glow transition-all duration-300">
          <BookOpen className="w-4 h-4 text-gold-glowing group-hover:scale-110 transition-transform duration-300" />
        </div>
        <span className="font-cinzel font-bold text-xs tracking-[0.2em] text-parchment group-hover:text-gold-glowing transition-colors duration-300">
          SCIENCE & SOCIETY
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-1 bg-sepia-medium/90 border border-gold-glowing/15 px-5 py-1.5 rounded-full z-10 shadow-inner-shadow">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScrollTo(link.id)}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 rounded-full font-cinzel text-[9px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeSection === link.id
                ? "bg-gold-glowing/10 border border-gold-glowing/30 text-gold-glowing shadow-gold-glow"
                : "border border-transparent text-parchment-dark/65 hover:text-parchment"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Spacing for Volume Controller & Mobile Menu */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Placeholder spacer for VintageSynth global controller */}
        <div className="w-44 h-8 hidden sm:block" />
        
        {/* Mobile menu hamburger */}
        <button
          onClick={() => {
            soundEngine.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full bg-sepia-medium border border-gold-glowing/25 text-gold-glowing hover:text-parchment cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-sepia-dark/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-5 px-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`w-full py-3.5 rounded-xl border font-cinzel text-xs tracking-widest uppercase text-center transition-all duration-300 cursor-pointer ${
                activeSection === link.id
                  ? "bg-gold-glowing/10 border-gold-glowing/40 text-gold-glowing shadow-gold-glow"
                  : "border-gold-glowing/10 text-parchment-dark/70 hover:text-parchment"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
