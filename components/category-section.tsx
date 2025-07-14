import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Necklaces",
    image: "/placeholder.svg?height=300&width=300",
    count: 150,
    href: "/categories/necklaces",
  },
  {
    name: "Earrings",
    image: "/placeholder.svg?height=300&width=300",
    count: 200,
    href: "/categories/earrings",
  },
  {
    name: "Rings",
    image: "/placeholder.svg?height=300&width=300",
    count: 120,
    href: "/categories/rings",
  },
  {
    name: "Bracelets",
    image: "/placeholder.svg?height=300&width=300",
    count: 80,
    href: "/categories/bracelets",
  },
  {
    name: "Bangles",
    image: "/placeholder.svg?height=300&width=300",
    count: 95,
    href: "/categories/bangles",
  },
  {
    name: "Sets",
    image: "/placeholder.svg?height=300&width=300",
    count: 60,
    href: "/categories/sets",
  },
]

export default function CategorySection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse collection of handcrafted jewelry across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-amber-600 transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
