"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, Heart, Menu, User } from "lucide-react"
import { useCartStore, useWishlistStore, useAuthStore } from "@/lib/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const cartItemsCount = useCartStore((state) => state.getCartItemCount())
  const wishlistItemsCount = useWishlistStore((state) => state.getWishlistItemCount())
  const { user, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
          <GemIcon className="h-6 w-6 text-amber-600" />
          <span className="text-xl">Airaa Jewels</span>
        </Link>
        <nav className="hidden items-center space-x-6 lg:flex">
          <Link href="/products" className="text-sm font-medium hover:underline" prefetch={false}>
            Shop
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:underline" prefetch={false}>
            Categories
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-md bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none dark:bg-gray-800"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-amber-400 to-orange-400 text-white">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=addresses">Addresses</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/login">
                <User className="h-5 w-5 mr-2" />
                Login
              </Link>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="#" className="mr-6 flex items-center gap-2" prefetch={false}>
                <GemIcon className="h-6 w-6 text-amber-600" />
                <span className="text-lg font-semibold">Airaa Jewels</span>
              </Link>
              <div className="grid gap-2 py-6">
                <Link href="/products" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                  Shop
                </Link>
                <Link
                  href="/categories"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  Categories
                </Link>
                <Link href="/about" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                  About
                </Link>
                <Link href="/contact" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                  Contact
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                      prefetch={false}
                    >
                      My Account
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="w-full justify-start py-2 text-lg font-semibold"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function GemIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M12 17L10 9l-7 2" />
      <path d="M12 17l2-8 7 2" />
      <path d="M2 9l10 2 10-2" />
    </svg>
  )
}
