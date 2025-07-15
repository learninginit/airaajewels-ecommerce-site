import SizeGuidePage from "@/components/size-guide-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Size Guide - Airaa Jewels",
  description: "Find the perfect fit for your rings, necklaces, and bracelets with our comprehensive size guide.",
}

export default function SizeGuide() {
  return <SizeGuidePage />
}
