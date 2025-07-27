import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Interface untuk cart item
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Menambahkan item ke keranjang
      addItem: (product) => {
        const { items } = get()
        const existingItemIndex = items.findIndex(
          item => item.id === product.id && item.size === product.size
        )
        
        if (existingItemIndex >= 0) {
          // Jika item sudah ada, update quantity
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += product.quantity || 1
          set({ items: updatedItems })
        } else {
          // Jika item baru, tambahkan ke array
          const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand || 'Hideki',
            size: product.size || 'M',
            color: product.color || '',
            quantity: product.quantity || 1
          }
          set({ items: [...items, newItem] })
        }
      },
      
      // Menghapus item dari keranjang
      removeItem: (itemId) => {
        const { items } = get()
        set({ items: items.filter(item => item.id !== itemId) })
      },
      
      // Update quantity item
      updateQuantity: (itemId, quantity) => {
        const { items } = get()
        if (quantity <= 0) {
          // Jika quantity 0 atau kurang, hapus item
          set({ items: items.filter(item => item.id !== itemId) })
        } else {
          const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
          set({ items: updatedItems })
        }
      },
      
      // Menghapus semua item dari keranjang
      clearCart: () => {
        set({ items: [] })
      },
      
      // Mendapatkan total quantity
      getTotalQuantity: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      
      // Mendapatkan total harga
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      // Mendapatkan item berdasarkan ID
      getItemById: (itemId) => {
        const { items } = get()
        return items.find(item => item.id === itemId)
      }
    }),
    {
      name: 'hideki-cart-storage', // nama untuk localStorage
      getStorage: () => localStorage, // menggunakan localStorage
    }
  )
)

