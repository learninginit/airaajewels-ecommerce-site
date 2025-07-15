"use client"

import Link from "next/link"
import { Gem, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 dark:bg-gray-900">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
            <Gem className="h-6 w-6 text-amber-500" />
            Airaa Jewels
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Exquisite jewelry for every occasion. Crafted with passion and precision.
          </p>
          <div className="flex gap-4">
            <Link className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500" href="#">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500" href="#">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500" href="#">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500" href="#">
              <Youtube className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <nav className="space-y-2 text-sm">
            <ul>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/products"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/categories"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <nav className="space-y-2 text-sm">
            <ul>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/help-center"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/shipping-info"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/returns"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/size-guide"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/jewelry-care"
                >
                  Jewelry Care
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Legal</h3>
          <nav className="space-y-2 text-sm">
            <ul>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Airaa Jewels. All rights reserved.
      </div>
    </footer>
  )
}
