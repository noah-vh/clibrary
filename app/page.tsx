"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockProjects, mockComponents, mockDesignTokens } from "@/lib/mock-data"
import { Project, Component } from "@/lib/types"
import {
  Search, Library, Layers, Palette, Plus, ArrowRight,
  Grid3X3, LayoutGrid, Sparkles, BookOpen, Code2,
  Filter, Star, Clock, TrendingUp
} from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("gallery")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockProjects.length,
    complete: mockProjects.filter(p => p.status === 'complete').length,
    inProgress: mockProjects.filter(p => p.status === 'in-progress').length,
    queued: mockProjects.filter(p => p.status === 'queued').length,
    components: mockComponents.length,
    tokens: mockDesignTokens.length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Library className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Clibrary
                </h1>
                <p className="text-xs text-muted-foreground">Design Learning System</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("gallery")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "gallery" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  Gallery
                </div>
              </button>
              <button
                onClick={() => setActiveTab("components")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "components" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Components
                </div>
              </button>
              <button
                onClick={() => setActiveTab("design-system")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === "design-system" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Design System
                </div>
              </button>
            </nav>

            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add to Queue
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="border-b bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.complete}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.queued}</div>
              <div className="text-xs text-muted-foreground">Queued</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.components}</div>
              <div className="text-xs text-muted-foreground">Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.tokens}</div>
              <div className="text-xs text-muted-foreground">Design Tokens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="gallery">
            <ProjectGallery
              projects={filteredProjects}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </TabsContent>

          <TabsContent value="components">
            <ComponentLibrary components={mockComponents} />
          </TabsContent>

          <TabsContent value="design-system">
            <DesignSystem tokens={mockDesignTokens} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ProjectGallery({
  projects,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter
}: {
  projects: Project[]
  searchQuery: string
  setSearchQuery: (q: string) => void
  statusFilter: string
  setStatusFilter: (s: string) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800 border-green-300'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'queued': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getPriorityIcon = (priority?: string) => {
    if (!priority) return null
    switch (priority) {
      case 'high': return <span className="text-red-500">●</span>
      case 'medium': return <span className="text-yellow-500">●</span>
      case 'low': return <span className="text-green-500">●</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by name or tags..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "queued" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("queued")}
          >
            Queued
          </Button>
          <Button
            variant={statusFilter === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("in-progress")}
          >
            In Progress
          </Button>
          <Button
            variant={statusFilter === "complete" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("complete")}
          >
            Complete
          </Button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
                {project.priority && getPriorityIcon(project.priority)}
              </div>
              <CardDescription className="line-clamp-2">
                {project.notes || 'No notes available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getStatusColor(project.status)} variant="outline">
                  {project.status}
                </Badge>
                {project.componentCount && (
                  <Badge variant="secondary" className="gap-1">
                    <Layers className="h-3 w-3" />
                    {project.componentCount}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="pt-2 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                {project.status === 'queued' && (
                  <Button size="sm" className="flex-1">
                    Start Cloning
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

function ComponentLibrary({ components }: { components: Component[] }) {
  const categories = ['all', 'primitive', 'composition', 'layout', 'template']
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredComponents = selectedCategory === 'all'
    ? components
    : components.filter(c => c.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Component Library</h2>
          <p className="text-muted-foreground">Extracted components from your projects</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Code2 className="h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <Card key={component.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="aspect-video overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50">
              <img
                src={component.preview}
                alt={component.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{component.name}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {component.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {component.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <LayoutGrid className="h-4 w-4" />
                  {component.variants} variants
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {component.sources.length} sources
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {component.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Code
                </Button>
                <Button size="sm" className="flex-1">
                  Copy Component
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DesignSystem({ tokens }: { tokens: any[] }) {
  const categories = ['all', 'color', 'typography', 'spacing', 'effects']
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTokens = selectedCategory === 'all'
    ? tokens
    : tokens.filter(t => t.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'color': return <Palette className="h-4 w-4" />
      case 'typography': return <BookOpen className="h-4 w-4" />
      case 'spacing': return <Grid3X3 className="h-4 w-4" />
      case 'effects': return <Sparkles className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Design System</h2>
          <p className="text-muted-foreground">Extracted design tokens from all projects</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Code2 className="h-4 w-4" />
          Export Tokens
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize gap-2"
          >
            {category !== 'all' && getCategoryIcon(category)}
            {category}
          </Button>
        ))}
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTokens.map((token) => (
          <Card key={token.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{token.name}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {token.category}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  {token.usage}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-muted font-mono text-sm">
                  {token.value}
                </div>
                {token.category === 'color' && (
                  <div
                    className="h-12 w-full rounded-md border"
                    style={{ backgroundColor: token.value }}
                  />
                )}
                <div className="text-xs text-muted-foreground">
                  Used in {token.projects.length} projects
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
