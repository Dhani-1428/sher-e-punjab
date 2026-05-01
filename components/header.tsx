"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, X, ChevronDown, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store-context"
import { useI18n } from "@/lib/i18n"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Category structure with subcategories
const categoryMenu = [
  {
    title: "Dal & Pulses",
    subcategories: [
      "Toor Dal",
      "Arhar Dal",
      "Chana Dal",
      "Kala Chana",
      "Kabuli Chana",
      "Moong Dal",
      "Sabut Moong",
      "Urad Dal",
      "Sabut Urad",
      "Masoor Dal",
      "Matar Dal",
      "Rajma",
      "Lobia",
      "Matki",
      "Kulthi",
      "Val Dal",
      "Rongi",
      "Desi Chana",
      "Soyabean",
      "Dry Peas",
    ]
  },
  {
    title: "Rice",
    subcategories: ["Basmati Rice", "Sona Masoori", "Ponni Rice", "Jeera Rice", "Brown Rice", "Idli Rice"]
  },
  {
    title: "Spices",
    subcategories: ["Turmeric Powder", "Red Chilli Powder", "Garam Masala", "Cumin Seeds", "Coriander Powder", "Mustard Seeds", "Fenugreek"]
  },
  {
    title: "Flour",
    subcategories: ["Atta (Wheat Flour)", "Besan (Gram Flour)", "Maida", "Rava/Sooji", "Rice Flour", "Ragi Flour"]
  },
  {
    title: "Snacks",
    subcategories: ["Mixture Namkeen", "Chakli", "Murukku", "Bhujia", "Sev", "Chips", "Mathri"]
  },
  {
    title: "Sweets",
    subcategories: ["Gulab Jamun", "Jalebi", "Kaju Katli", "Rasgulla", "Barfi", "Ladoo", "Halwa Mix"]
  },
  {
    title: "Beverages",
    subcategories: ["Masala Chai", "Green Tea", "Rooh Afza", "Mango Pulp", "Lassi", "Sherbet", "Coffee"]
  },
  {
    title: "Pickles",
    subcategories: ["Mango Pickle", "Lime Pickle", "Mixed Pickle", "Garlic Pickle", "Chilli Pickle", "Ginger Pickle"]
  },
  {
    title: "Ready to Cook",
    subcategories: ["Biryani Masala", "Paneer Masala", "Curry Paste", "Sambar Powder", "Rasam Powder", "Pav Bhaji Masala"]
  },
  {
    title: "Vegetables",
    subcategories: ["Fresh Coriander", "Curry Leaves", "Green Chillies", "Ginger", "Garlic", "Onions", "Tomatoes"]
  },
  {
    title: "Fruits",
    subcategories: ["Alphonso Mango", "Banana", "Coconut", "Papaya", "Guava", "Pomegranate", "Chikoo"]
  },
  {
    title: "Dairy",
    subcategories: ["Paneer", "Ghee", "Curd/Yogurt", "Buttermilk", "Khoya", "Cream", "Milk"]
  }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null)
  const { getCartCount, user, isLoggedIn, logout } = useStore()
  const { language, setLanguage, t, tc } = useI18n()
  const router = useRouter()
  const cartCount = getCartCount()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }
  
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 text-center text-sm">
        {t("header.topBar")}
      </div>

      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">SHER-E-PUNJAB</h1>
              <p className="text-xs text-muted-foreground">{t("header.tagline")}</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("header.searchDesktop")}
                className="pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Quick Links & Cart */}
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-4">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                {t("header.home")}
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                {t("header.about")}
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                {t("header.contact")}
              </Link>
            </nav>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "pt-PT")}
              aria-label={t("header.language")}
              className="hidden sm:block h-9 rounded-md border bg-background px-2 text-xs"
            >
              <option value="en">{t("lang.english")}</option>
              <option value="pt-PT">{t("lang.portuguese")}</option>
            </select>
            
            {/* User Account */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">{user?.email}</div>
                  <DropdownMenuSeparator />
                  {user?.isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          {t("header.adminPanel")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("header.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("header.login")}</span>
                </Button>
              </Link>
            )}

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-pulse-glow">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("header.searchMobile")}
              className="pl-10 pr-4 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Category Navigation Bar - Desktop */}
      <div className="hidden lg:block border-t bg-secondary/30">
        <div className="container mx-auto px-4">
          <nav 
            className="flex items-center justify-center gap-1"
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Link
              href="/products"
              className="px-3 py-3 text-sm font-medium hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {t("header.allProducts")}
            </Link>
            {categoryMenu.map((category) => (
              <div
                key={category.title}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.title)}
              >
                <Link
                  href={category.title === "Fruits" ? "/fruits" : `/products?category=${encodeURIComponent(category.title)}`}
                  className={`flex items-center gap-1 px-3 py-3 text-sm font-medium transition-colors ${
                    activeCategory === category.title
                      ? "text-primary bg-primary/10"
                      : "hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {tc(category.title)}
                  <ChevronDown className={`h-3 w-3 transition-transform ${
                    activeCategory === category.title ? "rotate-180" : ""
                  }`} />
                </Link>
                
                {/* Dropdown */}
                {activeCategory === category.title && (
                  <div className="absolute top-full left-0 z-50 flex min-w-[220px] max-w-[min(calc(100vw-2rem),20rem)] flex-col overflow-hidden rounded-md border bg-card shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
                    <Link
                      href={category.title === "Fruits" ? "/fruits" : `/products?category=${encodeURIComponent(category.title)}`}
                      className="block shrink-0 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                    >
                      {t("header.viewAll")} {tc(category.title)}
                    </Link>
                    <div className="h-px shrink-0 bg-border" />
                    <div className="no-scrollbar max-h-[min(45vh,18rem)] overflow-y-auto overscroll-contain py-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/products?search=${encodeURIComponent(sub)}`}
                          className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-card max-h-[70vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.home")}
            </Link>
            <Link
              href="/products"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.allProducts")}
            </Link>
            
            <div className="h-px bg-border my-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider py-2">{t("header.categories")}</p>
            
            {categoryMenu.map((category) => (
              <div key={category.title}>
                <div className="flex items-center gap-1 w-full">
                  <Link
                    href={category.title === "Fruits" ? "/fruits" : `/products?category=${encodeURIComponent(category.title)}`}
                    className="flex-1 py-2 text-sm font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tc(category.title)}
                  </Link>
                  <button
                    type="button"
                    className="p-2 shrink-0 hover:text-primary"
                    aria-label={`Expand ${category.title} subcategories`}
                    onClick={() => setMobileExpandedCategory(
                      mobileExpandedCategory === category.title ? null : category.title
                    )}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      mobileExpandedCategory === category.title ? "rotate-180" : ""
                    }`} />
                  </button>
                </div>
                {mobileExpandedCategory === category.title && (
                  <div className="flex flex-col pl-4">
                    <Link
                      href={category.title === "Fruits" ? "/fruits" : `/products?category=${encodeURIComponent(category.title)}`}
                      className="block shrink-0 py-2 text-sm text-primary hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("header.viewAll")} {tc(category.title)}
                    </Link>
                    <div className="no-scrollbar max-h-[min(40vh,16rem)] space-y-0.5 overflow-y-auto overscroll-contain pb-2 pr-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/products?search=${encodeURIComponent(sub)}`}
                          className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-px bg-border my-2" />
            
            <Link
              href="/about"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.about")}
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.contact")}
            </Link>
            {isLoggedIn && user?.isAdmin && (
              <Link
                href="/admin"
                className="block py-2 text-sm font-medium text-primary hover:text-primary/80"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("header.adminPanel")}
              </Link>
            )}

            <div className="pt-3">
              <p className="text-xs text-muted-foreground mb-1">{t("header.language")}</p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "pt-PT")}
                className="h-9 w-full rounded-md border bg-background px-2 text-sm"
              >
                <option value="en">{t("lang.english")}</option>
                <option value="pt-PT">{t("lang.portuguese")}</option>
              </select>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
