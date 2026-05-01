"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { useStore } from "@/lib/store-context"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const { tp } = useI18n()
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, clearCart } = useStore()
  
  const total = getCartTotal()
  const deliveryFee = total >= 50 ? 0 : 4.99
  const grandTotal = total + deliveryFee
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <PageHero
            title="Shopping Cart"
            subtitle="Review your items and proceed to checkout when you are ready."
            image="/images/basmati.jpg"
          />
          <div className="container mx-auto px-4 py-16" data-scroll-animate>
          <div className="text-center max-w-md mx-auto" data-scroll-animate>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you have not added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Shopping Cart"
          subtitle="Review your selected products and complete your order."
            image="/images/chana-dal.jpg"
        />
        <div className="container mx-auto px-4 py-8" data-scroll-animate>
        <h1 className="text-3xl font-bold text-foreground mb-8" data-scroll-animate>Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-scroll-animate>
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-scroll-animate>
            {cart.map((item) => (
              <Card key={item.product.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.product.image}
                        alt={tp(item.product.name)}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-semibold text-foreground hover:text-primary line-clamp-1"
                          >
                            {tp(item.product.name)}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.pricePerKg.toFixed(2)} / {item.product.unit}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 0.25)
                            }
                            disabled={item.quantity <= 0.25}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-16 text-center font-medium">
                            {item.quantity} {item.unit}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 0.25)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold text-primary">
                          {(item.product.pricePerKg * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Clear Cart Button */}
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive"
              onClick={clearCart}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1" data-scroll-animate>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        `${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {total < 50 && (
                    <p className="text-xs text-muted-foreground">
                      Add {(50 - total).toFixed(2)} more for free delivery
                    </p>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
