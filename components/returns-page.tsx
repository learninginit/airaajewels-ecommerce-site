import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Package, IndianRupee } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Returns & Exchanges</h1>
        <p className="text-muted-foreground text-lg">Your satisfaction is our priority</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <RefreshCw className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Our Return Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We offer a 7-day return and exchange policy from the date of delivery. To be eligible for a return, your
              item must be unused, in the same condition that you received it, and in its original packaging with all
              tags intact.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Returns must be initiated within 7 days of delivery.</li>
              <li>Items must be in original condition with all packaging and tags.</li>
              <li>Customized or engraved items are not eligible for return or exchange.</li>
              <li>Jewelry showing signs of wear or damage will not be accepted.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Package className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>How to Initiate a Return/Exchange</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li>
                <strong>Contact Customer Support:</strong> Email us at info@airaajewels.com or call us at +91 98765
                43210 within 7 days of receiving your order. Please provide your order ID and reason for
                return/exchange.
              </li>
              <li>
                <strong>Return Authorization:</strong> Our team will review your request and provide you with a Return
                Authorization (RA) number and instructions for shipping the item back.
              </li>
              <li>
                <strong>Pack Your Item:</strong> Securely pack the item in its original packaging along with all
                original certificates, tags, and accessories. Write the RA number clearly on the package.
              </li>
              <li>
                <strong>Ship the Item:</strong> Ship the item to the address provided by our customer support. We
                recommend using a trackable shipping service.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <IndianRupee className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Refunds and Exchanges</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-lg mb-2">Refunds:</h3>
            <p className="text-muted-foreground mb-4">
              Once your return is received and inspected, we will send you an email to notify you that we have received
              your returned item. We will also notify you of the approval or rejection of your refund. If approved, your
              refund will be processed, and a credit will automatically be applied to your original method of payment,
              within a certain number of days.
            </p>
            <h3 className="font-semibold text-lg mb-2">Exchanges:</h3>
            <p className="text-muted-foreground">
              If you wish to exchange an item, please follow the return process for the original item and place a new
              order for the desired item. This ensures faster processing and availability of your new selection.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
