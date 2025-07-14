import type { Metadata } from "next"
import CheckoutPage from "@/components/checkout-page"

export const metadata: Metadata = {
  title: "Checkout - Airaa Jewels",
  description: "Complete your jewelry purchase securely with multiple payment options.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Checkout() {
  return <CheckoutPage />
}
