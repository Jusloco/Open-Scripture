import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'OpenScripture — Verify the Bible in 30 Seconds',
    template: '%s | OpenScripture',
  },
  description: 'The Bible is the best-documented text in ancient history. Look up any verse in the Gospel of John and see the manuscript evidence behind it — earliest copies, Church Father citations, and textual variants explained in plain English.',
  openGraph: {
    title: 'OpenScripture',
    description: 'Verify Bible manuscript evidence in 30 seconds.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-900 min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
