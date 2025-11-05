"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProjects, mockComponents } from "@/lib/mock-data"
import { ArrowRight, Sparkles, Layers, Palette, Search, Library, Code2, BookOpen } from "lucide-react"

export default function HomePage() {
  const stats = {
    projects: mockProjects.length,
    complete: mockProjects.filter(p => p.status === 'complete').length,
    components: mockComponents.length,
    variants: mockComponents.reduce((acc, c) => acc + c.variants, 0)
  }

  const recentProjects = mockProjects.filter(p => p.status === 'complete').slice(0, 3)
  const featuredComponents = mockComponents.slice(0, 6)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <Sparkles className="mr-2 h-3 w-3" />
              Your Personal Design Learning System
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Collect. Study. Build.
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"> Reuse.</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A comprehensive platform for learning from web design patterns, building a personal component library,
              and creating a reusable design system from real-world inspiration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/projects">
                <Button size="lg" className="gap-2">
                  <Library className="h-4 w-4" />
                  Browse Library
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/components">
                <Button size="lg" variant="outline" className="gap-2">
                  <Layers className="h-4 w-4" />
                  View Components
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/30">
        <div className="container py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="text-4xl font-bold text-primary">{stats.projects}</div>
              <p className="text-sm text-muted-foreground">Projects Collected</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="text-4xl font-bold text-primary">{stats.complete}</div>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="text-4xl font-bold text-primary">{stats.components}</div>
              <p className="text-sm text-muted-foreground">Components Extracted</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="text-4xl font-bold text-primary">{stats.variants}</div>
              <p className="text-sm text-muted-foreground">Component Variants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Recent Projects</h2>
            <p className="text-muted-foreground mt-2">
              Latest websites added to the library
            </p>
          </div>
          <Link href="/projects">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm">
                  {project.status}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.notes}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {project.componentCount && (
                    <Badge variant="outline" className="gap-1">
                      <Layers className="h-3 w-3" />
                      {project.componentCount}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Components */}
      <section className="border-t bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Components</h2>
              <p className="text-muted-foreground mt-2">
                Reusable components extracted from projects
              </p>
            </div>
            <Link href="/components">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredComponents.map((component) => (
              <Link key={component.id} href={`/components/${component.id}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg cursor-pointer">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={component.preview}
                      alt={component.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {component.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {component.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div>{component.variants} variants</div>
                      <div>·</div>
                      <div>{component.sources.length} sources</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to learn and build
            </h2>
            <p className="text-muted-foreground text-lg">
              A complete system for collecting inspiration and turning it into production-ready components
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Library className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Project Gallery</CardTitle>
                <CardDescription>
                  Visual catalog of all websites with status tracking from queued to complete.
                  Filter by industry, style, or technology.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Layers className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Component Library</CardTitle>
                <CardDescription>
                  Extracted components with live previews, code examples, and installation instructions.
                  shadcn/ui compatible format.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Palette className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Design System</CardTitle>
                <CardDescription>
                  Design tokens for colors, typography, spacing, and effects extracted from all your projects.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start building your design library today
            </h2>
            <p className="text-muted-foreground text-lg">
              Learn by doing. Build a library of knowledge, not just code.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/projects">
                <Button size="lg" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Get Started
                </Button>
              </Link>
              <Link href="/components">
                <Button size="lg" variant="outline" className="gap-2">
                  <Code2 className="h-4 w-4" />
                  Browse Components
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
