"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Search, Star } from "lucide-react"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

// Dummy data for products
const allProducts = [
  {
    id: "AJ001",
    name: "Diamond Elegance Necklace",
    price: 25000,
    image: "/placeholder.svg?height=200&width=200",
    category: "Necklaces",
    rating: 4.8,
    reviews: 120,
    isRentable: false,
  },
  {
    id: "AJ002",
    name: "Golden Bracelet Set",
    price: 6500,
    image: "/placeholder.svg?height=200&width=200",
    category: "Bracelets",
    rating: 4.5,
    reviews: 80,
    isRentable: true,
    rentPrice: 500, // per day
  },
  {
    id: "AJ003",
    name: "Royal Ruby Earrings",
    price: 12000,
    image: "/placeholder.svg?height=200&width=200",
    category: "Earrings",
    rating: 4.9,
    reviews: 150,
    isRentable: false,
  },
  {
    id: "AJ004",
    name: "Emerald Grand Ring",
    price: 18000,
    image: "/placeholder.svg?height=200&width=200",
    category: "Rings",
    rating: 4.7,
    reviews: 95,
    isRentable: true,
    rentPrice: 800, // per day
  },
  {
    id: "AJ005",
    name: "Pearl Drop Necklace",
    price: 9000,
    image: "/placeholder.svg?height=200&width=200",
    category: "Necklaces",
    rating: 4.6,
    reviews: 70,
    isRentable: false,
  },
  {
    id: "AJ006",
    name: "Silver Charm Bracelet",
    price: 3000,
    image: "/placeholder.svg?height=200&width=200",
    category: "Bracelets",
    rating: 4.3,
    reviews: 60,
    isRentable: true,
    rentPrice: 200, // per day
  },
  {
    id: "AJ007",
    name: "Sapphire Stud Earrings",
    price: 7500,
    image: "/placeholder.svg?height=200&width=200",
    category: "Earrings",
    rating: 4.7,
    reviews: 110,
    isRentable: false,
  },
  {
    id: "AJ008",
    name: "Vintage Gold Ring",
    price: 15000,
    image: "/placeholder.svg?height=200&width=200",
    category: "Rings",
    rating: 4.4,
    reviews: 85,
    isRentable: false,
  },
]

export default function ProductsPage() {
  const { toast } = useToast()
  const { addCartItem } = useCartStore()
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000])
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("default")
  const [availabilityFilter, setAvailabilityFilter] = useState("all") // 'all', 'sale', 'rent'

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProducts.map((product) => product.category))
    return ["all", ...Array.from(uniqueCategories)]
  }, [])

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

    products = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    if (categoryFilter !== "all") {
      products = products.filter((product) => product.category === categoryFilter)
    }

    if (availabilityFilter === "sale") {
      products = products.filter((product) => !product.isRentable)
    } else if (availabilityFilter === "rent") {
      products = products.filter((product) => product.isRentable)
    }

    switch (sortOrder) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products.sort((a, b) => b.price - a.price)
        break
      case "rating-desc":
        products.sort((a, b) => b.rating - a.rating)
        break
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // No specific sort
        break
    }

    return products
  }, [searchQuery, priceRange, categoryFilter, sortOrder, availabilityFilter])

  const handleAddToCart = (product: (typeof allProducts)[0], type: "buy" | "rent") => {
    // In a real app, you'd check if the user is logged in
    const isAuthenticated = true // Placeholder
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      })
      return
    }

    addCartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      type: type,
      rentDays: type === "rent" ? 1 : undefined, // Default to 1 day for rent
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (product: (typeof allProducts)[0]) => {
    // In a real app, you'd check if the user is logged in
    const isAuthenticated = true // Placeholder
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to manage your wishlist.",
        variant: "destructive",
      })
      return
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="mb-8 text-3xl font-bold">Our Exquisite Collection</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Search Products</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Price Range</h3>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              min={0}
              max={30000}
              step={500}
              value={priceRange}
              onValueChange={(value: number[]) => setPriceRange(value as [number, number])}
              className="mt-2"
            />
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Category</h3>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Availability Filter */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Availability</h3>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="sale">Available for Sale</SelectItem>
                <SelectItem value="rent">Available for Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Sort By</h3>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                <Link href={`/products/${product.id}`} className="absolute inset-0 z-10" prefetch={false}>
                  <span className="sr-only">View Product</span>
                </Link>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xl font-bold">₹{product.price.toLocaleString()}</div>
                    {product.isRentable && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Rent: ₹{product.rentPrice?.toLocaleString()}/day
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="z-20 bg-transparent"
                      onClick={() => handleToggleWishlist(product)}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button className="flex-1 z-20" onClick={() => handleAddToCart(product, "buy")}>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    {product.isRentable && (
                      <Button
                        className="flex-1 z-20 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        onClick={() => handleAddToCart(product, "rent")}
                      >
                        Rent Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
