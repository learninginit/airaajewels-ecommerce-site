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
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, CheckCircle, AlertCircle, Search, Download, Star, RefreshCw, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useOrdersStore } from "@/lib/store"

export default function RentalHistory() {
  const { toast } = useToast()
  const { rentals } = useOrdersStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch =
      rental.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || rental.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "overdue":
        return "bg-red-500"
      case "cancelled":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleExtendRental = (rentalId: string) => {
    toast({
      title: "Extension Request Sent",
      description: "We'll contact you shortly to confirm the extension.",
    })
  }

  const handleReturnItem = (rentalId: string) => {
    toast({
      title: "Return Initiated",
      description: "Return process has been started. Check your email for pickup details.",
    })
  }

  const handleRentAgain = (itemId: string) => {
    toast({
      title: "Redirecting to Product",
      description: "Taking you to the product page to rent again.",
    })
  }

  const getRentalProgress = (rental: any) => {
    if (rental.status !== "active" || !rental.daysRemaining) return 100
    const totalDays = rental.daysRented
    const daysUsed = totalDays - rental.daysRemaining
    return (daysUsed / totalDays) * 100
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rental History</CardTitle>
          <p className="text-muted-foreground">Track your jewelry rentals and returns</p>
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                          {new Date(rental.startDate).toLocaleDateString()} -{" "}
                          {new Date(rental.endDate).toLocaleDateString()}
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
                        <div className="font-semibold">₹{rental.totalAmount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{rental.daysRented} days</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rental Item */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src={rental.item.image || "/placeholder.svg"}
                      alt={rental.item.name}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">
                        <Link href={`/products/${rental.item.id}`} className="hover:text-amber-600">
                          {rental.item.name}
                        </Link>
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        Daily Rate: ₹{rental.item.dailyRate.toLocaleString()} • Security Deposit: ₹
                        {rental.securityDeposit.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Rental Progress (for active rentals) */}
                  {rental.status === "active" && rental.daysRemaining !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rental Progress</span>
                        <span>{rental.daysRemaining} days remaining</span>
                      </div>
                      <Progress value={getRentalProgress(rental)} className="h-2" />
                    </div>
                  )}

                  {/* Overdue Warning */}
                  {rental.status === "overdue" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2 text-red-800">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium">Overdue Return</span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">
                        Please return this item immediately to avoid additional charges.
                      </p>
                    </div>
                  )}

                  <Separator />

                  {/* Rental Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <div>Total Amount: ₹{rental.totalAmount.toLocaleString()}</div>
                      <div>Security Deposit: ₹{rental.securityDeposit.toLocaleString()}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {rental.status === "active" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleExtendRental(rental.id)}>
                            <Plus className="h-4 w-4 mr-1" />
                            Extend
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReturnItem(rental.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Return
                          </Button>
                        </>
                      )}

                      {rental.status === "overdue" && (
                        <Button variant="destructive" size="sm" onClick={() => handleReturnItem(rental.id)}>
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Return Now
                        </Button>
                      )}

                      {rental.status === "completed" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleRentAgain(rental.item.id)}>
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Rent Again
                          </Button>
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </>
                      )}

                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRentals.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rentals found</h3>
              <p className="text-muted-foreground mb-4">You haven't rented any jewelry yet.</p>
              <Button asChild>
                <Link href="/rent">Browse Rentals</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
