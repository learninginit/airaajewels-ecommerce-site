"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// Types
export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  isRentable?: boolean
  rentPrice?: number
}

interface AdminSettings {
  codEnabled: boolean
  freeShippingThreshold: number
  taxRate: number
}

interface AdminState {
  products: Product[]
  coupons: { id: string; code: string; discount: number; type: "percentage" | "fixed" }[]
  shippingCost: number
  taxRate: number
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
  addCoupon: (coupon: { code: string; discount: number; type: "percentage" | "fixed" }) => void
  updateCoupon: (
    couponId: string,
    updatedCoupon: { code: string; discount: number; type: "percentage" | "fixed" },
  ) => void
  deleteCoupon: (couponId: string) => void
  setShippingCost: (cost: number) => void
  setTaxRate: (rate: number) => void
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateProfile: (profile: Partial<User>) => void
}

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  type: "buy" | "rent" // 'buy' for purchase, 'rent' for rental
  rentDays?: number // Number of days for rental items
}

interface CartState {
  items: CartItem[]
  addCartItem: (item: CartItem) => void
  removeCartItem: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number
}

interface WishlistItem extends Product {}

interface WishlistState {
  wishlist: WishlistItem[]
  addToWishlist: (product: WishlistItem) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  getWishlistItemCount: () => number
}

interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface Order {
  id: string
  date: string
  total: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  shippingAddress: string
  trackingNumber?: string
}

interface Rental {
  id: string
  date: string
  total: number
  status: "rented" | "returned" | "overdue"
  items: OrderItem[]
  rentalPeriod: string
}

interface OrdersState {
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
    (set) => ({
      user: {
        id: "user-123",
        firstName: "Priya",
        lastName: "Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
      }, // Default user for demonstration
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
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
      removeCartItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateCartItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      getCartTotal: () =>
        get().items.reduce((total, item) => {
          if (item.type === "buy") {
            return total + item.price * item.quantity
          } else if (item.type === "rent" && item.rentDays) {
            return total + (item.rentPrice || item.price) * item.rentDays
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
      wishlist: [],
      addToWishlist: (product) =>
        set((state) => {
          if (!state.wishlist.some((item) => item.id === product.id)) {
            return { wishlist: [...state.wishlist, product] }
          }
          return state
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),
      isInWishlist: (productId) => get().wishlist.some((item) => item.id === productId),
      getWishlistItemCount: () => get().wishlist.length,
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
      orders: [
        {
          id: "ORD001",
          date: "2023-01-15T10:00:00Z",
          total: 37000,
          status: "delivered",
          items: [
            { id: "AJ001", name: "Diamond Elegance Necklace", price: 25000, image: "/placeholder.svg", quantity: 1 },
            { id: "AJ002", name: "Golden Bracelet Set", price: 6500, image: "/placeholder.svg", quantity: 2 },
          ],
          shippingAddress: "123 Main St, Mumbai, Maharashtra 400001",
          trackingNumber: "TRK123456",
        },
        {
          id: "ORD002",
          date: "2023-02-20T14:30:00Z",
          total: 12000,
          status: "processing",
          items: [{ id: "AJ003", name: "Royal Ruby Earrings", price: 12000, image: "/placeholder.svg", quantity: 1 }],
          shippingAddress: "456 Oak Ave, Delhi, Delhi 110001",
          trackingNumber: "TRK789012",
        },
      ],
      rentals: [], // No rental history for now as per user request
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
          rating: 4.8,
          reviews: 120,
          isRentable: false,
        },
        {
          id: "AJ002",
          name: "Golden Bracelet Set",
          price: 6500,
          image: "/placeholder.svg?height=200&width=200",
          category: "Bracelets",
          rating: 4.5,
          reviews: 80,
          isRentable: true,
          rentPrice: 500, // per day
        },
        {
          id: "AJ003",
          name: "Royal Ruby Earrings",
          price: 12000,
          image: "/placeholder.svg?height=200&width=200",
          category: "Earrings",
          rating: 4.9,
          reviews: 150,
          isRentable: false,
        },
        {
          id: "AJ004",
          name: "Emerald Grand Ring",
          price: 18000,
          image: "/placeholder.svg?height=200&width=200",
          category: "Rings",
          rating: 4.7,
          reviews: 95,
          isRentable: true,
          rentPrice: 800, // per day
        },
      ],
      coupons: [
        { id: "CUPON1", code: "SAVE10", discount: 10, type: "percentage" },
        { id: "CUPON2", code: "FLAT500", discount: 500, type: "fixed" },
      ],
      shippingCost: 100,
      taxRate: 0.18, // 18% GST
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
        })),
      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        })),
      addCoupon: (coupon) =>
        set((state) => ({ coupons: [...state.coupons, { ...coupon, id: `CUPON${state.coupons.length + 1}` }] })),
      updateCoupon: (couponId, updatedCoupon) =>
        set((state) => ({
          coupons: state.coupons.map((coupon) =>
            coupon.id === couponId ? { ...updatedCoupon, id: couponId } : coupon,
          ),
        })),
      deleteCoupon: (couponId) =>
        set((state) => ({
          coupons: state.coupons.filter((coupon) => coupon.id !== couponId),
        })),
      setShippingCost: (cost) => set({ shippingCost: cost }),
      setTaxRate: (rate) => set({ taxRate: rate }),
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
