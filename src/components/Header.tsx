import { Button } from "@/components/ui/button";
import { Github, Instagram, Mail, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { label: "Обо мне", href: "/" },
    { label: "Кейсы", href: "/cases" },
    { label: "Навыки", href: "/skills" },
    { label: "Связаться", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nav-blur backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div 
            className="text-xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate("/")}
          >
            Макс Бригадир
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.href)}
                className={`text-muted-foreground hover:text-foreground transition-colors duration-200 ${
                  location.pathname === item.href ? 'text-foreground font-medium' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Icons & Auth */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </Button>
            {!user && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="ml-2"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;