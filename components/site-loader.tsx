"use client"

import { useEffect, useState } from "react"

export function SiteLoader() {
  const [show, setShow] = useState(true)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setHide(true), 900)
    const unmountTimer = window.setTimeout(() => setShow(false), 1200)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(unmountTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          Loading SHER-E-PUNJAB...
        </p>
      </div>
    </div>
  )
}
