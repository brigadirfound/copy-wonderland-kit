import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import telegramIcon from "@/assets/telegram-icon.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Главная", href: "/" },
    { label: "Кейсы", href: "/cases" },
    { label: "Навыки", href: "/skills" },
    { label: "Связаться", href: "/contact" },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nav-blur backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div 
            className="text-lg sm:text-xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate("/")}
          >
            Макс Бригадир
          </div>

          {/* Navigation Menu - Desktop */}
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

          {/* Right side - Social Icons + Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Telegram Icon - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => window.open('https://t.me/brigadirfound', '_blank')}
              >
                <img src={telegramIcon} alt="Telegram" className="h-5 w-5 brightness-0 invert" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="border-2 border-border hover:bg-accent hover:border-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Navigation Items */}
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item.href)}
                      className={`text-left text-lg text-muted-foreground hover:text-foreground transition-colors duration-200 ${
                        location.pathname === item.href ? 'text-foreground font-medium' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  {/* Telegram in Mobile Menu */}
                  <div className="flex items-center space-x-3 pt-6 border-t border-border">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => window.open('https://t.me/brigadirfound', '_blank')}
                    >
                      <img src={telegramIcon} alt="Telegram" className="h-5 w-5 brightness-0 invert" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;