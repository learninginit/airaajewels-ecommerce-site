import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"
import TestimonialSection from "@/components/testimonial-section"
import NewsletterSection from "@/components/newsletter-section"

export const metadata: Metadata = {
  title: "Airaa Jewels - Premium Jewelry Collection | Buy & Rent",
  description:
    "Discover exquisite jewelry at Airaa Jewels. Premium collection available for purchase or rent. Free shipping, secure payments, and authentic designs.",
  keywords: "jewelry, gold jewelry, diamond jewelry, wedding jewelry, rent jewelry, buy jewelry, airaa jewels",
  openGraph: {
    title: "Airaa Jewels - Premium Jewelry Collection",
    description: "Discover exquisite jewelry at Airaa Jewels. Premium collection available for purchase or rent.",
    url: "https://airaajewels.com",
    siteName: "Airaa Jewels",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airaa Jewels - Premium Jewelry Collection",
    description: "Discover exquisite jewelry at Airaa Jewels. Premium collection available for purchase or rent.",
    images: ["/og-image.jpg"],
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <TestimonialSection />
      <NewsletterSection />
    </main>
  )
}
