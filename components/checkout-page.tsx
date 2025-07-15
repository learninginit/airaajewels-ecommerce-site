"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Truck, Shield, ArrowLeft, Tag, X, ShoppingCart, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore, useAuthStore, useAdminStore, INDIAN_STATES } from "@/lib/store"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CheckoutPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const { user, requireAuth } = useAuthStore()
  const {
    items,
    getSubtotal,
    getShipping,
    getTax,
    getDiscount,
    getTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    getBuyItems,
    getRentItems,
  } = useCartStore()
  const { settings, validateCoupon } = useAdminStore()

  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!requireAuth()) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout",
        variant: "destructive",
      })
      router.push("/auth/login")
    }
  }, [requireAuth, router, toast])

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const subtotal = getSubtotal()
  const shipping = getShipping()
  const tax = getTax()
  const discount = getDiscount()
  const total = getTotal()

  const buyItems = getBuyItems()
  const rentItems = getRentItems()

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a coupon code",
        variant: "destructive",
      })
      return
    }

    setIsApplyingCoupon(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const coupon = validateCoupon(couponCode)

    if (!coupon) {
      toast({
        title: "Invalid Coupon",
        description: "This coupon code is invalid or has expired",
        variant: "destructive",
      })
      setIsApplyingCoupon(false)
      return
    }

    if (subtotal < coupon.minOrderAmount) {
      toast({
        title: "Minimum Order Not Met",
        description: `This coupon requires a minimum order of ₹${coupon.minOrderAmount.toLocaleString()}`,
        variant: "destructive",
      })
      setIsApplyingCoupon(false)
      return
    }

    applyCoupon(coupon)
    setCouponCode("")
    setIsApplyingCoupon(false)

    toast({
      title: "Coupon Applied!",
      description: `You saved ₹${getDiscount().toLocaleString()} with code ${coupon.code}`,
    })
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your order",
    })
  }

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (
      !shippingAddress.firstName ||
      !shippingAddress.lastName ||
      !shippingAddress.email ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details",
        variant: "destructive",
      })
      return
    }

    try {
      // Create Razorpay order
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          productId: "checkout",
          type: "purchase",
          couponCode: appliedCoupon?.code,
          discount: discount,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Clear cart after successful order
        clearCart()

        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. You will receive a confirmation email shortly.",
        })

        // Redirect to order confirmation or profile
        router.push("/profile?tab=orders")
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user || items.length === 0) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your order securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={shippingAddress.firstName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={shippingAddress.lastName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={shippingAddress.state}
                    onValueChange={(value) => setShippingAddress({ ...shippingAddress, state: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((state) => (
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
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Razorpay</div>
                        <div className="text-sm text-muted-foreground">Credit/Debit Card, UPI, Net Banking</div>
                      </div>
                      <div className="text-sm font-medium text-green-600">Recommended</div>
                    </div>
                  </Label>
                </div>

                {settings.codEnabled && (
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                      </div>
                    </Label>
                  </div>
                )}
              </RadioGroup>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">Your payment information is secure and encrypted</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Purchase Items */}
              {buyItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="font-medium">Purchase Items ({buyItems.length})</span>
                  </div>
                  <div className="space-y-3">
                    {buyItems.map((item) => (
                      <div key={`${item.id}-${item.type}`} className="flex items-center space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <div className="flex items-center space-x-2">
                            {item.mrp > item.price && (
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{item.mrp.toLocaleString()}
                              </span>
                            )}
                            <span className="text-sm font-medium">₹{item.price.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">x {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rental Items */}
              {rentItems.length > 0 && (
                <div className="space-y-3">
                  {buyItems.length > 0 && <Separator />}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Rental Items ({rentItems.length})</span>
                  </div>
                  <div className="space-y-3">
                    {rentItems.map((item) => (
                      <div key={`${item.id}-${item.type}`} className="flex items-center space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <Badge variant="secondary" className="text-xs mb-1">
                            Rent ({item.rentDays} days)
                          </Badge>
                          <div className="text-sm">
                            <div>Rent: ₹{((item.rentPrice || 0) * (item.rentDays || 1)).toLocaleString()}</div>
                            <div className="text-green-600">
                              Security: ₹{(item.securityDeposit || 0).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Coupon Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Coupon Code</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <div className="font-medium text-green-800">{appliedCoupon.code}</div>
                      <div className="text-sm text-green-600">You saved ₹{discount.toLocaleString()}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveCoupon}
                      className="text-green-600 hover:text-green-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                      variant="outline"
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                    {subtotal >= settings.freeShippingThreshold && shipping === 0 && (
                      <span className="text-xs ml-1">(Above ₹{settings.freeShippingThreshold})</span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax ({settings.taxRate}%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Place Order - ₹{total.toLocaleString()}
              </Button>

              <div className="text-center text-xs text-muted-foreground space-y-1">
                <p>By placing this order, you agree to our Terms & Conditions</p>
                <p>Secure checkout with SSL encryption</p>
                <p>30-day return policy on purchases</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
