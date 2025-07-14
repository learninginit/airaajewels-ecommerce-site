import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely love my diamond necklace from Airaa Jewels! The quality is exceptional and the rental option made it perfect for my wedding.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Rahul Gupta",
    location: "Delhi",
    rating: 5,
    text: "Amazing collection and excellent customer service. The jewelry arrived exactly as shown and the packaging was beautiful.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Anita Desai",
    location: "Bangalore",
    rating: 5,
    text: "The rental service is fantastic! I was able to wear stunning jewelry for my anniversary without the huge investment.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Read testimonials from our satisfied customers who trust Airaa Jewels for their special moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-amber-500 mb-4" />

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
