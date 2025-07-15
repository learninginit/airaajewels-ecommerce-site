"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import OrderHistory from "@/components/profile/order-history"
import RentalHistory from "@/components/profile/rental-history"
import AddressBook from "@/components/profile/address-book"

export default function ProfilePage() {
  const { user, updateProfile, signOut, updateUserAddresses } = useAuthStore()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "profile"

  const [activeTab, setActiveTab] = useState(initialTab)
  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your profile.",
        variant: "destructive",
      })
    } else {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setPhone(user.phone)
    }
  }, [user, router, toast])

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const handleUpdateProfile = () => {
    if (user) {
      updateProfile({ firstName, lastName, email, phone })
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      })
    }
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    })
  }

  if (!user) {
    return null // Or a loading spinner/message
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
          <AvatarFallback className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-3xl font-bold">
            {getInitials(user.firstName, user.lastName)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Button onClick={handleUpdateProfile}>Save Changes</Button>
            </CardContent>
          </Card>
          <Button variant="outline" className="mt-6 w-full bg-transparent" onClick={handleSignOut}>
            Sign Out
          </Button>
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <OrderHistory userId={user.id} />
        </TabsContent>
        <TabsContent value="rentals" className="mt-6">
          <RentalHistory userId={user.id} />
        </TabsContent>
        <TabsContent value="addresses" className="mt-6">
          <AddressBook
            userAddresses={user.addresses || []}
            updateUserAddresses={(addresses) => updateUserAddresses(user.id, addresses)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
