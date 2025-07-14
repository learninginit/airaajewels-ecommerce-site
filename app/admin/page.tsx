import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - Airaa Jewels",
  description: "Manage inventory, orders, and products for Airaa Jewels",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminDashboard />
}
