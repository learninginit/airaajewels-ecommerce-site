"use client"

import Link from "next/link"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useCartStore, useOrdersStore, useAdminStore, useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { MapPin, CreditCard, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
]

export default function CheckoutPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuthStore()
  const { items, clearCart } = useCartStore()
  const { addOrder } = useOrdersStore()
  const { settings } = useAdminStore()

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("razorpay") // Default to Razorpay
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to proceed to checkout.",
        variant: "destructive",
      })
      router.push("/auth/login")
    }
    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      router.push("/cart")
    }
  }, [user, items, router, toast])

  useEffect(() => {
    // If user has a default address, pre-fill it
    if (user && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find((addr) => addr.isDefault) || user.addresses[0]
      setShippingAddress({
        fullName: defaultAddress.fullName,
        phone: defaultAddress.phone,
        addressLine1: defaultAddress.addressLine1,
        addressLine2: defaultAddress.addressLine2 || "",
        city: defaultAddress.city,
        state: defaultAddress.state,
        pincode: defaultAddress.pincode,
      })
    }
  }, [user])

  const buyItems = items.filter((item) => item.type === "buy")
  const rentItems = items.filter((item) => item.type === "rent")

  const buyTotal = buyItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const rentTotal = rentItems.reduce(
    (sum, item) => sum + (item.rentPrice || item.price) * item.quantity * (item.rentDays || 1),
    0,
  )
  const subtotal = buyTotal + rentTotal

  const shippingCharge = subtotal < settings.freeShippingThreshold && buyItems.length > 0 ? 150 : 0
  const taxAmount = (subtotal * settings.taxRate) / 100
  const grandTotal = subtotal + shippingCharge + taxAmount

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to proceed.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (!termsAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      })
      return
    }

    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.addressLine1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      toast({
        title: "Missing Shipping Information",
        description: "Please fill in all required shipping address fields.",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "razorpay") {
      // Razorpay integration logic
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: grandTotal }),
      })
      const data = await res.json()

      if (data.id) {
        const options = {
          // key is returned safely from the server – nothing sensitive in the bundle
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: "Airaa Jewels",
          description: "Jewelry Purchase",
          order_id: data.id,
          handler: async (response: any) => {
            // Payment successful, save order
            const newOrder = {
              id: `ORD${Date.now()}`,
              userId: user.id, // Associate order with current user
              date: new Date().toISOString(),
              total: grandTotal,
              status: "processing" as const,
              items: items.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
              })),
              shippingAddress: `${shippingAddress.addressLine1}, ${shippingAddress.addressLine2 ? shippingAddress.addressLine2 + ", " : ""}${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pincode}`,
              trackingNumber: undefined,
            }
            addOrder(newOrder)
            clearCart()
            toast({
              title: "Order Placed!",
              description: "Your order has been placed successfully. Redirecting to order history...",
            })
            router.push("/profile?tab=orders")
          },
          prefill: {
            name: shippingAddress.fullName,
            email: user.email || "", // Use actual user email
            contact: shippingAddress.phone,
          },
          theme: {
            color: "#F59E0B", // Amber color
          },
        }
        const rzp1 = new (window as any).Razorpay(options)
        rzp1.open()
      } else {
        toast({
          title: "Payment Error",
          description: "Failed to create Razorpay order. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      // COD or other direct payment methods
      const newOrder = {
        id: `ORD${Date.now()}`,
        userId: user.id, // Associate order with current user
        date: new Date().toISOString(),
        total: grandTotal,
        status: "processing" as const,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: `${shippingAddress.addressLine1}, ${shippingAddress.addressLine2 ? shippingAddress.addressLine2 + ", " : ""}${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pincode}`,
        trackingNumber: undefined,
      }
      addOrder(newOrder)
      clearCart()
      toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully. Redirecting to order history...",
      })
      router.push("/profile?tab=orders")
    }
  }

  if (!user || items.length === 0) {
    return null // Or a loading spinner/message
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Address & Payment Method */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  id="addressLine1"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  placeholder="House/Flat/Office No., Building Name, Street"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  value={shippingAddress.addressLine2}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                  placeholder="Landmark, Area"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={shippingAddress.state}
                    onValueChange={(value) => setShippingAddress({ ...shippingAddress, state: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                    placeholder="Enter pincode"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" disabled /> {/* COD disabled */}
                  <Label htmlFor="cod" className="flex items-center gap-2 text-muted-foreground">
                    <Wallet className="h-5 w-5" />
                    Cash on Delivery (COD) - Currently Unavailable
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay" className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Pay with Razorpay (Cards, UPI, Netbanking)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {buyItems.length > 0 && (
                <>
                  <h3 className="font-semibold text-md">Items for Purchase</h3>
                  <div className="space-y-2">
                    {buyItems.map((item) => (
                      <div key={`${item.id}-buy`} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                          <span className="text-sm">
                            {item.name} x {item.quantity}
                          </span>
                        </div>
                        <span className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                </>
              )}

              {rentItems.length > 0 && (
                <>
                  <h3 className="font-semibold text-md">Items for Rent</h3>
                  <div className="space-y-2">
                    {rentItems.map((item) => (
                      <div key={`${item.id}-rent`} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                          <span className="text-sm">
                            {item.name} x {item.quantity} ({item.rentDays || 1} days)
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          ₹{((item.rentPrice || item.price) * item.quantity * (item.rentDays || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                </>
              )}

              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                {shippingCharge === 0 ? (
                  <Badge className="bg-green-500 text-white">Free</Badge>
                ) : (
                  <span>₹{shippingCharge.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Tax ({settings.taxRate}%):</span>
                <span>₹{taxAmount.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms">
                  I agree to the{" "}
                  <Link href="/terms-of-service" className="text-amber-600 hover:underline" prefetch={false}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-amber-600 hover:underline" prefetch={false}>
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                onClick={handlePlaceOrder}
                disabled={!termsAccepted || items.length === 0}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
