"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Eye, Package, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const { toast } = useToast()
  const [products, setProducts] = useState([
    {
      id: "AJ001",
      name: "Diamond Elegance Necklace",
      price: 25000,
      rentPrice: 2500,
      quantity: 5,
      category: "Necklaces",
      isRentable: true,
      isLive: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "AJ002",
      name: "Golden Rose Earrings",
      price: 15000,
      rentPrice: 1500,
      quantity: 8,
      category: "Earrings",
      isRentable: true,
      isLive: true,
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    rentPrice: "",
    quantity: "",
    category: "",
    description: "",
    isRentable: false,
    isLive: false,
  })

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const productId = `AJ${String(products.length + 1).padStart(3, "0")}`
    const product = {
      id: productId,
      name: newProduct.name,
      price: Number.parseInt(newProduct.price),
      rentPrice: newProduct.isRentable ? Number.parseInt(newProduct.rentPrice) : 0,
      quantity: Number.parseInt(newProduct.quantity),
      category: newProduct.category,
      isRentable: newProduct.isRentable,
      isLive: newProduct.isLive,
      image: "/placeholder.svg?height=200&width=200",
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      price: "",
      rentPrice: "",
      quantity: "",
      category: "",
      description: "",
      isRentable: false,
      isLive: false,
    })

    toast({
      title: "Success",
      description: `Product ${productId} added successfully`,
    })
  }

  const toggleProductStatus = (productId: string) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, isLive: !product.isLive } : product)),
    )

    toast({
      title: "Status Updated",
      description: "Product status has been updated",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your jewelry inventory and orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage your jewelry collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rent Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price.toLocaleString()}</TableCell>
                      <TableCell>{product.isRentable ? `₹${product.rentPrice.toLocaleString()}` : "N/A"}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge variant={product.isLive ? "default" : "secondary"}>
                            {product.isLive ? "Live" : "Draft"}
                          </Badge>
                          {product.isRentable && (
                            <Badge variant="outline" className="text-green-600">
                              Rentable
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={product.isLive ? "destructive" : "default"}
                            onClick={() => toggleProductStatus(product.id)}
                          >
                            {product.isLive ? "Hide" : "Go Live"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-product">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Add a new jewelry item to your inventory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Necklaces">Necklaces</SelectItem>
                      <SelectItem value="Earrings">Earrings</SelectItem>
                      <SelectItem value="Rings">Rings</SelectItem>
                      <SelectItem value="Bracelets">Bracelets</SelectItem>
                      <SelectItem value="Bangles">Bangles</SelectItem>
                      <SelectItem value="Sets">Sets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Enter price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    placeholder="Enter quantity"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="rentable"
                    checked={newProduct.isRentable}
                    onCheckedChange={(checked) => setNewProduct({ ...newProduct, isRentable: checked })}
                  />
                  <Label htmlFor="rentable">Available for Rent</Label>
                </div>

                {newProduct.isRentable && (
                  <div className="space-y-2">
                    <Label htmlFor="rentPrice">Rent Price per Day (₹)</Label>
                    <Input
                      id="rentPrice"
                      type="number"
                      value={newProduct.rentPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, rentPrice: e.target.value })}
                      placeholder="Enter rent price"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="live"
                  checked={newProduct.isLive}
                  onCheckedChange={(checked) => setNewProduct({ ...newProduct, isLive: checked })}
                />
                <Label htmlFor="live">Make Live Immediately</Label>
              </div>

              <Button onClick={handleAddProduct} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#ORD001</TableCell>
                    <TableCell>Priya Sharma</TableCell>
                    <TableCell>Diamond Elegance Necklace</TableCell>
                    <TableCell>₹25,000</TableCell>
                    <TableCell>
                      <Badge>Processing</Badge>
                    </TableCell>
                    <TableCell>2024-01-15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#ORD002</TableCell>
                    <TableCell>Rahul Gupta</TableCell>
                    <TableCell>Golden Rose Earrings</TableCell>
                    <TableCell>₹15,000</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Shipped</Badge>
                    </TableCell>
                    <TableCell>2024-01-14</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rentals">
          <Card>
            <CardHeader>
              <CardTitle>Active Rentals</CardTitle>
              <CardDescription>Manage jewelry rentals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rental ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#RNT001</TableCell>
                    <TableCell>Anita Desai</TableCell>
                    <TableCell>Diamond Elegance Necklace</TableCell>
                    <TableCell>2024-01-10</TableCell>
                    <TableCell>2024-01-17</TableCell>
                    <TableCell>₹17,500</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#RNT002</TableCell>
                    <TableCell>Meera Patel</TableCell>
                    <TableCell>Golden Rose Earrings</TableCell>
                    <TableCell>2024-01-12</TableCell>
                    <TableCell>2024-01-15</TableCell>
                    <TableCell>₹4,500</TableCell>
                    <TableCell>
                      <Badge variant="outline">Returned</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
