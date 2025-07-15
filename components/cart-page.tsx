"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCartStore, useAdminStore, useAuthStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Package, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ShoppingCart from "@/components/ui/shopping-cart" // Declared the ShoppingCart variable

export default function CartPage() {
  const { items, removeCartItem, updateCartItemQuantity, getCartTotal } = useCartStore()
  const { user } = useAuthStore()
  const { settings } = useAdminStore()
  const { toast } = useToast()

  const buyItems = items.filter((item) => item.type === "buy")
  const rentItems = items.filter((item) => item.type === "rent")

  const subtotalBuy = buyItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const subtotalRent = rentItems.reduce(
    (sum, item) => sum + (item.rentPrice || item.price) * item.quantity * (item.rentDays || 1),
    0,
  )
  const subtotal = subtotalBuy + subtotalRent

  const shippingFee = subtotal < settings.freeShippingThreshold && buyItems.length > 0 ? 150 : 0
  const gstAmount = (subtotal + shippingFee) * (settings.taxRate / 100)
  const totalAmount = subtotal + shippingFee + gstAmount

  const handleQuantityChange = (id: string, type: "buy" | "rent", quantity: number) => {
    if (quantity < 1) return
    updateCartItemQuantity(id, type, quantity)
  }

  const handleRemoveItem = (id: string, type: "buy" | "rent") => {
    removeCartItem(id, type)
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
      variant: "default",
    })
  }

  const handleRentDaysChange = (id: string, quantity: number) => {
    if (quantity < 1) return
    // This is a simplified update. In a real app, you'd update the specific rentDays for the item.
    // For now, we'll just update the quantity which is used in calculation.
    updateCartItemQuantity(id, "rent", quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Shopping Cart</h1>
        <p className="text-muted-foreground">Review your items before checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" />
                <p className="mt-4 text-lg font-semibold">Your cart is empty.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button asChild className="mt-6 bg-amber-500 hover:bg-amber-600 text-white">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {buyItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" /> Items for Purchase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {buyItems.map((item) => (
                      <div
                        key={`${item.id}-buy`}
                        className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1 grid gap-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Price: ₹{item.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(item.id, "buy", item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, "buy", Number.parseInt(e.target.value))}
                              className="w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(item.id, "buy", item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id, "buy")}>
                            <Trash2 className="h-5 w-5 text-red-500" />
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
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" /> Items for Rent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rentItems.map((item) => (
                      <div
                        key={`${item.id}-rent`}
                        className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1 grid gap-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Rent Price: ₹{(item.rentPrice || item.price).toLocaleString()}/day
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleRentDaysChange(item.id, item.rentDays ? item.rentDays - 1 : 1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={item.rentDays || 1}
                              onChange={(e) =>
                                updateCartItemQuantity(item.id, "rent", item.quantity, Number.parseInt(e.target.value))
                              }
                              className="w-20 text-center"
                              min={1}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleRentDaysChange(item.id, item.rentDays ? item.rentDays + 1 : 1)}
                            >
                              +
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(item.id, "rent", item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, "rent", Number.parseInt(e.target.value))}
                              className="w-16 text-center"
                              min={1}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(item.id, "rent", item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-semibold">
                            ₹{((item.rentPrice || item.price) * item.quantity * (item.rentDays || 1)).toLocaleString()}
                          </span>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id, "rent")}>
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                {shippingFee === 0 ? (
                  <Badge className="bg-green-500 text-white">Free</Badge>
                ) : (
                  <span>₹{shippingFee.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>GST ({settings.taxRate}%)</span>
                <span>₹{gstAmount.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
