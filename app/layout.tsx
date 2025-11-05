import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ConvexClientProvider } from "@/components/convex-provider"

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased")}>
        <ConvexClientProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
