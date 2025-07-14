"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Heart, ShoppingCart, Search, Filter, Grid, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const allProducts = [
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
  {
    id: "AJ005",
    name: "Emerald Drop Earrings",
    price: 28000,
    rentPrice: 2800,
    image: "/placeholder.svg?height=400&width=400",
    category: "Earrings",
    isRentable: true,
    inStock: true,
    rating: 4.6,
    reviews: 15,
  },
  {
    id: "AJ006",
    name: "Gold Bangle Set",
    price: 45000,
    rentPrice: 4500,
    image: "/placeholder.svg?height=400&width=400",
    category: "Bangles",
    isRentable: true,
    inStock: true,
    rating: 4.9,
    reviews: 22,
  },
]

export default function ProductsPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState(allProducts)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Price filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, priceRange, sortBy, products])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
    toast({
      title: wishlist.includes(productId) ? "Removed from Wishlist" : "Added to Wishlist",
      description: wishlist.includes(productId) ? "Item removed from your wishlist" : "Item added to your wishlist",
    })
  }

  const addToCart = (productId: string) => {
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of premium jewelry</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </h3>

            {/* Search */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Necklaces">Necklaces</SelectItem>
                  <SelectItem value="Earrings">Earrings</SelectItem>
                  <SelectItem value="Rings">Rings</SelectItem>
                  <SelectItem value="Bracelets">Bracelets</SelectItem>
                  <SelectItem value="Bangles">Bangles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {/* Sort and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
          </div>

          {/* Products Grid */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className={`${
                      viewMode === "grid" ? "w-full h-64" : "w-32 h-32"
                    } object-cover group-hover:scale-105 transition-transform duration-300`}
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                    {product.isRentable && <Badge className="bg-green-500 hover:bg-green-600">Rentable</Badge>}
                  </div>

                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white/90">
                      {product.id}
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
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
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy
                    </Button>
                    {product.isRentable && (
                      <Button
                        variant="outline"
                        className="flex-1 border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                        disabled={!product.inStock}
                      >
                        <Link href={`/products/${product.id}`}>Rent</Link>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setPriceRange([0, 50000])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
