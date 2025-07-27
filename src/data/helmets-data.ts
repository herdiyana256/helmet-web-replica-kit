// Data katalog produk helm untuk 19 brand helm
// Setiap brand memiliki 10 produk dengan variasi harga dan spesifikasi

export interface Product {
  id: string;
  name: string;
  price: number;
  series: string;
  category: string;
  image: string;
  images?: string[]; // Multiple product images
  description?: string;
  specifications?: {
    certification: string[];
    weight: string;
    material: string;
    visorMaterial: string;
    innerVisor: string;
    padding: string;
  };
  completeness?: string[];
  sizes?: Array<{
    size: string;
    measurement: string;
  }>;
  brand: string;
  stock?: number;
  rating?: number;
  reviews?: number;
}

export const helmetsData: Product[] = [
  // KYT Brand - 10 products
  {
    id: "kyt-rc7-01",
    name: "KYT RC7 Full Face",
    price: 1250000,
    series: "RC7 Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop"
    ],
    description: "Helm full face racing dengan desain aerodinamis dan ventilasi optimal. Cocok untuk penggunaan harian dan touring jarak jauh.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1400g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke tinted",
      padding: "Removable & washable"
    },
    completeness: [
      "1x Helm KYT RC7",
      "1x Clear visor",
      "1x Inner visor (smoke)",
      "1x Tas helm",
      "1x Manual book",
      "1x Kartu garansi"
    ],
    sizes: [
      { size: "S", measurement: "55-56 cm" },
      { size: "M", measurement: "57-58 cm" },
      { size: "L", measurement: "59-60 cm" },
      { size: "XL", measurement: "61-62 cm" }
    ],
    stock: 15,
    rating: 4.8,
    reviews: 127
  },
  {
    id: "kyt-nf-r-01",
    name: "KYT NF-R Open Face",
    price: 850000,
    series: "NF-R Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop"
    ],
    description: "Helm open face dengan desain retro modern. Dilengkapi dengan visor yang dapat dilepas dan sistem ventilasi yang baik.",
    specifications: {
      certification: ["SNI"],
      weight: "1100g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Removable & washable"
    },
    completeness: [
      "1x Helm KYT NF-R",
      "1x Clear visor",
      "1x Tas helm",
      "1x Manual book",
      "1x Kartu garansi"
    ],
    sizes: [
      { size: "S", measurement: "55-56 cm" },
      { size: "M", measurement: "57-58 cm" },
      { size: "L", measurement: "59-60 cm" },
      { size: "XL", measurement: "61-62 cm" }
    ],
    stock: 22,
    rating: 4.5,
    reviews: 89
  },
  {
    id: "kyt-k2-rider-01",
    name: "KYT K2 Rider",
    price: 950000,
    series: "K2 Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm modular dengan teknologi flip-up yang mudah digunakan. Cocok untuk touring dan commuting.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1500g ± 50g",
      material: "ABS + PC Shell",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Retractable smoke",
      padding: "Memory foam"
    },
    stock: 18,
    rating: 4.6,
    reviews: 65
  },
  {
    id: "kyt-vendetta-2-01",
    name: "KYT Vendetta 2",
    price: 1150000,
    series: "Vendetta Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm sport dengan desain agresif dan ventilasi superior untuk performa maksimal.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1350g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke tinted",
      padding: "Racing padding"
    },
    stock: 12,
    rating: 4.7,
    reviews: 98
  },
  {
    id: "kyt-falcon-01",
    name: "KYT Falcon",
    price: 750000,
    series: "Falcon Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm entry level dengan kualitas premium. Cocok untuk penggunaan sehari-hari.",
    specifications: {
      certification: ["SNI"],
      weight: "1250g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Standard padding"
    },
    stock: 25,
    rating: 4.3,
    reviews: 156
  },
  {
    id: "kyt-cross-over-01",
    name: "KYT Cross Over",
    price: 1350000,
    series: "Cross Over Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm adventure dengan desain dual sport. Siap untuk on-road dan off-road.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1450g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure padding"
    },
    stock: 8,
    rating: 4.8,
    reviews: 42
  },
  {
    id: "kyt-tt-course-01",
    name: "KYT TT Course",
    price: 1450000,
    series: "TT Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm racing premium dengan teknologi aerodinamis terdepan untuk track day.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1300g ± 50g",
      material: "Carbon Fiber",
      visorMaterial: "PC Racing grade",
      innerVisor: "Racing smoke",
      padding: "Racing memory foam"
    },
    stock: 6,
    rating: 4.9,
    reviews: 28
  },
  {
    id: "kyt-galaxy-slide-01",
    name: "KYT Galaxy Slide",
    price: 650000,
    series: "Galaxy Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm retro dengan visor slide yang unik. Gaya vintage dengan teknologi modern.",
    specifications: {
      certification: ["SNI"],
      weight: "1150g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Retro padding"
    },
    stock: 20,
    rating: 4.4,
    reviews: 73
  },
  {
    id: "kyt-elsico-01",
    name: "KYT Elsico",
    price: 550000,
    series: "Elsico Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm klasik dengan desain timeless. Cocok untuk motor klasik dan vintage.",
    specifications: {
      certification: ["SNI"],
      weight: "1000g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Classic padding"
    },
    stock: 30,
    rating: 4.2,
    reviews: 112
  },
  {
    id: "kyt-scorpion-king-01",
    name: "KYT Scorpion King",
    price: 1550000,
    series: "Scorpion Series",
    category: "helmet",
    brand: "KYT",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm premium dengan desain eksklusif dan teknologi terdepan untuk performa maksimal.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1280g ± 50g",
      material: "Carbon Kevlar",
      visorMaterial: "PC Anti-fog premium",
      innerVisor: "Photochromic",
      padding: "Premium memory foam"
    },
    stock: 5,
    rating: 4.9,
    reviews: 15
  },

  // ARRAY Brand - 10 products
  {
    id: "array-venom-01",
    name: "ARRAY Venom Full Face",
    price: 1450000,
    series: "Venom Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop"
    ],
    description: "Helm premium dengan teknologi advanced composite shell. Desain agresif dengan performa tinggi untuk riding sport.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1350g ± 50g",
      material: "Fiberglass Composite",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Moisture-wicking fabric"
    },
    completeness: [
      "1x Helm ARRAY Venom",
      "1x Clear visor",
      "1x Smoke visor",
      "1x Pinlock insert",
      "1x Premium helmet bag",
      "1x Manual book",
      "1x Kartu garansi"
    ],
    sizes: [
      { size: "S", measurement: "55-56 cm" },
      { size: "M", measurement: "57-58 cm" },
      { size: "L", measurement: "59-60 cm" },
      { size: "XL", measurement: "61-62 cm" }
    ],
    stock: 12,
    rating: 4.7,
    reviews: 85
  },
  {
    id: "array-storm-01",
    name: "ARRAY Storm Modular",
    price: 1650000,
    series: "Storm Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm modular dengan flip-up chin bar. Fleksibilitas maksimal untuk touring dan commuting dengan kenyamanan premium.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1600g ± 50g",
      material: "ABS + PC Shell",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Retractable smoke",
      padding: "Memory foam padding"
    },
    stock: 8,
    rating: 4.6,
    reviews: 67
  },
  {
    id: "array-matrix-01",
    name: "ARRAY Matrix Sport",
    price: 1250000,
    series: "Matrix Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm sport dengan desain futuristik dan teknologi ventilasi canggih.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1320g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Sport padding"
    },
    stock: 15,
    rating: 4.5,
    reviews: 92
  },
  {
    id: "array-phantom-01",
    name: "ARRAY Phantom Elite",
    price: 1850000,
    series: "Phantom Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm elite dengan teknologi phantom coating dan desain premium untuk performa maksimal.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1280g ± 50g",
      material: "Carbon Fiber",
      visorMaterial: "PC Premium anti-fog",
      innerVisor: "Photochromic",
      padding: "Elite memory foam"
    },
    stock: 6,
    rating: 4.8,
    reviews: 34
  },
  {
    id: "array-urban-01",
    name: "ARRAY Urban Jet",
    price: 950000,
    series: "Urban Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm jet dengan desain urban modern untuk penggunaan dalam kota.",
    specifications: {
      certification: ["SNI"],
      weight: "1050g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Urban comfort"
    },
    stock: 20,
    rating: 4.4,
    reviews: 118
  },
  {
    id: "array-racer-01",
    name: "ARRAY Racer Pro",
    price: 1750000,
    series: "Racer Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm racing profesional dengan sertifikasi internasional dan performa track-ready.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1250g ± 50g",
      material: "Full Carbon Fiber",
      visorMaterial: "PC Racing grade",
      innerVisor: "Racing smoke",
      padding: "Racing memory foam"
    },
    stock: 4,
    rating: 4.9,
    reviews: 21
  },
  {
    id: "array-classic-01",
    name: "ARRAY Classic Heritage",
    price: 850000,
    series: "Classic Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm heritage dengan desain klasik yang timeless dan kenyamanan modern.",
    specifications: {
      certification: ["SNI"],
      weight: "1150g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Heritage padding"
    },
    stock: 25,
    rating: 4.3,
    reviews: 76
  },
  {
    id: "array-adventure-01",
    name: "ARRAY Adventure Pro",
    price: 1550000,
    series: "Adventure Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm adventure dengan peak visor dan teknologi dual sport untuk segala medan.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1480g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure comfort"
    },
    stock: 10,
    rating: 4.7,
    reviews: 45
  },
  {
    id: "array-street-01",
    name: "ARRAY Street Fighter",
    price: 1150000,
    series: "Street Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm street dengan desain agresif dan performa tinggi untuk riding harian.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1300g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Street comfort"
    },
    stock: 18,
    rating: 4.5,
    reviews: 103
  },
  {
    id: "array-touring-01",
    name: "ARRAY Touring Master",
    price: 1350000,
    series: "Touring Series",
    category: "helmet",
    brand: "ARRAY",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm touring dengan kenyamanan maksimal untuk perjalanan jarak jauh.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1380g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Touring comfort"
    },
    stock: 14,
    rating: 4.6,
    reviews: 58
  },

  // MLA Brand - 10 products
  {
    id: "mla-racing-01",
    name: "MLA Racing Pro",
    price: 1350000,
    series: "Racing Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm racing dengan desain aerodinamis dan sistem ventilasi canggih untuk performa maksimal di sirkuit.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1300g ± 50g",
      material: "Carbon Fiber",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Racing-grade padding"
    },
    stock: 10,
    rating: 4.7,
    reviews: 62
  },
  {
    id: "mla-street-01",
    name: "MLA Street Classic",
    price: 950000,
    series: "Street Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm street dengan gaya klasik dan modern untuk penggunaan sehari-hari dengan kenyamanan optimal.",
    specifications: {
      certification: ["SNI"],
      weight: "1200g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Comfort padding"
    },
    stock: 22,
    rating: 4.4,
    reviews: 89
  },
  {
    id: "mla-sport-01",
    name: "MLA Sport Dynamics",
    price: 1150000,
    series: "Sport Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm sport dengan teknologi dinamis dan desain aerodinamis untuk performa tinggi.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1280g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke tinted",
      padding: "Sport memory foam"
    },
    stock: 16,
    rating: 4.6,
    reviews: 74
  },
  {
    id: "mla-touring-01",
    name: "MLA Touring Comfort",
    price: 1250000,
    series: "Touring Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm touring dengan fokus pada kenyamanan maksimal untuk perjalanan jarak jauh.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1350g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Touring comfort"
    },
    stock: 12,
    rating: 4.5,
    reviews: 56
  },
  {
    id: "mla-urban-01",
    name: "MLA Urban Style",
    price: 850000,
    series: "Urban Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm urban dengan desain stylish untuk penggunaan dalam kota.",
    specifications: {
      certification: ["SNI"],
      weight: "1100g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Urban comfort"
    },
    stock: 28,
    rating: 4.3,
    reviews: 112
  },
  {
    id: "mla-adventure-01",
    name: "MLA Adventure Explorer",
    price: 1450000,
    series: "Adventure Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm adventure dengan peak visor dan teknologi dual sport untuk eksplorasi.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1420g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure padding"
    },
    stock: 8,
    rating: 4.7,
    reviews: 38
  },
  {
    id: "mla-retro-01",
    name: "MLA Retro Classic",
    price: 750000,
    series: "Retro Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm retro dengan desain vintage yang timeless dan kenyamanan modern.",
    specifications: {
      certification: ["SNI"],
      weight: "1050g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Retro comfort"
    },
    stock: 24,
    rating: 4.2,
    reviews: 95
  },
  {
    id: "mla-premium-01",
    name: "MLA Premium Elite",
    price: 1750000,
    series: "Premium Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm premium dengan teknologi terdepan dan material berkualitas tinggi.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1250g ± 50g",
      material: "Carbon Kevlar",
      visorMaterial: "PC Premium anti-fog",
      innerVisor: "Photochromic",
      padding: "Premium memory foam"
    },
    stock: 5,
    rating: 4.8,
    reviews: 23
  },
  {
    id: "mla-modular-01",
    name: "MLA Modular Pro",
    price: 1550000,
    series: "Modular Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm modular dengan sistem flip-up yang mudah dan aman untuk berbagai situasi.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1580g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Modular comfort"
    },
    stock: 7,
    rating: 4.6,
    reviews: 41
  },
  {
    id: "mla-youth-01",
    name: "MLA Youth Starter",
    price: 650000,
    series: "Youth Series",
    category: "helmet",
    brand: "MLA",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm untuk pemula dengan harga terjangkau dan kualitas terpercaya.",
    specifications: {
      certification: ["SNI"],
      weight: "1150g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Basic comfort"
    },
    stock: 35,
    rating: 4.1,
    reviews: 128
  },

  // ALV Brand - 10 products
  {
    id: "alv-apex-01",
    name: "ALV Apex Carbon",
    price: 2250000,
    series: "Apex Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm premium dengan full carbon fiber construction dan teknologi terdepan untuk keamanan maksimal.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1250g ± 50g",
      material: "Full Carbon Fiber",
      visorMaterial: "PC Anti-fog with Pinlock",
      innerVisor: "Photochromic",
      padding: "Premium memory foam"
    },
    stock: 3,
    rating: 4.9,
    reviews: 18
  },
  {
    id: "alv-urban-01",
    name: "ALV Urban Jet",
    price: 1150000,
    series: "Urban Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm jet dengan desain urban modern yang ringan dan nyaman untuk penggunaan dalam kota.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "950g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "None",
      padding: "Quick-dry padding"
    },
    stock: 18,
    rating: 4.5,
    reviews: 87
  },
  {
    id: "alv-sport-01",
    name: "ALV Sport Master",
    price: 1650000,
    series: "Sport Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm sport dengan performa tinggi dan desain aerodinamis untuk riding enthusiast.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1320g ± 50g",
      material: "Fiberglass Carbon",
      visorMaterial: "PC Anti-fog premium",
      innerVisor: "Smoke retractable",
      padding: "Sport memory foam"
    },
    stock: 9,
    rating: 4.7,
    reviews: 54
  },
  {
    id: "alv-touring-01",
    name: "ALV Touring Comfort",
    price: 1350000,
    series: "Touring Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm touring dengan kenyamanan superior untuk perjalanan jarak jauh.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1380g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Touring memory foam"
    },
    stock: 14,
    rating: 4.6,
    reviews: 72
  },
  {
    id: "alv-adventure-01",
    name: "ALV Adventure Pro",
    price: 1750000,
    series: "Adventure Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm adventure dengan peak visor dan teknologi dual sport untuk segala medan.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1450g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure comfort"
    },
    stock: 6,
    rating: 4.8,
    reviews: 31
  },
  {
    id: "alv-classic-01",
    name: "ALV Classic Heritage",
    price: 950000,
    series: "Classic Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm heritage dengan desain klasik yang elegan dan kenyamanan modern.",
    specifications: {
      certification: ["SNI"],
      weight: "1180g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Heritage comfort"
    },
    stock: 21,
    rating: 4.4,
    reviews: 96
  },
  {
    id: "alv-racing-01",
    name: "ALV Racing Elite",
    price: 1950000,
    series: "Racing Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm racing elite dengan sertifikasi internasional dan performa track-ready.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1280g ± 50g",
      material: "Full Carbon Fiber",
      visorMaterial: "PC Racing grade",
      innerVisor: "Racing smoke",
      padding: "Racing memory foam"
    },
    stock: 4,
    rating: 4.9,
    reviews: 22
  },
  {
    id: "alv-street-01",
    name: "ALV Street Rider",
    price: 1250000,
    series: "Street Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm street dengan desain modern dan performa handal untuk riding harian.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1300g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Street comfort"
    },
    stock: 16,
    rating: 4.5,
    reviews: 83
  },
  {
    id: "alv-modular-01",
    name: "ALV Modular Flex",
    price: 1550000,
    series: "Modular Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm modular dengan sistem flip-up yang fleksibel dan aman.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1520g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Modular memory foam"
    },
    stock: 8,
    rating: 4.6,
    reviews: 47
  },
  {
    id: "alv-retro-01",
    name: "ALV Retro Style",
    price: 850000,
    series: "Retro Series",
    category: "helmet",
    brand: "ALV",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm retro dengan gaya vintage yang autentik dan kenyamanan modern.",
    specifications: {
      certification: ["SNI"],
      weight: "1120g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Retro comfort"
    },
    stock: 25,
    rating: 4.3,
    reviews: 104
  },

  // JS Brand - 10 products
  {
    id: "js-thunder-01",
    name: "JS Thunder Sport",
    price: 1550000,
    series: "Thunder Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm sport dengan teknologi advanced aerodynamics dan desain agresif untuk riding enthusiast.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1380g ± 50g",
      material: "Fiberglass Composite",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Moisture-wicking fabric"
    },
    stock: 11,
    rating: 4.6,
    reviews: 68
  },
  {
    id: "js-cruiser-01",
    name: "JS Cruiser Retro",
    price: 1050000,
    series: "Cruiser Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm retro dengan sentuhan modern dan gaya klasik yang timeless untuk penggemar motor vintage.",
    specifications: {
      certification: ["SNI"],
      weight: "1150g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Vintage-style padding"
    },
    stock: 19,
    rating: 4.4,
    reviews: 91
  },
  {
    id: "js-racing-01",
    name: "JS Racing Pro",
    price: 1750000,
    series: "Racing Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm racing profesional dengan sertifikasi internasional dan performa track-ready.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1290g ± 50g",
      material: "Carbon Fiber",
      visorMaterial: "PC Racing grade",
      innerVisor: "Racing smoke",
      padding: "Racing memory foam"
    },
    stock: 7,
    rating: 4.8,
    reviews: 43
  },
  {
    id: "js-urban-01",
    name: "JS Urban Style",
    price: 950000,
    series: "Urban Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm urban dengan desain stylish dan fungsional untuk penggunaan dalam kota.",
    specifications: {
      certification: ["SNI"],
      weight: "1080g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Urban comfort"
    },
    stock: 23,
    rating: 4.3,
    reviews: 107
  },
  {
    id: "js-adventure-01",
    name: "JS Adventure Explorer",
    price: 1450000,
    series: "Adventure Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm adventure dengan peak visor dan teknologi dual sport untuk eksplorasi medan berat.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1430g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure padding"
    },
    stock: 9,
    rating: 4.7,
    reviews: 52
  },
  {
    id: "js-touring-01",
    name: "JS Touring Comfort",
    price: 1250000,
    series: "Touring Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm touring dengan kenyamanan maksimal untuk perjalanan jarak jauh.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1360g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Touring comfort"
    },
    stock: 15,
    rating: 4.5,
    reviews: 76
  },
  {
    id: "js-sport-01",
    name: "JS Sport Dynamics",
    price: 1350000,
    series: "Sport Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm sport dengan teknologi dinamis dan desain aerodinamis untuk performa tinggi.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1310g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke tinted",
      padding: "Sport memory foam"
    },
    stock: 13,
    rating: 4.6,
    reviews: 64
  },
  {
    id: "js-modular-01",
    name: "JS Modular Pro",
    price: 1650000,
    series: "Modular Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm modular dengan sistem flip-up yang mudah dan aman untuk berbagai situasi riding.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1590g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Modular comfort"
    },
    stock: 6,
    rating: 4.7,
    reviews: 38
  },
  {
    id: "js-classic-01",
    name: "JS Classic Heritage",
    price: 850000,
    series: "Classic Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm heritage dengan desain klasik yang elegan dan kenyamanan modern.",
    specifications: {
      certification: ["SNI"],
      weight: "1160g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Heritage comfort"
    },
    stock: 27,
    rating: 4.2,
    reviews: 118
  },
  {
    id: "js-premium-01",
    name: "JS Premium Elite",
    price: 1850000,
    series: "Premium Series",
    category: "helmet",
    brand: "JS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm premium dengan teknologi terdepan dan material berkualitas tinggi untuk performa maksimal.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1270g ± 50g",
      material: "Carbon Kevlar",
      visorMaterial: "PC Premium anti-fog",
      innerVisor: "Photochromic",
      padding: "Premium memory foam"
    },
    stock: 4,
    rating: 4.8,
    reviews: 26
  },

  // NIELS Brand - 10 products
  {
    id: "niels-phantom-01",
    name: "NIELS Phantom Elite",
    price: 1850000,
    series: "Phantom Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm elite dengan teknologi phantom coating dan desain futuristik dengan fitur-fitur canggih.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1320g ± 50g",
      material: "Carbon Kevlar Hybrid",
      visorMaterial: "PC Anti-fog with coating",
      innerVisor: "Photochromic auto-tint",
      padding: "Premium antibacterial padding"
    },
    stock: 5,
    rating: 4.8,
    reviews: 32
  },
  {
    id: "niels-ghost-01",
    name: "NIELS Ghost Matte",
    price: 1250000,
    series: "Ghost Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm dengan finishing matte yang elegan dan desain minimalis dengan performa yang tidak kompromis.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1280g ± 50g",
      material: "ABS + PC Shell",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Comfort memory foam"
    },
    stock: 12,
    rating: 4.6,
    reviews: 78
  },
  {
    id: "niels-racing-01",
    name: "NIELS Racing Pro",
    price: 1950000,
    series: "Racing Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm racing profesional dengan teknologi terdepan dan sertifikasi internasional.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1260g ± 50g",
      material: "Full Carbon Fiber",
      visorMaterial: "PC Racing grade",
      innerVisor: "Racing smoke",
      padding: "Racing memory foam"
    },
    stock: 3,
    rating: 4.9,
    reviews: 19
  },
  {
    id: "niels-urban-01",
    name: "NIELS Urban Jet",
    price: 1050000,
    series: "Urban Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm jet dengan desain urban yang stylish dan ringan untuk penggunaan dalam kota.",
    specifications: {
      certification: ["SNI"],
      weight: "980g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Urban comfort"
    },
    stock: 20,
    rating: 4.4,
    reviews: 95
  },
  {
    id: "niels-sport-01",
    name: "NIELS Sport Master",
    price: 1450000,
    series: "Sport Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm sport dengan performa tinggi dan desain aerodinamis untuk riding enthusiast.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1340g ± 50g",
      material: "Fiberglass Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Sport memory foam"
    },
    stock: 10,
    rating: 4.7,
    reviews: 61
  },
  {
    id: "niels-touring-01",
    name: "NIELS Touring Comfort",
    price: 1350000,
    series: "Touring Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm touring dengan kenyamanan superior untuk perjalanan jarak jauh.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1370g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Touring memory foam"
    },
    stock: 14,
    rating: 4.5,
    reviews: 73
  },
  {
    id: "niels-adventure-01",
    name: "NIELS Adventure Pro",
    price: 1650000,
    series: "Adventure Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm adventure dengan peak visor dan teknologi dual sport untuk segala medan.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1460g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure comfort"
    },
    stock: 7,
    rating: 4.7,
    reviews: 44
  },
  {
    id: "niels-classic-01",
    name: "NIELS Classic Heritage",
    price: 950000,
    series: "Classic Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm heritage dengan desain klasik yang elegan dan kenyamanan modern.",
    specifications: {
      certification: ["SNI"],
      weight: "1170g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Heritage comfort"
    },
    stock: 22,
    rating: 4.3,
    reviews: 102
  },
  {
    id: "niels-modular-01",
    name: "NIELS Modular Flex",
    price: 1550000,
    series: "Modular Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm modular dengan sistem flip-up yang fleksibel dan aman untuk berbagai situasi.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1530g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Modular memory foam"
    },
    stock: 8,
    rating: 4.6,
    reviews: 49
  },
  {
    id: "niels-street-01",
    name: "NIELS Street Rider",
    price: 1150000,
    series: "Street Series",
    category: "helmet",
    brand: "NIELS",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm street dengan desain modern dan performa handal untuk riding harian.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1290g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Street comfort"
    },
    stock: 17,
    rating: 4.5,
    reviews: 86
  },

  // VRC Brand - 10 products
  {
    id: "vrc-velocity-01",
    name: "VRC Velocity Pro",
    price: 1750000,
    series: "Velocity Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm profesional dengan teknologi velocity dynamics yang dirancang untuk kecepatan tinggi dengan stabilitas maksimal.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1350g ± 50g",
      material: "Carbon Fiber Composite",
      visorMaterial: "PC Anti-fog premium",
      innerVisor: "Gradient smoke",
      padding: "Racing-grade memory foam"
    },
    stock: 8,
    rating: 4.7,
    reviews: 56
  },
  {
    id: "vrc-classic-01",
    name: "VRC Classic Heritage",
    price: 1150000,
    series: "Classic Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm heritage dengan desain klasik yang timeless dan menggabungkan tradisi dengan teknologi modern.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1200g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Heritage-style padding"
    },
    stock: 18,
    rating: 4.4,
    reviews: 89
  },
  {
    id: "vrc-racing-01",
    name: "VRC Racing Elite",
    price: 2050000,
    series: "Racing Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm racing elite dengan sertifikasi internasional dan performa track-ready untuk kompetisi profesional.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1270g ± 50g",
      material: "Full Carbon Fiber",
      visorMaterial: "PC Racing grade",
      innerVisor: "Racing smoke",
      padding: "Racing memory foam"
    },
    stock: 4,
    rating: 4.9,
    reviews: 24
  },
  {
    id: "vrc-urban-01",
    name: "VRC Urban Style",
    price: 950000,
    series: "Urban Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm urban dengan desain stylish dan fungsional untuk penggunaan dalam kota.",
    specifications: {
      certification: ["SNI"],
      weight: "1090g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Urban comfort"
    },
    stock: 24,
    rating: 4.3,
    reviews: 114
  },
  {
    id: "vrc-sport-01",
    name: "VRC Sport Master",
    price: 1450000,
    series: "Sport Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm sport dengan performa tinggi dan desain aerodinamis untuk riding enthusiast.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1330g ± 50g",
      material: "Fiberglass Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Sport memory foam"
    },
    stock: 11,
    rating: 4.6,
    reviews: 67
  },
  {
    id: "vrc-touring-01",
    name: "VRC Touring Comfort",
    price: 1350000,
    series: "Touring Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm touring dengan kenyamanan superior untuk perjalanan jarak jauh.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1380g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Touring memory foam"
    },
    stock: 15,
    rating: 4.5,
    reviews: 81
  },
  {
    id: "vrc-adventure-01",
    name: "VRC Adventure Pro",
    price: 1650000,
    series: "Adventure Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm adventure dengan peak visor dan teknologi dual sport untuk segala medan.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1470g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure comfort"
    },
    stock: 6,
    rating: 4.7,
    reviews: 39
  },
  {
    id: "vrc-modular-01",
    name: "VRC Modular Pro",
    price: 1550000,
    series: "Modular Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm modular dengan sistem flip-up yang mudah dan aman untuk berbagai situasi riding.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1540g ± 50g",
      material: "ABS + PC",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Modular comfort"
    },
    stock: 9,
    rating: 4.6,
    reviews: 52
  },
  {
    id: "vrc-street-01",
    name: "VRC Street Fighter",
    price: 1250000,
    series: "Street Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm street dengan desain agresif dan performa tinggi untuk riding harian.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1300g ± 50g",
      material: "Fiberglass",
      visorMaterial: "PC Anti-scratch",
      innerVisor: "Smoke retractable",
      padding: "Street comfort"
    },
    stock: 16,
    rating: 4.5,
    reviews: 74
  },
  {
    id: "vrc-premium-01",
    name: "VRC Premium Elite",
    price: 1950000,
    series: "Premium Series",
    category: "helmet",
    brand: "VRC",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm premium dengan teknologi terdepan dan material berkualitas tinggi untuk performa maksimal.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1280g ± 50g",
      material: "Carbon Kevlar",
      visorMaterial: "PC Premium anti-fog",
      innerVisor: "Photochromic",
      padding: "Premium memory foam"
    },
    stock: 5,
    rating: 4.8,
    reviews: 29
  },

  // RSV Brand - 10 products
  {
    id: "rsv-ff500-01",
    name: "RSV FF500 Super Sport",
    price: 1950000,
    series: "FF500 Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop"
    ],
    description: "Helm super sport dengan teknologi terdepan. Dirancang khusus untuk performa racing dengan keamanan maksimal dan desain aerodinamis yang superior.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1280g ± 50g",
      material: "Carbon Fiber + Kevlar",
      visorMaterial: "PC Anti-fog with UV protection",
      innerVisor: "Photochromic transition",
      padding: "Racing memory foam"
    },
    completeness: [
      "1x Helm RSV FF500",
      "1x Clear visor with UV protection",
      "1x Photochromic visor",
      "1x Pinlock insert",
      "1x Racing helmet bag",
      "1x Breath guard",
      "1x Manual book",
      "1x Kartu garansi",
      "1x Certificate of authenticity"
    ],
    sizes: [
      { size: "S", measurement: "55-56 cm" },
      { size: "M", measurement: "57-58 cm" },
      { size: "L", measurement: "59-60 cm" },
      { size: "XL", measurement: "61-62 cm" }
    ],
    stock: 6,
    rating: 4.9,
    reviews: 31
  },
  {
    id: "rsv-moto3-01",
    name: "RSV MOTO3 Championship",
    price: 2150000,
    series: "MOTO3 Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm championship edition dengan teknologi MotoGP. Digunakan oleh pembalap profesional dengan standar keamanan tertinggi.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1200g ± 50g",
      material: "Full Carbon Fiber",
      visorMaterial: "PC Anti-fog racing grade",
      innerVisor: "Racing smoke",
      padding: "Championship grade padding"
    },
    stock: 3,
    rating: 4.9,
    reviews: 18
  },
  {
    id: "rsv-street-01",
    name: "RSV Street Fighter",
    price: 1450000,
    series: "Street Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm street dengan desain agresif dan performa tinggi. Cocok untuk penggunaan harian dengan gaya sporty yang menawan.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1350g ± 50g",
      material: "Fiberglass + Carbon",
      visorMaterial: "PC Anti-scratch premium",
      innerVisor: "Smoke retractable",
      padding: "Street comfort padding"
    },
    stock: 12,
    rating: 4.7,
    reviews: 68
  },
  {
    id: "rsv-touring-01",
    name: "RSV Touring Master",
    price: 1650000,
    series: "Touring Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm touring dengan kenyamanan premium untuk perjalanan jarak jauh dan adventure riding.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1400g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Touring memory foam"
    },
    stock: 9,
    rating: 4.6,
    reviews: 54
  },
  {
    id: "rsv-urban-01",
    name: "RSV Urban Jet",
    price: 1150000,
    series: "Urban Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm jet dengan desain urban yang stylish dan ringan untuk penggunaan dalam kota.",
    specifications: {
      certification: ["SNI"],
      weight: "1000g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Urban comfort"
    },
    stock: 21,
    rating: 4.4,
    reviews: 97
  },
  {
    id: "rsv-racing-01",
    name: "RSV Racing Pro",
    price: 2250000,
    series: "Racing Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Helm racing profesional dengan teknologi terdepan dan sertifikasi internasional untuk kompetisi tingkat tinggi.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05", "SHARP 5★"],
      weight: "1250g ± 50g",
      material: "Full Carbon Fiber",
      visorMaterial: "PC Racing grade",
      innerVisor: "Racing smoke",
      padding: "Racing memory foam"
    },
    stock: 2,
    rating: 4.9,
    reviews: 12
  },
  {
    id: "rsv-adventure-01",
    name: "RSV Adventure Explorer",
    price: 1750000,
    series: "Adventure Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    description: "Helm adventure dengan peak visor dan teknologi dual sport untuk eksplorasi medan berat.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1480g ± 50g",
      material: "ABS + Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Clear retractable",
      padding: "Adventure comfort"
    },
    stock: 7,
    rating: 4.7,
    reviews: 43
  },
  {
    id: "rsv-modular-01",
    name: "RSV Modular Pro",
    price: 1850000,
    series: "Modular Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    description: "Helm modular dengan sistem flip-up premium dan teknologi canggih untuk fleksibilitas maksimal.",
    specifications: {
      certification: ["SNI", "DOT", "ECE R22.05"],
      weight: "1550g ± 50g",
      material: "Carbon + PC",
      visorMaterial: "PC Anti-fog premium",
      innerVisor: "Smoke retractable",
      padding: "Modular memory foam"
    },
    stock: 5,
    rating: 4.8,
    reviews: 36
  },
  {
    id: "rsv-classic-01",
    name: "RSV Classic Heritage",
    price: 1250000,
    series: "Classic Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    description: "Helm heritage dengan desain klasik yang elegan dan kenyamanan modern untuk gaya vintage.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1220g ± 50g",
      material: "ABS Shell",
      visorMaterial: "PC Clear",
      innerVisor: "None",
      padding: "Heritage comfort"
    },
    stock: 16,
    rating: 4.5,
    reviews: 82
  },
  {
    id: "rsv-sport-01",
    name: "RSV Sport Dynamics",
    price: 1550000,
    series: "Sport Series",
    category: "helmet",
    brand: "RSV",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Helm sport dengan teknologi dinamis dan desain aerodinamis untuk performa tinggi di jalan raya.",
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1320g ± 50g",
      material: "Fiberglass Carbon",
      visorMaterial: "PC Anti-fog",
      innerVisor: "Smoke retractable",
      padding: "Sport memory foam"
    },
    stock: 10,
    rating: 4.6,
    reviews: 59
  }
];

// Helper functions untuk filtering dan pagination
export const getHelmetsByBrand = (brand: string): Product[] => {
  return helmetsData.filter(helmet => helmet.brand === brand);
};

export const getHelmetsBySeries = (series: string): Product[] => {
  return helmetsData.filter(helmet => helmet.series === series);
};

export const getHelmetsByCategory = (category: string): Product[] => {
  return helmetsData.filter(helmet => helmet.category === category);
};

export const getHelmetsByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
  return helmetsData.filter(helmet => helmet.price >= minPrice && helmet.price <= maxPrice);
};

export const getAllBrands = (): string[] => {
  return Array.from(new Set(helmetsData.map(helmet => helmet.brand)));
};

export const getAllSeries = (): string[] => {
  return Array.from(new Set(helmetsData.map(helmet => helmet.series)));
};

export const searchHelmets = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return helmetsData.filter(helmet => 
    helmet.name.toLowerCase().includes(searchTerm) ||
    helmet.brand.toLowerCase().includes(searchTerm) ||
    helmet.series.toLowerCase().includes(searchTerm) ||
    helmet.description?.toLowerCase().includes(searchTerm)
  );
};

export const paginateProducts = (products: Product[], page: number, itemsPerPage: number = 12) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    totalPages: Math.ceil(products.length / itemsPerPage),
    currentPage: page,
    totalProducts: products.length,
    hasNextPage: endIndex < products.length,
    hasPrevPage: page > 1
  };
};

