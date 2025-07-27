// Data catalog for all product categories (Apparels, Accessories, Promo)
// Following the same structure as helmets-data.ts

export interface ApparelProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  series: string;
  category: 'jaket' | 'jersey' | 'celana' | 'sepatu' | 'sarung-tangan';
  image: string;
  images?: string[];
  description?: string;
  specifications?: {
    material: string;
    weight?: string;
    waterproof?: boolean;
    breathable?: boolean;
    protection?: string[];
  };
  sizes?: Array<{
    size: string;
    measurement: string;
  }>;
  colors?: string[];
  brand: string;
  stock?: number;
  rating?: number;
  reviews?: number;
  isOnSale?: boolean;
  salePercentage?: number;
}

export interface AccessoryProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  series: string;
  category: 'visor' | 'padding' | 'parts' | 'bluetooth' | 'tas' | 'spoiler' | 'chin-guard';
  image: string;
  images?: string[];
  description?: string;
  specifications?: {
    material?: string;
    compatibility?: string[];
    color?: string;
    dimensions?: string;
  };
  compatibleBrands?: string[];
  brand: string;
  stock?: number;
  rating?: number;
  reviews?: number;
  isOnSale?: boolean;
  salePercentage?: number;
}

export interface PromoProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  series: string;
  category: 'helmet' | 'apparel' | 'accessory';
  image: string;
  images?: string[];
  description?: string;
  promoType: 'flash-sale' | 'clearance' | 'bundle' | 'seasonal';
  discountPercentage: number;
  validUntil: string;
  limitedStock?: number;
  brand: string;
  stock?: number;
  rating?: number;
  reviews?: number;
  originalCategory?: string;
}

// APPARELS DATA
export const apparelsData: ApparelProduct[] = [
  // Jaket Category
  {
    id: "jaket-hideki-wasp-yellow",
    name: "JAKET HIDEKI WASP YELLOW",
    price: 296250,
    originalPrice: 395000,
    series: "WASP Series",
    category: "jaket",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578665825765-9c9b2b4c6aab?w=400&h=400&fit=crop"
    ],
    description: "Jaket riding premium dengan desain agresif dan perlindungan maksimal. Dilengkapi dengan protector CE level 2.",
    specifications: {
      material: "Cordura 600D + Mesh ventilation",
      weight: "1.2kg",
      waterproof: true,
      breathable: true,
      protection: ["CE Level 2 Back Protector", "CE Level 1 Shoulder", "CE Level 1 Elbow"]
    },
    sizes: [
      { size: "S", measurement: "Chest: 96-101cm" },
      { size: "M", measurement: "Chest: 102-107cm" },
      { size: "L", measurement: "Chest: 108-113cm" },
      { size: "XL", measurement: "Chest: 114-119cm" },
      { size: "XXL", measurement: "Chest: 120-125cm" }
    ],
    colors: ["Yellow", "Black", "White"],
    stock: 25,
    rating: 4.7,
    reviews: 89,
    isOnSale: true,
    salePercentage: 25
  },
  {
    id: "jaket-hideki-flashing-red",
    name: "JAKET HIDEKI FLASHING RED",
    price: 296250,
    originalPrice: 395000,
    series: "FLASHING Series",
    category: "jaket",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1578665825765-9c9b2b4c6aab?w=400&h=400&fit=crop",
    description: "Jaket touring dengan reflective strips untuk visibilitas maksimal di malam hari.",
    specifications: {
      material: "Cordura 500D + Reflective Strips",
      weight: "1.1kg",
      waterproof: true,
      breathable: true,
      protection: ["CE Level 2 Back", "CE Level 1 Shoulder/Elbow"]
    },
    sizes: [
      { size: "S", measurement: "Chest: 96-101cm" },
      { size: "M", measurement: "Chest: 102-107cm" },
      { size: "L", measurement: "Chest: 108-113cm" },
      { size: "XL", measurement: "Chest: 114-119cm" }
    ],
    colors: ["Red", "Blue", "Black"],
    stock: 18,
    rating: 4.6,
    reviews: 64,
    isOnSale: true,
    salePercentage: 25
  },
  {
    id: "jaket-hideki-rocket-black",
    name: "JAKET HIDEKI ROCKET BLACK",
    price: 296250,
    originalPrice: 395000,
    series: "ROCKET Series",
    category: "jaket",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Jaket racing dengan desain aerodinamis dan ventilasi optimal untuk track day.",
    specifications: {
      material: "Leather + Cordura combination",
      weight: "1.4kg",
      waterproof: false,
      breathable: true,
      protection: ["CE Level 2 Full Protection", "Titanium Sliders"]
    },
    sizes: [
      { size: "S", measurement: "Chest: 96-101cm" },
      { size: "M", measurement: "Chest: 102-107cm" },
      { size: "L", measurement: "Chest: 108-113cm" },
      { size: "XL", measurement: "Chest: 114-119cm" }
    ],
    colors: ["Black", "White/Black"],
    stock: 0,
    rating: 4.8,
    reviews: 42,
    isOnSale: true,
    salePercentage: 25
  },

  // Jersey Category
  {
    id: "jersey-hideki-commander",
    name: "JERSEY HIDEKI COMMANDER",
    price: 221250,
    originalPrice: 295000,
    series: "COMMANDER Series",
    category: "jersey",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    description: "Jersey motocross dengan material breathable dan desain yang stylish untuk off-road riding.",
    specifications: {
      material: "Polyester Mesh + Spandex",
      weight: "250g",
      waterproof: false,
      breathable: true,
      protection: []
    },
    sizes: [
      { size: "S", measurement: "Chest: 88-93cm" },
      { size: "M", measurement: "Chest: 94-99cm" },
      { size: "L", measurement: "Chest: 100-105cm" },
      { size: "XL", measurement: "Chest: 106-111cm" }
    ],
    colors: ["Black/Red", "Blue/White", "Green/Black"],
    stock: 35,
    rating: 4.5,
    reviews: 76,
    isOnSale: true,
    salePercentage: 25
  },
  {
    id: "jersey-hideki-piston",
    name: "JERSEY HIDEKI PISTON",
    price: 221250,
    originalPrice: 295000,
    series: "PISTON Series",
    category: "jersey",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    description: "Jersey racing dengan graphics yang bold dan material quick-dry untuk performa maksimal.",
    specifications: {
      material: "Quick-dry Polyester",
      weight: "220g",
      waterproof: false,
      breathable: true,
      protection: []
    },
    sizes: [
      { size: "S", measurement: "Chest: 88-93cm" },
      { size: "M", measurement: "Chest: 94-99cm" },
      { size: "L", measurement: "Chest: 100-105cm" },
      { size: "XL", measurement: "Chest: 106-111cm" }
    ],
    colors: ["Black/Orange", "White/Blue", "Red/Black"],
    stock: 28,
    rating: 4.4,
    reviews: 53,
    isOnSale: true,
    salePercentage: 25
  },
  {
    id: "jersey-hideki-harmonic",
    name: "JERSEY HIDEKI HARMONIC",
    price: 221250,
    originalPrice: 295000,
    series: "HARMONIC Series",
    category: "jersey",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1594736797933-d0ab12eb3e24?w=400&h=400&fit=crop",
    description: "Jersey dengan desain minimalis dan material premium untuk kenyamanan maksimal.",
    specifications: {
      material: "Premium Cotton Blend",
      weight: "280g",
      waterproof: false,
      breathable: true,
      protection: []
    },
    sizes: [
      { size: "S", measurement: "Chest: 88-93cm" },
      { size: "M", measurement: "Chest: 94-99cm" },
      { size: "L", measurement: "Chest: 100-105cm" },
      { size: "XL", measurement: "Chest: 106-111cm" }
    ],
    colors: ["Navy", "Grey", "Black"],
    stock: 42,
    rating: 4.6,
    reviews: 67,
    isOnSale: true,
    salePercentage: 25
  }
];

// ACCESSORIES DATA
export const accessoriesData: AccessoryProduct[] = [
  // Visor Category
  {
    id: "visor-clear-universal",
    name: "VISOR CLEAR UNIVERSAL",
    price: 125000,
    series: "Universal Series",
    category: "visor",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
    description: "Visor bening universal dengan anti-scratch coating untuk berbagai jenis helm.",
    specifications: {
      material: "Polycarbonate Anti-scratch",
      compatibility: ["Full Face", "Modular"],
      color: "Clear",
      dimensions: "Standard universal fit"
    },
    compatibleBrands: ["KYT", "ARRAY", "MLA", "ALV", "JS", "NIELS", "VRC", "RSV"],
    stock: 50,
    rating: 4.3,
    reviews: 128,
    isOnSale: false
  },
  {
    id: "visor-smoke-tinted",
    name: "VISOR SMOKE TINTED",
    price: 145000,
    series: "Tinted Series",
    category: "visor",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
    description: "Visor smoke tinted untuk perlindungan dari sinar matahari dan glare.",
    specifications: {
      material: "Polycarbonate UV Protection",
      compatibility: ["Full Face", "Modular"],
      color: "Smoke Tinted",
      dimensions: "Standard universal fit"
    },
    compatibleBrands: ["KYT", "ARRAY", "MLA", "ALV", "JS", "NIELS"],
    stock: 35,
    rating: 4.5,
    reviews: 89,
    isOnSale: false
  },

  // Padding Category
  {
    id: "padding-comfort-premium",
    name: "PADDING COMFORT PREMIUM",
    price: 85000,
    series: "Comfort Series",
    category: "padding",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Padding premium dengan memory foam untuk kenyamanan maksimal dan sirkulasi udara yang baik.",
    specifications: {
      material: "Memory Foam + Moisture-wicking fabric",
      compatibility: ["Full Face", "Open Face", "Modular"],
      color: "Black",
      dimensions: "Universal adjustable"
    },
    compatibleBrands: ["Universal fit"],
    stock: 75,
    rating: 4.7,
    reviews: 156,
    isOnSale: false
  },

  // Bluetooth Category
  {
    id: "bluetooth-intercom-v6",
    name: "BLUETOOTH INTERCOM V6",
    price: 485000,
    series: "V6 Series",
    category: "bluetooth",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1565158142741-73764b2c7cc6?w=400&h=400&fit=crop",
    description: "Bluetooth intercom dengan jangkauan 1.2km dan baterai tahan 12 jam untuk komunikasi grup.",
    specifications: {
      material: "ABS Plastic + Metal",
      compatibility: ["All helmet types"],
      color: "Black",
      dimensions: "Compact universal mount"
    },
    compatibleBrands: ["Universal"],
    stock: 22,
    rating: 4.6,
    reviews: 94,
    isOnSale: false
  },

  // Tas Category
  {
    id: "tas-helm-premium",
    name: "TAS HELM PREMIUM",
    price: 125000,
    series: "Premium Series",
    category: "tas",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Tas helm premium dengan padding internal dan material tahan air untuk melindungi helm Anda.",
    specifications: {
      material: "Waterproof Nylon + Foam padding",
      compatibility: ["All helmet sizes"],
      color: "Black",
      dimensions: "35x25x25cm"
    },
    compatibleBrands: ["Universal"],
    stock: 45,
    rating: 4.4,
    reviews: 73,
    isOnSale: false
  },

  // Spoiler Category
  {
    id: "spoiler-racing-carbon",
    name: "SPOILER RACING CARBON",
    price: 275000,
    series: "Racing Series",
    category: "spoiler",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Spoiler carbon fiber untuk helm racing yang meningkatkan aerodinamika dan stabilitas.",
    specifications: {
      material: "Carbon Fiber",
      compatibility: ["Racing Helmets"],
      color: "Carbon Black",
      dimensions: "Aerodynamic profile"
    },
    compatibleBrands: ["KYT", "ARRAY", "AGV", "Shoei"],
    stock: 15,
    rating: 4.8,
    reviews: 45,
    isOnSale: false
  }
];

// PROMO DATA
export const promoData: PromoProduct[] = [
  {
    id: "promo-helm-kyt-rc7",
    name: "KYT RC7 PROMO SPESIAL",
    price: 875000,
    originalPrice: 1250000,
    series: "RC7 Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm KYT RC7 dengan diskon special untuk waktu terbatas. Full face helmet dengan SNI dan DOT certification.",
    promoType: "flash-sale",
    discountPercentage: 30,
    validUntil: "2024-02-29",
    limitedStock: 50,
    stock: 25,
    rating: 4.8,
    reviews: 127,
    originalCategory: "helmet"
  },
  {
    id: "promo-jaket-hideki-bundle",
    name: "BUNDLE JAKET + SARUNG TANGAN",
    price: 350000,
    originalPrice: 495000,
    series: "Bundle Series",
    category: "apparel",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    description: "Paket hemat jaket riding + sarung tangan dengan harga spesial. Perfect combo untuk riding protection.",
    promoType: "bundle",
    discountPercentage: 29,
    validUntil: "2024-03-15",
    limitedStock: 30,
    stock: 18,
    rating: 4.6,
    reviews: 89,
    originalCategory: "apparel"
  },
  {
    id: "promo-visor-clearance",
    name: "CLEARANCE VISOR COLLECTION",
    price: 75000,
    originalPrice: 125000,
    series: "Clearance Series",
    category: "accessory",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
    description: "Clearance sale untuk berbagai jenis visor. Stok terbatas dengan kualitas premium.",
    promoType: "clearance",
    discountPercentage: 40,
    validUntil: "2024-02-20",
    limitedStock: 100,
    stock: 67,
    rating: 4.3,
    reviews: 45,
    originalCategory: "accessory"
  },
  {
    id: "promo-jersey-seasonal",
    name: "JERSEY COLLECTION SALE",
    price: 165000,
    originalPrice: 295000,
    series: "Seasonal Series",
    category: "apparel",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    description: "Seasonal sale untuk koleksi jersey terpilih. Berbagai desain dan ukuran tersedia.",
    promoType: "seasonal",
    discountPercentage: 44,
    validUntil: "2024-03-31",
    limitedStock: 75,
    stock: 52,
    rating: 4.5,
    reviews: 76,
    originalCategory: "apparel"
  },
  {
    id: "promo-bluetooth-flash",
    name: "FLASH SALE BLUETOOTH INTERCOM",
    price: 290000,
    originalPrice: 485000,
    series: "Flash Sale Series",
    category: "accessory",
    brand: "HIDEKI",
    image: "https://images.unsplash.com/photo-1565158142741-73764b2c7cc6?w=400&h=400&fit=crop",
    description: "Flash sale untuk bluetooth intercom premium. Jangkauan 1.2km dengan kualitas suara jernih.",
    promoType: "flash-sale",
    discountPercentage: 40,
    validUntil: "2024-02-15",
    limitedStock: 20,
    stock: 8,
    rating: 4.6,
    reviews: 94,
    originalCategory: "accessory"
  }
];

// Utility functions
export const getAllApparelBrands = (): string[] => {
  const brands = [...new Set(apparelsData.map(item => item.brand))];
  return brands.sort();
};

export const getAllAccessoryBrands = (): string[] => {
  const brands = [...new Set(accessoriesData.map(item => item.brand))];
  return brands.sort();
};

export const getPromoBrands = (): string[] => {
  const brands = [...new Set(promoData.map(item => item.brand))];
  return brands.sort();
};

export const paginateApparels = (products: ApparelProduct[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: Math.ceil(products.length / itemsPerPage),
    totalProducts: products.length,
    hasNextPage: page < Math.ceil(products.length / itemsPerPage),
    hasPrevPage: page > 1
  };
};

export const paginateAccessories = (products: AccessoryProduct[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: Math.ceil(products.length / itemsPerPage),
    totalProducts: products.length,
    hasNextPage: page < Math.ceil(products.length / itemsPerPage),
    hasPrevPage: page > 1
  };
};

export const paginatePromos = (products: PromoProduct[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: Math.ceil(products.length / itemsPerPage),
    totalProducts: products.length,
    hasNextPage: page < Math.ceil(products.length / itemsPerPage),
    hasPrevPage: page > 1
  };
};