import HelpCenterPage from "@/components/help-center-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help Center - Airaa Jewels",
  description: "Find answers to your questions about Airaa Jewels products and services.",
}

export default function HelpCenter() {
  return <HelpCenterPage />
}
