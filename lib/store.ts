"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// Types
export interface Product {
  id: string
  name: string
  category: string
  mrp: number
  price: number
  rentPrice: number
  securityDeposit: number
  isRentable: boolean
  inStock: boolean
  quantity: number
  image: string
  description: string
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minOrderAmount: number
  maxDiscount?: number
  validFrom: string
  validTo: string
  isActive: boolean
  usageLimit?: number
  usedCount: number
}

interface AdminSettings {
  codEnabled: boolean
  freeShippingThreshold: number
  taxRate: number
}

interface AdminState {
  products: Product[]
  coupons: Coupon[]
  settings: AdminSettings
  addProduct: (product: Product) => void
  updateProduct: (productId: string, updatedFields: Partial<Product>) => void
  deleteProduct: (productId: string) => void
  addCoupon: (coupon: Coupon) => void
  updateCoupon: (couponId: string, updatedFields: Partial<Coupon>) => void
  deleteCoupon: (couponId: string) => void
  updateSettings: (newSettings: Partial<AdminSettings>) => void
}

export interface Address {
  id: string
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password?: string // Added for internal store management of credentials
  addresses: Address[] // User-specific addresses
}

export interface AuthState {
  user: User | null
  _users: User[] // Internal storage for registered users
  isLoading: boolean // Added for loading state
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (
    userData: Omit<User, "id" | "addresses"> & { password: string; subscribeNewsletter: boolean },
  ) => Promise<boolean>
  signOut: () => void
  updateProfile: (profile: Partial<User>) => void
  updateUserAddresses: (userId: string, addresses: Address[]) => void // New function to update user addresses
}

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  type: "buy" | "rent" // 'buy' for purchase, 'rent' for rental
  rentDays?: number // For rental items
  rentPrice?: number // Added for rental items
}

interface CartState {
  items: CartItem[]
  addCartItem: (item: CartItem) => void
  removeCartItem: (id: string, type: "buy" | "rent") => void
  updateCartItemQuantity: (id: string, type: "buy" | "rent", quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number
}

interface WishlistItem {
  id: string
  name: string
  image: string
  price: number
}

interface WishlistState {
  items: WishlistItem[]
  addWishlistItem: (item: WishlistItem) => void
  removeWishlistItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  getWishlistItemCount: () => number
}

interface OrderItem {
  id: string
  name: string
  image?: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  userId: string // Link order to user
  date: string
  total: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  shippingAddress: string
  trackingNumber?: string
}

export interface Rental {
  id: string
  userId: string // Link rental to user
  date: string
  total: number
  status: "rented" | "returned" | "overdue"
  items: OrderItem[]
  rentalPeriod: string
}

export interface OrdersState {
  orders: Order[]
  rentals: Rental[]
  addOrder: (order: Order) => void
  addRental: (rental: Rental) => void
  updateOrderStatus: (orderId: string, newStatus: Order["status"], trackingNumber?: string) => void
}

// Indian States
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

// Auth Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null, // No default user
      _users: [
        // Demo user for testing
        {
          id: "demo-user-1",
          firstName: "Demo",
          lastName: "User",
          email: "demo@airaajewels.com",
          phone: "1234567890",
          password: "demo123",
          addresses: [], // Demo user starts with no addresses
        },
      ],
      isLoading: false,
      signIn: async (email, password) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
        const foundUser = get()._users.find((u) => u.email === email && u.password === password)
        if (foundUser) {
          set({ user: foundUser, isLoading: false })
          return true
        }
        set({ isLoading: false })
        return false
      },
      signUp: async (userData) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
        const existingUser = get()._users.find((u) => u.email === userData.email)
        if (existingUser) {
          set({ isLoading: false })
          return false // User already exists
        }
        const newUser: User = {
          id: `user-${Date.now()}`, // Simple unique ID
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          addresses: [], // New users start with no addresses
        }
        set((state) => ({
          _users: [...state._users, newUser],
          user: newUser, // Log in the new user immediately
          isLoading: false,
        }))
        return true
      },
      signOut: () => set({ user: null }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
          _users: state._users.map((u) => (u.id === state.user?.id ? { ...u, ...profile } : u)),
        })),
      updateUserAddresses: (userId, addresses) =>
        set((state) => ({
          _users: state._users.map((u) => (u.id === userId ? { ...u, addresses } : u)),
          user: state.user?.id === userId ? { ...state.user, addresses } : state.user, // Update current user if it's them
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, _users: state._users }), // Persist _users as well
    },
  ),
)

// Cart Store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addCartItem: (newItem) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id && item.type === newItem.type,
          )

          if (existingItemIndex > -1) {
            // If item exists and is of the same type, update quantity
            const updatedItems = state.items.map((item, index) =>
              index === existingItemIndex ? { ...item, quantity: item.quantity + newItem.quantity } : item,
            )
            return { items: updatedItems }
          } else {
            // Add new item
            return { items: [...state.items, newItem] }
          }
        }),
      removeCartItem: (id, type) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.type === type)),
        })),
      updateCartItemQuantity: (id, type, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id && item.type === type ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      getCartTotal: () =>
        get().items.reduce((total, item) => {
          if (item.type === "buy") {
            return total + item.price * item.quantity
          } else if (item.type === "rent" && item.rentDays) {
            return total + (item.rentPrice || item.price) * item.rentDays * item.quantity // Corrected rental total calculation
          }
          return total
        }, 0),
      getCartItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// Wishlist Store
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addWishlistItem: (newItem) =>
        set((state) => {
          if (state.items.some((item) => item.id === newItem.id)) {
            return state // Item already in wishlist
          }
          return { items: [...state.items, newItem] }
        }),
      removeWishlistItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      isInWishlist: (id: string) => get().items.some((item) => item.id === id),
      getWishlistItemCount: () => get().items.length,
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// Orders Store
export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [], // Initialize with empty orders
      rentals: [], // Initialize with empty rentals
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders], // Add new order to the beginning
        })),
      addRental: (rental) => set((state) => ({ rentals: [...state.rentals, rental] })),
      updateOrderStatus: (orderId, status, trackingNumber) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status, trackingNumber: trackingNumber || order.trackingNumber } : order,
          ),
        })),
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// Admin Store
export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: "AJ001",
          name: "Diamond Elegance Necklace",
          price: 25000,
          image: "/placeholder.svg?height=200&width=200",
          category: "Necklaces",
          mrp: 30000,
          rentPrice: 0,
          securityDeposit: 0,
          isRentable: false,
          inStock: true,
          quantity: 5,
          description: "Exquisite diamond necklace crafted with precision and elegance.",
        },
        {
          id: "AJ002",
          name: "Golden Bracelet Set",
          price: 6500,
          image: "/placeholder.svg?height=200&width=200",
          category: "Bracelets",
          mrp: 8000,
          rentPrice: 500, // per day
          securityDeposit: 1000,
          isRentable: true,
          inStock: true,
          quantity: 8,
          description: "Beautiful golden bracelet set for everyday elegance.",
        },
        {
          id: "AJ003",
          name: "Royal Ruby Earrings",
          price: 12000,
          image: "/placeholder.svg?height=200&width=200",
          category: "Earrings",
          mrp: 15000,
          rentPrice: 0,
          securityDeposit: 0,
          isRentable: false,
          inStock: true,
          quantity: 12,
          description: "Stunning ruby earrings perfect for special occasions.",
        },
        {
          id: "AJ004",
          name: "Emerald Grand Ring",
          price: 18000,
          image: "/placeholder.svg?height=200&width=200",
          category: "Rings",
          mrp: 22000,
          rentPrice: 800, // per day
          securityDeposit: 2000,
          isRentable: true,
          inStock: true,
          quantity: 3,
          description: "Elegant emerald rings in various designs.",
        },
      ],
      coupons: [
        {
          id: "CUP001",
          code: "WELCOME10",
          type: "percentage",
          value: 10,
          minOrderAmount: 500,
          maxDiscount: 200,
          validFrom: "2023-01-01",
          validTo: "2024-12-31",
          isActive: true,
          usageLimit: 100,
          usedCount: 15,
        },
        {
          id: "CUP002",
          code: "FLAT500",
          type: "fixed",
          value: 500,
          minOrderAmount: 2000,
          validFrom: "2023-03-01",
          validTo: "2024-06-30",
          isActive: true,
          usageLimit: undefined,
          usedCount: 5,
        },
      ],
      settings: {
        codEnabled: true,
        freeShippingThreshold: 5000,
        taxRate: 18, // Example GST rate
      },
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (productId, updatedFields) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId ? { ...product, ...updatedFields } : product,
          ),
        })),
      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        })),
      addCoupon: (coupon) => set((state) => ({ coupons: [...state.coupons, coupon] })),
      updateCoupon: (couponId, updatedFields) =>
        set((state) => ({
          coupons: state.coupons.map((coupon) => (coupon.id === couponId ? { ...coupon, ...updatedFields } : coupon)),
        })),
      deleteCoupon: (couponId) =>
        set((state) => ({
          coupons: state.coupons.filter((coupon) => coupon.id !== couponId),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
