import ShippingInfoPage from "@/components/shipping-info-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Information - Airaa Jewels",
  description: "Learn about our shipping policies, delivery times, and charges.",
}

export default function ShippingInfo() {
  return <ShippingInfoPage />
}
