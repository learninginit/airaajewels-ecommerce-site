import JewelryCarePage from "@/components/jewelry-care-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jewelry Care - Airaa Jewels",
  description: "Tips and guidelines for maintaining the beauty and longevity of your precious jewelry.",
}

export default function JewelryCare() {
  return <JewelryCarePage />
}
