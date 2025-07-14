import type { Metadata } from "next"
import WishlistPage from "@/components/wishlist-page"

export const metadata: Metadata = {
  title: "Wishlist - Airaa Jewels",
  description: "Your saved jewelry items. Keep track of your favorite pieces.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Wishlist() {
  return <WishlistPage />
}
