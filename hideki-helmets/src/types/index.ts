export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'helm' | 'accessories' | 'apparel' | 'promo';
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  specifications?: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPromo?: boolean;
}

export interface Category {
  id: string;
  name: string;
  href: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  name: string;
  href: string;
  filterKey?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  href: string;
  filterKey?: string;
}