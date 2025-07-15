"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Address {
  id: string
  street: string
  city: string
  state: string
  zip: string
}

interface User {
  id: string
  name: string
  email: string
  addresses?: Address[]
}

interface AddressBookProps {
  userAddresses: Address[]
  updateUserAddresses: (addresses: Address[]) => void
}

const AddressBook: React.FC<AddressBookProps> = ({ userAddresses, updateUserAddresses }) => {
  const [addresses, setAddresses] = useState<Address[]>(userAddresses)

  useEffect(() => {
    setAddresses(userAddresses)
  }, [userAddresses])

  const handleAddressChange = (index: number, field: string, value: string) => {
    const newAddresses = [...addresses]
    // Type assertion to tell TypeScript that field is a key of Address
    newAddresses[index] = { ...newAddresses[index], [field]: value }
    setAddresses(newAddresses)
  }

  const handleAddAddress = () => {
    const newAddress: Address = { id: String(Date.now()), street: "", city: "", state: "", zip: "" }
    setAddresses([...addresses, newAddress])
  }

  const handleRemoveAddress = (index: number) => {
    const newAddresses = [...addresses]
    newAddresses.splice(index, 1)
    setAddresses(newAddresses)
  }

  const handleSaveAddresses = () => {
    updateUserAddresses(addresses)
  }

  return (
    <div>
      <h3>Address Book</h3>
      {addresses.map((address, index) => (
        <div key={address.id}>
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => handleAddressChange(index, "street", e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => handleAddressChange(index, "city", e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => handleAddressChange(index, "state", e.target.value)}
          />
          <input
            type="text"
            placeholder="Zip"
            value={address.zip}
            onChange={(e) => handleAddressChange(index, "zip", e.target.value)}
          />
          <button onClick={() => handleRemoveAddress(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddAddress}>Add Address</button>
      <button onClick={handleSaveAddresses}>Save Addresses</button>
    </div>
  )
}

interface ProfilePageProps {
  userId: string
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        // Simulate fetching user data
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
        const mockUser: User = {
          id: userId,
          name: "John Doe",
          email: "john.doe@example.com",
          addresses: [{ id: "1", street: "123 Main St", city: "Anytown", state: "CA", zip: "91234" }],
        }
        setUser(mockUser)
      } catch (e: any) {
        setError(e.message || "Failed to fetch user")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  const updateUserAddresses = (newAddresses: Address[]) => {
    if (user) {
      setUser({ ...user, addresses: newAddresses })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>User not found.</div>
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <AddressBook userAddresses={user?.addresses ?? []} updateUserAddresses={updateUserAddresses} />
    </div>
  )
}

export default ProfilePage
