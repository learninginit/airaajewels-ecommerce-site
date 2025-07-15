import PrivacyPolicyPage from "@/components/privacy-policy-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Airaa Jewels",
  description: "Understand how Airaa Jewels collects, uses, and protects your personal information.",
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}
