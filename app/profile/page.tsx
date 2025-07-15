export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import ProfilePage from "@/components/profile/profile-page"

export const metadata: Metadata = {
  title: "My Profile - Airaa Jewels",
  description: "Manage your account, view orders, and update your preferences.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Profile() {
  return <ProfilePage />
}
