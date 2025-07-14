import type { Metadata } from "next"
import AboutPage from "@/components/about-page"

export const metadata: Metadata = {
  title: "About Us - Airaa Jewels",
  description: "Learn about Airaa Jewels - our story, craftsmanship, and commitment to premium jewelry.",
  keywords: "about airaa jewels, jewelry craftsmanship, premium jewelry, jewelry story",
}

export default function About() {
  return <AboutPage />
}
