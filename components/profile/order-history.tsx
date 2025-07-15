"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, XCircle, Search, Download, Star, MessageCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useOrdersStore } from "@/lib/store"

export default function OrderHistory() {
  const { toast } = useToast()
  const { orders } = useOrdersStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-orange-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleReorder = (orderId: string) => {
    toast({
      title: "Items Added to Cart",
      description: "All items from this order have been added to your cart.",
    })
  }

  const handleTrackOrder = (trackingNumber: string) => {
    toast({
      title: "Tracking Information",
      description: `Tracking number: ${trackingNumber}`,
    })
  }

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice for order ${orderId} has been downloaded.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <p className="text-muted-foreground">Track and manage your jewelry orders</p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="border">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-semibold">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </Badge>
                      <div className="text-right">
                        <div className="font-semibold">₹{order.total.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{order.items.length} item(s)</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">
                            <Link href={`/products/${item.id}`} className="hover:text-amber-600">
                              {item.name}
                            </Link>
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} • ₹{item.price.toLocaleString()}
                          </div>
                        </div>
                        {order.status === "delivered" && (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <div>Delivered to: {order.shippingAddress}</div>
                      {order.trackingNumber && <div>Tracking: {order.trackingNumber}</div>}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.trackingNumber && order.status !== "delivered" && (
                        <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.trackingNumber!)}>
                          <Truck className="h-4 w-4 mr-1" />
                          Track Order
                        </Button>
                      )}

                      <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(order.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>

                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm" onClick={() => handleReorder(order.id)}>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Reorder
                        </Button>
                      )}

                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
