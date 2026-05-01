"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--gold)]">SHER-E-PUNJAB</h3>
            <p className="text-sm text-background/80 leading-relaxed">
              {t("footer.aboutText")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--gold)]">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-background/80 hover:text-[var(--saffron)] transition-colors">
                  {t("header.allProducts")}
                </Link>
              </li>
              <li>
                <Link href="/products?category=Spices" className="text-sm text-background/80 hover:text-[var(--saffron)] transition-colors">
                  Spices
                </Link>
              </li>
              <li>
                <Link href="/products?category=Snacks" className="text-sm text-background/80 hover:text-[var(--saffron)] transition-colors">
                  Snacks
                </Link>
              </li>
              <li>
                <Link href="/products?category=Sweets" className="text-sm text-background/80 hover:text-[var(--saffron)] transition-colors">
                  Sweets
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-background/80 hover:text-[var(--saffron)] transition-colors">
                  {t("footer.aboutUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--gold)]">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--saffron)]" />
                <span>Rua Augusta 123, 1100-053 Lisbon, Portugal</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Phone className="h-4 w-4 shrink-0 text-[var(--saffron)]" />
                <span>+351 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Mail className="h-4 w-4 shrink-0 text-[var(--saffron)]" />
                <span>info@namastestore.pt</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--gold)]">{t("footer.storeHours")}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Clock className="h-4 w-4 shrink-0 text-[var(--saffron)]" />
                <span>Mon - Fri: 9:00 - 20:00</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80 pl-6">
                <span>{t("footer.saturday")}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80 pl-6">
                <span>{t("footer.sunday")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
