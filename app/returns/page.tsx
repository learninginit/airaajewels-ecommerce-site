import ReturnsPage from "@/components/returns-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Returns & Exchanges - Airaa Jewels",
  description: "Understand our policy for returns, exchanges, and refunds.",
}

export default function Returns() {
  return <ReturnsPage />
}
