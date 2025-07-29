import { Product } from '@/types';

export const products: Product[] = [
  // KYT Helmets
  {
    id: 'kyt-001',
    name: 'KYT Falcon',
    brand: 'KYT',
    category: 'helm',
    subcategory: 'full-face',
    price: 850000,
    originalPrice: 950000,
    discount: 11,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    ],
    description: 'Helm full face KYT Falcon dengan teknologi terdepan dan desain aerodinamis untuk kenyamanan berkendara maksimal.',
    specifications: {
      'Material': 'ABS Shell',
      'Ventilasi': '5 Intake, 4 Exhaust',
      'Berat': '1.4 kg',
      'Standar': 'SNI, DOT',
      'Visor': 'Anti-fog, UV Protection'
    },
    inStock: true,
    stockCount: 25,
    rating: 4.8,
    reviewCount: 156,
    isBestSeller: true,
  },
  {
    id: 'kyt-002',
    name: 'KYT DJ Maru',
    brand: 'KYT',
    category: 'helm',
    subcategory: 'half-face',
    price: 450000,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc4ac882d5b?w=500',
    ],
    description: 'Helm retro KYT DJ Maru dengan gaya vintage yang cocok untuk berkendara santai di kota.',
    specifications: {
      'Material': 'ABS Shell',
      'Berat': '0.9 kg',
      'Standar': 'SNI',
      'Visor': 'Detachable'
    },
    inStock: true,
    stockCount: 40,
    rating: 4.6,
    reviewCount: 89,
  },

  // AGV Helmets
  {
    id: 'agv-001',
    name: 'AGV Pista GP RR',
    brand: 'AGV',
    category: 'helm',
    subcategory: 'full-face',
    price: 8500000,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500',
    ],
    description: 'Helm racing premium AGV Pista GP RR yang digunakan oleh pembalap MotoGP profesional.',
    specifications: {
      'Material': '100% Carbon Fiber',
      'Ventilasi': '5 Intake, 4 Exhaust',
      'Berat': '1.28 kg',
      'Standar': 'ECE 22.06, FIM',
      'Visor': 'Pinlock Ready, Racing'
    },
    inStock: true,
    stockCount: 5,
    rating: 5.0,
    reviewCount: 23,
    isNew: true,
  },

  // Arai Helmets
  {
    id: 'arai-001',
    name: 'Arai RX-7V',
    brand: 'Arai',
    category: 'helm',
    subcategory: 'full-face',
    price: 7200000,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500',
    ],
    description: 'Helm premium Arai RX-7V dengan teknologi Jepang terdepan dan kualitas konstruksi terbaik.',
    specifications: {
      'Material': 'Complex Laminate Construction',
      'Ventilasi': '7 Intake, 6 Exhaust',
      'Berat': '1.45 kg',
      'Standar': 'JIS, SNELL, ECE',
      'Visor': 'VAS-V System'
    },
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 67,
    isBestSeller: true,
  },

  // Shoei Helmets
  {
    id: 'shoei-001',
    name: 'Shoei NXR2',
    brand: 'Shoei',
    category: 'helm',
    subcategory: 'full-face',
    price: 6800000,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500',
    ],
    description: 'Helm sport touring Shoei NXR2 dengan keseimbangan sempurna antara performa dan kenyamanan.',
    specifications: {
      'Material': 'AIM Shell',
      'Ventilasi': '4 Intake, 4 Exhaust',
      'Berat': '1.42 kg',
      'Standar': 'ECE 22.06, JIS',
      'Visor': 'CNS-2 Pinlock Ready'
    },
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 94,
  },

  // INK Helmets
  {
    id: 'ink-001',
    name: 'INK Centro Jet',
    brand: 'INK',
    category: 'helm',
    subcategory: 'half-face',
    price: 320000,
    originalPrice: 380000,
    discount: 16,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc4ac882d5b?w=500',
    ],
    description: 'Helm jet INK Centro dengan desain klasik dan harga terjangkau untuk penggunaan harian.',
    specifications: {
      'Material': 'ABS Shell',
      'Berat': '0.95 kg',
      'Standar': 'SNI',
      'Visor': 'Bubble Shield Optional'
    },
    inStock: true,
    stockCount: 60,
    rating: 4.3,
    reviewCount: 234,
    isPromo: true,
  },

  // Accessories
  {
    id: 'acc-001',
    name: 'Sarung Tangan Kulit Premium',
    brand: 'Hideki',
    category: 'accessories',
    subcategory: 'gloves',
    price: 150000,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc4ac882d5b?w=500',
    ],
    description: 'Sarung tangan kulit premium dengan proteksi knuckle dan palm slider untuk keamanan maksimal.',
    specifications: {
      'Material': '100% Genuine Leather',
      'Proteksi': 'Knuckle Guard, Palm Slider',
      'Ukuran': 'S, M, L, XL',
      'Warna': 'Hitam, Coklat'
    },
    inStock: true,
    stockCount: 80,
    rating: 4.5,
    reviewCount: 45,
  },

  // Apparel
  {
    id: 'app-001',
    name: 'Jaket Touring Hideki Pro',
    brand: 'Hideki',
    category: 'apparel',
    subcategory: 'jackets',
    price: 450000,
    originalPrice: 550000,
    discount: 18,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc4ac882d5b?w=500',
    ],
    description: 'Jaket touring dengan proteksi lengkap dan bahan tahan air untuk perjalanan jarak jauh.',
    specifications: {
      'Material': 'Cordura 600D',
      'Proteksi': 'CE Level 2 Armor',
      'Fitur': 'Waterproof, Breathable',
      'Ukuran': 'S, M, L, XL, XXL'
    },
    inStock: true,
    stockCount: 35,
    rating: 4.7,
    reviewCount: 78,
    isPromo: true,
  },

  // More helmet brands
  {
    id: 'nhk-001',
    name: 'NHK Gladiator',
    brand: 'NHK',
    category: 'helm',
    subcategory: 'full-face',
    price: 650000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    ],
    description: 'Helm full face NHK Gladiator dengan ventilasi optimal dan desain sporty.',
    specifications: {
      'Material': 'ABS Shell',
      'Ventilasi': '4 Intake, 3 Exhaust',
      'Berat': '1.5 kg',
      'Standar': 'SNI, DOT'
    },
    inStock: true,
    stockCount: 30,
    rating: 4.4,
    reviewCount: 112,
  },

  {
    id: 'zeus-001',
    name: 'Zeus ZS-813',
    brand: 'ZEUS',
    category: 'helm',
    subcategory: 'modular',
    price: 1200000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    ],
    description: 'Helm modular Zeus ZS-813 dengan sistem flip-up yang praktis dan aman.',
    specifications: {
      'Material': 'Thermoplastic',
      'Ventilasi': '6 Intake, 4 Exhaust',
      'Berat': '1.6 kg',
      'Standar': 'ECE, DOT',
      'Fitur': 'Flip-up System'
    },
    inStock: true,
    stockCount: 18,
    rating: 4.6,
    reviewCount: 67,
  },
];

export const featuredProducts = products.filter(p => p.isBestSeller || p.isNew);
export const promoProducts = products.filter(p => p.isPromo || p.discount);
export const helmetProducts = products.filter(p => p.category === 'helm');
export const accessoryProducts = products.filter(p => p.category === 'accessories');
export const apparelProducts = products.filter(p => p.category === 'apparel');