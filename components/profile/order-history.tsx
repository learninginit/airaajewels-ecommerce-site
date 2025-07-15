"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useOrdersStore } from "@/lib/store"
import ReviewModal from "./review-modal"
import { useToast } from "@/hooks/use-toast"

interface OrderHistoryProps {
  userId: string
}

export default function OrderHistory({ userId }: OrderHistoryProps) {
  const { orders } = useOrdersStore()
  const { toast } = useToast()

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [currentReviewProductId, setCurrentReviewProductId] = useState<string | null>(null)
  const [currentReviewOrderId, setCurrentReviewOrderId] = useState<string | null>(null)

  const userOrders = orders.filter((order) => order.userId === userId)

  const handleReview = (productId: string, orderId: string) => {
    setCurrentReviewProductId(productId)
    setCurrentReviewOrderId(orderId)
    setIsReviewModalOpen(true)
  }

  const handleReviewSubmit = (rating: number, reviewText: string) => {
    toast({
      title: "Review Submitted!",
      description: `Thank you for reviewing product ${currentReviewProductId} from order ${currentReviewOrderId}! Rating: ${rating} stars. Review: "${reviewText}"`,
      variant: "success",
    })
    setIsReviewModalOpen(false)
    setCurrentReviewProductId(null)
    setCurrentReviewOrderId(null)
  }

  if (userOrders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400">You have no orders yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {userOrders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Order {order.id}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ordered on {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${order.status === "delivered" ? "text-green-600" : "text-amber-600"}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <span className="text-lg font-bold">₹{order.total.toLocaleString()}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Price: ₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm" onClick={() => handleReview(item.id, order.id)}>
                    Review
                  </Button>
                )}
              </div>
            ))}
            <Separator />
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Shipping Address:</span> {order.shippingAddress}
              </p>
              {order.trackingNumber && (
                <p>
                  <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Invoice
              </Button>
              <Button variant="outline" size="sm">
                Reorder
              </Button>
              <Button variant="outline" size="sm">
                Support
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        productId={currentReviewProductId}
        orderId={currentReviewOrderId}
      />
    </div>
  )
}
