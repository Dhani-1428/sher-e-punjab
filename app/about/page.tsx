import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section
          className="relative overflow-hidden py-16 md:py-24"
          data-scroll-animate
          style={{
            backgroundImage:
              'linear-gradient(rgba(16, 10, 6, 0.55), rgba(16, 10, 6, 0.55)), url("https://picsum.photos/id/1080/1920/1080")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm px-6 py-10 md:px-10 md:py-12 text-center">
              <p className="text-white/85 text-sm tracking-wide uppercase">Our Journey</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-bold text-white">About SHER-E-PUNJAB</h1>
              <p className="mt-4 text-white/90 max-w-3xl mx-auto">
                Bringing the authentic taste of India to Lisbon since 2019. We connect the Indian community and food lovers with premium quality groceries and trusted products.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/products" className="inline-flex rounded-full bg-white text-foreground px-5 py-2.5 text-sm font-medium">
                  Explore Products
                </Link>
                <Link href="/contact" className="inline-flex rounded-full border border-white text-white px-5 py-2.5 text-sm font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16" data-scroll-animate>
          <div className="container mx-auto px-4" data-scroll-animate>
            <div className="max-w-4xl mx-auto" data-scroll-animate>
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center" data-scroll-animate>
                Our Story
              </h2>
              <div className="prose prose-lg mx-auto text-muted-foreground" data-scroll-animate>
                <p className="mb-6">
                  SHER-E-PUNJAB was born from a simple idea: to bring the rich flavors and 
                  traditions of Indian cuisine to Lisbon. As immigrants from India, we 
                  understood the longing for authentic ingredients that remind us of home.
                </p>
                <p className="mb-6">
                  What started as a small family business has grown into a beloved 
                  destination for Indian groceries in Lisbon. We take pride in sourcing 
                  the finest spices, grains, snacks, and sweets directly from trusted 
                  suppliers across India.
                </p>
                <p>
                  Today, we serve not only the Indian diaspora but also Portuguese food 
                  enthusiasts who have discovered the magic of Indian cuisine. Our mission 
                  is to make authentic Indian cooking accessible to everyone, regardless 
                  of their background.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16 bg-secondary/30" data-scroll-animate>
          <div className="container mx-auto px-4" data-scroll-animate>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center" data-scroll-animate>
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality First</h3>
                  <p className="text-sm text-muted-foreground">
                    We never compromise on quality. Every product is carefully selected 
                    and sourced from trusted suppliers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">With Love</h3>
                  <p className="text-sm text-muted-foreground">
                    We treat every customer like family and put love into 
                    everything we do.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Authenticity</h3>
                  <p className="text-sm text-muted-foreground">
                    We bring genuine Indian products that preserve traditional 
                    flavors and recipes.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    We are more than a store - we are a gathering place for the 
                    Indian community in Lisbon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16" data-scroll-animate>
          <div className="container mx-auto px-4" data-scroll-animate>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center" data-scroll-animate>
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Premium Products</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                <p className="text-muted-foreground">Years of Service</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
