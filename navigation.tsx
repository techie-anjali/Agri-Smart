import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" 
        : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    }`}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-2" data-testid="logo">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">🌾</span>
          </div>
          <span className="text-xl font-bold text-foreground">AgriSmart</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection("home")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            data-testid="nav-home"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            data-testid="nav-features"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("recommend")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            data-testid="nav-recommendations"
          >
            Get Recommendations
          </button>
          <button 
            onClick={() => scrollToSection("dashboard")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            data-testid="nav-dashboard"
          >
            Dashboard
          </button>
          <button 
            onClick={() => scrollToSection("technology")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            data-testid="nav-technology"
          >
            Technology
          </button>
        </nav>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="md:hidden"
          data-testid="mobile-menu-button"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
