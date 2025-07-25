// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Untuk menyimpan keranjang di local storage

// Definisikan tipe data untuk item di keranjang
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  // Tambahkan properti lain jika perlu, misal: warna, ukuran
  color?: string;
  size?: string;
}

// Definisikan state dan action untuk store
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Buat store dengan Zustand
export const useCartStore = create<CartState>()(
  // Gunakan middleware `persist` agar keranjang tidak hilang saat halaman di-refresh
  persist(
    (set, get) => ({
      items: [],

      // Aksi untuk menambah item
      addItem: (newItem) => {
        const existingItem = get().items.find((item) => item.id === newItem.id);
        if (existingItem) {
          // Jika item sudah ada, tambah quantity-nya
          get().updateQuantity(newItem.id, existingItem.quantity + 1);
        } else {
          // Jika item baru, tambahkan ke keranjang
          set((state) => ({
            items: [...state.items, { ...newItem, quantity: 1 }],
          }));
        }
      },

      // Aksi untuk menghapus item
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      // Aksi untuk mengubah jumlah
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          // Jika quantity 0 atau kurang, hapus item
          get().removeItem(itemId);
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          }));
        }
      },

      // Aksi untuk mengosongkan keranjang (setelah checkout berhasil)})
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'shopping-cart-storage', // nama key di local storage
    }
  )
);


