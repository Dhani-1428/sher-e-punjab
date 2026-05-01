const categoryColors: Record<string, { bg: string; fg: string }> = {
  Spices: { bg: "b45309", fg: "ffffff" },
  Rice: { bg: "166534", fg: "ffffff" },
  "Rice & Grains": { bg: "166534", fg: "ffffff" },
  "Dal & Pulses": { bg: "1d4ed8", fg: "ffffff" },
  Snacks: { bg: "9333ea", fg: "ffffff" },
  Beverages: { bg: "0f766e", fg: "ffffff" },
  Sweets: { bg: "be185d", fg: "ffffff" },
  "Ready to Cook": { bg: "9a3412", fg: "ffffff" },
  Pickles: { bg: "0f766e", fg: "ffffff" },
  Flour: { bg: "a16207", fg: "ffffff" },
  Vegetables: { bg: "15803d", fg: "ffffff" },
  Fruits: { bg: "dc2626", fg: "ffffff" },
  Dairy: { bg: "1e40af", fg: "ffffff" },
}

const DEFAULT_COLORS = { bg: "374151", fg: "ffffff" }

export function getProductImageByName(name: string, category?: string): string {
  const colors = (category && categoryColors[category]) || DEFAULT_COLORS
  const label = encodeURIComponent(name)
  return `https://placehold.co/900x700/${colors.bg}/${colors.fg}?text=${label}`
}
