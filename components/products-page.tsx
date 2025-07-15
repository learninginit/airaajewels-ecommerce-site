"use client"

import { Label } from "@/components/ui/label"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useCartStore, useWishlistStore, useAuthStore, useAdminStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function ProductsPage() {
  const { products } = useAdminStore()
  const { addCartItem } = useCartStore()
  const { items: wishlistItems, addWishlistItem, removeWishlistItem, isInWishlist } = useWishlistStore()
  const { user } = useAuthStore()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all") // 'all', 'buy', 'rent'
  const [sortOrder, setSortOrder] = useState("default") // 'default', 'price-asc', 'price-desc', 'rating-desc'

  const allCategories = useMemo(() => {
    const categories = new Set(products.map((product) => product.category))
    return ["all", ...Array.from(categories)]
  }, [products])

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 50000)
  }, [products])

  useEffect(() => {
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1],
    )

    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    if (availabilityFilter === "buy") {
      filtered = filtered.filter((product) => !product.isRentable)
    } else if (availabilityFilter === "rent") {
      filtered = filtered.filter((product) => product.isRentable)
    }

    switch (sortOrder) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating-desc":
        // Assuming products have a 'rating' property
        // For now, using a dummy sort if no rating exists
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // No specific sort
        break
    }

    return filtered
  }, [products, searchTerm, priceRange, categoryFilter, availabilityFilter, sortOrder])

  const handleAddToCart = (product: (typeof products)[0], type: "buy" | "rent", rentDays?: number) => {
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
      type,
      rentDays,
      rentPrice: product.rentPrice,
    })
    toast({
      title: "Item Added",
      description: `${product.name} added to your cart!`,
      variant: "success",
    })
  }

  const handleToggleWishlist = (product: (typeof products)[0]) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to manage your wishlist.",
        variant: "destructive",
      })
      return
    }
    if (isInWishlist(product.id)) {
      removeWishlistItem(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} removed from your wishlist.`,
        variant: "default",
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
        description: `${product.name} added to your wishlist!`,
        variant: "success",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Products</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Explore our exquisite collection of jewelry for every occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Price Range</Label>
            <Slider
              min={0}
              max={maxPrice}
              step={100}
              value={priceRange}
              onValueChange={(value: [number, number]) => setPriceRange(value)}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger id="availability">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="buy">Available for Sale</SelectItem>
                <SelectItem value="rent">Available for Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort">Sort By</Label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No products found matching your criteria.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden">
                <Link href={`/products/${product.id}`} className="relative block h-48 w-full overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  {product.isRentable && (
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-white">Rentable</Badge>
                  )}
                  {!product.inStock && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">Out of Stock</Badge>
                  )}
                </Link>
                <CardContent className="flex flex-grow flex-col justify-between p-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                    <div className="flex items-center gap-1 text-sm text-amber-500">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span>
                        {product.rating || "N/A"} ({product.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    {product.isRentable ? (
                      <div className="flex flex-col">
                        <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          or ₹{product.rentPrice?.toLocaleString()}/day
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleWishlist(product)}
                      className={isInWishlist(product.id) ? "text-red-500" : ""}
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {product.inStock ? (
                    <div className="flex w-full gap-2">
                      <Button
                        className="flex-1 bg-amber-500 text-white hover:bg-amber-600"
                        onClick={() => handleAddToCart(product, "buy")}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                      {product.isRentable && (
                        <Button
                          className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                          onClick={() => handleAddToCart(product, "rent", 7)} // Default 7 days for rent
                        >
                          Rent Now
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button className="w-full" disabled>
                      Out of Stock
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
