"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  type: "buy" | "rent"
  rentDays?: number
}

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "AJ001",
      name: "Diamond Elegance Necklace",
      price: 25000,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 1,
      type: "buy",
    },
    {
      id: "AJ002",
      name: "Golden Rose Earrings",
      price: 1500,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 1,
      type: "rent",
      rentDays: 3,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    })
  }

  const applyPromoCode = () => {
    if (promoCode === "WELCOME10") {
      setDiscount(0.1)
      toast({
        title: "Promo Code Applied",
        description: "10% discount applied to your order",
      })
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      })
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const shipping = subtotal > 50000 ? 0 : 500
  const total = subtotal - discountAmount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some beautiful jewelry to get started</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={item.type === "buy" ? "default" : "secondary"}>
                            {item.type === "buy" ? "Purchase" : `Rent (${item.rentDays} days)`}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-lg">₹{(item.price * item.quantity).toLocaleString()}</div>
                        {item.type === "rent" && (
                          <div className="text-sm text-muted-foreground">₹{item.price.toLocaleString()} total</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Code</label>
                <div className="flex space-x-2">
                  <Input placeholder="Enter code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <Button variant="outline" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Free shipping on orders over ₹50,000</p>
                <p>Secure checkout with SSL encryption</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
