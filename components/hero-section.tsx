import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-amber-500 mr-2" />
            <span className="text-amber-600 font-semibold text-lg">Premium Jewelry Collection</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
            Exquisite Jewelry for Every Occasion
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our stunning collection of handcrafted jewelry. Buy your favorites or rent for special occasions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
            >
              <Link href="/products" className="flex items-center">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 bg-transparent"
            >
              <Link href="/rent">Rent Jewelry</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">1000+</div>
              <div className="text-muted-foreground">Premium Designs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
              <div className="text-muted-foreground">Authentic Jewelry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
