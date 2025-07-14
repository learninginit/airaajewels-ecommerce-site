import type { Metadata } from "next"
import LoginPage from "@/components/auth/login-page"

export const metadata: Metadata = {
  title: "Login - Airaa Jewels",
  description: "Sign in to your Airaa Jewels account to access your orders, wishlist, and more.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Login() {
  return <LoginPage />
}
