export type ProjectStatus = 'queued' | 'planned' | 'in-progress' | 'complete' | 'skipped'
export type Priority = 'low' | 'medium' | 'high'
export type ComponentCategory = 'primitive' | 'composition' | 'layout' | 'template'

export interface Project {
  id: string
  name: string
  originalUrl: string
  livePreviewUrl?: string
  repository?: string
  thumbnail: string
  tags: string[]
  industry: string
  designStyle: string
  techStack: string[]
  status: ProjectStatus
  priority?: Priority
  notes?: string
  createdAt: string
  updatedAt: string
  componentCount?: number
  learnings?: string[]
}

export interface Component {
  id: string
  name: string
  category: ComponentCategory
  description: string
  preview: string
  sources: string[] // Project IDs
  variants: number
  code: {
    react?: string
    html?: string
  }
  tags: string[]
}

export interface DesignToken {
  id: string
  name: string
  category: 'color' | 'typography' | 'spacing' | 'effects'
  value: string
  usage: number
  projects: string[]
}
