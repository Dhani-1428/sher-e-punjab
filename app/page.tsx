"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { FeaturedProducts } from "@/components/featured-products"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"

function PromoBanner({
  title,
  subtitle,
  image,
  cta,
}: {
  title: string
  subtitle: string
  image: string
  cta: string
}) {
  return (
    <section className="py-8" data-scroll-animate>
      <div className="container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-2xl border border-white/30 p-8 md:p-12 shadow-xl"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url("${image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-2xl rounded-xl bg-white/20 backdrop-blur-sm p-5 md:p-6 border border-white/30">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-white/90">{subtitle}</p>
            <Link
              href="/products"
              className="inline-flex mt-5 rounded-full bg-white text-foreground px-5 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: "Anita Sharma",
    text: "The spices are genuinely fresh and the quality reminds me of markets back in India.",
  },
  {
    name: "Rui Fernandes",
    text: "Fast delivery and amazing variety. My family loves the ready-to-cook options.",
  },
  {
    name: "Priya Nair",
    text: "Best Indian grocery store in Lisbon. Great service and always helpful recommendations.",
  },
]

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PromoBanner
          title={t("home.banner1.title")}
          subtitle={t("home.banner1.subtitle")}
          image="/scroll-images/masala.webp"
          cta={t("home.shopNow")}
        />
        <CategorySection />
        <section className="py-10" data-scroll-animate>
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-2xl border border-border/40 shadow-xl bg-background/50">
              <video
                className="block h-auto w-full max-h-[480px] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/videos/6009480_Healthy_Selection_3840x2160.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Fresh Fruits & Healthy Selection</h3>
                  <p className="text-muted-foreground mt-2">Discover our fruit-inspired selection and healthy essentials.</p>
                </div>
                <Link
                  href="/fruits"
                  className="inline-flex rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90"
                >
                  Go to Fruits Page
                </Link>
              </div>
            </div>
          </div>
        </section>
        <FeaturedProducts />
        <PromoBanner
          title={t("home.banner2.title")}
          subtitle={t("home.banner2.subtitle")}
          image="/scroll-images/chilli.webp"
          cta={t("home.shopNow")}
        />
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-primary/10" data-scroll-animate>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12" data-scroll-animate>{t("home.why.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl border border-primary/20 bg-background/80" data-scroll-animate>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("home.why.quality.title")}</h3>
                <p className="text-muted-foreground">
                  {t("home.why.quality.desc")}
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-primary/20 bg-background/80" data-scroll-animate>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("home.why.delivery.title")}</h3>
                <p className="text-muted-foreground">
                  {t("home.why.delivery.desc")}
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-primary/20 bg-background/80" data-scroll-animate>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("home.why.love.title")}</h3>
                <p className="text-muted-foreground">
                  {t("home.why.love.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" data-scroll-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">{t("home.testimonials.title")}</h2>
              <p className="mt-3 text-muted-foreground">
                {t("home.testimonials.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-border/50 bg-background/75 backdrop-blur-sm p-6 shadow-sm"
                  data-scroll-animate
                >
                  <div className="text-yellow-500 text-lg">★★★★★</div>
                  <p className="mt-3 text-foreground/90">
                    {item.name === "Anita Sharma"
                      ? t("home.testimonial.1")
                      : item.name === "Rui Fernandes"
                        ? t("home.testimonial.2")
                        : t("home.testimonial.3")}
                  </p>
                  <p className="mt-4 font-semibold text-primary">{item.name}</p>
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
