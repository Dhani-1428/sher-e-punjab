export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      data-scroll-animate
      style={{
        backgroundImage:
          'linear-gradient(rgba(15, 10, 5, 0.5), rgba(15, 10, 5, 0.5)), url("https://picsum.photos/id/292/1920/1080")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/30 bg-white/10 px-6 py-10 text-center backdrop-blur-sm md:px-10 md:py-12">
          <p className="text-sm uppercase tracking-wide text-white/85">Welcome to SHER-E-PUNJAB</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">Authentic Indian Groceries in Lisbon</h1>
          <p className="mt-4 text-white/90">
            Explore premium spices, grains, snacks, sweets, and everyday essentials curated for your kitchen.
          </p>
        </div>
      </div>
    </section>
  )
}
