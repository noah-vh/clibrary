"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockProjects } from "@/lib/mock-data"
import { Search, Filter, Layers, Calendar, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: mockProjects.length,
    complete: mockProjects.filter(p => p.status === 'complete').length,
    'in-progress': mockProjects.filter(p => p.status === 'in-progress').length,
    queued: mockProjects.filter(p => p.status === 'queued').length,
    planned: mockProjects.filter(p => p.status === 'planned').length,
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
      case 'queued':
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-700'
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Project Library</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Visual catalog of websites collected for learning and inspiration
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name or tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize whitespace-nowrap"
              >
                {status} ({count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img
                src={project.thumbnail}
                alt={project.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className={getStatusStyle(project.status)} variant="outline">
                  {project.status}
                </Badge>
              </div>
              {project.priority && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      project.priority === 'high'
                        ? 'bg-red-500'
                        : project.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    title={`${project.priority} priority`}
                  />
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl leading-tight">{project.name}</CardTitle>
                <Link
                  href={project.originalUrl}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <CardDescription className="line-clamp-2">
                {project.notes || 'No notes available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.tags.length - 4}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                {project.componentCount && (
                  <div className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    <span>{project.componentCount} components</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {project.learnings && project.learnings.length > 0 && (
                <div className="pt-2 border-t">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Key Learnings:
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                    {project.learnings.slice(0, 2).map((learning, i) => (
                      <li key={i} className="line-clamp-1">{learning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
