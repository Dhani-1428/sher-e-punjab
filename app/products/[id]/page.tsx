"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { useStore, weightOptions } from "@/lib/store-context"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ShoppingCart, ArrowLeft, Minus, Plus, Check, Zap } from "lucide-react"
import { ProductCard } from "@/components/product-card"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { tp, tc } = useI18n()
  const { products, addToCart, getProductsByCategory, calculatePrice, isLoggedIn } = useStore()
  
  const product = products.find((p) => p.id === resolvedParams.id)
  
  const [selectedWeight, setSelectedWeight] = useState("500g")
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <PageHero
            title="Product Not Found"
            subtitle="The product you are looking for does not exist."
            image="/images/turmeric.jpg"
          />
          <div className="container mx-auto px-4 py-16 text-center">
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
  
  const currentPrice = calculatePrice(product.pricePerKg, selectedWeight)
  const totalPrice = currentPrice * quantity
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }
  
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    addToCart(product, quantity, selectedWeight)
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title={tp(product.name)}
          subtitle={`Explore details, pricing, and order options for ${tp(product.name)}.`}
          image={product.image}
        />
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
              {tc(product.category)}
            </Link>
            <span>/</span>
            <span className="text-foreground">{tp(product.name)}</span>
          </nav>
          
          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted group">
              <Image
                src={product.image}
                alt={tp(product.name)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {tc(product.category)}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  {tp(product.name)}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {tp(product.description)}
                </p>
              </div>
              
              {/* Price per kg */}
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/30 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">
                      {product.pricePerKg.toFixed(2)}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      / kg
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    MRP inclusive of all taxes
                  </p>
                </CardContent>
              </Card>
              
              {/* Weight Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select Weight</Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {weightOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedWeight(option.value)}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        selectedWeight === option.value
                          ? "border-primary bg-primary text-primary-foreground shadow-md"
                          : "border-border hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      <span className="block">{option.label}</span>
                      <span className="block text-xs mt-1 opacity-80">
                        {calculatePrice(product.pricePerKg, option.value).toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Quantity</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-none hover:bg-primary/10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-none hover:bg-primary/10"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Total Price */}
                  <div className="flex-1 p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {quantity} x {selectedWeight} @ {currentPrice.toFixed(2)} each
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 h-14 text-base font-semibold transition-all hover:scale-[1.02] hover:bg-primary/10 hover:border-primary"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdded}
                >
                  {isAdded ? (
                    <>
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-14 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Order Now
                </Button>
              </div>
              
              {!isLoggedIn && (
                <p className="text-sm text-muted-foreground text-center">
                  <Link href="/login" className="text-primary hover:underline">Login</Link> to place an order
                </p>
              )}
              
              {/* Product Features */}
              <div className="border-t pt-6 space-y-3">
                <h3 className="font-semibold">Product Highlights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    100% Authentic Indian Product
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Premium Quality Guaranteed
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Fresh Stock - Regular Imports
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Free Delivery on Orders Over 50
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
