import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8); // Increased default volume
  const [isVisible, setIsVisible] = useState(true);
  const [melodyInterval, setMelodyInterval] = useState<NodeJS.Timeout | null>(null);

  // Membuat audio synthetic untuk lagu ulang tahun menggunakan Web Audio API
  const [isAudioSupported, setIsAudioSupported] = useState(false);

  useEffect(() => {
    // Check if Web Audio API is supported
    if (typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined') {
      setIsAudioSupported(true);
    }
  }, []);

  const playBirthdayMelody = () => {
    if (!isAudioSupported) {
      console.log("Audio tidak didukung di browser ini");
      return;
    }

    const context = new (AudioContext || (window as any).webkitAudioContext)();
    
    // Complete "Happy Birthday" melody with harmonics for richer sound
    const fullSong = [
      // Happy Birthday to you
      { freq: 262, duration: 400 }, // C - Hap
      { freq: 262, duration: 200 }, // C - py
      { freq: 294, duration: 600 }, // D - Birth
      { freq: 262, duration: 600 }, // C - day
      { freq: 349, duration: 600 }, // F - to
      { freq: 330, duration: 1200 }, // E - you
      
      // Happy Birthday to you  
      { freq: 262, duration: 400 }, // C - Hap
      { freq: 262, duration: 200 }, // C - py
      { freq: 294, duration: 600 }, // D - Birth
      { freq: 262, duration: 600 }, // C - day
      { freq: 392, duration: 600 }, // G - to
      { freq: 349, duration: 1200 }, // F - you
      
      // Happy Birthday dear [name]
      { freq: 262, duration: 400 }, // C - Hap
      { freq: 262, duration: 200 }, // C - py
      { freq: 523, duration: 600 }, // C8 - Birth
      { freq: 440, duration: 600 }, // A - day
      { freq: 349, duration: 600 }, // F - dear
      { freq: 330, duration: 600 }, // E - [name]
      { freq: 294, duration: 1200 }, // D
      
      // Happy Birthday to you
      { freq: 466, duration: 400 }, // Bb - Hap
      { freq: 466, duration: 200 }, // Bb - py
      { freq: 440, duration: 600 }, // A - Birth
      { freq: 349, duration: 600 }, // F - day
      { freq: 392, duration: 600 }, // G - to
      { freq: 349, duration: 1200 }, // F - you
    ];

    let currentTime = context.currentTime;
    
    fullSong.forEach((note, index) => {
      // Create multiple oscillators for fuller sound
      const mainOsc = context.createOscillator();
      const mainGain = context.createGain();
      
      const harmonicOsc = context.createOscillator();
      const harmonicGain = context.createGain();
      
      const bassOsc = context.createOscillator();
      const bassGain = context.createGain();
      
      // Connect all oscillators
      mainOsc.connect(mainGain);
      mainGain.connect(context.destination);
      
      harmonicOsc.connect(harmonicGain);
      harmonicGain.connect(context.destination);
      
      bassOsc.connect(bassGain);
      bassGain.connect(context.destination);
      
      // Set frequencies for richer harmonics
      mainOsc.frequency.value = note.freq;
      harmonicOsc.frequency.value = note.freq * 2; // Octave
      bassOsc.frequency.value = note.freq / 2; // Sub-octave for bass
      
      // Different waveforms for texture
      mainOsc.type = 'sine';
      harmonicOsc.type = 'triangle';
      bassOsc.type = 'square';
      
      // Volume levels - significantly louder overall
      const mainVolume = volume * 1.0; // Full volume for main note
      const harmonicVolume = volume * 0.4; // Harmonic support
      const bassVolume = volume * 0.3; // Bass foundation
      
      // Main note
      mainGain.gain.setValueAtTime(0, currentTime);
      mainGain.gain.linearRampToValueAtTime(mainVolume, currentTime + 0.02);
      mainGain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration / 1000);
      
      // Harmonic
      harmonicGain.gain.setValueAtTime(0, currentTime);
      harmonicGain.gain.linearRampToValueAtTime(harmonicVolume, currentTime + 0.02);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration / 1000);
      
      // Bass (only for lower notes)
      if (note.freq <= 350) {
        bassGain.gain.setValueAtTime(0, currentTime);
        bassGain.gain.linearRampToValueAtTime(bassVolume, currentTime + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration / 1000);
      }
      
      // Start all oscillators
      mainOsc.start(currentTime);
      mainOsc.stop(currentTime + note.duration / 1000);
      
      harmonicOsc.start(currentTime);
      harmonicOsc.stop(currentTime + note.duration / 1000);
      
      if (note.freq <= 350) {
        bassOsc.start(currentTime);
        bassOsc.stop(currentTime + note.duration / 1000);
      }
      
      currentTime += note.duration / 1000;
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (melodyInterval) {
        clearInterval(melodyInterval);
        setMelodyInterval(null);
      }
    } else {
      setIsPlaying(true);
      if (!isMuted) {
        playBirthdayMelody();
      }
      // Auto repeat melody every 15 seconds (song is now longer)
      const interval = setInterval(() => {
        if (!isMuted) {
          playBirthdayMelody();
        }
      }, 15000);
      setMelodyInterval(interval);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (melodyInterval) {
        clearInterval(melodyInterval);
      }
    };
  }, [melodyInterval]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-primary/20 animate-fadeIn">
      
      <div className="flex items-center gap-3">
        {/* Music note animation */}
        <div className="relative">
          <div className={`text-primary ${isPlaying ? 'animate-bounce' : ''}`}>
            🎵
          </div>
          {isPlaying && (
            <Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-400 animate-heartbeat" />
          )}
        </div>

        {/* Play/Pause Button */}
        <Button
          onClick={togglePlay}
          size="sm"
          variant="outline"
          className="rounded-full w-10 h-10 p-0 romantic-hover"
          data-testid="music-play-pause"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleMute}
            size="sm"
            variant="ghost"
            className="w-8 h-8 p-0"
            data-testid="music-mute"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-primary/30 rounded-lg appearance-none cursor-pointer slider"
            data-testid="music-volume"
          />
        </div>

        {/* Close Button */}
        <Button
          onClick={() => setIsVisible(false)}
          size="sm"
          variant="ghost"
          className="w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
          data-testid="music-close"
        >
          ×
        </Button>
      </div>

      {/* Song Info */}
      <div className="mt-2 text-center">
        <p className="text-xs text-muted-foreground romantic-font">
          🎂 Happy Birthday - Full Song ✨
        </p>
        <p className="text-xs text-primary/70 mt-1">
          {isPlaying ? "🔊 Berkualitas Tinggi" : "🎵 Klik untuk mulai"}
        </p>
        {isPlaying && (
          <div className="flex justify-center space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse"
                style={{ 
                  height: `${Math.random() * 8 + 4}px`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}