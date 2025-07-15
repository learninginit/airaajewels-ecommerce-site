"use client"

import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Menu,
  Search,
  ShoppingCart,
  Heart,
  User,
  Package,
  LogOut,
  Home,
  Info,
  Phone,
  Gift,
  Gem,
  BookOpen,
} from "lucide-react"
import { useCartStore, useWishlistStore, useAuthStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { getCartItemCount } = useCartStore()
  const { getWishlistItemCount } = useWishlistStore()
  const { user, signOut } = useAuthStore()
  const { toast } = useToast()

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "success",
    })
    setIsSheetOpen(false) // Close sheet on sign out
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
          <Gem className="h-6 w-6 text-amber-500" />
          <span className="sr-only">Airaa Jewels</span>
          Airaa Jewels
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link className="hover:text-amber-500" href="/">
            Home
          </Link>
          <Link className="hover:text-amber-500" href="/products">
            Shop
          </Link>
          <Link className="hover:text-amber-500" href="/categories">
            Categories
          </Link>
          <Link className="hover:text-amber-500" href="/rent">
            Rent
          </Link>
          <Link className="hover:text-amber-500" href="/about">
            About Us
          </Link>
          <Link className="hover:text-amber-500" href="/contact">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Input
              className="w-48 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:border-amber-500 focus:ring-amber-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
              placeholder="Search..."
              type="search"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          <Link className="relative" href="/wishlist">
            <Button size="icon" variant="ghost">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            {getWishlistItemCount() > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
                {getWishlistItemCount()}
              </Badge>
            )}
          </Link>
          <Link className="relative" href="/cart">
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            {getCartItemCount() > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
                {getCartItemCount()}
              </Badge>
            )}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <User className="h-5 w-5" />
                <span className="sr-only">User Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile?tab=orders">
                      <Package className="mr-2 h-4 w-4" /> My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">
                      <User className="mr-2 h-4 w-4" /> Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">
                      <User className="mr-2 h-4 w-4" /> Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link
                className="mr-6 flex items-center gap-2 text-lg font-semibold"
                href="/"
                onClick={() => setIsSheetOpen(false)}
              >
                <Gem className="h-6 w-6 text-amber-500" />
                Airaa Jewels
              </Link>
              <div className="grid gap-2 py-6">
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                  href="/"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Home className="mr-2 h-5 w-5" /> Home
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                  href="/products"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Shop
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                  href="/categories"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Gift className="mr-2 h-5 w-5" /> Categories
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                  href="/rent"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <BookOpen className="mr-2 h-5 w-5" /> Rent
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                  href="/about"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Info className="mr-2 h-5 w-5" /> About Us
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                  href="/contact"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Phone className="mr-2 h-5 w-5" /> Contact
                </Link>
                <Separator className="my-2" />
                {user ? (
                  <>
                    <Link
                      className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                      href="/profile"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" /> My Profile
                    </Link>
                    <Link
                      className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                      href="/profile?tab=orders"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <Package className="mr-2 h-5 w-5" /> My Orders
                    </Link>
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start py-2 text-lg font-semibold hover:text-amber-500"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-5 w-5" /> Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                      href="/auth/login"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" /> Sign In
                    </Link>
                    <Link
                      className="flex w-full items-center py-2 text-lg font-semibold hover:text-amber-500"
                      href="/auth/register"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" /> Register
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
