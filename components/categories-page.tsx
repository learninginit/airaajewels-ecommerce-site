import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    name: "Necklaces",
    description: "Elegant necklaces for every occasion",
    image: "/placeholder.svg?height=400&width=400",
    count: 150,
    href: "/products?category=Necklaces",
    featured: ["Diamond Necklaces", "Gold Chains", "Pearl Necklaces"],
  },
  {
    name: "Earrings",
    description: "Beautiful earrings to complement your style",
    image: "/placeholder.svg?height=400&width=400",
    count: 200,
    href: "/products?category=Earrings",
    featured: ["Stud Earrings", "Drop Earrings", "Hoop Earrings"],
  },
  {
    name: "Rings",
    description: "Stunning rings for special moments",
    image: "/placeholder.svg?height=400&width=400",
    count: 120,
    href: "/products?category=Rings",
    featured: ["Engagement Rings", "Wedding Bands", "Fashion Rings"],
  },
  {
    name: "Bracelets",
    description: "Delicate bracelets for everyday elegance",
    image: "/placeholder.svg?height=400&width=400",
    count: 80,
    href: "/products?category=Bracelets",
    featured: ["Chain Bracelets", "Charm Bracelets", "Tennis Bracelets"],
  },
  {
    name: "Bangles",
    description: "Traditional and modern bangles",
    image: "/placeholder.svg?height=400&width=400",
    count: 95,
    href: "/products?category=Bangles",
    featured: ["Gold Bangles", "Silver Bangles", "Designer Bangles"],
  },
  {
    name: "Sets",
    description: "Complete jewelry sets for special occasions",
    image: "/placeholder.svg?height=400&width=400",
    count: 60,
    href: "/products?category=Sets",
    featured: ["Bridal Sets", "Party Sets", "Traditional Sets"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our diverse collection of handcrafted jewelry across different categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="relative overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900">{category.count} items</Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="group-hover:text-amber-600 transition-colors">{category.name}</CardTitle>
                <p className="text-muted-foreground">{category.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Featured:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.featured.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
