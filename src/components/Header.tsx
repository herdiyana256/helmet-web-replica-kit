import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X,
  ChevronDown 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", href: "#" },
    { name: "HELM", href: "#", hasDropdown: true },
    { name: "RSV X PROSTREET", href: "#" },
    { name: "APPARELS", href: "#" },
    { name: "ACCESSORIES", href: "#" },
    { name: "PROMO", href: "#", hasDropdown: true },
    { name: "CAREER", href: "#" },
    { name: "DISTRIBUTOR", href: "#" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-foreground">RSV</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground",
                  "relative group py-2"
                )}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="ml-1 h-3 w-3" />
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between px-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;