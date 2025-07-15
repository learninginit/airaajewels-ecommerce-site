"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCartStore, useWishlistStore, useAuthStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { Heart, ShoppingCart } from "lucide-react"

export default function WishlistPage() {
  const { items: wishlistItems, removeWishlistItem, isInWishlist } = useWishlistStore()
  const { addCartItem } = useCartStore()
  const { user } = useAuthStore()
  const { toast } = useToast()

  const handleRemoveFromWishlist = (productId: string) => {
    removeWishlistItem(productId)
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
      variant: "default",
    })
  }

  const handleAddToCart = (product: (typeof wishlistItems)[0]) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      })
      return
    }
    addCartItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      type: "buy", // Assuming wishlist items are for purchase
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
    handleRemoveFromWishlist(product.id) // Remove from wishlist after adding to cart
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Your Wishlist</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your saved items for future purchases.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="mx-auto max-w-md text-center">
          <CardContent className="p-6">
            <Heart className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" />
            <p className="mt-4 text-lg font-semibold">Your wishlist is empty.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add items you love to your wishlist to keep track of them.
            </p>
            <Button asChild className="mt-6 bg-amber-500 hover:bg-amber-600 text-white">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="flex flex-col overflow-hidden">
              <Link href={`/products/${item.id}`} className="relative block h-48 w-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <CardContent className="flex flex-grow flex-col justify-between p-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price.toLocaleString()}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 p-4 pt-0">
                <Button
                  className="w-full bg-amber-500 text-white hover:bg-amber-600"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Heart className="mr-2 h-4 w-4" /> Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
