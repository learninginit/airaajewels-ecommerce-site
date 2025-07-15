"use client"

import type React from "react"
import { useState } from "react"

interface Address {
  id: string
  street: string
  city: string
  state: string
  zip: string
}

interface AddressBookProps {
  userAddresses?: Address[]
}

const AddressBook: React.FC<AddressBookProps> = ({ userAddresses }) => {
  const [addresses, setAddresses] = useState(userAddresses ?? [])

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Math.random().toString(36).substring(7), // Generate a random ID
      street: "",
      city: "",
      state: "",
      zip: "",
    }
    setAddresses([...addresses, newAddress])
  }

  const handleUpdateAddress = (id: string, updatedAddress: Partial<Address>) => {
    setAddresses(addresses.map((address) => (address.id === id ? { ...address, ...updatedAddress } : address)))
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  return (
    <div>
      <h3>Address Book</h3>
      {addresses.map((address) => (
        <div key={address.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <div>
            <strong>Street:</strong>
            <input
              type="text"
              value={address.street}
              onChange={(e) => handleUpdateAddress(address.id, { street: e.target.value })}
            />
          </div>
          <div>
            <strong>City:</strong>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleUpdateAddress(address.id, { city: e.target.value })}
            />
          </div>
          <div>
            <strong>State:</strong>
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleUpdateAddress(address.id, { state: e.target.value })}
            />
          </div>
          <div>
            <strong>Zip:</strong>
            <input
              type="text"
              value={address.zip}
              onChange={(e) => handleUpdateAddress(address.id, { zip: e.target.value })}
            />
          </div>
          <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddAddress}>Add Address</button>
    </div>
  )
}

export default AddressBook
