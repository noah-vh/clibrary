"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockComponents, mockProjects } from "@/lib/mock-data"
import { Search, ArrowRight, Code2, Eye } from "lucide-react"

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredComponents = mockComponents.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || component.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categoryCounts = {
    all: mockComponents.length,
    primitive: mockComponents.filter(c => c.category === 'primitive').length,
    composition: mockComponents.filter(c => c.category === 'composition').length,
    layout: mockComponents.filter(c => c.category === 'layout').length,
    template: mockComponents.filter(c => c.category === 'template').length,
  }

  const getProjectName = (projectId: string) => {
    return mockProjects.find(p => p.id === projectId)?.name || projectId
  }

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Components</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Reusable components extracted from real-world projects. Copy and paste into your apps.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className="capitalize whitespace-nowrap"
              >
                {category} ({count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((component) => (
          <Link key={component.id} href={`/components/${component.id}`}>
            <Card className="group h-full overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={component.preview}
                  alt={component.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <div className="bg-background/90 backdrop-blur-sm rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{component.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="capitalize shrink-0">
                    {component.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {component.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Code2 className="h-3 w-3" />
                    <span>{component.variants} variants</span>
                  </div>
                  <div>·</div>
                  <div>{component.sources.length} sources</div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {component.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {component.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{component.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs font-medium text-muted-foreground mb-1">
                    Found in:
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {component.sources.slice(0, 2).map(getProjectName).join(", ")}
                    {component.sources.length > 2 && ` +${component.sources.length - 2} more`}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No components found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
