import { Home, Heart, Images, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/memories", label: "Kenangan", icon: Heart },
    { path: "/gallery", label: "Gallery", icon: Images },
    { path: "/letter", label: "Surat", icon: Mail },
  ];

  const createFloatingHeart = (e: React.MouseEvent) => {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.fontSize = "20px";
    heart.style.zIndex = "1002";
    heart.style.pointerEvents = "none";
    heart.style.animation = "float 2s ease-out forwards";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  };

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 px-6 py-4 animate-slideIn">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="romantic-font text-2xl font-bold gradient-text hover:scale-110 transition-transform duration-300 animate-heartbeat"
          onMouseEnter={(e) => createFloatingHeart(e)}
        >
          Untuk Kamu ❤️
        </Link>
        <div className="flex gap-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-btn px-6 py-3 rounded-full transition-all duration-500 flex items-center gap-2 relative overflow-hidden group ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg animate-pulse"
                    : "bg-primary/10 text-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-primary-foreground hover:shadow-xl hover:scale-110"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`nav-${item.label.toLowerCase()}`}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={(e) => createFloatingHeart(e)}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    hoveredItem === item.path ? "animate-bounce" : ""
                  }`}
                />
                <span className="relative z-10">{item.label}</span>
                {/* Romantic shimmer effect */}
                <div className="absolute inset-0 -top-[200%] opacity-0 group-hover:opacity-100 group-hover:top-[200%] transition-all duration-1000 bg-gradient-to-b from-transparent via-white/20 to-transparent transform rotate-12"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
