"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect, Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/lib/store-context"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const categories = [
  "All",
  "Spices",
  "Rice",
  "Rice & Grains",
  "Dairy",
  "Dal & Pulses",
  "Snacks",
  "Beverages",
  "Sweets",
  "Ready to Cook",
  "Pickles",
  "Flour",
  "Vegetables",
  "Fruits",
]

const categoryHeroImages: Record<string, string> = {
  All: "https://picsum.photos/id/425/1920/1080",
  Spices: "https://picsum.photos/id/431/1920/1080",
  Rice: "https://picsum.photos/id/1074/1920/1080",
  "Rice & Grains": "https://picsum.photos/id/102/1920/1080",
  Dairy: "https://picsum.photos/id/490/1920/1080",
  "Dal & Pulses": "https://picsum.photos/id/766/1920/1080",
  Snacks: "https://picsum.photos/id/488/1920/1080",
  Beverages: "https://picsum.photos/id/577/1920/1080",
  Sweets: "https://picsum.photos/id/1084/1920/1080",
  "Ready to Cook": "https://picsum.photos/id/312/1920/1080",
  Pickles: "https://picsum.photos/id/824/1920/1080",
  Flour: "https://picsum.photos/id/839/1920/1080",
  Vegetables: "https://picsum.photos/id/103/1920/1080",
  Fruits: "https://picsum.photos/id/1080/1920/1080",
}

const searchCategoryKeywords: Record<string, string[]> = {
  "Dal & Pulses": [
    "toor dal",
    "arhar dal",
    "chana dal",
    "kala chana",
    "kabuli chana",
    "moong dal",
    "sabut moong",
    "urad dal",
    "sabut urad",
    "masoor dal",
    "matar dal",
    "rajma",
    "lobia",
    "matki",
    "kulthi",
    "val dal",
    "rongi",
    "desi chana",
    "soyabean",
    "dry peas",
  ],
  Rice: ["basmati rice", "sona masoori", "ponni rice", "jeera rice", "brown rice", "idli rice", "rice"],
  Spices: ["turmeric", "red chilli", "garam masala", "cumin", "coriander", "mustard", "fenugreek", "spice"],
  Flour: ["atta", "wheat flour", "besan", "gram flour", "maida", "rava", "sooji", "rice flour", "ragi flour", "flour"],
  Snacks: ["mixture", "chakli", "murukku", "bhujia", "sev", "chips", "mathri", "snack"],
  Sweets: ["gulab jamun", "jalebi", "kaju katli", "rasgulla", "barfi", "ladoo", "halwa mix", "sweet"],
  Beverages: ["masala chai", "green tea", "rooh afza", "mango pulp", "lassi", "sherbet", "coffee", "beverage"],
  Pickles: ["mango pickle", "lime pickle", "mixed pickle", "garlic pickle", "chilli pickle", "ginger pickle", "pickle"],
  "Ready to Cook": ["biryani masala", "paneer masala", "curry paste", "sambar powder", "rasam powder", "pav bhaji masala", "ready to cook"],
  Vegetables: ["fresh coriander", "curry leaves", "green chillies", "ginger", "garlic", "onions", "tomatoes", "vegetable"],
  Fruits: ["alphonso mango", "banana", "coconut", "papaya", "guava", "pomegranate", "chikoo", "fruit"],
  Dairy: ["paneer", "ghee", "curd", "yogurt", "buttermilk", "khoya", "cream", "milk", "dairy"],
}

function inferCategoryFromSearch(searchTerm: string): string | null {
  const normalized = searchTerm.trim().toLowerCase()
  if (!normalized) return null

  for (const [category, keywords] of Object.entries(searchCategoryKeywords)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return category
    }
  }
  return null
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const { products, searchProducts, getProductsByCategory } = useStore()
  const { t, tc } = useI18n()
  
  const initialCategory = searchParams.get("category") || "All"
  const initialSearch = searchParams.get("search") || ""
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [priceRange, setPriceRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    const cat = searchParams.get("category") || "All"
    const q = searchParams.get("search") || ""
    setSelectedCategory(cat)
    setSearchQuery(q)
  }, [searchParams])
  
  const filteredProducts = useMemo(() => {
    let result = products
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = getProductsByCategory(selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by price range
    result = result.filter(
      (product) =>
        product.pricePerKg >= priceRange[0] && product.pricePerKg <= priceRange[1]
    )
    
    // Sort products
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerKg - b.pricePerKg
        case "price-high":
          return b.pricePerKg - a.pricePerKg
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })
    
    return result
  }, [products, selectedCategory, searchQuery, priceRange, sortBy, getProductsByCategory])
  
  const clearFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
    setPriceRange([0, 50])
    setSortBy("name")
  }

  const inferredSearchCategory = selectedCategory === "All" ? inferCategoryFromSearch(searchQuery) : null
  const heroCategory = selectedCategory !== "All" ? selectedCategory : inferredSearchCategory ?? "All"
  const heroTitle =
    selectedCategory !== "All"
      ? tc(selectedCategory)
      : searchQuery.trim()
        ? `${t("header.allProducts")} - ${searchQuery}`
        : t("header.allProducts")

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold mb-3 block">{t("products.categories")}</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {tc(category)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">
          {t("products.priceRange")} {priceRange[0]} - {priceRange[1]} / kg
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={50}
          step={1}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">{t("products.sortBy")}</Label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 rounded-md border bg-background"
        >
          <option value="name">{t("products.sortName")}</option>
          <option value="price-low">{t("products.sortLow")}</option>
          <option value="price-high">{t("products.sortHigh")}</option>
        </select>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        <X className="mr-2 h-4 w-4" />
        {t("products.clear")}
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title={heroTitle}
          subtitle={t("products.heroSubtitle")}
          image={categoryHeroImages[heroCategory] ?? categoryHeroImages.All}
        />
        <div className="container mx-auto px-4 py-8" data-scroll-animate>
        {/* Page Header */}
        <div className="mb-8" data-scroll-animate>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {selectedCategory === "All" ? t("header.allProducts") : tc(selectedCategory)}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {t("products.found")}
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8" data-scroll-animate>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("header.searchMobile")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="mr-2 h-4 w-4" />
                {t("products.filters")}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>{t("products.filters")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex gap-8" data-scroll-animate>
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0" data-scroll-animate>
            <div className="sticky top-24 bg-card rounded-lg border p-6">
              <h2 className="font-semibold mb-4">{t("products.filters")}</h2>
              <FilterContent />
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1" data-scroll-animate>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t("products.none")}</p>
                <Button variant="link" onClick={clearFilters}>
                  {t("products.clearTry")}
                </Button>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
