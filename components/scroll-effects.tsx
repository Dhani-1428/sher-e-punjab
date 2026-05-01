"use client"

import { useEffect, useState } from "react"

export function ScrollEffects() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.classList.add("scroll-effects-ready")

    const animated = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-animate]")
    )

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("in-view")
          currentObserver.unobserve(entry.target)
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    )

    animated.forEach((element) => observer.observe(element))

    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop
      const maxScroll = doc.scrollHeight - doc.clientHeight
      const next = maxScroll > 0 ? scrollTop / maxScroll : 0
      setProgress(next)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      document.body.classList.remove("scroll-effects-ready")
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-full bg-transparent">
      <div
        className="h-full origin-left bg-primary transition-transform duration-200"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
