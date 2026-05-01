"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const fruits = [
  { name: "Alphonso Mango", note: "Sweet, aromatic, and rich in flavor", emoji: "🥭" },
  { name: "Banana", note: "Naturally sweet and energy boosting", emoji: "🍌" },
  { name: "Coconut", note: "Fresh and versatile for cooking", emoji: "🥥" },
  { name: "Papaya", note: "Soft texture with tropical taste", emoji: "🧡" },
  { name: "Guava", note: "Fragrant fruit packed with freshness", emoji: "🍈" },
  { name: "Pomegranate", note: "Juicy ruby seeds full of goodness", emoji: "🍎" },
]

export default function FruitsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative flex justify-center overflow-hidden bg-transparent" data-scroll-animate>
          <video
            className="block h-auto w-auto max-h-[calc(100vh-5rem)] max-w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/6009480_Healthy_Selection_3840x2160.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className="py-14" data-scroll-animate>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground">Fresh Fruits Collection</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Explore healthy and fresh fruit options and discover related products in our store.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild>
                <Link href="/products?category=Fruits">
                  Browse Fruits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="pb-16" data-scroll-animate>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Popular Fruits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fruits.map((fruit, index) => (
                <div
                  key={fruit.name}
                  className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm hover:shadow-lg"
                  data-scroll-animate
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="text-4xl mb-3">{fruit.emoji}</div>
                  <h3 className="text-xl font-semibold text-foreground">{fruit.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{fruit.note}</p>
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
