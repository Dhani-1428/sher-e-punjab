import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="About SHER-E-PUNJAB"
          subtitle="Bringing the authentic taste of India to Lisbon since 2019. We are passionate about connecting the Indian community and food lovers with premium quality groceries and products."
          image="/images/coriander.jpg"
        />
        
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
