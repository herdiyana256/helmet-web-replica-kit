"use client"

import type React from "react"

import { useState } from "react"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom"
import { useCartStore } from "@/store/cartStore"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const navigate = useNavigate()
  
  // Menggunakan useCartStore untuk mendapatkan jumlah item di keranjang
  const { items } = useCartStore()
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  // Updated helm submenus dengan brand dan kategori
  const helmSubmenus = [
    {
      category: "Brand Helm",
      items: [
        { name: "KYT", href: "/helm?brand=KYT", filterKey: "KYT" },
        { name: "ARRAY", href: "/helm?brand=ARRAY", filterKey: "ARRAY" },
        { name: "MLA", href: "/helm?brand=MLA", filterKey: "MLA" },
        { name: "ALV", href: "/helm?brand=ALV", filterKey: "ALV" },
        { name: "JS", href: "/helm?brand=JS", filterKey: "JS" },
        { name: "NIELS", href: "/helm?brand=NIELS", filterKey: "NIELS" },
        { name: "VRC", href: "/helm?brand=VRC", filterKey: "VRC" },
        { name: "RSV", href: "/helm?brand=RSV", filterKey: "RSV" },
        { name: "INK", href: "/helm?brand=INK", filterKey: "INK" },
        { name: "NHK", href: "/helm?brand=NHK", filterKey: "NHK" },
        { name: "MDS", href: "/helm?brand=MDS", filterKey: "MDS" },
        { name: "ZEUS", href: "/helm?brand=ZEUS", filterKey: "ZEUS" },
        { name: "BMC", href: "/helm?brand=BMC", filterKey: "BMC" },
        { name: "GM", href: "/helm?brand=GM", filterKey: "GM" },
        { name: "AGV", href: "/helm?brand=AGV", filterKey: "AGV" },
        { name: "Arai", href: "/helm?brand=Arai", filterKey: "Arai" },
        { name: "Shoei", href: "/helm?brand=Shoei", filterKey: "Shoei" },
        { name: "HIU", href: "/helm?brand=HIU", filterKey: "HIU" },
        { name: "Bogo", href: "/helm?brand=Bogo", filterKey: "Bogo" },
      ],
    },
    {
      category: "Kategori Helm",
      items: [
        { name: "Full Face", href: "/helm?type=full-face", filterKey: "full-face" },
        { name: "Open Face", href: "/helm?type=open-face", filterKey: "open-face" },
        { name: "Modular", href: "/helm?type=modular", filterKey: "modular" },
        { name: "Racing", href: "/helm?type=racing", filterKey: "racing" },
        { name: "Touring", href: "/helm?type=touring", filterKey: "touring" },
        { name: "Urban", href: "/helm?type=urban", filterKey: "urban" },
      ],
    },
    {
      category: "Harga",
      items: [
        { name: "Di bawah 1 Juta", href: "/helm?price=under-1m", filterKey: "under-1m" },
        { name: "1 - 1.5 Juta", href: "/helm?price=1m-1.5m", filterKey: "1m-1.5m" },
        { name: "1.5 - 2 Juta", href: "/helm?price=1.5m-2m", filterKey: "1.5m-2m" },
        { name: "Di atas 2 Juta", href: "/helm?price=above-2m", filterKey: "above-2m" },
      ],
    },
    {
      category: "Parts & Accessories",
      items: [
        { name: "Visor", href: "/helm?category=visor", filterKey: "visor" },
        { name: "Padding", href: "/helm?category=padding", filterKey: "padding" },
        { name: "Spare Parts", href: "/helm?category=parts", filterKey: "parts" },
      ],
    },
  ]

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "HELM", href: "/helm", submenus: helmSubmenus },
    { name: "HIDEKI X PROSTREET", href: "/hideki-prostreet" },
    { name: "APPARELS", href: "/apparels" },
    { name: "ACCESSORIES", href: "/accessories" },
    { name: "PROMO", href: "/promo" },
    { name: "CAREER", href: "/career" },
    { name: "DISTRIBUTOR", href: "/distributor" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to helm page with search query
      navigate(`/helm?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term)
    navigate(`/helm?search=${encodeURIComponent(term)}`)
    setIsSearchOpen(false)
  }

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="./hideki.id.png" alt="Hideki" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-8">
              {navItems.map((item) => {
                if (item.name === "HELM") {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger className="text-black font-semibold hover:text-primary px-4 py-2 rounded-md transition-colors bg-transparent">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white border shadow-lg rounded-xl p-6">
                        {/* Perbaikan dropdown menu agar lebih rapi */}
                        <div className="w-[800px] max-h-[400px] overflow-y-auto">
                          {helmSubmenus.map((categoryGroup, groupIndex) => (
                            <div key={groupIndex} className="mb-6">
                              <h4 className="mb-3 text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
                                {categoryGroup.category}
                              </h4>
                              {/* Grid layout yang lebih rapi untuk brand */}
                              <div className={categoryGroup.category === "Brand Helm" ? "grid grid-cols-5 gap-2" : "grid grid-cols-3 gap-2"}>
                                {categoryGroup.items.map((subItem, subIndex) => (
                                  <NavigationMenuLink key={subIndex} asChild>
                                    <Link
                                      to={subItem.href}
                                      className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors text-gray-700 hover:bg-red-600 focus:bg-red-600 hover:text-white focus:text-white text-sm text-center"
                                    >
                                      <div className="font-medium leading-none">{subItem.name}</div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <NavigationMenuLink asChild>
                            <Link
                              to="/helm"
                              className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                            >
                              Lihat Semua Helm
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                } else {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="text-black font-semibold hover:text-primary px-4 py-2 rounded-md transition-colors"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-black hover:bg-gray-100"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/checkout">
              <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-black hover:bg-gray-100"
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
                placeholder="Cari helm berdasarkan brand, model, atau harga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                autoFocus
              />
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                Cari
              </Button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Pencarian populer:</span>
              <button 
                type="button"
                onClick={() => handleQuickSearch("KYT")}
                className="text-sm text-red-600 hover:underline"
              >
                KYT
              </button>
              <button 
                type="button"
                onClick={() => handleQuickSearch("ARRAY")}
                className="text-sm text-red-600 hover:underline"
              >
                ARRAY
              </button>
              <button 
                type="button"
                onClick={() => handleQuickSearch("Full Face")}
                className="text-sm text-red-600 hover:underline"
              >
                Full Face
              </button>
              <button 
                type="button"
                onClick={() => handleQuickSearch("Racing")}
                className="text-sm text-red-600 hover:underline"
              >
                Racing
              </button>
            </div>
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
                  className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Brand Quick Links */}
              <div className="pt-4 border-t border-gray-200">
                <p className="px-4 py-2 text-sm font-semibold text-gray-600">Brand Helm:</p>
                <div className="grid grid-cols-2 gap-2 px-4">
                  {helmSubmenus[0].items.map((brand) => (
                    <Link
                      key={brand.name}
                      to={brand.href}
                      className="block px-3 py-2 text-sm text-foreground hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header