import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Gem, Shield, Heart, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Airaa Jewels</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          For over two decades, Airaa Jewels has been crafting exquisite jewelry that celebrates life's most precious
          moments. Our commitment to quality, authenticity, and customer satisfaction has made us a trusted name in
          premium jewelry.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2000 by master craftsman Rajesh Sharma, Airaa Jewels began as a small family business with a
              simple vision: to create jewelry that tells a story and celebrates the beauty of human connections.
            </p>
            <p>
              What started as a modest workshop in Mumbai has grown into one of India's most respected jewelry brands,
              known for our exceptional craftsmanship, innovative designs, and unwavering commitment to quality.
            </p>
            <p>
              Today, we continue to honor traditional jewelry-making techniques while embracing modern design
              sensibilities, creating pieces that are both timeless and contemporary.
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/placeholder.svg?height=500&width=600"
            alt="Airaa Jewels Workshop"
            width={600}
            height={500}
            className="rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <Gem className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold">Quality Craftsmanship</h3>
              <p className="text-muted-foreground">
                Every piece is meticulously crafted by skilled artisans using traditional techniques and premium
                materials.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold">Authenticity</h3>
              <p className="text-muted-foreground">
                We guarantee the authenticity of every gemstone and metal, providing certificates for all premium
                pieces.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold">Customer First</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We provide exceptional service and support throughout your journey
                with us.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-amber-50 rounded-lg p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-amber-600 mb-2">25+</div>
            <div className="text-muted-foreground">Years of Excellence</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600 mb-2">50,000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600 mb-2">1,000+</div>
            <div className="text-muted-foreground">Unique Designs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
            <div className="text-muted-foreground">Authentic Jewelry</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">RS</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Rajesh Sharma</h3>
              <Badge variant="secondary" className="mb-3">
                Founder & Master Craftsman
              </Badge>
              <p className="text-muted-foreground text-sm">
                With over 30 years of experience, Rajesh leads our design team and ensures every piece meets our
                exacting standards.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">PS</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Priya Sharma</h3>
              <Badge variant="secondary" className="mb-3">
                Creative Director
              </Badge>
              <p className="text-muted-foreground text-sm">
                Priya brings fresh perspectives to traditional designs, creating contemporary pieces that resonate with
                modern customers.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">AK</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Amit Kumar</h3>
              <Badge variant="secondary" className="mb-3">
                Quality Assurance Head
              </Badge>
              <p className="text-muted-foreground text-sm">
                Amit ensures every piece meets our rigorous quality standards before it reaches our valued customers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certifications */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">Certifications & Awards</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-amber-600" />
            <span className="font-medium">BIS Hallmark Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-amber-600" />
            <span className="font-medium">ISO 9001:2015 Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-amber-600" />
            <span className="font-medium">GIA Certified Gemstones</span>
          </div>
        </div>
      </div>
    </div>
  )
}
