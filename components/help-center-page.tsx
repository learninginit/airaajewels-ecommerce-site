import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground text-lg">Your guide to a seamless shopping experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I place an order?</AccordionTrigger>
                  <AccordionContent>
                    To place an order, simply browse our collection, add your desired items to the cart, and proceed to
                    checkout. Follow the on-screen instructions to provide shipping details and payment information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept various payment methods including credit/debit cards (Visa, MasterCard, Amex), Net
                    Banking, UPI, and Cash on Delivery (COD) for eligible orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How can I track my order?</AccordionTrigger>
                  <AccordionContent>
                    Once your order is shipped, you will receive an email with a tracking number and a link to track
                    your package. You can also find tracking information in your "Order History" under "My Account".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer a hassle-free return policy within 7 days of delivery for most items. Please refer to our
                    "Returns & Exchanges" page for detailed information and conditions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                  <AccordionContent>
                    Currently, we only ship within India. We are working on expanding our shipping services to
                    international locations soon.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-muted-foreground">info@airaajewels.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-muted-foreground">+91 98765 43210 (Mon-Fri, 10 AM - 6 PM IST)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Our Address</p>
                  <p className="text-muted-foreground">
                    Airaa Jewels Headquarters,
                    <br />
                    123 Jewel Street, Bandra,
                    <br />
                    Mumbai, Maharashtra 400050, India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="/shipping-info" className="text-amber-600 hover:underline block">
                Shipping Information
              </a>
              <a href="/returns" className="text-amber-600 hover:underline block">
                Returns & Exchanges
              </a>
              <a href="/size-guide" className="text-amber-600 hover:underline block">
                Size Guide
              </a>
              <a href="/jewelry-care" className="text-amber-600 hover:underline block">
                Jewelry Care
              </a>
              <a href="/terms-of-service" className="text-amber-600 hover:underline block">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="text-amber-600 hover:underline block">
                Privacy Policy
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
