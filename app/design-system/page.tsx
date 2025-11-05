"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockDesignTokens, mockProjects } from "@/lib/mock-data"
import { Search, Palette, Type, Ruler, Sparkles, Copy, Check, TrendingUp } from "lucide-react"

export default function DesignSystemPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredTokens = mockDesignTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.value.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || token.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categoryCounts = {
    all: mockDesignTokens.length,
    color: mockDesignTokens.filter(t => t.category === 'color').length,
    typography: mockDesignTokens.filter(t => t.category === 'typography').length,
    spacing: mockDesignTokens.filter(t => t.category === 'spacing').length,
    effects: mockDesignTokens.filter(t => t.category === 'effects').length,
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'color':
        return <Palette className="h-4 w-4" />
      case 'typography':
        return <Type className="h-4 w-4" />
      case 'spacing':
        return <Ruler className="h-4 w-4" />
      case 'effects':
        return <Sparkles className="h-4 w-4" />
      default:
        return null
    }
  }

  const copyToClipboard = (value: string, id: string) => {
    navigator.clipboard.writeText(value)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getProjectName = (projectId: string) => {
    return mockProjects.find(p => p.id === projectId)?.name || projectId
  }

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Design tokens extracted from all projects. Colors, typography, spacing, and effects.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search design tokens..."
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
                className="capitalize whitespace-nowrap gap-2"
              >
                {category !== 'all' && getCategoryIcon(category)}
                {category} ({count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Color Tokens */}
      {(categoryFilter === "all" || categoryFilter === "color") && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Colors</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTokens
              .filter(t => t.category === 'color')
              .map((token) => (
                <Card key={token.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{token.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {token.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2">
                        <TrendingUp className="h-3 w-3" />
                        {token.usage}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div
                      className="h-24 w-full rounded-md border shadow-sm"
                      style={{
                        background: token.value.startsWith('linear-gradient')
                          ? token.value
                          : token.value
                      }}
                    />
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                        {token.value}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 shrink-0"
                        onClick={() => copyToClipboard(token.value, token.id)}
                      >
                        {copiedId === token.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {token.cssVariable && (
                      <div className="text-xs text-muted-foreground">
                        CSS: <code className="bg-muted px-1 rounded">{token.cssVariable}</code>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Used in: {token.projects.map(getProjectName).join(", ")}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Typography Tokens */}
      {(categoryFilter === "all" || categoryFilter === "typography") && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Type className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredTokens
              .filter(t => t.category === 'typography')
              .map((token) => (
                <Card key={token.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{token.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {token.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2">
                        <TrendingUp className="h-3 w-3" />
                        {token.usage}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div
                      className="p-4 bg-muted rounded-md"
                      style={{ fontFamily: token.value.includes('font') ? token.value.split(',')[0].replace(/"/g, '') : 'inherit' }}
                    >
                      <p className="text-lg">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                        {token.value}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 shrink-0"
                        onClick={() => copyToClipboard(token.value, token.id)}
                      >
                        {copiedId === token.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {token.cssVariable && (
                      <div className="text-xs text-muted-foreground">
                        CSS: <code className="bg-muted px-1 rounded">{token.cssVariable}</code>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Used in: {token.projects.map(getProjectName).join(", ")}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Spacing Tokens */}
      {(categoryFilter === "all" || categoryFilter === "spacing") && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Ruler className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Spacing</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTokens
              .filter(t => t.category === 'spacing')
              .map((token) => (
                <Card key={token.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{token.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {token.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2">
                        <TrendingUp className="h-3 w-3" />
                        {token.usage}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-muted p-4 rounded-md flex items-center justify-center">
                      <div className="bg-primary" style={{ width: token.value.split(' ')[0], height: token.value.split(' ')[0] }} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                        {token.value}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 shrink-0"
                        onClick={() => copyToClipboard(token.value, token.id)}
                      >
                        {copiedId === token.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {token.cssVariable && (
                      <div className="text-xs text-muted-foreground">
                        CSS: <code className="bg-muted px-1 rounded">{token.cssVariable}</code>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Used in: {token.projects.map(getProjectName).join(", ")}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Effects Tokens */}
      {(categoryFilter === "all" || categoryFilter === "effects") && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Effects</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTokens
              .filter(t => t.category === 'effects')
              .map((token) => (
                <Card key={token.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{token.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {token.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2">
                        <TrendingUp className="h-3 w-3" />
                        {token.usage}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-muted p-8 rounded-md flex items-center justify-center">
                      <div
                        className="w-32 h-32 bg-background rounded-md flex items-center justify-center"
                        style={{
                          boxShadow: token.value.includes('shadow') ? token.value : undefined,
                          transition: token.value.includes('transition') ? token.value : undefined
                        }}
                      >
                        <span className="text-xs text-muted-foreground">Preview</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                        {token.value}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 shrink-0"
                        onClick={() => copyToClipboard(token.value, token.id)}
                      >
                        {copiedId === token.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {token.cssVariable && (
                      <div className="text-xs text-muted-foreground">
                        CSS: <code className="bg-muted px-1 rounded">{token.cssVariable}</code>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Used in: {token.projects.map(getProjectName).join(", ")}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {filteredTokens.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No design tokens found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
