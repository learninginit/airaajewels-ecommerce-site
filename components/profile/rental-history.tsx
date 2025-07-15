"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useOrdersStore } from "@/lib/store"

interface RentalHistoryProps {
  userId: string
}

export default function RentalHistory({ userId }: RentalHistoryProps) {
  const { rentals } = useOrdersStore()

  const userRentals = rentals.filter((rental) => rental.userId === userId)

  if (userRentals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rental History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400">You have no rental history yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {userRentals.map((rental) => (
        <Card key={rental.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Rental {rental.id}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Rented on {new Date(rental.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${rental.status === "returned" ? "text-green-600" : "text-amber-600"}`}>
                {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
              </span>
              <span className="text-lg font-bold">₹{rental.total.toLocaleString()}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {rental.items.map((item) => (
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
              </div>
            ))}
            <Separator />
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Rental Period:</span> {rental.rentalPeriod}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
