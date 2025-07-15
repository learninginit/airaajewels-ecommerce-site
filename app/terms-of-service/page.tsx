import TermsOfServicePage from "@/components/terms-of-service-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Airaa Jewels",
  description: "Read the terms and conditions governing your use of Airaa Jewels website and services.",
}

export default function TermsOfService() {
  return <TermsOfServicePage />
}
