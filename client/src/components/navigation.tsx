import { Home, Heart, Images, Mail, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-md shadow-md animate-slideIn">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="romantic-font text-xl sm:text-2xl font-bold gradient-text hover:scale-110 transition-transform duration-300 animate-heartbeat"
          onMouseEnter={(e) => createFloatingHeart(e)}
        >
          Untuk Kamu ❤️
        </Link>

        {/* Burger button (mobile) */}
        <button
          className="sm:hidden p-2 text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Nav items */}
        <div
          className={`flex-col sm:flex-row gap-2 sm:gap-4 sm:flex ${
            menuOpen ? "flex absolute top-full left-0 w-full bg-white/90 p-4 shadow-md" : "hidden sm:flex"
          }`}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-btn px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-500 flex items-center gap-2 relative overflow-hidden group ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg animate-pulse"
                    : "bg-primary/10 text-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-primary-foreground hover:shadow-xl hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`nav-${item.label.toLowerCase()}`}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={(e) => {
                  createFloatingHeart(e);
                  setMenuOpen(false); // close menu when clicked
                }}
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
