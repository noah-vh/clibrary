"use client"

import { ReactNode } from "react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

// Only create client if URL is configured
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const convex = convexUrl && convexUrl !== "" ? new ConvexReactClient(convexUrl) : null

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // If Convex is not configured, render children without provider
  // This allows the app to build and run with mock data
  if (!convex) {
    return <>{children}</>
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
