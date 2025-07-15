"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number, reviewText: string) => void
  productId: string | null
  orderId: string | null
}

export default function ReviewModal({ isOpen, onClose, onSubmit, productId, orderId }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const handleStarClick = (starValue: number) => {
    setRating(starValue)
  }

  const handleSubmit = () => {
    onSubmit(rating, reviewText)
    setRating(0)
    setReviewText("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Review</DialogTitle>
          <DialogDescription>
            Share your experience for product {productId} from order {orderId}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-700"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
