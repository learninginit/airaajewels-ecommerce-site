"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar, CheckCircle, XCircle, Search, RefreshCw, MessageCircle, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useOrdersStore } from "@/lib/store"
import Link from "next/link"

export default function RentalHistory() {
  const { toast } = useToast()
  const { rentals } = useOrdersStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch =
      rental.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || rental.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "rented":
        return <Calendar className="h-4 w-4" />
      case "returned":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <XCircle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "rented":
        return "bg-blue-500"
      case "returned":
        return "bg-green-500"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleExtendRental = (rentalId: string) => {
    toast({
      title: "Rental Extension Request",
      description: `Request to extend rental ${rentalId} has been sent.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rental History</CardTitle>
          <p className="text-muted-foreground">Track and manage your jewelry rentals</p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search rentals..."
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
                <SelectItem value="all">All Rentals</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rentals List */}
          <div className="space-y-4">
            {filteredRentals.map((rental) => (
              <Card key={rental.id} className="border">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-semibold">{rental.id}</div>
                        <div className="text-sm text-muted-foreground">
                          Rented from {new Date(rental.date).toLocaleDateString()} to{" "}
                          {new Date(rental.returnDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getStatusColor(rental.status)} text-white`}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(rental.status)}
                          <span className="capitalize">{rental.status}</span>
                        </span>
                      </Badge>
                      <div className="text-right">
                        <div className="font-semibold">₹{rental.total.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{rental.items.length} item(s)</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rental Items */}
                  <div className="space-y-3">
                    {rental.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} • Rent: ₹{item.rentPrice.toLocaleString()}/day • Days:{" "}
                            {item.rentalDays}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Rental Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <div>Rental Period: {rental.items[0]?.rentalDays} days</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {rental.status === "rented" && (
                        <Button variant="outline" size="sm" onClick={() => handleExtendRental(rental.id)}>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Extend Rental
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

          {filteredRentals.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rental history found</h3>
              <p className="text-muted-foreground mb-4">You haven't rented any jewelry yet.</p>
              <Button asChild>
                <Link href="/products">Explore Rental Options</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
