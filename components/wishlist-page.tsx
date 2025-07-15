"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWishlistStore, useCartStore, useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function WishlistPage() {
  const { toast } = useToast()
  const router = useRouter()

  const { items, removeItem } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const { requireAuth } = useAuthStore()

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "Removed from Wishlist",
      description: `${name} has been removed from your wishlist`,
    })
  }

  const handleAddToCart = (item: any) => {
    if (!requireAuth()) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    addToCart({
      id: item.id,
      name: item.name,
      mrp: item.mrp,
      price: item.price,
      image: item.image,
      type: "buy",
    })

    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">Save items you love to your wishlist and shop them later.</p>
          <Button
            asChild
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">{items.length} items saved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => {
          const discountPercentage = Math.round(((item.mrp - item.price) / item.mrp) * 100)

          return (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>

                  {discountPercentage > 0 && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      {discountPercentage}% OFF
                    </Badge>
                  )}

                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <Badge variant="secondary">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>

                  <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>

                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({item.reviews})</span>
                  </div>

                  <div className="space-y-1">
                    {item.mrp > item.price && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground line-through">₹{item.mrp.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="text-lg font-bold text-amber-600">₹{item.price.toLocaleString()}</div>
                    {item.isRentable && (
                      <div className="text-sm text-green-600">Rent: ₹{item.rentPrice.toLocaleString()}/day</div>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>

                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/products/${item.id}`}>
                        <Eye className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
