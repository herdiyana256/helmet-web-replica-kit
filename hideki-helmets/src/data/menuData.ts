import { MenuCategory } from '@/types';

export const menuCategories: MenuCategory[] = [
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
    ]
  },
  {
    category: "Tipe Helm",
    items: [
      { name: "Full Face", href: "/helm?type=full-face", filterKey: "full-face" },
      { name: "Half Face", href: "/helm?type=half-face", filterKey: "half-face" },
      { name: "Modular", href: "/helm?type=modular", filterKey: "modular" },
      { name: "Cross", href: "/helm?type=cross", filterKey: "cross" },
    ]
  },
  {
    category: "Helmet Parts & Accessories",
    items: [
      { name: "Visor", href: "/accessories?category=visor", filterKey: "visor" },
      { name: "Padding", href: "/accessories?category=padding", filterKey: "padding" },
      { name: "Chin Strap", href: "/accessories?category=chin-strap", filterKey: "chin-strap" },
      { name: "Spoiler", href: "/accessories?category=spoiler", filterKey: "spoiler" },
    ]
  }
];

export const mainMenuItems = [
  {
    name: "Helm",
    href: "/helm",
    hasSubmenu: true,
    submenu: menuCategories
  },
  {
    name: "Aksesoris",
    href: "/accessories",
    hasSubmenu: true,
    submenu: [
      {
        category: "Aksesoris Motor",
        items: [
          { name: "Sarung Tangan", href: "/accessories?category=gloves", filterKey: "gloves" },
          { name: "Masker", href: "/accessories?category=masks", filterKey: "masks" },
          { name: "Kacamata", href: "/accessories?category=glasses", filterKey: "glasses" },
          { name: "Tas Motor", href: "/accessories?category=bags", filterKey: "bags" },
          { name: "Cover Motor", href: "/accessories?category=covers", filterKey: "covers" },
          { name: "Rantai", href: "/accessories?category=chains", filterKey: "chains" },
          { name: "Gembok", href: "/accessories?category=locks", filterKey: "locks" },
        ]
      }
    ]
  },
  {
    name: "Apparel",
    href: "/apparel",
    hasSubmenu: true,
    submenu: [
      {
        category: "Pakaian Berkendara",
        items: [
          { name: "Jaket", href: "/apparel?category=jackets", filterKey: "jackets" },
          { name: "Kaos", href: "/apparel?category=shirts", filterKey: "shirts" },
          { name: "Celana", href: "/apparel?category=pants", filterKey: "pants" },
          { name: "Sepatu", href: "/apparel?category=shoes", filterKey: "shoes" },
          { name: "Jas Hujan", href: "/apparel?category=raincoats", filterKey: "raincoats" },
        ]
      }
    ]
  },
  {
    name: "Promo",
    href: "/promo",
    hasSubmenu: true,
    submenu: [
      {
        category: "Penawaran Spesial",
        items: [
          { name: "Flash Sale", href: "/promo?type=flash-sale", filterKey: "flash-sale" },
          { name: "Diskon Besar", href: "/promo?type=big-discount", filterKey: "big-discount" },
          { name: "Bundle Deal", href: "/promo?type=bundle", filterKey: "bundle" },
          { name: "Clearance", href: "/promo?type=clearance", filterKey: "clearance" },
        ]
      }
    ]
  }
];

export const helmetBrands = [
  "KYT", "ARRAY", "MLA", "ALV", "JS", "NIELS", "VRC", "RSV", 
  "INK", "NHK", "MDS", "ZEUS", "BMC", "GM", "AGV", "Arai", 
  "Shoei", "HIU", "Bogo"
];