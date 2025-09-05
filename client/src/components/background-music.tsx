import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
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
    
    // Melody notes for "Happy Birthday" (simplified)
    const notes = [
      { freq: 262, duration: 500 }, // C
      { freq: 262, duration: 250 }, // C
      { freq: 294, duration: 750 }, // D
      { freq: 262, duration: 750 }, // C
      { freq: 349, duration: 750 }, // F
      { freq: 330, duration: 1500 }, // E
      
      { freq: 262, duration: 500 }, // C
      { freq: 262, duration: 250 }, // C
      { freq: 294, duration: 750 }, // D
      { freq: 262, duration: 750 }, // C
      { freq: 392, duration: 750 }, // G
      { freq: 349, duration: 1500 }, // F
    ];

    let currentTime = context.currentTime;
    
    notes.forEach((note, index) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.frequency.value = note.freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration / 1000);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration / 1000);
      
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
      // Auto repeat melody every 8 seconds
      const interval = setInterval(() => {
        if (!isMuted) {
          playBirthdayMelody();
        }
      }, 8000);
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
          🎂 Lagu Ulang Tahun Spesial
        </p>
        {isPlaying && (
          <div className="flex justify-center space-x-1 mt-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 h-3 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}