"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, ExternalLink, Instagram, Twitter } from "lucide-react"

interface SocialMediaBuzzProps {
  productId: string
}

const socialPosts = [
  {
    id: 1,
    platform: "instagram",
    username: "@priya_styles",
    content:
      "Absolutely in love with my new necklace from @airaajewels! The craftsmanship is incredible ✨ #AiraaJewels #DiamondNecklace",
    image: "/placeholder.svg?height=300&width=300",
    likes: 245,
    comments: 18,
    timestamp: "2 hours ago",
    verified: true,
  },
  {
    id: 2,
    platform: "twitter",
    username: "@fashionista_meera",
    content:
      "Rented this gorgeous piece for my sister's wedding from @airaajewels. Perfect service and stunning jewelry! Highly recommend 💎",
    image: "/placeholder.svg?height=300&width=300",
    likes: 89,
    comments: 12,
    timestamp: "1 day ago",
    verified: false,
  },
  {
    id: 3,
    platform: "instagram",
    username: "@wedding_diaries_",
    content:
      "Client wore this beautiful necklace for her engagement shoot. Thank you @airaajewels for the perfect piece! 📸✨",
    image: "/placeholder.svg?height=300&width=300",
    likes: 567,
    comments: 34,
    timestamp: "3 days ago",
    verified: true,
  },
]

export default function SocialMediaBuzz({ productId }: SocialMediaBuzzProps) {
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-500" />
      default:
        return <Share2 className="h-4 w-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "border-pink-200 bg-pink-50"
      case "twitter":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Share2 className="h-5 w-5" />
          <span>Social Media Buzz</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          See what our customers are saying about this product on social media
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {socialPosts.map((post) => (
            <div key={post.id} className={`border rounded-lg p-4 ${getPlatformColor(post.platform)}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                    {getPlatformIcon(post.platform)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-sm">{post.username}</span>
                    {post.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                    <span className="text-muted-foreground text-xs">{post.timestamp}</span>
                  </div>

                  <p className="text-sm mb-3 leading-relaxed">
                    {expandedPost === post.id || post.content.length <= 150
                      ? post.content
                      : `${post.content.substring(0, 150)}...`}
                    {post.content.length > 150 && (
                      <button
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        className="text-amber-600 hover:text-amber-700 ml-1 text-xs font-medium"
                      >
                        {expandedPost === post.id ? "Show less" : "Show more"}
                      </button>
                    )}
                  </p>

                  {post.image && (
                    <div className="mb-3">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt="Social media post"
                        width={300}
                        height={300}
                        className="rounded-lg max-w-full h-auto"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{post.comments}</span>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center pt-4">
            <Button variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent">
              Load More Posts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
