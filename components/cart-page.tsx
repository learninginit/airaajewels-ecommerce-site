"use client"

import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore, useAdminStore } from "@/lib/store"

export default function CartPage() {
  const { toast } = useToast()
  const { items, removeCartItem, updateCartItemQuantity, clearCart, getCartTotal } = useCartStore()
  const { settings } = useAdminStore()

  const buyItems = items.filter((item) => item.type === "buy")
  const rentItems = items.filter((item) => item.type === "rent")

  const buyTotal = buyItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const rentTotal = rentItems.reduce((sum, item) => sum + item.price * item.quantity * (item.rentDays || 1), 0) // Assuming rentDays for calculation
  const subtotal = buyTotal + rentTotal

  const shippingCharge = subtotal < settings.freeShippingThreshold && buyItems.length > 0 ? 150 : 0 // Apply shipping only for buy items below threshold
  const taxAmount = (subtotal * settings.taxRate) / 100
  const grandTotal = subtotal + shippingCharge + taxAmount

  const handleRemoveItem = (id: string, type: "buy" | "rent") => {
    removeCartItem(id, type)
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleUpdateQuantity = (id: string, type: "buy" | "rent", quantity: number) => {
    if (quantity < 1) return
    updateCartItemQuantity(id, type, quantity)
  }

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }
    // Navigate to checkout page
    window.location.href = "/checkout"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Shopping Cart</h1>
        <p className="text-muted-foreground">Review your selected items before checkout</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {buyItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Items for Purchase</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {buyItems.map((item) => (
                    <div
                      key={`${item.id}-${item.type}`}
                      className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 grid gap-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Type: Purchase</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleUpdateQuantity(item.id, item.type, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, item.type, Number(e.target.value))}
                            className="w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleUpdateQuantity(item.id, item.type, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id, item.type)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {rentItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Items for Rent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rentItems.map((item) => (
                    <div
                      key={`${item.id}-${item.type}`}
                      className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 grid gap-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Type: Rental</p>
                        <p className="text-sm text-muted-foreground">Rent Price: ₹{item.price.toLocaleString()}/day</p>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`rent-days-${item.id}`}>Rental Days:</Label>
                          <Input
                            id={`rent-days-${item.id}`}
                            type="number"
                            value={item.rentDays || 1}
                            onChange={(e) =>
                              updateCartItemQuantity(item.id, item.type, item.quantity, Number(e.target.value))
                            }
                            className="w-20 text-center"
                            min={1}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{(item.price * item.quantity * (item.rentDays || 1)).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id, item.type)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal (Purchase):</span>
                  <span>₹{buyTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal (Rental):</span>
                  <span>₹{rentTotal.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span>{items.reduce((count, item) => count + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingCharge === 0 ? "Free" : `₹${shippingCharge.toLocaleString()}`}</span>
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
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
