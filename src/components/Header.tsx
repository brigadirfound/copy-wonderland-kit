import { Button } from "@/components/ui/button";
import { Github, Instagram, Mail } from "lucide-react";

const Header = () => {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Creative", href: "#creative" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nav-blur backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="text-xl font-bold text-foreground">
            Ваше Имя
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;