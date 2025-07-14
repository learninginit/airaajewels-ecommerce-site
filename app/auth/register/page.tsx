import type { Metadata } from "next"
import RegisterPage from "@/components/auth/register-page"

export const metadata: Metadata = {
  title: "Register - Airaa Jewels",
  description: "Create your Airaa Jewels account to start shopping premium jewelry.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Register() {
  return <RegisterPage />
}
