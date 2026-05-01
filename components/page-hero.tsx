type PageHeroProps = {
  title: string
  subtitle: string
  image: string
}

export function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-18 bg-transparent hero-banner-pan"
      data-scroll-animate
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("${image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 rangoli-pattern opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border border-white/35 bg-white/25 backdrop-blur-sm px-6 py-10 md:px-12 md:py-14 shadow-xl" data-scroll-animate>
          <h1 className="text-3xl md:text-5xl font-bold text-white" data-scroll-animate>{title}</h1>
          <p className="mt-4 text-white/90 text-base md:text-lg" data-scroll-animate>{subtitle}</p>
        </div>
      </div>
    </section>
  )
}
