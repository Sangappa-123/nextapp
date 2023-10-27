import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/store/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next js starter',
  description: 'Next js boiler plate',
}

export default function RootLayout({children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><StoreProvider>{children}</StoreProvider></body>
    </html>
  )
}
