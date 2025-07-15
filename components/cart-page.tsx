"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore, useAuthStore, useAdminStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const { requireAuth } = useAuthStore()
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalItems,
    getSubtotal,
    getShipping,
    getTax,
    getDiscount,
    getTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore()
  const { settings, validateCoupon } = useAdminStore()

  const subtotal = getSubtotal()
  const shipping = getShipping()
  const tax = getTax()
  const discount = getDiscount()
  const total = getTotal()

  const handleQuantityChange = (itemKey: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(itemKey, newQuantity)
  }

  const handleRemoveItem = (itemKey: string, name: string) => {
    removeItem(itemKey)
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart`,
    })
  }

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
      description: "Coupon has been removed from your cart",
    })
  }

  const handleCheckout = () => {
    if (!requireAuth()) {
      toast({
        title: "Login Required",
        description: "Please login to proceed to checkout",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button
            asChild
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <Link href="/products">
              Start Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{getTotalItems()} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemKey = `${item.id}-${item.type}`
            return (
              <Card key={itemKey}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={item.type === "buy" ? "default" : "secondary"}>
                              {item.type === "buy" ? "Purchase" : `Rent (${item.rentDays} days)`}
                            </Badge>
                          </div>

                          <div className="mt-2">
                            {item.mrp > item.price && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{item.mrp.toLocaleString()}
                                </span>
                                <Badge variant="destructive" className="text-xs">
                                  {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                                </Badge>
                              </div>
                            )}
                            <div className="text-xl font-bold text-amber-600">₹{item.price.toLocaleString()}</div>
                            {item.type === "rent" && item.securityDeposit && (
                              <div className="text-sm text-green-600">
                                + Security Deposit: ₹{item.securityDeposit.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(itemKey, item.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {item.type === "buy" && (
                        <div className="flex items-center space-x-3 mt-4">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(itemKey, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = Number.parseInt(e.target.value)
                                if (newQuantity > 0) {
                                  handleQuantityChange(itemKey, newQuantity)
                                }
                              }}
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(itemKey, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <span>Subtotal ({getTotalItems()} items)</span>
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
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <div className="text-center text-xs text-muted-foreground space-y-1">
                <p>Secure checkout with SSL encryption</p>
                <p>Free shipping on orders over ₹{settings.freeShippingThreshold.toLocaleString()}</p>
                <p>30-day return policy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
