"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import {
  Package,
  Tag,
  TrendingUp,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAdminStore, useOrdersStore, type Coupon, type Product } from "@/lib/store"
import Image from "next/image"

export default function AdminDashboard() {
  const { toast } = useToast()
  const {
    settings,
    coupons,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    updateSettings,
  } = useAdminStore()
  const { orders, updateOrderStatus } = useOrdersStore()

  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [editingOrder, setEditingOrder] = useState<any>(null) // For order status/tracking update

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    mrp: "",
    price: "",
    rentPrice: "",
    securityDeposit: "",
    isRentable: false,
    quantity: "",
    description: "",
    image: "/placeholder.svg?height=100&width=100", // Default image
  })

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: "",
    minOrderAmount: "",
    maxDiscount: "",
    validFrom: "",
    validTo: "",
    usageLimit: "",
  })

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      category: "",
      mrp: "",
      price: "",
      rentPrice: "",
      securityDeposit: "",
      isRentable: false,
      quantity: "",
      description: "",
      image: "/placeholder.svg?height=100&width=100",
    })
    setEditingProduct(null)
    setIsAddProductOpen(false)
  }

  const handleAddOrUpdateProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.mrp || !newProduct.price || !newProduct.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Category, MRP, Price, Quantity).",
        variant: "destructive",
      })
      return
    }

    const productData = {
      name: newProduct.name,
      category: newProduct.category,
      mrp: Number.parseInt(newProduct.mrp),
      price: Number.parseInt(newProduct.price),
      rentPrice: newProduct.isRentable ? Number.parseInt(newProduct.rentPrice) : 0,
      securityDeposit: newProduct.isRentable ? Number.parseInt(newProduct.securityDeposit) : 0,
      isRentable: newProduct.isRentable,
      inStock: Number.parseInt(newProduct.quantity) > 0,
      quantity: Number.parseInt(newProduct.quantity),
      image: newProduct.image,
      description: newProduct.description,
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
      toast({
        title: "Product Updated",
        description: `${productData.name} has been updated.`,
      })
    } else {
      const newId = `AJ${String(products.length + 1).padStart(3, "0")}`
      addProduct({ id: newId, ...productData })
      toast({
        title: "Product Added",
        description: `${productData.name} has been added to inventory.`,
      })
    }
    resetProductForm()
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      category: product.category,
      mrp: product.mrp.toString(),
      price: product.price.toString(),
      rentPrice: product.rentPrice.toString(),
      securityDeposit: product.securityDeposit.toString(),
      isRentable: product.isRentable,
      quantity: product.quantity.toString(),
      description: product.description,
      image: product.image,
    })
    setIsAddProductOpen(true)
  }

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id)
      toast({
        title: "Product Deleted",
        description: `${name} has been removed from inventory.`,
      })
    }
  }

  const resetCouponForm = () => {
    setNewCoupon({
      code: "",
      type: "percentage",
      value: "",
      minOrderAmount: "",
      maxDiscount: "",
      validFrom: "",
      validTo: "",
      usageLimit: "",
    })
    setEditingCoupon(null)
    setIsAddCouponOpen(false)
  }

  const handleAddOrUpdateCoupon = () => {
    if (!newCoupon.code || !newCoupon.value || !newCoupon.validFrom || !newCoupon.validTo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the coupon.",
        variant: "destructive",
      })
      return
    }

    const couponData: Coupon = {
      id: editingCoupon ? editingCoupon.id : Date.now().toString(),
      code: newCoupon.code.toUpperCase(),
      type: newCoupon.type,
      value: Number.parseInt(newCoupon.value),
      minOrderAmount: Number.parseInt(newCoupon.minOrderAmount) || 0,
      maxDiscount: newCoupon.maxDiscount ? Number.parseInt(newCoupon.maxDiscount) : undefined,
      validFrom: newCoupon.validFrom,
      validTo: newCoupon.validTo,
      isActive: editingCoupon ? editingCoupon.isActive : true, // Maintain status if editing
      usageLimit: newCoupon.usageLimit ? Number.parseInt(newCoupon.usageLimit) : undefined,
      usedCount: editingCoupon ? editingCoupon.usedCount : 0,
    }

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponData)
      toast({
        title: "Coupon Updated",
        description: `Coupon ${couponData.code} has been updated.`,
      })
    } else {
      addCoupon(couponData)
      toast({
        title: "Coupon Created",
        description: `Coupon ${couponData.code} has been created.`,
      })
    }
    resetCouponForm()
  }

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setNewCoupon({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minOrderAmount: coupon.minOrderAmount.toString(),
      maxDiscount: coupon.maxDiscount?.toString() || "",
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      usageLimit: coupon.usageLimit?.toString() || "",
    })
    setIsAddCouponOpen(true)
  }

  const handleDeleteCoupon = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to delete coupon ${code}?`)) {
      deleteCoupon(id)
      toast({
        title: "Coupon Deleted",
        description: `Coupon ${code} has been deleted.`,
      })
    }
  }

  const toggleCouponStatus = (coupon: Coupon) => {
    updateCoupon(coupon.id, { isActive: !coupon.isActive })
    toast({
      title: coupon.isActive ? "Coupon Deactivated" : "Coupon Activated",
      description: `Coupon ${coupon.code} has been ${coupon.isActive ? "deactivated" : "activated"}.`,
    })
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string, trackingNumber?: string) => {
    updateOrderStatus(orderId, newStatus as any, trackingNumber)
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    })
    setEditingOrder(null) // Close dialog after update
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-orange-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Active Coupons",
      value: coupons.filter((c) => c.isActive).length,
      icon: Tag,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `₹${orders.reduce((sum, order) => (order.status === "delivered" ? sum + order.total : sum), 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-amber-600",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your jewelry store</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Inventory</CardTitle>
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      onClick={resetProductForm}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
                            <SelectItem value="Sets">Sets</SelectItem>
                            <SelectItem value="Anklets">Anklets</SelectItem>
                            <SelectItem value="Pendants">Pendants</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mrp">MRP (₹) *</Label>
                        <Input
                          id="mrp"
                          type="number"
                          value={newProduct.mrp}
                          onChange={(e) => setNewProduct({ ...newProduct, mrp: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Selling Price (₹) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={newProduct.quantity}
                          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 mt-6">
                          <Switch
                            id="rentable"
                            checked={newProduct.isRentable}
                            onCheckedChange={(checked) => setNewProduct({ ...newProduct, isRentable: checked })}
                          />
                          <Label htmlFor="rentable">Enable Rental</Label>
                        </div>
                      </div>
                      {newProduct.isRentable && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="rentPrice">Rent Price/Day (₹)</Label>
                            <Input
                              id="rentPrice"
                              type="number"
                              value={newProduct.rentPrice}
                              onChange={(e) => setNewProduct({ ...newProduct, rentPrice: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                            <Input
                              id="securityDeposit"
                              type="number"
                              value={newProduct.securityDeposit}
                              onChange={(e) => setNewProduct({ ...newProduct, securityDeposit: e.target.value })}
                            />
                          </div>
                        </>
                      )}
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                          id="image"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                          placeholder="/placeholder.svg?height=100&width=100"
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-6">
                      <Button variant="outline" onClick={resetProductForm}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddOrUpdateProduct}>
                        {editingProduct ? "Update Product" : "Add Product"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>MRP</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rental</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.mrp.toLocaleString()}</TableCell>
                      <TableCell>₹{product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        {product.isRentable ? (
                          <div className="text-sm">
                            <div>₹{product.rentPrice}/day</div>
                            <div className="text-muted-foreground">Deposit: ₹{product.securityDeposit}</div>
                          </div>
                        ) : (
                          <Badge variant="secondary">Not Available</Badge>
                        )}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="h-8 w-8 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Coupons Tab */}
        <TabsContent value="coupons">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Discount Coupons</CardTitle>
                <Dialog open={isAddCouponOpen} onOpenChange={setIsAddCouponOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      onClick={resetCouponForm}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {editingCoupon ? "Edit Coupon" : "Add Coupon"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingCoupon ? "Edit Coupon" : "Create New Coupon"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="couponCode">Coupon Code *</Label>
                          <Input
                            id="couponCode"
                            value={newCoupon.code}
                            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                            placeholder="e.g., WELCOME10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="couponType">Discount Type *</Label>
                          <Select
                            value={newCoupon.type}
                            onValueChange={(value: "percentage" | "fixed") =>
                              setNewCoupon({ ...newCoupon, type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage</SelectItem>
                              <SelectItem value="fixed">Fixed Amount</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="couponValue">
                            {newCoupon.type === "percentage" ? "Discount %" : "Discount Amount (₹)"} *
                          </Label>
                          <Input
                            id="couponValue"
                            type="number"
                            value={newCoupon.value}
                            onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minOrder">Minimum Order Amount (₹)</Label>
                          <Input
                            id="minOrder"
                            type="number"
                            value={newCoupon.minOrderAmount}
                            onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: e.target.value })}
                          />
                        </div>
                      </div>

                      {newCoupon.type === "percentage" && (
                        <div className="space-y-2">
                          <Label htmlFor="maxDiscount">Maximum Discount Amount (₹)</Label>
                          <Input
                            id="maxDiscount"
                            type="number"
                            value={newCoupon.maxDiscount}
                            onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: e.target.value })}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="validFrom">Valid From *</Label>
                          <Input
                            id="validFrom"
                            type="date"
                            value={newCoupon.validFrom}
                            onChange={(e) => setNewCoupon({ ...newCoupon, validFrom: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="validTo">Valid To *</Label>
                          <Input
                            id="validTo"
                            type="date"
                            value={newCoupon.validTo}
                            onChange={(e) => setNewCoupon({ ...newCoupon, validTo: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="usageLimit">Usage Limit</Label>
                        <Input
                          id="usageLimit"
                          type="number"
                          value={newCoupon.usageLimit}
                          onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                          placeholder="Leave empty for unlimited"
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-6">
                      <Button variant="outline" onClick={resetCouponForm}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddOrUpdateCoupon}>
                        {editingCoupon ? "Update Coupon" : "Create Coupon"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Min Order</TableHead>
                    <TableHead>Valid Period</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">{coupon.code}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{coupon.type === "percentage" ? "Percentage" : "Fixed"}</Badge>
                      </TableCell>
                      <TableCell>
                        {coupon.type === "percentage" ? `${coupon.value}%` : `₹${coupon.value}`}
                        {coupon.maxDiscount && (
                          <div className="text-xs text-muted-foreground">Max: ₹{coupon.maxDiscount}</div>
                        )}
                      </TableCell>
                      <TableCell>₹{coupon.minOrderAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(coupon.validFrom).toLocaleDateString()}</div>
                          <div className="text-muted-foreground">
                            to {new Date(coupon.validTo).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {coupon.usageLimit ? `${coupon.usedCount}/${coupon.usageLimit}` : coupon.usedCount}
                      </TableCell>
                      <TableCell>
                        <Badge variant={coupon.isActive ? "default" : "secondary"}>
                          {coupon.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleCouponStatus(coupon)}
                            className="h-8 w-8"
                          >
                            {coupon.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCoupon(coupon)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
                            className="h-8 w-8 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders placed yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{order.shippingAddress.split(",")[0]}</TableCell> {/* Simple customer name */}
                        <TableCell>
                          {order.items.map((item) => `${item.name} (x${item.quantity})`).join(", ")}
                        </TableCell>
                        <TableCell>₹{order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            <span className="flex items-center space-x-1">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>{order.trackingNumber || "N/A"}</TableCell>
                        <TableCell>
                          <Dialog
                            open={editingOrder?.id === order.id}
                            onOpenChange={(open) => !open && setEditingOrder(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setEditingOrder({
                                    ...order,
                                    newStatus: order.status,
                                    newTrackingNumber: order.trackingNumber || "",
                                  })
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Order {order.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="order-status">Order Status</Label>
                                  <Select
                                    value={editingOrder?.newStatus || order.status}
                                    onValueChange={(value) => setEditingOrder({ ...editingOrder, newStatus: value })}
                                  >
                                    <SelectTrigger id="order-status">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="processing">Processing</SelectItem>
                                      <SelectItem value="shipped">Shipped</SelectItem>
                                      <SelectItem value="delivered">Delivered</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="tracking-number">Tracking Number</Label>
                                  <Input
                                    id="tracking-number"
                                    value={editingOrder?.newTrackingNumber || ""}
                                    onChange={(e) =>
                                      setEditingOrder({ ...editingOrder, newTrackingNumber: e.target.value })
                                    }
                                    placeholder="Enter tracking number"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingOrder(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleUpdateOrderStatus(
                                      order.id,
                                      editingOrder?.newStatus,
                                      editingOrder?.newTrackingNumber,
                                    )
                                  }
                                >
                                  Update
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cod-toggle">Cash on Delivery</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to pay on delivery</p>
                  </div>
                  <Switch
                    id="cod-toggle"
                    checked={settings.codEnabled}
                    onCheckedChange={(checked) => updateSettings({ codEnabled: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="free-shipping">Free Shipping Threshold (₹)</Label>
                  <Input
                    id="free-shipping"
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => updateSettings({ freeShippingThreshold: Number.parseInt(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground">Orders above this amount get free shipping</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => updateSettings({ taxRate: Number.parseInt(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground">GST rate applied to all orders</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input value="Airaa Jewels" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input value="info@airaajewels.com" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value="+91 98765 43210" readOnly />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
