"use client"

import { useStore } from "@/lib/store-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function FeaturedProducts() {
  const { products } = useStore()
  const { t } = useI18n()
  
  // Get first 8 products as featured
  const featuredProducts = products.slice(0, 8)
  
  return (
    <section className="py-16 bg-secondary/30" data-scroll-animate>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4" data-scroll-animate>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("featured.title")}</h2>
            <p className="text-muted-foreground">
              {t("featured.subtitle")}
            </p>
          </div>
          <Button asChild variant="outline" className="group w-fit">
            <Link href="/products">
              {t("featured.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
              data-scroll-animate
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
