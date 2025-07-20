import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import hidekiLogo from "@/assets/hideki-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const helmSubmenus = [
    "SV300 Series",
    "New Windtail Series", 
    "Classic Series",
    "Odezzy Series",
    "FFS21 Series",
    "FFC21 Series",
    "FF500 Series",
    "RSV x MPL ID Exclusive Collaboration",
    "Helmet Parts & Accesories"
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter products
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/6281381528559", "_blank");
  };

  return (
    <header className="bg-gradient-to-r from-helmet-dark to-helmet-gray border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={hidekiLogo} alt="Hideki" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.submenus ? (
                    <>
                      <NavigationMenuTrigger className="navbar-link bg-transparent hover:bg-white/10">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[300px] p-4">
                          {item.submenus.map((submenu) => (
                            <NavigationMenuLink
                              key={submenu}
                              className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                            >
                              {submenu}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link to={item.href}>
                      <NavigationMenuLink className="navbar-link bg-transparent hover:bg-white/10 px-4 py-2 rounded-md transition-colors">
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
            
            <Link to="/checkout">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* WhatsApp Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={handleWhatsAppClick}
            >
              <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Cari helm, aksesoris, atau produk lainnya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground"
                autoFocus
              />
              <Button type="submit">Cari</Button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;