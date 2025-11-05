# Clibrary Backend - Convex Integration

This document explains the backend architecture and automation system for Clibrary.

## 🏗️ Architecture Overview

Clibrary uses **Convex** as its backend to handle:
- **Database**: Storing projects, components, design tokens, and analysis results
- **Actions**: Website capture, HTML/CSS extraction, and analysis
- **Queue System**: Managing automated capture tasks
- **Real-time Updates**: Live synchronization between frontend and backend

## 📊 Data Schema

### Projects
Stores information about each website in your library:
```typescript
{
  name: string                    // Project name
  originalUrl: string             // Website URL
  thumbnail?: string              // Screenshot thumbnail
  tags: string[]                  // Tags for categorization
  industry: string                // Industry category
  designStyle: string             // Design style
  techStack: string[]             // Detected technologies
  status: "queued" | "capturing" | "analyzing" | "complete" | "failed"
  screenshots: Screenshot[]       // Captured screenshots
  htmlSnapshot?: string           // Captured HTML
  cssFiles?: string[]             // CSS file URLs
  componentCount?: number         // Detected component count
  learnings?: string[]            // Your learning notes
}
```

### Components
Extracted UI components:
```typescript
{
  name: string
  category: "primitive" | "composition" | "layout" | "template"
  description: string
  sourceProjects: Id<"projects">[]  // Which projects it came from
  code: { react?: string, html?: string }
  tags: string[]
  dependencies?: string[]
  installation?: string
  usage?: string
}
```

### Design Tokens
Design system tokens:
```typescript
{
  name: string
  category: "color" | "typography" | "spacing" | "effects"
  value: string
  usage: number
  projects: Id<"projects">[]
  cssVariable?: string
}
```

## 🔄 Automated Capture Pipeline

When you add a website to the queue, this happens automatically:

### 1. Screenshot Capture
```typescript
// Captures high-quality screenshots
captureScreenshot({
  projectId,
  url
})
```
- Uses external screenshot API (screenshotone.com)
- Captures full-page at 1920x1080
- Stores as base64 data URL
- Updates project with thumbnail

### 2. HTML/CSS Extraction
```typescript
// Fetches and parses HTML
captureHTML({
  projectId,
  url
})
```
- Fetches page HTML using fetch API
- Parses with Cheerio
- Extracts external CSS links
- Extracts inline `<style>` tags
- Stores HTML snapshot for analysis

### 3. Automated Analysis
```typescript
// Analyzes captured data
analyzeWebsite({
  projectId
})
```
- **Tech Stack Detection**: Identifies frameworks (Next.js, React, Vue, Tailwind, etc.)
- **Color Extraction**: Finds colors from inline styles
- **Component Detection**: Counts buttons, forms, cards, navbars, etc.
- **Updates Status**: Marks project as "complete" or "failed"

### 4. Queue Processing
```typescript
// Background worker processes tasks
processNext()
```
- Picks next pending task from queue
- Executes screenshot → HTML → analyze pipeline
- Handles retries and error logging
- Updates project status in real-time

## 🚀 API Functions

### Mutations (Write Operations)

#### Create Project
```typescript
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

const createProject = useMutation(api.projects.create)

await createProject({
  name: "Linear",
  originalUrl: "https://linear.app",
  tags: ["saas", "productivity"],
  industry: "productivity",
  designStyle: "minimal",
  priority: "high",
  notes: "Amazing command palette"
})
```

#### Update Project
```typescript
const updateProject = useMutation(api.projects.update)

await updateProject({
  id: projectId,
  status: "complete",
  componentCount: 24
})
```

### Queries (Read Operations)

#### List Projects
```typescript
import { useQuery } from "convex/react"

const projects = useQuery(api.projects.list, {
  status: "complete",
  limit: 50
})
```

#### Search Projects
```typescript
const results = useQuery(api.projects.search, {
  query: "linear",
  status: "all"
})
```

#### Get Stats
```typescript
const stats = useQuery(api.projects.stats)
// Returns: { total, complete, inProgress, queued, failed }
```

### Actions (Long-running Operations)

#### Full Capture Pipeline
```typescript
import { useAction } from "convex/react"

const captureWebsite = useAction(api.capture.captureWebsite)

const result = await captureWebsite({
  projectId,
  url: "https://example.com"
})
```

#### Process Queue
```typescript
const processNext = useAction(api.queue.processNext)

// Manually trigger processing
await processNext()
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Convex Deployment

Your Convex deployment is already set up! Add this to `.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL=https://kindly-toucan-571.convex.cloud

# Optional: Screenshot API Key
# Get your key from https://screenshotone.com (uses demo key by default)
SCREENSHOT_API_KEY=demo
```

**Note**: A `.env.local` file has already been created with these values.

### 3. Push Schema and Functions to Convex

```bash
# Push your functions and schema to Convex
npx convex deploy
```

This will:
- Generate proper TypeScript types in `convex/_generated/`
- Push the database schema
- Deploy all query/mutation/action functions
- Make your backend live

**Important**: The placeholder types currently in `convex/_generated/` will be replaced with real types that match your actual functions.

### 4. Run Development

```bash
# Terminal 1: Watch Convex functions for changes
npx convex dev

# Terminal 2: Run Next.js
npm run dev
```

### Quick Start Commands

```bash
# First time setup
npx convex deploy              # Deploy functions to Convex
npm run dev                    # Start Next.js dev server

# After setup
npx convex dev                 # Watch for Convex function changes
```

## 📍 Your Deployment URLs

- **Convex Backend**: https://kindly-toucan-571.convex.cloud
- **HTTP Actions**: https://kindly-toucan-571.convex.site
- **Dashboard**: https://dashboard.convex.dev (to view data, logs, and manage deployment)

## 📝 Usage Examples

### Adding a Website
1. Click "Add to Queue" button
2. Fill in the form:
   - Website URL (required)
   - Project name (required)
   - Industry, design style, priority
   - Tags
   - Notes about what to focus on
3. Submit

The system will:
- Create project in database with status "queued"
- Queue screenshot capture task
- Automatically process tasks in background
- Update status: queued → capturing → analyzing → complete

### Monitoring Progress
```typescript
// Watch project status in real-time
const project = useQuery(api.projects.get, { id: projectId })

// project.status updates automatically:
// "queued" → "capturing" → "analyzing" → "complete"
```

### Queue Management
```typescript
// Check queue status
const queueStatus = useQuery(api.queue.status)
// Returns: { total, pending, processing, completed, failed }

// Manually process next task
const processNext = useAction(api.queue.processNext)
await processNext()
```

## 🛠️ Advanced Features

### Custom Analysis
You can extend the analysis in `convex/capture.ts`:

```typescript
// Add custom detection logic
const hasAnimations = html.includes('framer-motion') ||
                      html.includes('@keyframes')

const hasGradients = $('[style*="gradient"]').length > 0

// Store custom analysis
await ctx.runMutation(internal.analysisResults.create, {
  projectId,
  type: "animations",
  data: { hasAnimations, count: animationCount },
  confidence: 0.85
})
```

### Batch Processing
Process multiple websites at once:

```typescript
const websites = [
  "https://linear.app",
  "https://vercel.com",
  "https://stripe.com"
]

for (const url of websites) {
  await createProject({
    name: new URL(url).hostname,
    originalUrl: url,
    tags: ["batch-import"],
    industry: "general",
    designStyle: "modern"
  })
}
```

### Component Extraction
Extend component detection in the analyzer:

```typescript
// Detect specific patterns
const componentPatterns = {
  modals: $('[role="dialog"], .modal, [data-modal]').length,
  dropdowns: $('[role="menu"], .dropdown').length,
  tooltips: $('[role="tooltip"], [data-tooltip]').length,
  tabs: $('[role="tablist"], [data-tabs]').length,
}
```

## 🔒 Security Considerations

1. **Rate Limiting**: The screenshot API has rate limits. For production, use your own API key.
2. **CORS**: Some websites block scraping. The backend handles errors gracefully.
3. **Storage**: Screenshots are stored as base64. For production, use Convex file storage.
4. **API Keys**: Store sensitive keys in environment variables, not in code.

## 🚦 Status Flow

```
User Adds Website
       ↓
   [queued]
       ↓
Queue picks up task
       ↓
  [capturing] → Screenshot API → Store thumbnail
       ↓
  [capturing] → Fetch HTML/CSS → Store snapshot
       ↓
  [analyzing] → Parse HTML → Detect tech stack
       ↓                   → Extract colors
       ↓                   → Count components
       ↓
  [complete] ✓
```

## 📊 Database Queries

All queries are reactive - they automatically update when data changes:

```typescript
// This rerenders when ANY project changes
const projects = useQuery(api.projects.list)

// This rerenders when THIS project changes
const project = useQuery(api.projects.get, { id })

// This rerenders when search results change
const results = useQuery(api.projects.search, { query })
```

## 🎯 Next Steps

1. **Implement Component Generation**: Use AI to generate React components from HTML
2. **Add Screenshot Comparison**: Compare original vs your clone
3. **Build Color Palette Extractor**: Advanced color analysis
4. **Add Typography Detection**: Font family, sizes, weights
5. **Implement CSS Analysis**: Extract spacing scales, shadows, etc.

## 💡 Tips

- Use `convex dev` to see real-time logs
- Check the Convex dashboard for data inspection
- Use the deployment preview to test before production
- Set up webhooks for automation
- Use Convex scheduled functions for periodic tasks

## 🐛 Troubleshooting

### "Screenshot API failed"
- Check your internet connection
- Verify the URL is accessible
- Try a different screenshot service

### "Failed to fetch HTML"
- Website might block scraping
- Check CORS policies
- Try with different User-Agent

### "Convex not connected"
- Check NEXT_PUBLIC_CONVEX_URL is set
- Run `npx convex dev` in separate terminal
- Verify deployment is active

---

For more information, see:
- [Convex Documentation](https://docs.convex.dev)
- [Cheerio Documentation](https://cheerio.js.org/)
- [Screenshot API Docs](https://screenshotone.com/docs)
