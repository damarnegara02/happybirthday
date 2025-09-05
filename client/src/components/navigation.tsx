import { Home, Heart, Images, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/memories", label: "Kenangan", icon: Heart },
    { path: "/gallery", label: "Gallery", icon: Images },
    { path: "/letter", label: "Surat", icon: Mail },
  ];

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="romantic-font text-2xl font-bold gradient-text">
          Untuk Kamu ❤️
        </div>
        <div className="flex gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
