"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const categories = [
  { name: "Dal & Pulses", image: "/images/toor-dal.jpg" },
  { name: "Rice", image: "/images/basmati.jpg" },
  { name: "Spices", image: "/images/turmeric.jpg" },
  { name: "Flour", image: "/images/atta.jpg" },
  { name: "Snacks", image: "/images/murukku.jpg" },
  { name: "Sweets", image: "/images/gulab-jamun.jpg" },
  { name: "Beverages", image: "/images/chai.jpg" },
  { name: "Pickles", image: "/images/mango-pickle.jpg" },
  { name: "Ready to Cook", image: "/images/paneer-masala.jpg" },
  { name: "Vegetables", image: "/images/coriander.jpg" },
  { name: "Fruits", image: "/images/mango-pulp.jpg" },
  { name: "Dairy", image: "/images/paneer-masala.jpg" },
]

export function CategorySection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { t, tc } = useI18n()
  const AUTO_SCROLL_STEP = 140
  const AUTO_SCROLL_INTERVAL_MS = 2000

  const scrollCategories = (direction: "left" | "right") => {
    const node = scrollerRef.current
    if (!node) return
    node.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) return

    const intervalId = window.setInterval(() => {
      const maxLeft = node.scrollWidth - node.clientWidth
      const nextLeft = node.scrollLeft + AUTO_SCROLL_STEP

      if (nextLeft >= maxLeft - 2) {
        node.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        node.scrollTo({ left: nextLeft, behavior: "smooth" })
      }
    }, AUTO_SCROLL_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="py-16 bg-transparent" data-scroll-animate>
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4" data-scroll-animate>
          <h2 className="text-3xl font-bold text-foreground">{t("category.title")}</h2>
          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              {t("category.viewAll")}
            </Link>
            <button
              type="button"
              aria-label={t("category.scrollLeft")}
              onClick={() => scrollCategories("left")}
              className="h-9 w-9 rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="mx-auto h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={t("category.scrollRight")}
              onClick={() => scrollCategories("right")}
              className="h-9 w-9 rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronRight className="mx-auto h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-6 overflow-x-auto pb-2"
          data-scroll-animate
        >
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group min-w-[120px] text-center animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
              data-scroll-animate
            >
              <div className="mx-auto relative h-28 w-28 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-border transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm text-foreground/90">{tc(category.name)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
