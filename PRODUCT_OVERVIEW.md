# Clibrary - Product Overview

## Concept

A system that combines website collection, cloning, and component extraction into a unified library for learning and reusing web design patterns.

## Core Workflow

### 1. Collect → 2. Clone → 3. Extract → 4. Reuse

## Three Main Interfaces

### 1. Website Library/Gallery
**Purpose:** Visual catalog of all websites (queued, in-progress, and completed)

**Features:**
- **Grid view** with preview cards
- **Live previews:**
  - Queued sites: Show actual website in iframe
  - Completed: Show your clone
  - In-progress: Show progress status
- **Metadata per project:**
  - Original URL
  - Local/GitHub repository link
  - Tech stack used
  - Completion status (queued → in-progress → complete)
  - Tags (minimal, saas, portfolio, etc.)
  - Industry category
  - Design style
  - Priority level (for queued items)
  - Personal notes/learnings
- **Filtering:**
  - By status (queued, complete)
  - By industry (e-commerce, SaaS, portfolio)
  - By design style (minimal, brutalist, corporate)
  - By components used
  - By date added/completed
- **Quick actions:**
  - Start cloning (for queued)
  - View live demo
  - Open code
  - Extract components
  - View component breakdown

### 2. Component Library
**Purpose:** Catalog of all extracted components across all projects (shadcn-style documentation)

**Structure:**
```
Components/
├── Primitives/
│   ├── Buttons (extracted from 12 sites)
│   ├── Inputs (from 8 sites)
│   ├── Badges (from 6 sites)
│   └── ...
├── Compositions/
│   ├── Cards (15 variations)
│   ├── Forms (10 templates)
│   ├── Navigation (8 styles)
│   └── ...
├── Layouts/
│   ├── Hero sections (20 patterns)
│   ├── Pricing tables (12 variations)
│   ├── Feature grids (15 styles)
│   └── ...
└── Templates/
    ├── Landing pages
    ├── Dashboards
    └── Portfolios
```

**Per Component:**
- Live preview with controls
- Code (React/Vue/HTML)
- Props documentation
- Variants and states
- **Source tracking** - which sites this came from
- Usage examples
- Copy-to-clipboard
- shadcn registry compatible format

### 3. Design System/Style Library
**Purpose:** Aggregated design patterns and tokens from all cloned sites

**Sections:**
- **Colors:**
  - Palettes by project
  - Common color patterns
  - Semantic mappings
- **Typography:**
  - Font combinations
  - Type scales
  - Common text styles
- **Spacing:**
  - Grid systems
  - Spacing scales
  - Layout patterns
- **Effects:**
  - Animations
  - Transitions
  - Hover states
  - Shadows/borders

## Technical Features

### Source Management
- **Multiple source types:**
  - Local folders (`~/Documents/GitHub/project`)
  - GitHub repos (public/private)
  - Live URLs (for queued sites)
  - Vercel/Netlify deployments
  - CodeSandbox/StackBlitz
  
### Extraction Pipeline
1. **Capture:** Screenshots, HTML, CSS, assets
2. **Analysis:** Identify components, patterns, tokens
3. **Extraction:** Pull out reusable pieces
4. **Generation:** Create clean component code
5. **Registration:** Add to shadcn-compatible registry

### Automation Tools
- **Browser extension:** One-click add to queue
- **CLI commands:**
  ```bash
  # Add to queue
  npm run queue:add --url=https://linear.app
  
  # Start cloning
  npm run clone --source=queue-001
  
  # Extract components
  npm run extract --source=project-1
  
  # Generate shadcn components
  npm run shadcn:generate
  ```

## Data Structure

```typescript
interface Project {
  // Identity
  id: string
  name: string
  originalUrl: string
  
  // Status
  status: 'queued' | 'in-progress' | 'complete'
  priority?: 'high' | 'medium' | 'low'  // for queued
  
  // Sources
  repository?: string     // GitHub/local path
  livePreviewUrl: string  // For iframe
  
  // Metadata
  tags: string[]
  industry: string
  designStyle: string
  techStack: string[]
  
  // Extraction
  components: ComponentRef[]
  designTokens: DesignTokens
  patterns: Pattern[]
  
  // Progress
  createdAt: Date
  completedAt?: Date
  notes: string
}

interface Component {
  id: string
  name: string
  category: 'primitive' | 'composition' | 'layout' | 'template'
  
  // Sources
  foundIn: Project[]  // Which projects use this
  variants: Variant[]
  
  // Code
  code: {
    react: string
    vue?: string
    html?: string
  }
  
  // Shadcn
  shadcnCompatible: boolean
  registryEntry?: ShadcnRegistry
}
```

## Key Differentiators

1. **Unified System:** Not separate tools but one integrated workflow
2. **Queue → Complete Pipeline:** See everything from inspiration to implementation
3. **Cross-Project Intelligence:** Components extracted across ALL your clones
4. **Production Ready:** shadcn-compatible means instant use in projects
5. **Learning Focused:** Track what you learned from each clone

## Use Cases

1. **Building a SaaS:** Queue 10 SaaS sites → Clone the best patterns → Extract common components → Build your app
2. **Learning Design:** Add sites you love → Recreate them → Understand patterns → Build your skills
3. **Agency Work:** Catalog inspiration → Extract patterns → Reuse across clients
4. **Component Library:** Clone multiple sites → Extract components → Build your own UI library

## File Organization

```
Clibrary/
├── apps/
│   ├── studio/          # Main interface (gallery, component lib, design system)
│   ├── preview/         # Iframe server for live previews
│   └── docs/           # Component documentation
├── sources/            # References to external repos
│   ├── config.json     # Source configurations
│   └── metadata/       # Cached metadata
├── extracted/          # Extracted components & tokens
│   ├── components/
│   ├── tokens/
│   └── patterns/
├── tools/
│   ├── capture/        # Screenshot & analysis
│   ├── extractor/      # Component extraction
│   └── generator/      # Code generation
└── registry/           # shadcn-compatible registry
```

## Next Steps

This system would let you:
1. Never lose track of inspiring sites (queue)
2. Learn by recreating (clone)
3. Build a reusable library (extract)
4. Ship faster with your components (reuse)

The key is that it's not just bookmarking or screenshotting - it's a complete learning and building system that turns inspiration into production-ready code.