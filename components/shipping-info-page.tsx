import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, IndianRupee } from "lucide-react"

export default function ShippingInfoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Shipping Information</h1>
        <p className="text-muted-foreground text-lg">Ensuring your precious jewels reach you safely and on time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <Truck className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Delivery Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We currently offer shipping across all major cities and towns within India. Please enter your pincode at
              checkout to confirm serviceability.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Delivery Timelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days (available for select pincodes)</li>
              <li>Processing Time: Orders are typically processed within 1-2 business days.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Delivery times may vary based on location and unforeseen circumstances.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <IndianRupee className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Shipping Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Orders below ₹5,000: Standard shipping charge of ₹150.</li>
              <li>Orders ₹5,000 and above: Free Standard Shipping.</li>
              <li>Express shipping charges will be calculated at checkout based on location.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Once your order is dispatched, you will receive an email with your tracking number and a link to our
              courier partner's website. You can also track your order directly from your "Order History" in "My
              Account".
            </p>
            <p className="text-muted-foreground">
              For any shipping-related queries, please contact our customer support team with your order ID.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
