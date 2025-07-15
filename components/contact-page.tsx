"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you soon.",
      variant: "success",
    })
    // In a real application, you would send this data to your backend
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/918217366457", "_blank")
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          We'd love to hear from you! Reach out to us for any inquiries or support.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Contact Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input placeholder="Your Name" type="text" required />
                <Input placeholder="Your Email" type="email" required />
              </div>
              <Input placeholder="Subject" type="text" required />
              <Textarea className="min-h-[120px]" placeholder="Your Message" required />
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">info@airaajewels.com</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">We typically respond within 24 hours.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">+91 12345 67890</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mon - Sat, 10 AM - 7 PM (IST)</p>
            </CardContent>
          </Card>

          <Card onClick={handleWhatsAppClick} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">+91 82173 66457</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Chat with us instantly!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Our Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Airaa Jewels Headquarters
                <br />
                123 Jewel Street, Diamond District
                <br />
                Mumbai, Maharashtra, India - 400001
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Monday - Saturday: 10:00 AM - 7:00 PM
                <br />
                Sunday: Closed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
