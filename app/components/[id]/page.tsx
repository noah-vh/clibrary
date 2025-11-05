import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/ui/code-block"
import { CodeTabs } from "@/components/code-tabs"
import { mockComponents, mockProjects } from "@/lib/mock-data"
import { ArrowLeft, Terminal, Package, ExternalLink, Check } from "lucide-react"

export default async function ComponentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const component = mockComponents.find(c => c.id === id)

  if (!component) {
    notFound()
  }

  const sourceProjects = component.sources
    .map(sourceId => mockProjects.find(p => p.id === sourceId))
    .filter(Boolean)

  return (
    <div className="container max-w-5xl py-10">
      {/* Back Button */}
      <Link href="/components">
        <Button variant="ghost" size="sm" className="mb-8 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Components
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-4 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{component.name}</h1>
            <p className="text-muted-foreground text-lg mt-2">
              {component.description}
            </p>
          </div>
          <Badge variant="outline" className="capitalize">
            {component.category}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
        <Card className="overflow-hidden">
          <div className="aspect-video relative bg-muted">
            <img
              src={component.preview}
              alt={component.name}
              className="object-cover w-full h-full"
            />
          </div>
        </Card>
      </div>

      {/* Installation */}
      {component.installation && (
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                <CardTitle className="text-lg">Quick Install</CardTitle>
              </div>
              <CardDescription>
                Install the component using the CLI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={component.installation}
                language="bash"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dependencies */}
      {component.dependencies && component.dependencies.length > 0 && (
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Dependencies</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <CardTitle className="text-lg">Required Packages</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {component.dependencies.map((dep) => (
                  <li key={dep} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <code className="text-sm bg-muted px-2 py-1 rounded">{dep}</code>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Code Examples */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Code</h2>
        <CodeTabs react={component.code.react} html={component.code.html} />
      </div>

      {/* Usage */}
      {component.usage && (
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
          <CodeBlock
            code={component.usage}
            language="typescript"
          />
        </div>
      )}

      <Separator className="my-10" />

      {/* Source Projects */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Found In</h2>
        <p className="text-muted-foreground">
          This component was extracted from the following projects:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {sourceProjects.map((project) => project && (
            <Card key={project.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Link
                    href={project.originalUrl}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.notes}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return mockComponents.map((component) => ({
    id: component.id,
  }))
}
