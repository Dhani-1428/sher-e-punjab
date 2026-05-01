import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store-context'
import { I18nProvider } from '@/lib/i18n'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ScrollEffects } from '@/components/scroll-effects'
import { SiteLoader } from '@/components/site-loader'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SHER-E-PUNJAB - Authentic Indian Groceries in Lisbon',
  description: 'Discover premium Indian spices, snacks, sweets, and groceries. Bringing the authentic taste of India to Lisbon, Portugal.',
  keywords: ['Indian groceries', 'Indian spices', 'Lisbon', 'Portuguese Indian store', 'authentic Indian food'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <StoreProvider>
          <I18nProvider>
            <SiteLoader />
            <ScrollEffects />
            {children}
            <ScrollToTop />
          </I18nProvider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
