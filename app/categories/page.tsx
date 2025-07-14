import type { Metadata } from "next"
import CategoriesPage from "@/components/categories-page"

export const metadata: Metadata = {
  title: "Categories - Airaa Jewels",
  description: "Browse jewelry by categories. Find necklaces, earrings, rings, bracelets, bangles and jewelry sets.",
  keywords: "jewelry categories, necklaces, earrings, rings, bracelets, bangles, jewelry sets",
}

export default function Categories() {
  return <CategoriesPage />
}
