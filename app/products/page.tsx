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
  All: "/images/mixture.jpg",
  Spices: "/images/garam-masala.jpg",
  Rice: "/images/basmati.jpg",
  "Rice & Grains": "/images/basmati.jpg",
  Dairy: "/images/kaju-katli.jpg",
  "Dal & Pulses": "/images/toor-dal.jpg",
  Snacks: "/images/murukku.jpg",
  Beverages: "/images/chai.jpg",
  Sweets: "/images/gulab-jamun.jpg",
  "Ready to Cook": "/images/paneer-masala.jpg",
  Pickles: "/images/mango-pickle.jpg",
  Flour: "/images/atta.jpg",
  Vegetables: "/images/coriander.jpg",
  Fruits: "/images/mango-pulp.jpg",
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

  const showAllProductsVideoHero = selectedCategory === "All"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {showAllProductsVideoHero ? (
          <section
            className="relative flex min-h-[200px] max-h-[min(70vh,520px)] justify-center overflow-hidden bg-black"
            data-scroll-animate
          >
            <video
              className="block h-full w-full max-h-[min(70vh,520px)] object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/videos/video_preview_h264.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            {/* Positioned top-left to cover Envato stock watermark */}
            <div className="absolute left-3 top-3 z-10 w-[calc(100%-1.5rem)] max-w-lg sm:left-5 sm:top-5 md:left-8 md:top-8 md:w-auto md:max-w-xl">
              <div className="rounded-2xl border border-white/35 bg-background px-5 py-4 text-foreground shadow-2xl backdrop-blur-md md:px-8 md:py-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t("header.tagline")}</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-4xl">{heroTitle}</h1>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">{t("products.heroSubtitle")}</p>
              </div>
            </div>
          </section>
        ) : (
          <PageHero
            title={heroTitle}
            subtitle={t("products.heroSubtitle")}
            image={categoryHeroImages[heroCategory] ?? categoryHeroImages.All}
          />
        )}
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
