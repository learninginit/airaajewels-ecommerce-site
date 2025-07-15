"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  isAuthenticated: boolean
}

export interface CartItem {
  id: string
  name: string
  mrp: number
  price: number
  image: string
  quantity: number
  type: "buy" | "rent"
  rentDays?: number
  rentPrice?: number
  securityDeposit?: number
}

export interface WishlistItem {
  id: string
  name: string
  mrp: number
  price: number
  rentPrice: number
  securityDeposit: number
  image: string
  category: string
  isRentable: boolean
  inStock: boolean
  rating: number
  reviews: number
}

export interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: CartItem[]
  shippingAddress: string
  trackingNumber?: string
  couponCode?: string
  discount?: number
}

export interface Rental {
  id: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "overdue" | "cancelled"
  totalAmount: number
  securityDeposit: number
  item: {
    id: string
    name: string
    image: string
    dailyRate: number
  }
  daysRented: number
  daysRemaining?: number
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

export interface AdminSettings {
  codEnabled: boolean
  freeShippingThreshold: number
  taxRate: number
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
interface AuthStore {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (userData: any) => Promise<boolean>
  signOut: () => void
  updateProfile: (userData: Partial<User>) => void
  requireAuth: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock authentication - in production, validate against your backend
        if (email && password) {
          const user: User = {
            id: "1",
            email,
            firstName: "Priya",
            lastName: "Sharma",
            phone: "+91 98765 43210",
            isAuthenticated: true,
          }
          set({ user, isLoading: false })
          return true
        }

        set({ isLoading: false })
        return false
      },

      signUp: async (userData: any) => {
        set({ isLoading: true })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user: User = {
          id: Date.now().toString(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          isAuthenticated: true,
        }

        set({ user, isLoading: false })
        return true
      },

      signOut: () => {
        set({ user: null })
      },

      updateProfile: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      },

      requireAuth: () => {
        return get().user?.isAuthenticated || false
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

// Cart Store
interface CartStore {
  items: CartItem[]
  appliedCoupon: Coupon | null
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getShipping: () => number
  getTax: () => number
  getDiscount: () => number
  getTotal: () => number
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  getBuyItems: () => CartItem[]
  getRentItems: () => CartItem[]
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,

      addItem: (newItem) => {
        const items = get().items
        const itemKey = `${newItem.id}-${newItem.type}`
        const existingItem = items.find((item) => `${item.id}-${item.type}` === itemKey)

        if (existingItem) {
          set({
            items: items.map((item) =>
              `${item.id}-${item.type}` === itemKey ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          })
        }
      },

      removeItem: (itemKey) => {
        set({
          items: get().items.filter((item) => `${item.id}-${item.type}` !== itemKey),
        })
      },

      updateQuantity: (itemKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemKey)
          return
        }

        set({
          items: get().items.map((item) => (`${item.id}-${item.type}` === itemKey ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const itemPrice =
            item.type === "rent"
              ? (item.rentPrice || 0) * (item.rentDays || 1) + (item.securityDeposit || 0)
              : item.price
          return total + itemPrice * item.quantity
        }, 0)
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        const settings = useAdminStore.getState().settings
        return subtotal >= settings.freeShippingThreshold ? 0 : 99
      },

      getTax: () => {
        const subtotal = get().getSubtotal()
        const settings = useAdminStore.getState().settings
        return subtotal * (settings.taxRate / 100)
      },

      getDiscount: () => {
        const coupon = get().appliedCoupon
        if (!coupon) return 0

        const subtotal = get().getSubtotal()
        if (subtotal < coupon.minOrderAmount) return 0

        let discount = 0
        if (coupon.type === "percentage") {
          discount = subtotal * (coupon.value / 100)
          if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount)
          }
        } else {
          discount = coupon.value
        }

        return Math.min(discount, subtotal)
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const shipping = get().getShipping()
        const tax = get().getTax()
        const discount = get().getDiscount()
        return subtotal + shipping + tax - discount
      },

      applyCoupon: (coupon) => {
        set({ appliedCoupon: coupon })
      },

      removeCoupon: () => {
        set({ appliedCoupon: null })
      },

      getBuyItems: () => {
        return get().items.filter((item) => item.type === "buy")
      },

      getRentItems: () => {
        return get().items.filter((item) => item.type === "rent")
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

// Wishlist Store
interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  getTotalItems: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        if (!items.find((existingItem) => existingItem.id === item.id)) {
          set({ items: [...items, item] })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },

      getTotalItems: () => {
        return get().items.length
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)

// Orders Store
interface OrdersStore {
  orders: Order[]
  rentals: Rental[]
  addOrder: (order: Order) => void
  addRental: (rental: Rental) => void
  updateOrderStatus: (id: string, status: Order["status"]) => void
  updateRentalStatus: (id: string, status: Rental["status"]) => void
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: "ORD-2024-001",
          date: "2024-01-15",
          status: "delivered",
          total: 25000,
          items: [
            {
              id: "AJ001",
              name: "Diamond Elegance Necklace",
              image: "/placeholder.svg?height=100&width=100",
              mrp: 30000,
              price: 25000,
              quantity: 1,
              type: "buy",
            },
          ],
          shippingAddress: "123 Main St, Mumbai, Maharashtra 400001",
          trackingNumber: "TRK123456789",
        },
      ],

      rentals: [
        {
          id: "RNT-2024-001",
          startDate: "2024-01-10",
          endDate: "2024-01-17",
          status: "active",
          totalAmount: 17500,
          securityDeposit: 5000,
          item: {
            id: "AJ001",
            name: "Diamond Elegance Necklace",
            image: "/placeholder.svg?height=100&width=100",
            dailyRate: 2500,
          },
          daysRented: 7,
          daysRemaining: 3,
        },
      ],

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] })
      },

      addRental: (rental) => {
        set({ rentals: [rental, ...get().rentals] })
      },

      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map((order) => (order.id === id ? { ...order, status } : order)),
        })
      },

      updateRentalStatus: (id, status) => {
        set({
          rentals: get().rentals.map((rental) => (rental.id === id ? { ...rental, status } : rental)),
        })
      },
    }),
    {
      name: "orders-storage",
    },
  ),
)

// Admin Store
interface AdminStore {
  settings: AdminSettings
  coupons: Coupon[]
  updateSettings: (settings: Partial<AdminSettings>) => void
  addCoupon: (coupon: Coupon) => void
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void
  deleteCoupon: (id: string) => void
  validateCoupon: (code: string) => Coupon | null
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      settings: {
        codEnabled: true,
        freeShippingThreshold: 1999,
        taxRate: 18,
      },

      coupons: [
        {
          id: "1",
          code: "WELCOME10",
          type: "percentage",
          value: 10,
          minOrderAmount: 2000,
          maxDiscount: 1000,
          validFrom: "2024-01-01",
          validTo: "2024-12-31",
          isActive: true,
          usageLimit: 1000,
          usedCount: 45,
        },
        {
          id: "2",
          code: "FLAT500",
          type: "fixed",
          value: 500,
          minOrderAmount: 5000,
          validFrom: "2024-01-01",
          validTo: "2024-06-30",
          isActive: true,
          usageLimit: 500,
          usedCount: 123,
        },
      ],

      updateSettings: (newSettings) => {
        set({
          settings: { ...get().settings, ...newSettings },
        })
      },

      addCoupon: (coupon) => {
        set({
          coupons: [...get().coupons, coupon],
        })
      },

      updateCoupon: (id, updatedCoupon) => {
        set({
          coupons: get().coupons.map((coupon) => (coupon.id === id ? { ...coupon, ...updatedCoupon } : coupon)),
        })
      },

      deleteCoupon: (id) => {
        set({
          coupons: get().coupons.filter((coupon) => coupon.id !== id),
        })
      },

      validateCoupon: (code) => {
        const coupon = get().coupons.find((c) => c.code.toLowerCase() === code.toLowerCase())

        if (!coupon || !coupon.isActive) return null

        const now = new Date()
        const validFrom = new Date(coupon.validFrom)
        const validTo = new Date(coupon.validTo)

        if (now < validFrom || now > validTo) return null

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return null

        return coupon
      },
    }),
    {
      name: "admin-storage",
    },
  ),
)
