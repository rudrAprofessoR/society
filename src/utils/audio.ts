// Web Audio API Historical Museum Synthesizer Engine

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private vinylNoiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  
  private isMuted: boolean = true;
  private ambientInterval: number | null = null;
  private volume: number = 0.25;
  private isAmbientPlaying: boolean = false;

  constructor() {
    // Initialized on click/unmute to comply with browser autoplay constraints
  }

  private init() {
    if (this.ctx) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    // Create master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    this.init();
    
    if (this.ctx && this.masterGain) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      
      const targetVolume = mute ? 0 : this.volume;
      this.masterGain.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + 0.15);
      
      if (!mute) {
        this.startAmbientLoop();
        this.startVinylNoise();
      } else {
        this.stopAmbientLoop();
      }
    }
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }

  // Create a procedural warm piano note
  private synthesizePianoNote(frequency: number, startTime: number, duration: number, velocity: number = 0.5) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const time = startTime;
      
      // Combine multiple oscillators to create a complex rich string pluck
      const oscFundamental = this.ctx.createOscillator();
      const oscOvertone1 = this.ctx.createOscillator();
      const oscOvertone2 = this.ctx.createOscillator();
      
      const gainNode = this.ctx.createGain();
      const filterNode = this.ctx.createBiquadFilter();

      // Warm sound with low-pass filtering
      filterNode.type = "lowpass";
      filterNode.frequency.setValueAtTime(450, time);
      filterNode.frequency.exponentialRampToValueAtTime(250, time + duration);
      filterNode.Q.setValueAtTime(1.5, time);

      // Fundamental sine wave for pure bass and body
      oscFundamental.type = "sine";
      oscFundamental.frequency.setValueAtTime(frequency, time);

      // Gentle overtones (triangles for soft wooden mallet hammers)
      oscOvertone1.type = "triangle";
      oscOvertone1.frequency.setValueAtTime(frequency * 2, time); // 1st overtone

      oscOvertone2.type = "triangle";
      oscOvertone2.frequency.setValueAtTime(frequency * 3, time); // 2nd overtone

      // Gain envelope mimicking a grand piano
      gainNode.gain.setValueAtTime(0, time);
      // Sudden attack
      gainNode.gain.linearRampToValueAtTime(velocity * 0.12, time + 0.04);
      // Soft sustain thrum
      gainNode.gain.setValueAtTime(velocity * 0.12, time + 0.15);
      // Long atmospheric decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      // Connect components
      oscFundamental.connect(filterNode);
      
      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.35, time);
      oscOvertone1.connect(overtoneGain);
      oscOvertone2.connect(overtoneGain);
      overtoneGain.connect(filterNode);

      filterNode.connect(gainNode);
      gainNode.connect(this.masterGain);

      // Start and Stop
      oscFundamental.start(time);
      oscOvertone1.start(time);
      oscOvertone2.start(time);

      oscFundamental.stop(time + duration + 0.1);
      oscOvertone1.stop(time + duration + 0.1);
      oscOvertone2.stop(time + duration + 0.1);
    } catch (e) {
      console.warn("Piano synthesizer exception:", e);
    }
  }

  // Create an old gramophone record needle crackle procedurally
  private startVinylNoise() {
    if (!this.ctx || !this.masterGain || this.vinylNoiseNode) return;

    try {
      const bufferSize = 4096;
      // ScriptProcessor is deprecated but highly compatible for custom audio buffers without separate files
      const scriptNode = this.ctx.createScriptProcessor(bufferSize, 1, 1);
      
      scriptNode.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          // Soft pink-like noise hum
          const white = Math.random() * 2 - 1;
          
          // Crackle spikes
          let crackle = 0;
          if (Math.random() < 0.00015) {
            crackle = (Math.random() * 2 - 1) * 0.45;
          }
          
          // Vinyl thrum and crackle mixed together
          output[i] = white * 0.004 + crackle;
        }
      };

      // Faded bandpass filter to shape the old gramophone thrum
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(800, this.ctx.currentTime);
      bandpass.Q.setValueAtTime(0.7, this.ctx.currentTime);

      scriptNode.connect(bandpass);
      bandpass.connect(this.masterGain);
      
      // Keep reference to disable later
      this.vinylNoiseNode = scriptNode;
    } catch (e) {
      console.error("Vinyl noise creation failed:", e);
    }
  }

  private startAmbientLoop() {
    this.init();
    if (!this.ctx || this.isAmbientPlaying) return;

    this.isAmbientPlaying = true;
    
    // Melancholic, minor fifths thrumming loop (A2-E3-C4 chords)
    // Plays a rolling arpeggiated piano melody every 7.5 seconds
    const playTheme = () => {
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      
      // Chords structure:
      // A Minor / E Major alternative cadence
      const randomCadence = Math.random() > 0.5;

      if (randomCadence) {
        // A2 (110.00Hz), E3 (164.81Hz), C4 (261.63Hz)
        this.synthesizePianoNote(110.00, now, 6.0, 0.45);
        this.synthesizePianoNote(164.81, now + 0.4, 5.5, 0.35);
        this.synthesizePianoNote(261.63, now + 0.8, 5.0, 0.40);
        this.synthesizePianoNote(329.63, now + 1.6, 4.0, 0.30); // E4
      } else {
        // E2 (82.41Hz), B3 (246.94Hz), G#3 (207.65Hz)
        this.synthesizePianoNote(82.41, now, 6.0, 0.45);
        this.synthesizePianoNote(164.81, now + 0.4, 5.5, 0.35); // E3
        this.synthesizePianoNote(207.65, now + 0.8, 5.0, 0.38); // G#3
        this.synthesizePianoNote(246.94, now + 1.2, 4.5, 0.32); // B3
      }
    };

    // Play immediately
    playTheme();

    // Loop
    this.ambientInterval = window.setInterval(playTheme, 7500);
  }

  private stopAmbientLoop() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.isAmbientPlaying = false;
    
    if (this.vinylNoiseNode) {
      try {
        this.vinylNoiseNode.disconnect();
      } catch (e) {}
      this.vinylNoiseNode = null;
    }
  }

  public playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const time = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft atmospheric wood block hover
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, time);
      osc.frequency.exponentialRampToValueAtTime(180, time + 0.12);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.14);
    } catch (e) {}
  }

  public playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const time = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Tactile museum book button click
      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.05);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.06);
    } catch (e) {}
  }

  public playWarning() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const time = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Dramatic deep cello alert thrum
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(82.41, time); // E2
      osc.frequency.linearRampToValueAtTime(80, time + 0.35);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, time);

      gain.gain.setValueAtTime(0.0, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.06);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.4);
    } catch (e) {}
  }
}

export const soundEngine = new AudioEngine();
export default soundEngine;
