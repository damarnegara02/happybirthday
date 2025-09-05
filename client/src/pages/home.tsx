import { Heart } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-bounce mb-8">
          <Heart className="text-6xl text-primary animate-heartbeat mx-auto w-16 h-16" data-testid="heart-main" />
        </div>
        <h1 className="romantic-font text-6xl md:text-8xl font-bold gradient-text mb-6 animate-fadeIn">
          Halo Sayang
        </h1>
        <p 
          className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fadeIn" 
          style={{ animationDelay: '0.3s' }}
        >
          Website khusus yang kubuat untuk menunjukkan betapa istimewanya kamu bagiku ✨
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" 
          style={{ animationDelay: '0.6s' }}
        >
          <Link
            href="/memories"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 card-hover inline-flex items-center justify-center gap-2"
            data-testid="button-memories"
          >
            <Heart className="w-5 h-5" />
            Lihat Kenangan Kita
          </Link>
          <Link
            href="/letter"
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full text-lg font-medium hover:bg-secondary/90 transition-all duration-300 card-hover inline-flex items-center justify-center gap-2"
            data-testid="button-letter"
          >
            <Heart className="w-5 h-5" />
            Baca Suratku
          </Link>
        </div>
      </div>
    </div>
  );
}
