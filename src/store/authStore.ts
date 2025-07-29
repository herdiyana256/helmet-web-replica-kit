import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  phone?: string
  address?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: 'user' | 'admin') => Promise<boolean>
  logout: () => void
  register: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<boolean>
}

// Mock user database - in real app, this would be handled by backend
const mockUsers = [
  {
    id: '1',
    email: 'admin@hideki.id',
    password: 'admin123',
    name: 'Admin Hideki',
    role: 'admin' as const,
    phone: '+62812345678',
    address: 'Jakarta, Indonesia'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user' as const,
    phone: '+62812345679',
    address: 'Bandung, Indonesia'
  }
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, role: 'user' | 'admin') => {
        set({ isLoading: true })
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Find user in mock database
          const foundUser = mockUsers.find(
            user => user.email === email && 
                   user.password === password && 
                   user.role === role
          )
          
          if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser
            set({ 
              user: userWithoutPassword, 
              isAuthenticated: true, 
              isLoading: false 
            })
            return true
          } else {
            set({ isLoading: false })
            return false
          }
        } catch (error) {
          set({ isLoading: false })
          return false
        }
      },

      register: async (userData) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Check if user already exists
          const existingUser = mockUsers.find(user => user.email === userData.email)
          if (existingUser) {
            set({ isLoading: false })
            return false
          }
          
          // Create new user
          const newUser = {
            id: Date.now().toString(),
            ...userData,
            role: 'user' as const,
            password: userData.password
          }
          
          // Add to mock database
          mockUsers.push(newUser)
          
          // Auto login after registration
          const { password: _, ...userWithoutPassword } = newUser
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true, 
            isLoading: false 
          })
          return true
        } catch (error) {
          set({ isLoading: false })
          return false
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)