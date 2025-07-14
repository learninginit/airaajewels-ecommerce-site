"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WishlistItem {
  id: string
  name: string
  price: number
  rentPrice: number
  image: string
  category: string
  isRentable: boolean
  inStock: boolean
  rating: number
  reviews: number
}

export default function WishlistPage() {
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "AJ001",
      name: "Diamond Elegance Necklace",
      price: 25000,
      rentPrice: 2500,
      image: "/placeholder.svg?height=400&width=400",
      category: "Necklaces",
      isRentable: true,
      inStock: true,
      rating: 4.8,
      reviews: 24,
    },
    {
      id: "AJ003",
      name: "Royal Sapphire Ring",
      price: 35000,
      rentPrice: 0,
      image: "/placeholder.svg?height=400&width=400",
      category: "Rings",
      isRentable: false,
      inStock: true,
      rating: 5.0,
      reviews: 12,
    },
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    })
  }

  const addToCart = (id: string) => {
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart",
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">Save items you love to view them later</p>
          <Button asChild>
            <Link href="/products">Discover Jewelry</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {!item.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                {item.isRentable && <Badge className="bg-green-500 hover:bg-green-600">Rentable</Badge>}
              </div>

              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                <Link href={`/products/${item.id}`} className="hover:text-amber-600 transition-colors">
                  {item.name}
                </Link>
              </h3>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">({item.reviews})</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Buy:</span>
                  <span className="font-bold text-lg">₹{item.price.toLocaleString()}</span>
                </div>
                {item.isRentable && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rent:</span>
                    <span className="font-semibold text-green-600">₹{item.rentPrice.toLocaleString()}/day</span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 space-y-2">
              <div className="flex space-x-2 w-full">
                <Button
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  disabled={!item.inStock}
                  onClick={() => addToCart(item.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              {item.isRentable && (
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  disabled={!item.inStock}
                >
                  <Link href={`/products/${item.id}`}>Rent Now</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
