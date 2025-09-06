import { Card, CardContent } from "@/components/ui/card";
import { Quote, Heart, Star, Infinity, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [activeQuote, setActiveQuote] = useState<number>(0);
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % 4);
    }, 4000);
    
    const handleMouseMove = (e: MouseEvent) => {
      setSparklePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createLoveSparkles = (e: React.MouseEvent) => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '⭐', '💫', '✨'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = (e.clientX + Math.random() * 80 - 40) + 'px';
        sparkle.style.top = (e.clientY + Math.random() * 80 - 40) + 'px';
        sparkle.style.fontSize = (Math.random() * 8 + 12) + 'px';
        sparkle.style.zIndex = '1003';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
          sparkle.remove();
        }, 2000);
      }, i * 100);
    }
  };
  const quotes = [
    {
      id: 1,
      icon: Quote,
      text: "Kamu adalah alasan aku percaya pada cinta sejati",
      description: "Sebelum bertemu denganmu, aku tidak pernah mengerti apa itu cinta yang sesungguhnya. Kamu mengajarkanku bahwa cinta itu bukan hanya perasaan, tapi komitmen untuk selalu bersama dalam suka dan duka.",
      color: "text-primary"
    },
    {
      id: 2,
      icon: Heart,
      text: "Setiap hari bersamamu adalah hadiah terindah",
      description: "Bangun tidur dan melihat pesanmu adalah hal pertama yang membuatku tersenyum. Menjalani hari bersamamu, meski hanya lewat chat atau video call, sudah cukup membuat hariku sempurna.",
      color: "text-secondary"
    },
    {
      id: 3,
      icon: Star,
      text: "Kamu adalah bintang paling terang di hidupku",
      description: "Saat dunia terasa gelap dan penuh masalah, kehadiranmu seperti bintang yang memberikan cahaya dan harapan. Kamu selalu tahu cara membuatku merasa lebih baik.",
      color: "text-accent"
    },
    {
      id: 4,
      icon: Infinity,
      text: "Cintaku padamu tak akan pernah berujung",
      description: "Seperti matahari yang selalu terbit setiap pagi, seperti itulah cintaku padamu. Konstan, hangat, dan tidak akan pernah berhenti menerangi hidupmu dengan kebahagiaan.",
      color: "text-primary"
    }
  ];

  return (
    <div className="pt-24 pb-16 px-6 animate-page-enter relative">
      {/* Floating cursor sparkle */}
      <div 
        className="fixed pointer-events-none z-[1] animate-twinkle"
        style={{ 
          left: sparklePosition.x - 10, 
          top: sparklePosition.y - 10,
          transition: 'all 0.1s ease'
        }}
      >
        ✨
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="relative inline-block">
            <Quote className="absolute -top-8 -left-8 text-primary/40 animate-wiggle w-10 h-10" />
            <h1 className="romantic-font text-5xl md:text-6xl font-bold gradient-text mb-4 hover:animate-love-pulse cursor-default">
              Kata-kata Untukmu
            </h1>
            <Sparkles className="absolute -bottom-4 -right-10 text-yellow-400 animate-twinkle w-8 h-8" />
          </div>
          <p className="text-xl text-muted-foreground hover:text-primary transition-colors duration-500">
            Kumpulan ungkapan cinta dari lubuk hatiku yang terdalam 💝
          </p>
        </div>

        <div className="space-y-8">
          {quotes.map((quote, index) => {
            const Icon = quote.icon;
            const isActive = activeQuote === index;
            return (
              <Card 
                key={quote.id} 
                className={`memory-card rounded-2xl romantic-hover relative overflow-hidden group transition-all duration-500 ${
                  isActive ? 'animate-romantic-glow scale-105' : ''
                }`}
                data-testid={`quote-card-${quote.id}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={(e) => createLoveSparkles(e)}
              >
                <CardContent className="p-8 text-center relative">
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 opacity-30">
                    <Heart className="w-4 h-4 text-red-400 animate-heartbeat" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-30">
                    <Star className="w-4 h-4 text-yellow-400 animate-twinkle" />
                  </div>
                  
                  <div className="relative">
                    <Icon className={`w-12 h-12 mx-auto mb-6 ${quote.color} transition-all duration-500 ${
                      isActive ? 'animate-love-pulse scale-125' : 'group-hover:animate-wiggle'
                    }`} data-testid={`quote-icon-${quote.id}`} />
                    
                    <p className={`romantic-font text-2xl md:text-3xl mb-6 ${quote.color} transition-all duration-300 ${
                      isActive ? 'animate-wiggle' : ''
                    }`} data-testid={`quote-text-${quote.id}`}>
                      "{quote.text}"
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300" data-testid={`quote-description-${quote.id}`}>
                      {quote.description}
                    </p>
                    
                    {/* Romantic decoration */}
                    <div className="mt-6 flex justify-center space-x-2">
                      {['💕', '💖', '💝'].map((emoji, i) => (
                        <span 
                          key={i}
                          className={`text-xl transition-all duration-300 ${
                            isActive ? 'animate-bounce' : 'opacity-60'
                          }`}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-slideIn"></div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Quote indicator dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeQuote === index 
                  ? 'bg-primary scale-125 animate-pulse' 
                  : 'bg-primary/30 hover:bg-primary/60'
              }`}
              onClick={() => setActiveQuote(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
