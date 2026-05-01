"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type Product, useStore, weightOptions } from "@/lib/store-context"
import { useI18n } from "@/lib/i18n"
import { ShoppingCart, Zap, Plus, Minus, Eye } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedWeight, setSelectedWeight] = useState("500g")
  const [quantity, setQuantity] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const { addToCart, calculatePrice, isLoggedIn } = useStore()
  const { t, tc, tp } = useI18n()
  const router = useRouter()
  
  const currentPrice = calculatePrice(product.pricePerKg, selectedWeight)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, quantity, selectedWeight)
    setQuantity(1)
    setShowQuickAdd(false)
  }
  
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    addToCart(product, quantity, selectedWeight)
    router.push("/checkout")
  }
  
  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setQuantity(prev => prev + 1)
  }
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setQuantity(prev => Math.max(1, prev - 1))
  }

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowQuickAdd(false)
      }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={tp(product.name)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">{t("product.outOfStock")}</Badge>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-card/90 text-foreground">
              {tc(product.category)}
            </Badge>
          </div>
          
          {/* Hover overlay with quick actions */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="flex-1 h-9 bg-card/95 hover:bg-card text-foreground transition-all hover:scale-105"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push(`/products/${product.id}`)
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                {t("product.view")}
              </Button>
              <Button
                size="sm"
                className="flex-1 h-9 transition-all hover:scale-105"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowQuickAdd(!showQuickAdd)
                }}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {t("product.add")}
              </Button>
            </div>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {tp(product.name)}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {tp(product.description)}
          </p>
        </Link>
        
        {/* Price per kg */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">
            {product.pricePerKg.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">
            / kg
          </span>
        </div>
        
        {/* Quick add section - appears on hover or tap */}
        <div 
          className={`mt-3 space-y-3 transition-all duration-300 overflow-hidden ${
            showQuickAdd ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="h-px bg-border" />
          
          {/* Weight selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">{t("product.weight")}</span>
            <Select value={selectedWeight} onValueChange={setSelectedWeight}>
              <SelectTrigger className="h-8 flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {weightOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} - {calculatePrice(product.pricePerKg, option.value).toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Quantity selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">{t("product.qty")}</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={decrementQuantity}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={incrementQuantity}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <span className="text-sm font-semibold text-primary ml-auto">
              {(currentPrice * quantity).toFixed(2)}
            </span>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 transition-all hover:bg-primary/10 hover:border-primary"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {t("product.addToCart")}
            </Button>
            <Button
              size="sm"
              className="flex-1 h-9 transition-all hover:scale-[1.02]"
              onClick={handleBuyNow}
            >
              <Zap className="h-4 w-4 mr-1" />
              {t("product.orderNow")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
