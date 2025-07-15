"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Share2, Star, Calendar, Shield, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore, useWishlistStore, useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import SocialMediaBuzz from "@/components/social-media-buzz"

interface ProductDetailProps {
  productId: string
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [rentalDays, setRentalDays] = useState(3)

  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { requireAuth } = useAuthStore()

  // Mock product data - in real app, fetch based on productId
  const product = {
    id: productId,
    name: "Diamond Elegance Necklace",
    mrp: 30000,
    price: 25000,
    rentPrice: 2500,
    securityDeposit: 5000,
    description:
      "Exquisite diamond necklace crafted with precision and elegance. Features premium diamonds set in 18k gold.",
    category: "Necklaces",
    isRentable: true,
    inStock: true,
    quantity: 5,
    rating: 4.8,
    reviews: 24,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    specifications: {
      material: "18K Gold",
      gemstone: "Diamond",
      weight: "15.5g",
      dimensions: "45cm length",
      purity: "18K Gold (75% pure)",
    },
  }

  const discountPercentage = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
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
      id: product.id,
      name: product.name,
      mrp: product.mrp,
      price: product.price,
      image: product.images[0],
      type: "buy",
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleRentNow = () => {
    if (!requireAuth()) {
      toast({
        title: "Login Required",
        description: "Please login to rent items",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    const totalRentPrice = product.rentPrice * rentalDays

    addToCart({
      id: product.id,
      name: product.name,
      mrp: product.mrp,
      price: totalRentPrice,
      image: product.images[0],
      type: "rent",
      rentDays: rentalDays,
      rentPrice: product.rentPrice,
      securityDeposit: product.securityDeposit,
    })

    toast({
      title: "Added to Cart",
      description: `Rental for ${rentalDays} days (₹${totalRentPrice.toLocaleString()}) + Security Deposit (₹${product.securityDeposit.toLocaleString()}) has been added to cart`,
    })
  }

  const handleWishlistToggle = () => {
    if (!requireAuth()) {
      toast({
        title: "Login Required",
        description: "Please login to manage wishlist",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        mrp: product.mrp,
        price: product.price,
        rentPrice: product.rentPrice,
        securityDeposit: product.securityDeposit,
        image: product.images[0],
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-amber-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{product.id}</Badge>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={isWishlisted ? "text-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <Badge className="mb-4">{product.category}</Badge>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
                <Badge variant="destructive" className="text-sm">
                  {discountPercentage}% OFF
                </Badge>
              </div>
              <div className="text-3xl font-bold text-amber-600 mb-2">₹{product.price.toLocaleString()}</div>
              <div className="text-sm text-green-600 font-medium">
                You save ₹{(product.mrp - product.price).toLocaleString()}
              </div>

              {product.isRentable && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg text-green-600 font-semibold">
                    Rent: ₹{product.rentPrice.toLocaleString()}/day
                  </div>
                  <div className="text-sm text-green-600">
                    Security Deposit: ₹{product.securityDeposit.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Truck className="h-4 w-4" />
                <span>Free Shipping above ₹1,999</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Authentic Guarantee</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Purchase Options */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Purchase Options</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart - ₹{product.price.toLocaleString()}
                  </Button>
                </div>

                {product.isRentable && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium">Rental Days:</label>
                      <select
                        value={rentalDays}
                        onChange={(e) => setRentalDays(Number.parseInt(e.target.value))}
                        className="border rounded px-3 py-1"
                      >
                        <option value={1}>1 day</option>
                        <option value={3}>3 days</option>
                        <option value={7}>7 days</option>
                        <option value={14}>14 days</option>
                        <option value={30}>30 days</option>
                      </select>
                    </div>

                    <Button
                      onClick={handleRentNow}
                      variant="outline"
                      className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                      disabled={!product.inStock}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Rent for {rentalDays} days - ₹{(product.rentPrice * rentalDays).toLocaleString()}
                      <span className="text-xs ml-2">(+ ₹{product.securityDeposit.toLocaleString()} deposit)</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!product.inStock && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">Currently out of stock</p>
              <p className="text-red-500 text-sm">We'll notify you when it's available again</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="social-buzz">Social Media Buzz</TabsTrigger>
          <TabsTrigger value="care">Care Instructions</TabsTrigger>
        </TabsList>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-medium">Priya S.</span>
                    <span className="text-muted-foreground text-sm">Verified Purchase</span>
                  </div>
                  <p className="text-muted-foreground">
                    Absolutely stunning necklace! The craftsmanship is exceptional and it looks even better in person.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="font-medium">Rahul G.</span>
                    <span className="text-muted-foreground text-sm">Rental Customer</span>
                  </div>
                  <p className="text-muted-foreground">
                    Perfect for our anniversary celebration. The rental process was smooth and the jewelry was pristine.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social-buzz" className="mt-6">
          <SocialMediaBuzz productId={product.id} />
        </TabsContent>

        <TabsContent value="care" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Care Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Daily Care</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Store in a soft cloth pouch or jewelry box</li>
                    <li>Avoid contact with perfumes, lotions, and chemicals</li>
                    <li>Remove before swimming, exercising, or sleeping</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Cleaning</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Clean with a soft, lint-free cloth</li>
                    <li>Use mild soap and warm water for deeper cleaning</li>
                    <li>Professional cleaning recommended every 6 months</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
