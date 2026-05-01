"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { type Product } from "@/lib/store-context"
import { ArrowRight } from "lucide-react"

const fruitsProducts: Product[] = [
  { id: "fruit-1", name: "Alphonso Mango", category: "Fruits", pricePerKg: 9.99, image: "/images/mango-pulp.jpg", description: "Premium Alphonso mangoes with rich aroma and naturally sweet flavor.", inStock: true, unit: "kg" },
  { id: "fruit-2", name: "Banana", category: "Fruits", pricePerKg: 2.99, image: "/images/chai.jpg", description: "Fresh ripe bananas, perfect for snacks and smoothies.", inStock: true, unit: "kg" },
  { id: "fruit-3", name: "Coconut", category: "Fruits", pricePerKg: 4.49, image: "/images/coriander.jpg", description: "Whole coconuts with fresh flesh and naturally sweet coconut water.", inStock: true, unit: "kg" },
  { id: "fruit-4", name: "Papaya", category: "Fruits", pricePerKg: 3.99, image: "/images/jalebi.jpg", description: "Juicy papaya fruit with soft texture and tropical sweetness.", inStock: true, unit: "kg" },
  { id: "fruit-5", name: "Guava", category: "Fruits", pricePerKg: 5.49, image: "/images/kaju-katli.jpg", description: "Fragrant guavas packed with flavor and freshness.", inStock: true, unit: "kg" },
  { id: "fruit-6", name: "Pomegranate", category: "Fruits", pricePerKg: 6.99, image: "/images/lime-pickle.jpg", description: "Ruby-red pomegranates with juicy and tangy-sweet seeds.", inStock: true, unit: "kg" },
  { id: "fruit-7", name: "Apple", category: "Fruits", pricePerKg: 4.99, image: "/images/mixture.jpg", description: "Crisp apples ideal for daily healthy snacking.", inStock: true, unit: "kg" },
  { id: "fruit-8", name: "Orange", category: "Fruits", pricePerKg: 3.79, image: "/images/gulab-jamun.jpg", description: "Sweet and juicy oranges rich in citrus freshness.", inStock: true, unit: "kg" },
  { id: "fruit-9", name: "Grapes", category: "Fruits", pricePerKg: 5.89, image: "/images/chakli.jpg", description: "Seedless grapes with naturally sweet taste.", inStock: true, unit: "kg" },
  { id: "fruit-10", name: "Pineapple", category: "Fruits", pricePerKg: 4.59, image: "/images/chana-dal.jpg", description: "Fresh pineapple with bright tropical flavor.", inStock: true, unit: "kg" },
  { id: "fruit-11", name: "Watermelon", category: "Fruits", pricePerKg: 2.49, image: "/images/chilli.jpg", description: "Refreshing watermelon slices full of hydration.", inStock: true, unit: "kg" },
  { id: "fruit-12", name: "Muskmelon", category: "Fruits", pricePerKg: 3.29, image: "/images/cumin.jpg", description: "Sweet muskmelon, ideal for summer fruit bowls.", inStock: true, unit: "kg" },
  { id: "fruit-13", name: "Pear", category: "Fruits", pricePerKg: 4.39, image: "/images/garam-masala.jpg", description: "Soft and juicy pears with delicate sweetness.", inStock: true, unit: "kg" },
  { id: "fruit-14", name: "Kiwi", category: "Fruits", pricePerKg: 7.99, image: "/images/moong-dal.jpg", description: "Tangy kiwi fruit with vibrant green flesh.", inStock: true, unit: "kg" },
  { id: "fruit-15", name: "Dragon Fruit", category: "Fruits", pricePerKg: 8.49, image: "/images/murukku.jpg", description: "Exotic dragon fruit with mild sweet taste.", inStock: true, unit: "kg" },
  { id: "fruit-16", name: "Strawberry", category: "Fruits", pricePerKg: 9.49, image: "/images/paneer-masala.jpg", description: "Fresh strawberries perfect for desserts and shakes.", inStock: true, unit: "kg" },
  { id: "fruit-17", name: "Blueberry", category: "Fruits", pricePerKg: 12.99, image: "/images/rooh-afza.jpg", description: "Premium blueberries with rich taste and texture.", inStock: true, unit: "kg" },
  { id: "fruit-18", name: "Plum", category: "Fruits", pricePerKg: 5.69, image: "/images/turmeric.jpg", description: "Sweet-tart plums for snacking and recipes.", inStock: true, unit: "kg" },
  { id: "fruit-19", name: "Apricot", category: "Fruits", pricePerKg: 6.29, image: "/images/toor-dal.jpg", description: "Fresh apricots with soft bite and fragrant aroma.", inStock: true, unit: "kg" },
  { id: "fruit-20", name: "Chikoo", category: "Fruits", pricePerKg: 4.79, image: "/images/biryani-masala.jpg", description: "Traditional chikoo fruit with malty sweetness.", inStock: true, unit: "kg" },
]

export default function FruitsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section
          className="relative overflow-hidden py-16 md:py-24"
          data-scroll-animate
          style={{
            backgroundImage:
              'linear-gradient(rgba(10, 18, 10, 0.4), rgba(10, 18, 10, 0.4)), url("https://picsum.photos/id/1080/1920/1080")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="rounded-2xl border border-white/35 px-6 py-6 text-center md:px-10 md:py-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white">Fresh Fruits Collection</h1>
              <p className="mt-4 text-white/90 max-w-2xl mx-auto">
                Explore healthy and fresh fruit options and discover related products in our store.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3 pointer-events-auto">
                <Button asChild>
                  <Link href="/products?category=Fruits">
                    Browse Fruits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-background/80">
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16" data-scroll-animate>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Popular Fruits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fruitsProducts.map((fruit, index) => (
                <div key={fruit.id} data-scroll-animate style={{ animationDelay: `${index * 60}ms` }}>
                  <ProductCard product={fruit} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
