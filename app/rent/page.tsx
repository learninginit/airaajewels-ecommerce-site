import type { Metadata } from "next"
import RentPage from "@/components/rent-page"

export const metadata: Metadata = {
  title: "Rent Jewelry - Airaa Jewels",
  description: "Rent premium jewelry for special occasions. Affordable luxury jewelry rental with flexible terms.",
  keywords: "rent jewelry, jewelry rental, wedding jewelry rental, occasion jewelry, luxury rental",
}

export default function Rent() {
  return <RentPage />
}
