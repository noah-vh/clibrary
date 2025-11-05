# Clibrary - Web Clone Studio & Component Library System

## 🎯 Project Vision

A comprehensive platform for ethically learning from web design patterns, building a personal component library, and creating a reusable design system from real-world inspiration. This system serves as both a learning tool and practical resource library for rapid prototyping and development.

## 🏗️ System Architecture

### Core System (This Repository)

```
Clibrary/
├── apps/                      # Application interfaces
│   ├── studio/               # Main library interface
│   ├── preview/              # Iframe preview server
│   └── docs/                 # Component documentation (shadcn-style)
├── packages/                  # Shared packages
│   ├── ui/                   # Extracted component library
│   ├── design-tokens/        # Shared styles & tokens
│   ├── registry/             # Component registry (shadcn-compatible)
│   └── analyzer/             # Style analysis tools
├── data/                     # Metadata & references
│   ├── projects.json         # Project registry
│   ├── components.json       # Component catalog
│   └── sources.json          # Source repository links
├── tools/                    # Automation & extraction
│   ├── capture/              # Website capture tool
│   ├── extractor/            # Component extraction
│   ├── generator/            # Component generation
│   └── sync/                 # Repository sync tools
└── library/                  # Generated outputs
    ├── components/           # Reusable components
    ├── patterns/             # Design patterns
    └── templates/            # Page templates
```

### External Source Repositories

```
External Sources:
├── Local Repositories/
│   └── ~/Documents/GitHub/
│       ├── project-1/        # Full clone project
│       ├── project-2/        # Another clone project
│       └── ...
├── GitHub Repositories/
│   ├── username/repo-1       # Public/private repos
│   ├── username/repo-2
│   └── ...
├── Other Sources/
│   ├── GitLab projects
│   ├── Bitbucket repos
│   ├── CodeSandbox projects
│   ├── StackBlitz projects
│   ├── Vercel deployments
│   └── Netlify sites
```

### Source Configuration

```json
// sources.json
{
  "sources": [
    {
      "id": "project-1",
      "name": "E-commerce Clone",
      "type": "local",
      "path": "~/Documents/GitHub/ecommerce-clone",
      "sync": "auto"
    },
    {
      "id": "project-2", 
      "name": "SaaS Dashboard",
      "type": "github",
      "repo": "noahvanhart/saas-dashboard",
      "branch": "main",
      "private": true
    },
    {
      "id": "project-3",
      "name": "Portfolio Site",
      "type": "vercel",
      "url": "https://portfolio-demo.vercel.app",
      "projectId": "prj_xxxxx"
    },
    {
      "id": "project-4",
      "name": "Component Playground",
      "type": "codesandbox",
      "sandboxId": "clever-name-xxxxx"
    }
  ]
}
```

## 📊 Three Main Interfaces

### 1. Project Gallery/Library
**Purpose**: Showcase and manage all cloned/studied websites, including inspiration queue

**Features**:
- **Visual Grid Display**
  - Live preview cards with screenshots or iframes
  - Shows actual website for queued/unprocessed items
  - Hover for quick component breakdown (processed items)
  - Status badges:
    - 🔖 `queued` - In inspiration list, not started
    - 📋 `planned` - Scheduled for cloning
    - 🔄 `in-progress` - Currently being cloned
    - ✅ `complete` - Fully processed and analyzed
    - ⏭️ `skipped` - Decided not to clone
  - Priority indicators (🔴 high, 🟡 medium, 🟢 low)
  
- **Project Metadata**:
  ```typescript
  interface Project {
    id: string
    name: string
    originalUrl: string
    livePreviewUrl: string  // Shows original site for 'queued' status
    repository?: string     // Optional for queued projects
    thumbnail: string
    screenshots: Screenshot[]
    tags: string[]
    industry: string
    designStyle: string
    components: ComponentRef[]
    styles: StyleRef[]
    patterns: PatternRef[]
    techStack: string[]
    performance: PerformanceMetrics
    createdAt: Date
    updatedAt: Date
    status: 'queued' | 'planned' | 'in-progress' | 'capturing' | 'analyzing' | 'generating' | 'complete'
    priority?: 'low' | 'medium' | 'high'
    notes?: string  // Why you want to clone it, specific elements to focus on
    learnings: string[]
  }
  ```

- **Advanced Filtering**:
  - By industry (e-commerce, SaaS, portfolio, agency)
  - By design style (minimal, brutalist, corporate, playful)
  - By features (animations, 3D, parallax)
  - By components used
  - By color scheme
  - By date range

### 2. Component Library (Shadcn-Style)
**Purpose**: Organized, searchable component documentation with live previews

**Structure**:
```
Components/
├── Primitives/
│   ├── Button (12 variants)
│   ├── Input (8 variants)
│   ├── Badge (6 variants)
│   └── ...
├── Compositions/
│   ├── Card (15 variants)
│   ├── Form (10 templates)
│   ├── Navigation (8 styles)
│   └── ...
├── Layouts/
│   ├── Hero (20 patterns)
│   ├── Pricing (12 tables)
│   ├── Features (15 grids)
│   └── ...
└── Templates/
    ├── Landing pages
    ├── Dashboards
    ├── E-commerce
    └── Portfolios
```

**Component Features**:
- Live preview with controls
- Code snippets (React/Vue/HTML)
- Props/API documentation
- Accessibility notes
- Source tracking (which projects use this)
- Shadcn registry compatibility

### 3. Style Library/Design System
**Purpose**: Visual patterns and design tokens extracted from all projects

**Categories**:
- **Color Systems**: Palettes, semantic mappings, dark/light modes
- **Typography**: Font pairings, type scales, text styles
- **Spacing**: Grid systems, spacing scales, containers
- **Effects**: Transitions, animations, micro-interactions
- **Visual Elements**: Borders, shadows, gradients

## 🔄 Workflow Process

### Phase 1: Capture & Analysis
```bash
# 1. Add source to registry
npm run source:add --type=github --repo=username/repo

# 2. Capture website/analyze repository
npm run capture --source=project-id

# 3. Extract components and patterns
npm run extract --source=project-id --output=library
```

### Phase 2: Component Generation
```bash
# Generate shadcn-compatible components
npm run generate:components --source=project-id

# Create design tokens
npm run generate:tokens --source=project-id

# Build component documentation
npm run generate:docs
```

### Phase 3: Library Integration
```bash
# Sync to component library
npm run sync:library

# Update registry
npm run registry:update

# Deploy documentation
npm run deploy:docs
```

## 🛠️ Tools & Automation

### Capture Tool (`tools/capture/`)
```python
# capture.py
- Screenshots at multiple viewports
- DOM structure extraction
- CSS analysis
- Asset collection
- Performance metrics
```

### Component Extractor (`tools/extractor/`)
```javascript
// extract.js
- Pattern recognition
- Component identification
- Props extraction
- Variant detection
- Dependency mapping
```

### Shadcn Generator (`tools/generator/`)
```typescript
// generator.ts
- Convert to Radix UI primitives
- Apply Tailwind styling
- Generate TypeScript types
- Create component.json
- Build registry entries
```

### Repository Sync (`tools/sync/`)
```javascript
// sync.js
- Git integration
- GitHub API
- Vercel/Netlify APIs
- File system watching
- Change detection
```

## 📦 Data Models

### Project Registry
```typescript
interface ProjectSource {
  id: string
  name: string
  type: 'local' | 'github' | 'gitlab' | 'vercel' | 'codesandbox'
  source: {
    path?: string      // Local path
    repo?: string      // Repository URL
    url?: string       // Live URL
    apiKey?: string    // API access
  }
  metadata: {
    originalUrl: string
    description: string
    tags: string[]
    industry: string
    designStyle: string
  }
  extraction: {
    lastSync: Date
    components: string[]
    patterns: string[]
    tokens: DesignTokens
  }
  status: 'active' | 'archived' | 'processing'
}
```

### Component Registry
```typescript
interface ComponentEntry {
  id: string
  name: string
  category: 'primitive' | 'composition' | 'layout' | 'template'
  sources: ProjectSource[]
  variants: ComponentVariant[]
  code: {
    react: string
    vue?: string
    html?: string
  }
  shadcn: {
    component: object      // component.json format
    dependencies: string[]
    registry: boolean
  }
  usage: {
    count: number
    projects: string[]
    lastUsed: Date
  }
}
```

### Design Token System
```typescript
interface DesignTokens {
  colors: {
    primary: ColorScale
    secondary: ColorScale
    neutral: ColorScale
    semantic: SemanticColors
  }
  typography: {
    fonts: FontFamily[]
    sizes: TypeScale
    weights: FontWeights
    lineHeights: LineHeights
  }
  spacing: {
    base: number
    scale: number[]
    grid: GridSystem
  }
  effects: {
    shadows: ShadowScale
    borders: BorderStyles
    radii: BorderRadii
    animations: Animation[]
  }
}
```

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/clibrary.git
cd clibrary

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Configure sources
npm run config:sources
```

### Adding to Inspiration Queue
```bash
# Quick add a site you want to clone later
npm run queue:add --url=https://linear.app --priority=high

# Add with notes about what caught your eye
npm run queue:add \
  --url=https://example.com \
  --name="Amazing Portfolio" \
  --notes="Incredible parallax and typography"
```

### Adding Your First Project
```bash
# Local repository
npm run source:add --type=local --path=~/GitHub/my-project

# GitHub repository
npm run source:add --type=github --repo=username/repo-name

# Live website (for immediate processing)
npm run source:add --type=url --url=https://example.com --process=true
```

### Running the System
```bash
# Start the studio interface
npm run dev:studio

# Start component docs
npm run dev:docs

# Run extraction pipeline
npm run pipeline:extract --source=all
```

## 🎯 Use Cases

1. **Learning & Education**
   - Study design patterns from successful websites
   - Understand component architecture
   - Learn best practices

2. **Rapid Prototyping**
   - Quickly assemble new projects from proven components
   - Mix and match design patterns
   - Generate consistent design systems

3. **Component Library Building**
   - Extract and standardize components
   - Create shadcn-compatible registry
   - Share with team/community

4. **Design System Creation**
   - Extract design tokens from multiple sources
   - Create cohesive visual language
   - Generate documentation

## ⚖️ Ethical Guidelines

- **Educational Purpose**: Use for learning and inspiration
- **Original Creation**: Generate new code, don't copy
- **Respect Copyright**: Never use protected assets
- **Attribution**: Credit original designers when appropriate
- **Fair Use**: Follow fair use principles for analysis

## 🔮 Future Enhancements

- [ ] AI-powered component recognition
- [ ] Figma plugin for design export
- [ ] Storybook integration
- [ ] Team collaboration features
- [ ] Performance benchmarking
- [ ] Accessibility scoring
- [ ] Design trend analysis
- [ ] Component marketplace
- [ ] Version control for components
- [ ] CI/CD pipeline integration

## 📚 Documentation

- [Setup Guide](./docs/setup.md)
- [Source Configuration](./docs/sources.md)
- [Component Extraction](./docs/extraction.md)
- [Shadcn Integration](./docs/shadcn.md)
- [Inspiration Queue](./docs/queue.md)
- [API Reference](./docs/api.md)
- [Contributing](./docs/contributing.md)

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details

---

**Note**: This tool is for educational purposes and creating original work. Always respect copyright and intellectual property rights.