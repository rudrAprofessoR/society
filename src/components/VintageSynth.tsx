import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import soundEngine from "../utils/audio";

export const VintageSynth: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  // Sync mute state on initial render
  useEffect(() => {
    setIsMuted(soundEngine.getMutedStatus());
  }, []);

  const toggleMute = () => {
    const newState = !isMuted;
    soundEngine.setMute(newState);
    setIsMuted(newState);
    soundEngine.playClick();
  };

  return (
    <button
      onClick={toggleMute}
      onMouseEnter={() => soundEngine.playHover()}
      aria-label="Toggle exhibition ambience"
      className={`fixed top-4 right-6 z-55 flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-500 cursor-pointer ${
        !isMuted
          ? "bg-sepia-medium/90 border-gold-glowing shadow-gold-glow text-gold-glowing"
          : "bg-sepia-dark/80 border-parchment/15 hover:border-gold-glowing/40 text-parchment/60 hover:text-parchment"
      }`}
    >
      {/* Dynamic pulse ripple */}
      {!isMuted && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-glowing opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-glowing"></span>
        </span>
      )}

      {/* Rotating Gramophone needle visualizer */}
      <div className="relative flex items-center justify-center">
        <Music 
          className={`w-3.5 h-3.5 transition-transform duration-[12000ms] ease-linear infinite ${
            !isMuted ? "rotate-360 animate-spin" : ""
          }`} 
        />
      </div>

      <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase font-bold select-none">
        {isMuted ? "Exhibition Ambience: Off" : "Exhibition Ambience: On"}
      </span>

      {isMuted ? (
        <VolumeX className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <Volume2 className="w-4 h-4 transition-all duration-300 text-gold-glowing animate-pulse" />
      )}
    </button>
  );
};

export default VintageSynth;
