"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    toast({
      title: "Subscribed Successfully!",
      description: "You'll receive our latest updates and exclusive offers.",
    })
    setEmail("")
  }

  return (
    <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Gift className="h-8 w-8 text-amber-500 mr-2" />
            <span className="text-amber-600 font-semibold text-lg">Exclusive Offers</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Airaa Jewels</h2>

          <p className="text-muted-foreground text-lg mb-8">
            Subscribe to our newsletter and get 10% off your first purchase. Be the first to know about new collections
            and special offers.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
