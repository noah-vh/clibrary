import { Project, Component, DesignToken } from './types'

export const mockProjects: Project[] = [
  {
    id: 'linear',
    name: 'Linear',
    originalUrl: 'https://linear.app',
    livePreviewUrl: 'https://linear.app',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80',
    tags: ['saas', 'productivity', 'minimal', 'animations', 'dark-mode'],
    industry: 'productivity',
    designStyle: 'minimal',
    techStack: ['Next.js', 'React', 'TypeScript', 'Framer Motion'],
    status: 'complete',
    priority: 'high',
    notes: 'Linear\'s interface is a masterclass in minimal design and smooth animations. The command palette (⌘K) is particularly well-executed.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-02-01T14:30:00Z',
    componentCount: 42,
    learnings: [
      'Command palette with fuzzy search implementation',
      'Smooth page transitions using Framer Motion',
      'Keyboard shortcut system architecture',
      'Issue card hover states and micro-interactions',
      'Dark mode with CSS variables',
      'Toast notification system',
      'Dropdown menu patterns'
    ]
  },
  {
    id: 'vercel',
    name: 'Vercel',
    originalUrl: 'https://vercel.com',
    livePreviewUrl: 'https://vercel.com',
    thumbnail: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&auto=format&fit=crop&q=80',
    tags: ['saas', 'developer', 'dark', 'gradients', 'modern'],
    industry: 'developer-tools',
    designStyle: 'modern',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    status: 'complete',
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-28T11:20:00Z',
    componentCount: 38,
    learnings: [
      'Gradient text and button effects',
      'Code block syntax highlighting',
      'Deployment timeline UI',
      'Dashboard metrics cards',
      'Animated border gradients',
      'Terminal-style command displays'
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe',
    originalUrl: 'https://stripe.com',
    livePreviewUrl: 'https://stripe.com',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    tags: ['fintech', 'corporate', 'clean', 'professional', 'gradient'],
    industry: 'fintech',
    designStyle: 'corporate',
    techStack: ['Next.js', 'React', 'TypeScript'],
    status: 'in-progress',
    priority: 'high',
    notes: 'Stripe\'s use of subtle gradients and spacing creates a professional yet modern feel.',
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-02-05T16:45:00Z',
    componentCount: 24,
    learnings: [
      'Subtle gradient backgrounds',
      'Pricing table layouts',
      'Feature comparison grids',
      'Payment form patterns'
    ]
  },
  {
    id: 'shadcn',
    name: 'shadcn/ui',
    originalUrl: 'https://ui.shadcn.com',
    livePreviewUrl: 'https://ui.shadcn.com',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    tags: ['component-library', 'docs', 'clean', 'minimal', 'accessible'],
    industry: 'design-system',
    designStyle: 'minimal',
    techStack: ['Next.js', 'React', 'TypeScript', 'Radix UI', 'Tailwind'],
    status: 'complete',
    priority: 'high',
    notes: 'The gold standard for component documentation. Clean, minimal, with excellent code examples.',
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-30T10:00:00Z',
    componentCount: 56,
    learnings: [
      'Component documentation structure',
      'Live preview with code toggle',
      'Installation instructions format',
      'Copy-to-clipboard functionality',
      'API documentation tables',
      'Variant showcase patterns',
      'Sidebar navigation for docs'
    ]
  },
  {
    id: 'cal',
    name: 'Cal.com',
    originalUrl: 'https://cal.com',
    livePreviewUrl: 'https://cal.com',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80',
    tags: ['saas', 'scheduling', 'clean', 'calendar', 'open-source'],
    industry: 'productivity',
    designStyle: 'clean',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind'],
    status: 'complete',
    createdAt: '2024-01-20T13:20:00Z',
    updatedAt: '2024-02-03T09:15:00Z',
    componentCount: 31,
    learnings: [
      'Calendar grid layout',
      'Time slot selection UI',
      'Booking confirmation flow',
      'Settings panel organization'
    ]
  },
  {
    id: 'notion',
    name: 'Notion',
    originalUrl: 'https://notion.so',
    livePreviewUrl: 'https://notion.so',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    tags: ['productivity', 'clean', 'illustrations', 'typography'],
    industry: 'productivity',
    designStyle: 'friendly',
    techStack: ['React', 'TypeScript'],
    status: 'queued',
    priority: 'medium',
    notes: 'Beautiful integration of illustrations with typography. The block-based editor UI is revolutionary.',
    createdAt: '2024-02-01T14:00:00Z',
    updatedAt: '2024-02-01T14:00:00Z'
  },
  {
    id: 'github',
    name: 'GitHub',
    originalUrl: 'https://github.com',
    livePreviewUrl: 'https://github.com',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&auto=format&fit=crop&q=80',
    tags: ['developer', 'clean', 'professional', 'dark-mode'],
    industry: 'developer-tools',
    designStyle: 'professional',
    techStack: ['Rails', 'React', 'TypeScript'],
    status: 'planned',
    priority: 'high',
    notes: 'File tree navigation, code review UI, and diff viewing are all excellently designed.',
    createdAt: '2024-01-25T10:30:00Z',
    updatedAt: '2024-02-02T08:15:00Z'
  },
  {
    id: 'resend',
    name: 'Resend',
    originalUrl: 'https://resend.com',
    livePreviewUrl: 'https://resend.com',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&auto=format&fit=crop&q=80',
    tags: ['saas', 'developer', 'minimal', 'clean', 'api'],
    industry: 'developer-tools',
    designStyle: 'minimal',
    techStack: ['Next.js', 'React', 'TypeScript'],
    status: 'complete',
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-29T15:30:00Z',
    componentCount: 18,
    learnings: [
      'API documentation layout',
      'Code example blocks',
      'Email template previews',
      'Simple pricing cards'
    ]
  }
]

export const mockComponents: Component[] = [
  {
    id: 'command-palette',
    name: 'Command Palette',
    category: 'composition',
    description: 'A command menu for quick navigation and actions, triggered with ⌘K. Includes fuzzy search and keyboard navigation.',
    preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'github'],
    variants: 3,
    code: {
      react: `import { Command } from "@/components/ui/command"

export function CommandPalette() {
  return (
    <Command>
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>Calendar</Command.Item>
          <Command.Item>Search Emoji</Command.Item>
          <Command.Item>Calculator</Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  )
}`,
      html: `<div data-command>
  <input data-command-input placeholder="Type a command or search..." />
  <div data-command-list>
    <!-- Command items -->
  </div>
</div>`
    },
    tags: ['keyboard', 'navigation', 'search', 'modal'],
    dependencies: ['cmdk', '@radix-ui/react-dialog'],
    installation: 'npx shadcn-ui@latest add command',
    usage: `import { CommandDialog } from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return <CommandDialog open={open} onOpenChange={setOpen}>...</CommandDialog>
}`
  },
  {
    id: 'gradient-button',
    name: 'Button',
    category: 'primitive',
    description: 'A versatile button component with multiple variants including gradient backgrounds and ghost styles.',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'vercel', 'stripe', 'shadcn'],
    variants: 8,
    code: {
      react: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`,
    },
    tags: ['button', 'interactive', 'cta'],
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    installation: 'npx shadcn-ui@latest add button',
    usage: `<Button variant="default" size="lg">
  Click me
</Button>`
  },
  {
    id: 'card',
    name: 'Card',
    category: 'composition',
    description: 'A flexible card component for grouping related content with header, content, and footer sections.',
    preview: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'vercel', 'stripe', 'shadcn', 'cal', 'resend'],
    variants: 12,
    code: {
      react: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`,
    },
    tags: ['card', 'container', 'layout'],
    dependencies: [],
    installation: 'npx shadcn-ui@latest add card',
    usage: `<Card className="w-[350px]">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>`
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'composition',
    description: 'A modal dialog with customizable content and actions. Supports accessibility with focus trap and keyboard navigation.',
    preview: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'shadcn', 'github'],
    variants: 4,
    code: {
      react: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Form content */}
        </div>
      </DialogContent>
    </Dialog>
  )
}`,
    },
    tags: ['modal', 'dialog', 'overlay', 'accessible'],
    dependencies: ['@radix-ui/react-dialog'],
    installation: 'npx shadcn-ui@latest add dialog',
    usage: `<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>`
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'composition',
    description: 'A dropdown menu with support for sub-menus, separators, checkboxes, and keyboard navigation.',
    preview: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'github', 'shadcn'],
    variants: 6,
    code: {
      react: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    },
    tags: ['menu', 'dropdown', 'navigation'],
    dependencies: ['@radix-ui/react-dropdown-menu'],
    installation: 'npx shadcn-ui@latest add dropdown-menu',
    usage: `<DropdownMenu>
  <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'composition',
    description: 'Non-intrusive notifications that appear temporarily at the corner of the screen.',
    preview: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'vercel', 'github'],
    variants: 5,
    code: {
      react: `import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}`,
    },
    tags: ['notification', 'toast', 'alert', 'feedback'],
    dependencies: ['@radix-ui/react-toast'],
    installation: 'npx shadcn-ui@latest add toast',
    usage: `toast({
  title: "Success",
  description: "Your changes have been saved.",
})`
  },
  {
    id: 'input',
    name: 'Input',
    category: 'primitive',
    description: 'Text input field with support for different types, states, and custom styling.',
    preview: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'stripe', 'shadcn', 'cal', 'resend'],
    variants: 6,
    code: {
      react: `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return (
    <div className="grid gap-2">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled" />
    </div>
  )
}`,
    },
    tags: ['input', 'form', 'text-field'],
    dependencies: [],
    installation: 'npx shadcn-ui@latest add input',
    usage: `<Input type="email" placeholder="Enter your email" />`
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'primitive',
    description: 'Small labels for displaying metadata, status, or categorization.',
    preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'vercel', 'github', 'shadcn'],
    variants: 4,
    code: {
      react: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`,
    },
    tags: ['badge', 'label', 'tag', 'status'],
    dependencies: ['class-variance-authority'],
    installation: 'npx shadcn-ui@latest add badge',
    usage: `<Badge variant="outline">Badge</Badge>`
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'composition',
    description: 'Organize content into multiple panels with tab navigation.',
    preview: 'https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=800&auto=format&fit=crop&q=80',
    sources: ['shadcn', 'vercel', 'resend'],
    variants: 3,
    code: {
      react: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Account content
      </TabsContent>
      <TabsContent value="password">
        Password content
      </TabsContent>
    </Tabs>
  )
}`,
    },
    tags: ['tabs', 'navigation', 'panels'],
    dependencies: ['@radix-ui/react-tabs'],
    installation: 'npx shadcn-ui@latest add tabs',
    usage: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>`
  },
  {
    id: 'select',
    name: 'Select',
    category: 'primitive',
    description: 'Custom select dropdown with keyboard navigation and accessibility features.',
    preview: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'cal', 'shadcn'],
    variants: 3,
    code: {
      react: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
    },
    tags: ['select', 'dropdown', 'form'],
    dependencies: ['@radix-ui/react-select'],
    installation: 'npx shadcn-ui@latest add select',
    usage: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>`
  },
  {
    id: 'code-block',
    name: 'Code Block',
    category: 'composition',
    description: 'Syntax-highlighted code blocks with copy functionality and language support.',
    preview: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    sources: ['vercel', 'shadcn', 'resend'],
    variants: 4,
    code: {
      react: `import { CodeBlock } from "@/components/ui/code-block"

export function CodeBlockDemo() {
  const code = \`function hello() {
  console.log("Hello, world!")
}\`

  return (
    <CodeBlock
      language="typescript"
      code={code}
      showLineNumbers
    />
  )
}`,
    },
    tags: ['code', 'syntax', 'developer', 'docs'],
    dependencies: ['react-syntax-highlighter'],
    installation: 'npm install react-syntax-highlighter',
    usage: `<CodeBlock language="javascript" code={sourceCode} />`
  },
  {
    id: 'data-table',
    name: 'Data Table',
    category: 'composition',
    description: 'Feature-rich data table with sorting, filtering, and pagination.',
    preview: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
    sources: ['linear', 'github', 'vercel'],
    variants: 5,
    code: {
      react: `import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
    />
  )
}`,
    },
    tags: ['table', 'data', 'grid', 'list'],
    dependencies: ['@tanstack/react-table'],
    installation: 'npm install @tanstack/react-table',
    usage: `<DataTable columns={columns} data={data} />`
  }
]

export const mockDesignTokens: DesignToken[] = [
  // Colors from Linear
  {
    id: 'linear-primary',
    name: 'Primary (Linear)',
    category: 'color',
    value: '#5E6AD2',
    usage: 156,
    projects: ['linear'],
    description: 'Linear\'s signature purple used for primary actions and branding',
    cssVariable: '--linear-primary'
  },
  {
    id: 'linear-bg',
    name: 'Background (Linear)',
    category: 'color',
    value: '#FCFCFC',
    usage: 89,
    projects: ['linear'],
    description: 'Light background color for Linear\'s interface',
    cssVariable: '--background'
  },
  {
    id: 'linear-border',
    name: 'Border (Linear)',
    category: 'color',
    value: '#E6E6E7',
    usage: 203,
    projects: ['linear'],
    description: 'Subtle border color for dividers and cards',
    cssVariable: '--border'
  },

  // Colors from Vercel
  {
    id: 'vercel-black',
    name: 'Black (Vercel)',
    category: 'color',
    value: '#000000',
    usage: 245,
    projects: ['vercel'],
    description: 'Vercel\'s pure black for text and backgrounds',
    cssVariable: '--vercel-black'
  },
  {
    id: 'vercel-gradient',
    name: 'Gradient (Vercel)',
    category: 'color',
    value: 'linear-gradient(to right, #0070f3, #00dfd8)',
    usage: 67,
    projects: ['vercel'],
    description: 'Blue to cyan gradient for hero sections and CTAs',
    cssVariable: '--vercel-gradient'
  },

  // Colors from Stripe
  {
    id: 'stripe-purple',
    name: 'Purple (Stripe)',
    category: 'color',
    value: '#635BFF',
    usage: 134,
    projects: ['stripe'],
    description: 'Stripe\'s signature purple brand color',
    cssVariable: '--stripe-purple'
  },
  {
    id: 'stripe-gradient-bg',
    name: 'Gradient Background (Stripe)',
    category: 'color',
    value: 'linear-gradient(180deg, #F6F9FC 0%, #FFFFFF 100%)',
    usage: 45,
    projects: ['stripe'],
    description: 'Subtle gradient for section backgrounds',
    cssVariable: '--stripe-bg-gradient'
  },

  // Typography from shadcn/Linear
  {
    id: 'font-inter',
    name: 'Inter (Body)',
    category: 'typography',
    value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    usage: 512,
    projects: ['linear', 'shadcn', 'vercel', 'cal'],
    description: 'Clean, modern sans-serif for body text',
    cssVariable: '--font-sans'
  },
  {
    id: 'font-mono',
    name: 'JetBrains Mono (Code)',
    category: 'typography',
    value: '"JetBrains Mono", "Fira Code", Consolas, monospace',
    usage: 178,
    projects: ['vercel', 'shadcn', 'resend'],
    description: 'Monospace font for code blocks and technical content',
    cssVariable: '--font-mono'
  },
  {
    id: 'text-sm',
    name: 'Small Text',
    category: 'typography',
    value: '0.875rem / 1.25rem',
    usage: 389,
    projects: ['linear', 'shadcn', 'vercel', 'stripe'],
    description: 'Small text size (14px) with line height',
    cssVariable: '--text-sm'
  },
  {
    id: 'text-base',
    name: 'Base Text',
    category: 'typography',
    value: '1rem / 1.5rem',
    usage: 623,
    projects: ['linear', 'shadcn', 'vercel', 'stripe', 'cal'],
    description: 'Default body text size (16px)',
    cssVariable: '--text-base'
  },

  // Spacing
  {
    id: 'space-4',
    name: 'Space 4 (1rem)',
    category: 'spacing',
    value: '1rem (16px)',
    usage: 891,
    projects: ['linear', 'shadcn', 'vercel', 'stripe', 'cal'],
    description: 'Standard spacing unit',
    cssVariable: '--space-4'
  },
  {
    id: 'space-8',
    name: 'Space 8 (2rem)',
    category: 'spacing',
    value: '2rem (32px)',
    usage: 467,
    projects: ['linear', 'shadcn', 'vercel', 'stripe'],
    description: 'Large spacing for sections',
    cssVariable: '--space-8'
  },
  {
    id: 'radius-md',
    name: 'Border Radius (Medium)',
    category: 'spacing',
    value: '0.5rem (8px)',
    usage: 734,
    projects: ['linear', 'shadcn', 'vercel', 'stripe', 'cal'],
    description: 'Medium border radius for cards and buttons',
    cssVariable: '--radius'
  },

  // Effects
  {
    id: 'shadow-sm',
    name: 'Small Shadow',
    category: 'effects',
    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    usage: 456,
    projects: ['linear', 'shadcn', 'stripe'],
    description: 'Subtle shadow for elevated elements',
    cssVariable: '--shadow-sm'
  },
  {
    id: 'shadow-lg',
    name: 'Large Shadow',
    category: 'effects',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    usage: 234,
    projects: ['linear', 'vercel', 'stripe'],
    description: 'Prominent shadow for modals and dropdowns',
    cssVariable: '--shadow-lg'
  },
  {
    id: 'transition-base',
    name: 'Base Transition',
    category: 'effects',
    value: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    usage: 812,
    projects: ['linear', 'shadcn', 'vercel', 'stripe', 'cal'],
    description: 'Standard transition timing for interactions',
    cssVariable: '--transition-base'
  }
]
