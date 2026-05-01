"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section
          className="relative overflow-hidden py-16 md:py-24"
          data-scroll-animate
          style={{
            backgroundImage:
              'linear-gradient(rgba(10, 16, 10, 0.52), rgba(10, 16, 10, 0.52)), url("/images/mango-pickle.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm px-6 py-10 md:px-10 md:py-12 text-center">
              <p className="text-white/85 text-sm tracking-wide uppercase">We are here to help</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-bold text-white">Contact Us</h1>
              <p className="mt-4 text-white/90 max-w-3xl mx-auto">
                Have questions? Send us a message and our team will respond as soon as possible.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="tel:+351XXXXXXXXX" className="inline-flex rounded-full bg-white text-foreground px-5 py-2.5 text-sm font-medium">
                  Call Store
                </a>
                <Link href="/products" className="inline-flex rounded-full border border-white text-white px-5 py-2.5 text-sm font-medium">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16" data-scroll-animate>
          <div className="container mx-auto px-4" data-scroll-animate>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-scroll-animate>
              {/* Contact Form */}
              <Card data-scroll-animate>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We will get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
              
              {/* Contact Info */}
              <div className="space-y-6" data-scroll-animate>
                <Card data-scroll-animate>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Visit Us</h3>
                        <p className="text-muted-foreground">
                          Rua Augusta 123<br />
                          1100-053 Lisbon<br />
                          Portugal
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card data-scroll-animate>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Call Us</h3>
                        <p className="text-muted-foreground">
                          +351 XXX XXX XXX<br />
                          +351 XXX XXX XXX
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card data-scroll-animate>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-muted-foreground">
                          info@namastestore.pt<br />
                          orders@namastestore.pt
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card data-scroll-animate>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Store Hours</h3>
                        <div className="text-muted-foreground space-y-1">
                          <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                          <p>Saturday: 10:00 AM - 6:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
