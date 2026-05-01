"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  category: string
  pricePerKg: number
  image: string
  description: string
  inStock: boolean
  unit: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedWeight: string
}

export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  notes?: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  city?: string
  postalCode?: string
  isAdmin: boolean
}

interface StoreContextType {
  products: Product[]
  cart: CartItem[]
  orders: Order[]
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => { success: boolean; message: string }
  register: (userData: Omit<User, "id" | "isAdmin"> & { password: string }) => { success: boolean; message: string }
  logout: () => void
  addToCart: (product: Product, quantity: number, selectedWeight: string) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  placeOrder: (customer: CustomerInfo) => Order
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  searchProducts: (query: string) => Product[]
  getProductsByCategory: (category: string) => Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  calculatePrice: (pricePerKg: number, weight: string) => number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Weight options and their multipliers
export const weightOptions = [
  { label: "250g", value: "250g", multiplier: 0.25 },
  { label: "500g", value: "500g", multiplier: 0.5 },
  { label: "1 kg", value: "1kg", multiplier: 1 },
  { label: "2 kg", value: "2kg", multiplier: 2 },
  { label: "5 kg", value: "5kg", multiplier: 5 },
]

const defaultProducts: Product[] = [
  // Spices
  {
    id: "1",
    name: "Turmeric Powder",
    category: "Spices",
    pricePerKg: 12.99,
    image: "/images/turmeric.jpg",
    description: "Premium quality turmeric powder, rich in curcumin. Perfect for curries, rice dishes, and golden milk.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "2",
    name: "Garam Masala",
    category: "Spices",
    pricePerKg: 18.99,
    image: "/images/garam-masala.jpg",
    description: "Authentic blend of aromatic spices including cinnamon, cardamom, cloves, and cumin.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "3",
    name: "Red Chilli Powder",
    category: "Spices",
    pricePerKg: 14.99,
    image: "/images/chilli.jpg",
    description: "Hot and vibrant red chilli powder made from premium Kashmiri chilies.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "4",
    name: "Cumin Seeds",
    category: "Spices",
    pricePerKg: 15.99,
    image: "/images/cumin.jpg",
    description: "Whole cumin seeds with intense earthy flavor. Essential for tempering and spice blends.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "5",
    name: "Coriander Powder",
    category: "Spices",
    pricePerKg: 11.99,
    image: "/images/coriander.jpg",
    description: "Freshly ground coriander with citrusy notes. A staple in Indian cooking.",
    inStock: true,
    unit: "kg"
  },
  // Rice & Grains
  {
    id: "6",
    name: "Basmati Rice",
    category: "Rice",
    pricePerKg: 8.99,
    image: "/images/basmati.jpg",
    description: "Long-grain premium Basmati rice. Aromatic and perfect for biryani and pulao.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "7",
    name: "Toor Dal / Arhar Dal",
    category: "Dal & Pulses",
    pricePerKg: 6.99,
    image: "/images/toor-dal.jpg",
    description: "Pigeon pea, split and husked — the everyday dal for sambar, varan, and comfort bowls.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "8",
    name: "Chana Dal",
    category: "Dal & Pulses",
    pricePerKg: 5.99,
    image: "/images/chana-dal.jpg",
    description: "Chickpea (split, husked) — nutty, quick-cooking; ideal for tadka dal and dry sabzi.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "9",
    name: "Moong Dal",
    category: "Dal & Pulses",
    pricePerKg: 7.49,
    image: "/images/moong-dal.jpg",
    description: "Green gram, split and yellow — light, easy to digest; perfect for khichdi and light dals.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "25",
    name: "Kala Chana",
    category: "Dal & Pulses",
    pricePerKg: 5.49,
    image: "/images/chana-dal.jpg",
    description: "Chickpea, small dark variety (Bengal gram whole) — firm bite for curries, chaat, and salads.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "26",
    name: "Kabuli Chana",
    category: "Dal & Pulses",
    pricePerKg: 6.29,
    image: "/images/chana-dal.jpg",
    description: "Chickpea, large cream variety — classic for chole, hummus, and hearty gravies.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "27",
    name: "Sabut Moong",
    category: "Dal & Pulses",
    pricePerKg: 7.19,
    image: "/images/moong-dal.jpg",
    description: "Green gram, whole — sprouting, khichdi with skin, and healthy salads.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "28",
    name: "Urad Dal",
    category: "Dal & Pulses",
    pricePerKg: 7.89,
    image: "/images/toor-dal.jpg",
    description: "Black gram, split and husked (white) — essential for idli, dosa batter, and dal makhani.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "29",
    name: "Sabut Urad",
    category: "Dal & Pulses",
    pricePerKg: 7.59,
    image: "/images/toor-dal.jpg",
    description: "Black gram, whole — kali dal, slow-cooked urad, and traditional Punjabi dals.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "30",
    name: "Masoor Dal",
    category: "Dal & Pulses",
    pricePerKg: 5.79,
    image: "/images/toor-dal.jpg",
    description: "Red lentil, split — cooks fast, mild flavor; soups, masoor tadka, and everyday dal.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "31",
    name: "Matar Dal / Safed Vatana",
    category: "Dal & Pulses",
    pricePerKg: 5.39,
    image: "/images/toor-dal.jpg",
    description: "White pea, dried — matar dal, ghugni, and North Indian style curries.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "32",
    name: "Rajma",
    category: "Dal & Pulses",
    pricePerKg: 6.89,
    image: "/images/toor-dal.jpg",
    description: "Kidney bean — slow-simmered rajma masala with onion-tomato gravy, a North Indian staple.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "33",
    name: "Lobia / Chawli",
    category: "Dal & Pulses",
    pricePerKg: 5.99,
    image: "/images/toor-dal.jpg",
    description: "Cowpea, long or oval white variety — light curries, sundal, and mixed dal.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "34",
    name: "Matki / Moth Bean",
    category: "Dal & Pulses",
    pricePerKg: 6.49,
    image: "/images/moong-dal.jpg",
    description: "Moth bean, small brown speckled — sprouted usal, misal, and Maharashtrian favorites.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "35",
    name: "Kulthi / Horse Gram",
    category: "Dal & Pulses",
    pricePerKg: 6.19,
    image: "/images/toor-dal.jpg",
    description: "Horse gram — rustic soups, rasam-style broths, and traditional South Indian kulthi saaru.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "36",
    name: "Sem / Val Dal",
    category: "Dal & Pulses",
    pricePerKg: 8.29,
    image: "/images/toor-dal.jpg",
    description: "Field bean, split (val dal) — undhiyu, Gujarati dal, and festive mixed vegetable dishes.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "37",
    name: "Rongi / Black-eyed Pea",
    category: "Dal & Pulses",
    pricePerKg: 5.69,
    image: "/images/toor-dal.jpg",
    description: "Black-eyed pea — lobia curry with the characteristic black eye, rice pairings, and salads.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "38",
    name: "Desi Chana",
    category: "Dal & Pulses",
    pricePerKg: 5.59,
    image: "/images/chana-dal.jpg",
    description: "Bengal gram, whole desi type — chole, roasting, and slow-cooked North Indian dishes.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "39",
    name: "Soyabean",
    category: "Dal & Pulses",
    pricePerKg: 6.99,
    image: "/images/toor-dal.jpg",
    description: "Soybean, whole — high-protein curries, pressure-cooked gravies, and regional soy preparations.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "40",
    name: "Dry Peas (Hara Matar / Sukha Matar)",
    category: "Dal & Pulses",
    pricePerKg: 4.99,
    image: "/images/toor-dal.jpg",
    description: "Dried green peas — matar paneer base, aloo matar, and winter-style curries from dry peas.",
    inStock: true,
    unit: "kg"
  },
  // Snacks
  {
    id: "10",
    name: "Mixture Namkeen",
    category: "Snacks",
    pricePerKg: 9.99,
    image: "/images/mixture.jpg",
    description: "Crispy savory snack mix with sev, peanuts, and spices.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "11",
    name: "Chakli",
    category: "Snacks",
    pricePerKg: 11.99,
    image: "/images/chakli.jpg",
    description: "Spiral-shaped crispy snack made from rice flour and spices.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "12",
    name: "Murukku",
    category: "Snacks",
    pricePerKg: 10.99,
    image: "/images/murukku.jpg",
    description: "Crunchy South Indian snack made from rice and urad dal flour.",
    inStock: true,
    unit: "kg"
  },
  // Beverages
  {
    id: "13",
    name: "Masala Chai Mix",
    category: "Beverages",
    pricePerKg: 22.99,
    image: "/images/chai.jpg",
    description: "Premium tea blend with cardamom, ginger, cinnamon, and cloves.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "14",
    name: "Rooh Afza",
    category: "Beverages",
    pricePerKg: 15.99,
    image: "/images/rooh-afza.jpg",
    description: "Rose-flavored sweet syrup concentrate. Perfect for summer drinks.",
    inStock: true,
    unit: "bottle"
  },
  {
    id: "15",
    name: "Mango Pulp",
    category: "Beverages",
    pricePerKg: 8.99,
    image: "/images/mango-pulp.jpg",
    description: "Pure Alphonso mango pulp. Great for lassi, smoothies, and desserts.",
    inStock: true,
    unit: "kg"
  },
  // Sweets
  {
    id: "16",
    name: "Gulab Jamun Mix",
    category: "Sweets",
    pricePerKg: 7.99,
    image: "/images/gulab-jamun.jpg",
    description: "Instant mix to make soft, syrup-soaked gulab jamun at home.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "17",
    name: "Jalebi Mix",
    category: "Sweets",
    pricePerKg: 6.99,
    image: "/images/jalebi.jpg",
    description: "Ready-to-use mix for crispy, sweet jalebi spirals.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "18",
    name: "Kaju Katli",
    category: "Sweets",
    pricePerKg: 35.99,
    image: "/images/kaju-katli.jpg",
    description: "Premium cashew fudge diamonds. Perfect for gifting and celebrations.",
    inStock: true,
    unit: "kg"
  },
  // Ready to Cook
  {
    id: "19",
    name: "Paneer Butter Masala Kit",
    category: "Ready to Cook",
    pricePerKg: 8.99,
    image: "/images/paneer-masala.jpg",
    description: "Complete spice kit to make restaurant-style paneer butter masala.",
    inStock: true,
    unit: "pack"
  },
  {
    id: "20",
    name: "Biryani Masala",
    category: "Ready to Cook",
    pricePerKg: 16.99,
    image: "/images/biryani-masala.jpg",
    description: "Aromatic spice blend for authentic Hyderabadi biryani.",
    inStock: true,
    unit: "kg"
  },
  // Pickles & Chutneys
  {
    id: "21",
    name: "Mango Pickle",
    category: "Pickles",
    pricePerKg: 12.99,
    image: "/images/mango-pickle.jpg",
    description: "Traditional spicy mango pickle made with mustard oil and spices.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "22",
    name: "Lime Pickle",
    category: "Pickles",
    pricePerKg: 10.99,
    image: "/images/lime-pickle.jpg",
    description: "Tangy lime pickle with aromatic spices. Perfect with rice and roti.",
    inStock: true,
    unit: "kg"
  },
  // Flour
  {
    id: "23",
    name: "Atta (Wheat Flour)",
    category: "Flour",
    pricePerKg: 3.99,
    image: "/images/atta.jpg",
    description: "Whole wheat flour for soft rotis and chapatis.",
    inStock: true,
    unit: "kg"
  },
  {
    id: "24",
    name: "Besan (Gram Flour)",
    category: "Flour",
    pricePerKg: 4.99,
    image: "/images/besan.jpg",
    description: "Chickpea flour for pakoras, besan ladoo, and savory dishes.",
    inStock: true,
    unit: "kg"
  },
]

// Default admin user
const defaultAdmin: User = {
  id: "admin-1",
  name: "Admin",
  email: "admin@namastestore.com",
  phone: "+351 XXX XXX XXX",
  isAdmin: true,
}

interface StoredUser extends User {
  password: string
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("indian-store-cart")
    const savedOrders = localStorage.getItem("indian-store-orders")
    const savedProducts = localStorage.getItem("indian-store-products")
    const savedUser = localStorage.getItem("indian-store-user")
    const savedUsers = localStorage.getItem("indian-store-users")
    
    // Initialize default admin if no users exist
    if (!savedUsers) {
      const defaultUsers: StoredUser[] = [
        { ...defaultAdmin, password: "admin123" }
      ]
      localStorage.setItem("indian-store-users", JSON.stringify(defaultUsers))
    }
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart:", e)
      }
    }
    
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error("Failed to parse orders:", e)
      }
    }
    
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (e) {
        console.error("Failed to parse products:", e)
      }
    }
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse user:", e)
      }
    }
    
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("indian-store-cart", JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("indian-store-orders", JSON.stringify(orders))
    }
  }, [orders, isInitialized])
  
  // Save products to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("indian-store-products", JSON.stringify(products))
    }
  }, [products, isInitialized])

  // Login function
  const login = (email: string, password: string): { success: boolean; message: string } => {
    const savedUsers = localStorage.getItem("indian-store-users")
    if (!savedUsers) return { success: false, message: "No users found" }
    
    const users: StoredUser[] = JSON.parse(savedUsers)
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("indian-store-user", JSON.stringify(userWithoutPassword))
      return { success: true, message: "Login successful" }
    }
    
    return { success: false, message: "Invalid email or password" }
  }
  
  // Register function
  const register = (userData: Omit<User, "id" | "isAdmin"> & { password: string }): { success: boolean; message: string } => {
    const savedUsers = localStorage.getItem("indian-store-users")
    const users: StoredUser[] = savedUsers ? JSON.parse(savedUsers) : []
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, message: "Email already registered" }
    }
    
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      postalCode: userData.postalCode,
      isAdmin: false,
      password: userData.password,
    }
    
    users.push(newUser)
    localStorage.setItem("indian-store-users", JSON.stringify(users))
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("indian-store-user", JSON.stringify(userWithoutPassword))
    
    return { success: true, message: "Registration successful" }
  }
  
  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("indian-store-user")
  }

  // Calculate price based on weight
  const calculatePrice = (pricePerKg: number, weight: string): number => {
    const option = weightOptions.find(w => w.value === weight)
    return pricePerKg * (option?.multiplier || 1)
  }

  const addToCart = (product: Product, quantity: number, selectedWeight: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id && item.selectedWeight === selectedWeight
      )
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedWeight === selectedWeight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity, selectedWeight }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = calculatePrice(item.product.pricePerKg, item.selectedWeight)
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const placeOrder = (customer: CustomerInfo): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      customer,
      total: getCartTotal(),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    setOrders((prev) => [...prev, order])
    clearCart()
    return order
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    )
  }

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    )
  }

  const getProductsByCategory = (category: string): Product[] => {
    if (category === "All") return products
    if (category === "Rice & Grains") {
      return products.filter(
        (product) => product.category === "Rice" || product.category === "Dal & Pulses"
      )
    }
    return products.filter((product) => product.category === category)
  }
  
  // Product management functions
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    }
    setProducts((prev) => [...prev, newProduct])
  }
  
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    )
  }
  
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        placeOrder,
        updateOrderStatus,
        searchProducts,
        getProductsByCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        calculatePrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
