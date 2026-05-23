import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import soundEngine from "../utils/audio";

export const SoundManager: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Sync initial engine mute status
    setIsMuted(soundEngine.getMutedStatus());
  }, []);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    soundEngine.setMute(nextMuted);
    setIsMuted(nextMuted);
    
    // Play a brief click confirmation sound if unmuting
    if (!nextMuted) {
      setTimeout(() => {
        soundEngine.playClick();
      }, 50);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      {/* Active Synth Indicator */}
      {!isMuted && (
        <div className="flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-neon-blue/20 text-xs font-orbitron text-neon-blue/80 tracking-widest uppercase select-none animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-ping" />
          Core Synth Active
          {/* Small animated equalizer bars */}
          <div className="flex items-end gap-[2px] h-3 ml-2">
            <span className="w-[2px] bg-neon-blue rounded-full animate-[bounce_0.8s_infinite_0.1s]" style={{ height: "40%" }} />
            <span className="w-[2px] bg-neon-blue rounded-full animate-[bounce_0.5s_infinite_0.3s]" style={{ height: "100%" }} />
            <span className="w-[2px] bg-neon-blue rounded-full animate-[bounce_0.7s_infinite_0.2s]" style={{ height: "60%" }} />
          </div>
        </div>
      )}

      {/* Main Glass Mute Button */}
      <button
        onClick={handleToggleSound}
        className={`relative flex items-center justify-center w-12 h-12 rounded-xl glass-panel transition-all duration-300 cursor-pointer ${
          isMuted
            ? "border-white/10 text-metal-silver hover:text-white hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            : "border-neon-blue/35 text-neon-blue shadow-neon-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:border-neon-blue/50"
        }`}
        title={isMuted ? "Activate Lab Ambient Synth" : "Mute Lab Sounds"}
        onMouseEnter={() => !isMuted && soundEngine.playHover()}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5 animate-[pulse_2s_infinite]" />
        )}

        {/* Dynamic Glowing Halo */}
        {!isMuted && (
          <div className="absolute inset-0 rounded-xl bg-neon-blue/5 blur-md pointer-events-none" />
        )}
      </button>
    </div>
  );
};
export default SoundManager;
