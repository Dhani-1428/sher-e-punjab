"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useStore, type Order, type Product } from "@/lib/store-context"
import { PageHero } from "@/components/page-hero"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Search,
  ArrowLeft,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ChefHat,
  Plus,
  Pencil,
  Trash2,
  ImageIcon,
} from "lucide-react"

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  preparing: "bg-orange-100 text-orange-800 border-orange-200",
  ready: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
}

const statusIcons: Record<Order["status"], React.ReactNode> = {
  pending: <Clock className="h-3 w-3" />,
  confirmed: <CheckCircle className="h-3 w-3" />,
  preparing: <ChefHat className="h-3 w-3" />,
  ready: <Package className="h-3 w-3" />,
  delivered: <Truck className="h-3 w-3" />,
  cancelled: <XCircle className="h-3 w-3" />,
}

const categories = [
  "Spices",
  "Rice",
  "Dal & Pulses",
  "Flour",
  "Snacks",
  "Sweets",
  "Beverages",
  "Pickles",
  "Ready to Cook",
  "Vegetables",
  "Fruits",
  "Dairy",
]

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  category: "Spices",
  pricePerKg: 0,
  image: "/images/placeholder.jpg",
  description: "",
  inStock: true,
  unit: "kg",
}

export default function AdminPage() {
  const { 
    orders, 
    updateOrderStatus, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    user,
    isLoggedIn,
  } = useStore()
  const { tp, tc } = useI18n()
  const router = useRouter()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [productSearch, setProductSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  
  // Product form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState<Omit<Product, "id">>(emptyProduct)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  
  // Auth check
  useEffect(() => {
    if (!isLoggedIn || !user?.isAdmin) {
      router.push("/login")
    }
  }, [isLoggedIn, user, router])
  
  if (!isLoggedIn || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }
  
  const filteredOrders = useMemo(() => {
    let result = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.email.toLowerCase().includes(query) ||
          order.customer.phone.includes(query)
      )
    }
    
    return result
  }, [orders, statusFilter, searchQuery])
  
  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter)
    }
    
    if (productSearch) {
      const query = productSearch.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
    }
    
    return result
  }, [products, categoryFilter, productSearch])
  
  // Dashboard Stats
  const stats = useMemo(() => {
    const today = new Date().toDateString()
    const todayOrders = orders.filter(
      (o) => new Date(o.createdAt).toDateString() === today
    )
    
    return {
      totalOrders: orders.length,
      todayOrders: todayOrders.length,
      pendingOrders: orders.filter((o) => o.status === "pending").length,
      totalRevenue: orders
        .filter((o) => o.status === "delivered")
        .reduce((sum, o) => sum + o.total, 0),
      totalProducts: products.length,
      outOfStock: products.filter((p) => !p.inStock).length,
    }
  }, [orders, products])
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  
  const handleAddProduct = () => {
    addProduct(productForm)
    setProductForm(emptyProduct)
    setIsAddDialogOpen(false)
  }
  
  const handleEditProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productForm)
      setEditingProduct(null)
      setProductForm(emptyProduct)
      setIsEditDialogOpen(false)
    }
  }
  
  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      category: product.category,
      pricePerKg: product.pricePerKg,
      image: product.image,
      description: product.description,
      inStock: product.inStock,
      unit: product.unit,
    })
    setIsEditDialogOpen(true)
  }
  
  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
    setDeleteConfirmId(null)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline">View Store</Button>
          </Link>
        </div>
      </header>
      
      <main>
        <PageHero
          title="Admin Dashboard"
          subtitle="Manage orders, products, and store operations from one place."
          image="/images/chilli.jpg"
        />
        <div className="container mx-auto px-4 py-8" data-scroll-animate>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8" data-scroll-animate>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                  <p className="text-xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Today</p>
                  <p className="text-xl font-bold">{stats.todayOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold">{stats.pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold">{stats.totalRevenue.toFixed(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Products</p>
                  <p className="text-xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-100 text-red-600">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Out of Stock</p>
                  <p className="text-xl font-bold">{stats.outOfStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Orders and Products */}
        <Tabs defaultValue="orders" className="space-y-6" data-scroll-animate>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Order Management</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-full sm:w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-mono text-sm">
                              {order.id}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.customer.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.customer.phone}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{order.items.length} items</TableCell>
                            <TableCell className="font-semibold">
                              {order.total.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${statusColors[order.status]} flex items-center gap-1 w-fit`}
                              >
                                {statusIcons[order.status]}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(order.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Order Details - {order.id}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-6 mt-4">
                                    {/* Order Status */}
                                    <div>
                                      <h3 className="font-semibold mb-2">Update Status</h3>
                                      <Select
                                        value={order.status}
                                        onValueChange={(value: Order["status"]) =>
                                          updateOrderStatus(order.id, value)
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="confirmed">Confirmed</SelectItem>
                                          <SelectItem value="preparing">Preparing</SelectItem>
                                          <SelectItem value="ready">Ready for Delivery</SelectItem>
                                          <SelectItem value="delivered">Delivered</SelectItem>
                                          <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    {/* Customer Info */}
                                    <div>
                                      <h3 className="font-semibold mb-2">Customer Information</h3>
                                      <Card>
                                        <CardContent className="p-4 space-y-2 text-sm">
                                          <p><strong>Name:</strong> {order.customer.name}</p>
                                          <p><strong>Email:</strong> {order.customer.email}</p>
                                          <p><strong>Phone:</strong> {order.customer.phone}</p>
                                          <p><strong>Address:</strong> {order.customer.address}</p>
                                          <p><strong>City:</strong> {order.customer.city}</p>
                                          <p><strong>Postal Code:</strong> {order.customer.postalCode}</p>
                                          {order.customer.notes && (
                                            <p><strong>Notes:</strong> {order.customer.notes}</p>
                                          )}
                                        </CardContent>
                                      </Card>
                                    </div>
                                    
                                    {/* Order Items */}
                                    <div>
                                      <h3 className="font-semibold mb-2">Order Items</h3>
                                      <Card>
                                        <CardContent className="p-4">
                                          <Table>
                                            <TableHeader>
                                              <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Weight</TableHead>
                                                <TableHead>Qty</TableHead>
                                                <TableHead className="text-right">Subtotal</TableHead>
                                              </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                              {order.items.map((item, idx) => (
                                                <TableRow key={idx}>
                                                  <TableCell>{tp(item.product.name)}</TableCell>
                                                  <TableCell>{item.selectedWeight}</TableCell>
                                                  <TableCell>{item.quantity}</TableCell>
                                                  <TableCell className="text-right">
                                                    {(item.product.pricePerKg * item.quantity).toFixed(2)}
                                                  </TableCell>
                                                </TableRow>
                                              ))}
                                            </TableBody>
                                          </Table>
                                          <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>{order.total.toFixed(2)}</span>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                    
                                    {/* Timestamps */}
                                    <div className="text-sm text-muted-foreground">
                                      <p>Created: {formatDate(order.createdAt)}</p>
                                      <p>Last Updated: {formatDate(order.updatedAt)}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Product Management</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="pl-9 w-full sm:w-64"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Plus className="h-4 w-4" />
                          Add Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Add New Product</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                              id="name"
                              value={productForm.name}
                              onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter product name"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="category">Category</Label>
                              <Select 
                                value={productForm.category} 
                                onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="price">Price per kg</Label>
                              <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={productForm.pricePerKg}
                                onChange={(e) => setProductForm(prev => ({ ...prev, pricePerKg: parseFloat(e.target.value) || 0 }))}
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                              id="image"
                              value={productForm.image}
                              onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                              placeholder="/images/product.jpg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={productForm.description}
                              onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Enter product description"
                              rows={3}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch
                              id="inStock"
                              checked={productForm.inStock}
                              onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, inStock: checked }))}
                            />
                            <Label htmlFor="inStock">In Stock</Label>
                          </div>
                        </div>
                        <DialogFooter className="mt-6">
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                          <Button onClick={handleAddProduct}>Add Product</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No products found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price/kg</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                            <TableCell>
                              <div className="h-12 w-12 rounded-md overflow-hidden bg-muted relative">
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{tp(product.name)}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {tp(product.description)}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{tc(product.category)}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {product.pricePerKg.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-primary/10"
                                  onClick={() => openEditDialog(product)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-destructive/10 text-destructive"
                                  onClick={() => setDeleteConfirmId(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={productForm.category} 
                    onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price per kg</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={productForm.pricePerKg}
                    onChange={(e) => setProductForm(prev => ({ ...prev, pricePerKg: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={productForm.image}
                  onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="/images/product.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="edit-inStock"
                  checked={productForm.inStock}
                  onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, inStock: checked }))}
                />
                <Label htmlFor="edit-inStock">In Stock</Label>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditProduct}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product from your store.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => deleteConfirmId && handleDeleteProduct(deleteConfirmId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </main>
    </div>
  )
}
