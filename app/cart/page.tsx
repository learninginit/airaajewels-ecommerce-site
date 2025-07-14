import type { Metadata } from "next"
import CartPage from "@/components/cart-page"

export const metadata: Metadata = {
  title: "Shopping Cart - Airaa Jewels",
  description: "Review your selected jewelry items and proceed to checkout.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Cart() {
  return <CartPage />
}
