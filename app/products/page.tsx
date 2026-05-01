"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect, Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
  "Rice & Grains",
  "Dairy",
  "Dal & Pulses",
  "Snacks",
  "Beverages",
  "Sweets",
  "Ready to Cook",
  "Pickles",
  "Flour",
]

const categoryHeroImages: Record<string, string> = {
  All: "/images/mixture.jpg",
  Spices: "/images/garam-masala.jpg",
  "Rice & Grains": "/images/basmati.jpg",
  Dairy: "/images/paneer-masala.jpg",
  "Dal & Pulses": "/images/toor-dal.jpg",
  Snacks: "/images/murukku.jpg",
  Beverages: "/images/chai.jpg",
  Sweets: "/images/gulab-jamun.jpg",
  "Ready to Cook": "/images/biryani-masala.jpg",
  Pickles: "/images/mango-pickle.jpg",
  Flour: "/images/atta.jpg",
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
        <section className="relative flex justify-center overflow-hidden bg-transparent" data-scroll-animate>
          <video
            className="block h-auto w-full max-h-[calc(100vh-5rem)] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/video_preview_h264.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="pointer-events-none absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="rounded-2xl border border-white/35 bg-black/35 px-6 py-6 text-center backdrop-blur-sm md:px-10 md:py-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {selectedCategory === "All" ? t("header.allProducts") : tc(selectedCategory)}
              </h1>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90">
                {t("products.heroSubtitle")}
              </p>
            </div>
          </div>
        </section>
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
