import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: string; delay: number; size: string }>>([]);

  useEffect(() => {
    const heartData = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      left: `${(i + 1) * 10}%`,
      delay: i,
      size: i % 3 === 0 ? "text-2xl" : i % 3 === 1 ? "text-xl" : "text-lg"
    }));
    setHearts(heartData);

    // Random color change effect
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 9);
      const heartElement = document.querySelector(`#heart-${randomIndex}`) as HTMLElement;
      if (heartElement) {
        const hue = Math.random() * 60 + 320; // Pink to purple range
        heartElement.style.color = `hsl(${hue}, 70%, 60%)`;
        heartElement.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
          heartElement.style.transform = 'scale(1)';
        }, 500);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          id={`heart-${heart.id}`}
          className={`absolute text-accent opacity-60 animate-float ${heart.size}`}
          style={{
            left: heart.left,
            animationDelay: `${heart.delay}s`,
            top: `${Math.random() * 80 + 10}%`
          }}
          data-testid={`floating-heart-${heart.id}`}
        />
      ))}
    </div>
  );
}
