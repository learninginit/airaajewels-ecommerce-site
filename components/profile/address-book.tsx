"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { type Address, INDIAN_STATES } from "@/lib/store"
import { Plus, Edit, Trash2, MapPin } from "lucide-react"

interface AddressBookProps {
  userAddresses: Address[]
  updateUserAddresses: (addresses: Address[]) => void
}

export default function AddressBook({ userAddresses, updateUserAddresses }: AddressBookProps) {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>(userAddresses)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

  useEffect(() => {
    setAddresses(userAddresses || []) // Ensure addresses is always an array
  }, [userAddresses])

  const handleSaveAddress = () => {
    if (!currentAddress) return

    const { fullName, phone, addressLine1, city, state, pincode } = currentAddress
    if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required address fields.",
        variant: "destructive",
      })
      return
    }

    let updatedAddresses: Address[]
    if (currentAddress.id) {
      // Update existing address
      updatedAddresses = addresses.map((addr) => (addr.id === currentAddress.id ? { ...currentAddress } : addr))
    } else {
      // Add new address
      const newAddress: Address = {
        ...currentAddress,
        id: `addr-${Date.now()}`, // Simple unique ID
      }
      updatedAddresses = [...addresses, newAddress]
    }

    // Handle default address logic
    if (currentAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === currentAddress.id ? { ...addr, isDefault: true } : { ...addr, isDefault: false },
      )
    } else if (updatedAddresses.filter((a) => a.isDefault).length === 0 && updatedAddresses.length > 0) {
      // If no default is set and there are addresses, make the first one default
      updatedAddresses[0] = { ...updatedAddresses[0], isDefault: true }
    }

    setAddresses(updatedAddresses)
    updateUserAddresses(updatedAddresses)
    setIsModalOpen(false)
    toast({
      title: "Address Saved",
      description: "Your address has been successfully saved.",
    })
  }

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id)
    // If the deleted address was default, and there are other addresses, set a new default
    if (addresses.find((addr) => addr.id === id)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0] = { ...updatedAddresses[0], isDefault: true }
    }
    setAddresses(updatedAddresses)
    updateUserAddresses(updatedAddresses)
    toast({
      title: "Address Deleted",
      description: "The address has been removed.",
    })
  }

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map((addr) =>
      addr.id === id ? { ...addr, isDefault: true } : { ...addr, isDefault: false },
    )
    setAddresses(updatedAddresses)
    updateUserAddresses(updatedAddresses)
    toast({
      title: "Default Address Set",
      description: "Your default shipping address has been updated.",
    })
  }

  const openAddModal = () => {
    setCurrentAddress({
      id: "",
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: addresses.length === 0, // New address is default if it's the first one
    })
    setIsModalOpen(true)
  }

  const openEditModal = (address: Address) => {
    setCurrentAddress({ ...address })
    setIsModalOpen(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Your Addresses
        </CardTitle>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4 mr-2" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentAddress?.id ? "Edit Address" : "Add New Address"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={currentAddress?.fullName || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress!, fullName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={currentAddress?.phone || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress!, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="addressLine1" className="text-right">
                  Address Line 1
                </Label>
                <Input
                  id="addressLine1"
                  value={currentAddress?.addressLine1 || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress!, addressLine1: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="addressLine2" className="text-right">
                  Address Line 2
                </Label>
                <Input
                  id="addressLine2"
                  value={currentAddress?.addressLine2 || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress!, addressLine2: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  value={currentAddress?.city || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress!, city: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  State
                </Label>
                <Select
                  value={currentAddress?.state || ""}
                  onValueChange={(value) => setCurrentAddress({ ...currentAddress!, state: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pincode" className="text-right">
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  value={currentAddress?.pincode || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress!, pincode: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isDefault" className="text-right">
                  Set as Default
                </Label>
                <Checkbox
                  id="isDefault"
                  checked={currentAddress?.isDefault || false}
                  onCheckedChange={(checked) =>
                    setCurrentAddress({ ...currentAddress!, isDefault: checked as boolean })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveAddress}>Save Address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">No addresses saved. Add a new one!</div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold">{address.fullName}</p>
                <p className="text-sm text-muted-foreground">{address.phone}</p>
                <p className="text-sm">
                  {address.addressLine1}
                  {address.addressLine2 && `, ${address.addressLine2}`}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>
                {address.isDefault && (
                  <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-700">
                    Default Address
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => openEditModal(address)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
                {!address.isDefault && (
                  <Button variant="outline" onClick={() => handleSetDefault(address.id)}>
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
