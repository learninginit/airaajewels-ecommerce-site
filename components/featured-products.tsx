"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore, useWishlistStore } from "@/lib/store"

const featuredProducts = [
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
    id: "AJ002",
    name: "Golden Rose Earrings",
    price: 15000,
    rentPrice: 1500,
    image: "/placeholder.svg?height=400&width=400",
    category: "Earrings",
    isRentable: true,
    inStock: true,
    rating: 4.9,
    reviews: 18,
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
  {
    id: "AJ004",
    name: "Pearl Charm Bracelet",
    price: 12000,
    rentPrice: 1200,
    image: "/placeholder.svg?height=400&width=400",
    category: "Bracelets",
    isRentable: true,
    inStock: false,
    rating: 4.7,
    reviews: 31,
  },
]

export default function FeaturedProducts() {
  const { toast } = useToast()
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const toggleWishlist = (product: (typeof featuredProducts)[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        rentPrice: product.rentPrice,
        image: product.image,
        category: product.category,
        isRentable: product.isRentable,
        inStock: product.inStock,
        rating: product.rating,
        reviews: product.reviews,
      })
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist`,
      })
    }
  }

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: "buy",
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collection</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked jewelry pieces that showcase our finest craftsmanship and timeless elegance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                  <Button size="sm" variant="secondary" className="rounded-full" asChild>
                    <Link href={`/products/${product.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => toggleWishlist(product)}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                  {product.isRentable && <Badge className="bg-green-500 hover:bg-green-600">Rentable</Badge>}
                </div>

                {/* Product Code */}
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-white/90">
                    {product.id}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  <Link href={`/products/${product.id}`} className="hover:text-amber-600 transition-colors">
                    {product.name}
                  </Link>
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Buy:</span>
                    <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
                  </div>
                  {product.isRentable && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rent:</span>
                      <span className="font-semibold text-green-600">₹{product.rentPrice.toLocaleString()}/day</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 space-y-2">
                <div className="flex space-x-2 w-full">
                  <Button
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </Button>
                  {product.isRentable && (
                    <Button
                      variant="outline"
                      className="flex-1 border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                      disabled={!product.inStock}
                      asChild
                    >
                      <Link href={`/products/${product.id}`}>Rent</Link>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent"
            asChild
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
