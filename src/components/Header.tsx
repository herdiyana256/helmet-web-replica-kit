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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import hidekiLogo from "@/assets/hideki-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const helmSubmenus = [
    "SV300 Series",
    "New Windtail Series", 
    "Classic Series",
    "Odezzy Series",
    "FFS21 Series",
    "FFC21 Series",
    "FF500 Series",
    "RSV x MPL ID Exclusive Collaboration",
    "Helmet Parts & Accessories"
  ];

  const promoSubmenus = [
    "PAYDAY DEAL",
    "RSV STORE PROMO"
  ];

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "HELM", href: "/helm", submenus: helmSubmenus },
    { name: "RSV X PROSTREET", href: "/rsv-prostreet" },
    { name: "APPARELS", href: "/apparels" },
    { name: "ACCESSORIES", href: "/accessories" },
    { name: "PROMO", href: "/promo", submenus: promoSubmenus },
    { name: "CAREER", href: "/career" },
    { name: "DISTRIBUTOR", href: "/distributor" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={hidekiLogo} 
              alt="Hideki Helmet" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="font-gothic">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.submenus ? (
                    <>
                      <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 bg-popover">
                          {item.submenus.map((submenu) => (
                            <NavigationMenuLink
                              key={submenu}
                              href={`${item.href}/${submenu.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{submenu}</div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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
              onClick={() => window.location.href = '/checkout'}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                {cartCount}
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
                  {item.submenus && (
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