import type { Metadata } from "next"
import ProductsPage from "@/components/products-page"

export const metadata: Metadata = {
  title: "All Products - Airaa Jewels",
  description:
    "Browse our complete collection of premium jewelry. Find necklaces, earrings, rings, bracelets and more.",
  keywords: "jewelry collection, necklaces, earrings, rings, bracelets, buy jewelry, rent jewelry",
}

export default function Products() {
  return <ProductsPage />
}
