"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Shield, Truck, Heart, Star } from "lucide-react"

const rentableProducts = [
  {
    id: "AJ001",
    name: "Diamond Elegance Necklace",
    price: 25000,
    rentPrice: 2500,
    image: "/placeholder.svg?height=400&width=400",
    category: "Necklaces",
    rating: 4.8,
    reviews: 24,
    description: "Perfect for weddings and special occasions",
  },
  {
    id: "AJ002",
    name: "Golden Rose Earrings",
    price: 15000,
    rentPrice: 1500,
    image: "/placeholder.svg?height=400&width=400",
    category: "Earrings",
    rating: 4.9,
    reviews: 18,
    description: "Elegant earrings for formal events",
  },
  {
    id: "AJ004",
    name: "Pearl Charm Bracelet",
    price: 12000,
    rentPrice: 1200,
    image: "/placeholder.svg?height=400&width=400",
    category: "Bracelets",
    rating: 4.7,
    reviews: 31,
    description: "Delicate bracelet for everyday elegance",
  },
  {
    id: "AJ005",
    name: "Emerald Drop Earrings",
    price: 28000,
    rentPrice: 2800,
    image: "/placeholder.svg?height=400&width=400",
    category: "Earrings",
    rating: 4.6,
    reviews: 15,
    description: "Stunning emerald earrings for special occasions",
  },
]

const rentalPlans = [
  {
    name: "1 Day",
    multiplier: 1,
    popular: false,
    description: "Perfect for single events",
  },
  {
    name: "3 Days",
    multiplier: 2.5,
    popular: true,
    description: "Great for weekend events",
  },
  {
    name: "7 Days",
    multiplier: 5,
    popular: false,
    description: "Ideal for week-long celebrations",
  },
  {
    name: "14 Days",
    multiplier: 8,
    popular: false,
    description: "Perfect for extended occasions",
  },
]

export default function RentPage() {
  const [selectedPlan, setSelectedPlan] = useState("3 Days")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Rent Premium Jewelry</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Experience luxury without the commitment. Rent exquisite jewelry for your special occasions at a fraction of
          the cost.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <Calendar className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Flexible Duration</h3>
            <p className="text-sm text-muted-foreground">1 day to 30 days</p>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Fully Insured</h3>
            <p className="text-sm text-muted-foreground">Complete protection</p>
          </div>
          <div className="text-center">
            <Truck className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">Doorstep service</p>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">Hassle-free process</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Available for Rent</TabsTrigger>
          <TabsTrigger value="plans">Rental Plans</TabsTrigger>
          <TabsTrigger value="process">How It Works</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentableProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-500 hover:bg-green-600">Available for Rent</Badge>
                  </div>

                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
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

                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rent from:</span>
                      <span className="font-bold text-lg text-green-600">
                        ₹{product.rentPrice.toLocaleString()}/day
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Buy price:</span>
                      <span className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>

                <div className="p-4 pt-0">
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <Link href={`/products/${product.id}`}>Rent Now</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {rentalPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative cursor-pointer transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-amber-500 shadow-lg" : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-500 hover:bg-amber-600">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{plan.multiplier}x</div>
                  <p className="text-sm text-muted-foreground">Daily rate multiplier</p>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Example:</strong> ₹2,500/day item
                      <br />
                      Total: ₹{(2500 * plan.multiplier).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="process" className="mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Choose & Book</h3>
                <p className="text-muted-foreground">
                  Browse our collection, select your favorite pieces, and choose your rental duration.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Delivery & Enjoy</h3>
                <p className="text-muted-foreground">
                  We deliver the jewelry to your doorstep. Wear and enjoy your special occasion.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Return</h3>
                <p className="text-muted-foreground">
                  Return the jewelry using our prepaid return kit. No hassle, no stress.
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Rental Terms & Conditions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Security deposit required (refundable)</li>
                <li>• Free delivery and pickup within city limits</li>
                <li>• Professional cleaning included</li>
                <li>• Damage protection available</li>
                <li>• Extend rental period anytime</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
