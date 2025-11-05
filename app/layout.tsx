import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Clibrary - Your Personal Design Learning System",
  description: "Collect, study, and componentize web designs into your personal library",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased")}>{children}</body>
    </html>
  )
}
