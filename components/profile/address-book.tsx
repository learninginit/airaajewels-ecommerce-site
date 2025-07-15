"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Address {
  id: string
  type: "home" | "office" | "other"
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export default function AddressBook() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      addressLine1: "123 Main Street, Apartment 4B",
      addressLine2: "Near City Mall",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
    {
      id: "2",
      type: "office",
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      addressLine1: "456 Business Park, Floor 5",
      addressLine2: "Sector 21",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400070",
      isDefault: false,
    },
  ])

  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: "home",
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  })

  const handleAddAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.addressLine1 ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const address: Address = {
      id: Date.now().toString(),
      type: newAddress.type as "home" | "office" | "other",
      name: newAddress.name,
      phone: newAddress.phone,
      addressLine1: newAddress.addressLine1,
      addressLine2: newAddress.addressLine2,
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
      isDefault: newAddress.isDefault || false,
    }

    // If this is set as default, remove default from others
    if (address.isDefault) {
      setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: false })))
    }

    setAddresses((prev) => [...prev, address])
    setNewAddress({
      type: "home",
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    })
    setIsAddingAddress(false)

    toast({
      title: "Address Added",
      description: "Your new address has been saved successfully.",
    })
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setNewAddress(address)
    setIsAddingAddress(true)
  }

  const handleUpdateAddress = () => {
    if (!editingAddress) return

    const updatedAddress = {
      ...editingAddress,
      ...newAddress,
    } as Address

    // If this is set as default, remove default from others
    if (updatedAddress.isDefault) {
      setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: addr.id === updatedAddress.id ? true : false })))
    } else {
      setAddresses((prev) => prev.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr)))
    }

    setEditingAddress(null)
    setNewAddress({
      type: "home",
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    })
    setIsAddingAddress(false)

    toast({
      title: "Address Updated",
      description: "Your address has been updated successfully.",
    })
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
    toast({
      title: "Address Deleted",
      description: "The address has been removed from your address book.",
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: addr.id === id })))
    toast({
      title: "Default Address Updated",
      description: "This address is now set as your default shipping address.",
    })
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />
      case "office":
        return <Building className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Address Book</CardTitle>
              <p className="text-muted-foreground">Manage your shipping addresses</p>
            </div>
            <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Address Type</Label>
                      <Select
                        value={newAddress.type}
                        onValueChange={(value) =>
                          setNewAddress({ ...newAddress, type: value as "home" | "office" | "other" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      placeholder="House/Flat/Office No., Building Name, Street"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={newAddress.addressLine2}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                      placeholder="Landmark, Area (Optional)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={newAddress.state}
                        onValueChange={(value) => setNewAddress({ ...newAddress, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Gujarat">Gujarat</SelectItem>
                          <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isDefault"
                      checked={newAddress.isDefault}
                      onCheckedChange={(checked) => setNewAddress({ ...newAddress, isDefault: checked as boolean })}
                    />
                    <Label htmlFor="isDefault">Set as default address</Label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingAddress(false)
                        setEditingAddress(null)
                        setNewAddress({
                          type: "home",
                          name: "",
                          phone: "",
                          addressLine1: "",
                          addressLine2: "",
                          city: "",
                          state: "",
                          pincode: "",
                          isDefault: false,
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={editingAddress ? handleUpdateAddress : handleAddAddress}>
                      {editingAddress ? "Update Address" : "Add Address"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {addresses.map((address) => (
              <Card key={address.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getAddressIcon(address.type)}
                        <span className="font-medium capitalize">{address.type}</span>
                        {address.isDefault && <Badge variant="secondary">Default</Badge>}
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="font-medium">{address.name}</div>
                        <div>{address.phone}</div>
                        <div>{address.addressLine1}</div>
                        {address.addressLine2 && <div>{address.addressLine2}</div>}
                        <div>
                          {address.city}, {address.state} {address.pincode}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditAddress(address)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        disabled={address.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {!address.isDefault && (
                    <>
                      <Separator className="my-3" />
                      <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                        Set as Default
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}

            {addresses.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
                <p className="text-muted-foreground mb-4">Add your first address to get started</p>
                <Button onClick={() => setIsAddingAddress(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
