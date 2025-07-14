import type { Metadata } from "next"
import ContactPage from "@/components/contact-page"

export const metadata: Metadata = {
  title: "Contact Us - Airaa Jewels",
  description: "Get in touch with Airaa Jewels. Visit our store, call us, or send us a message.",
  keywords: "contact airaa jewels, jewelry store location, customer support, jewelry consultation",
}

export default function Contact() {
  return <ContactPage />
}
