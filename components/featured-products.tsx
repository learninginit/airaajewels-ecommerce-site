"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCartStore, useWishlistStore, useAdminStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { Heart, ShoppingCart } from "lucide-react"

export default function FeaturedProducts() {
  const { products } = useAdminStore()
  const { addCartItem } = useCartStore()
  const { addWishlistItem, removeWishlistItem, isInWishlist } = useWishlistStore()
  const { toast } = useToast()

  const featuredProducts = products.filter((product) => product.inStock).slice(0, 4) // Example: show first 4 in-stock products

  const handleAddToCart = (product: (typeof products)[0]) => {
    addCartItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      type: "buy",
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (product: (typeof products)[0]) => {
    if (isInWishlist(product.id)) {
      removeWishlistItem(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addWishlistItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      })
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Featured Products</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover our handpicked selection of exquisite jewelry, perfect for every occasion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <Link href={`/products/${product.id}`} className="relative block aspect-square group">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" className="text-white">
                    View Details
                  </Button>
                </div>
              </Link>
              <CardContent className="p-4 flex-1">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                  {product.mrp > product.price && (
                    <span className="text-sm text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent"
                  onClick={() => handleToggleWishlist(product)}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
