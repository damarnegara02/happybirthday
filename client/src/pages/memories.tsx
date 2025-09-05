import { Card, CardContent } from "@/components/ui/card";
import { Heart, Camera, Star } from "lucide-react";
import { useState } from "react";

export default function Memories() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const memories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Pertama Kali Bertemu",
      description: "Hari itu rasanya waktu berhenti saat mata kita bertemu. Senyummu yang manis langsung mencuri hatiku..."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Kencan Pertama",
      description: "Gugup tapi bahagia, itulah yang kurasakan. Kamu membuatku merasa seperti orang paling beruntung di dunia..."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Tawa Bersama",
      description: "Setiap tawa yang kita bagi membuat hariku semakin cerah. Kamu adalah alasan tersenyumku setiap hari..."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Malam Berbintang",
      description: "Di bawah langit malam yang penuh bintang, aku berjanji akan selalu menjagamu dan mencintaimu..."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Jalan Berdua",
      description: "Setiap langkah yang kita ambil bersama adalah petualangan baru yang selalu kutunggu-tunggu..."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Masa Depan Kita",
      description: "Aku yakin masa depan kita akan dipenuhi dengan kebahagiaan, cinta, dan kenangan indah lainnya..."
    }
  ];

  const createHeartRain = () => {
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💝', '❤️', '💗'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `float 4s ease-out forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 4000);
      }, i * 150);
    }
  };

  return (
    <div className="pt-24 pb-16 px-6 animate-page-enter">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="relative inline-block">
            <Camera className="absolute -top-6 -left-6 text-primary/60 animate-wiggle w-8 h-8" />
            <h1 className="romantic-font text-5xl md:text-6xl font-bold gradient-text mb-4 hover:animate-love-pulse cursor-default">
              Kenangan Indah Kita
            </h1>
            <Heart className="absolute -bottom-2 -right-8 text-pink-400 animate-heartbeat w-10 h-10" />
          </div>
          <p className="text-xl text-muted-foreground hover:text-primary transition-colors duration-500">
            Setiap momen bersamamu adalah berkah yang tak ternilai 💕
          </p>
          <button 
            onClick={createHeartRain}
            className="mt-4 px-6 py-2 bg-primary/20 hover:bg-primary hover:text-white rounded-full transition-all duration-300 romantic-hover text-primary font-medium"
          >
            ✨ Hujan Cinta ✨
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <Card 
              key={memory.id} 
              className="memory-card rounded-2xl romantic-hover relative overflow-hidden group" 
              data-testid={`memory-card-${memory.id}`}
              onMouseEnter={() => setHoveredCard(memory.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 relative">
                {hoveredCard === memory.id && (
                  <div className="absolute top-2 right-2 z-10">
                    <Heart className="w-6 h-6 text-red-500 animate-love-pulse" />
                  </div>
                )}
                <div className="relative overflow-hidden rounded-xl mb-4 group">
                  <img 
                    src={memory.image} 
                    alt={memory.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    data-testid={`memory-image-${memory.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Star className="text-yellow-400 w-8 h-8 animate-twinkle" />
                  </div>
                </div>
                <h3 className={`romantic-font text-2xl font-semibold text-primary mb-2 transition-all duration-300 ${
                  hoveredCard === memory.id ? 'animate-wiggle' : ''
                }`} data-testid={`memory-title-${memory.id}`}>
                  {memory.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`memory-description-${memory.id}`}>
                  {memory.description}
                </p>
                <div className="mt-4 flex justify-center">
                  <div className={`text-primary text-2xl transition-all duration-300 ${
                    hoveredCard === memory.id ? 'animate-bounce' : ''
                  }`}>
                    💕
                  </div>
                </div>
              </CardContent>
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-slideIn"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
