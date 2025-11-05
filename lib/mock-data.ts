import { Project, Component, DesignToken } from './types'

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Linear.app Clone',
    originalUrl: 'https://linear.app',
    livePreviewUrl: 'https://linear.app',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    tags: ['saas', 'productivity', 'minimal', 'animations'],
    industry: 'productivity',
    designStyle: 'minimal',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    status: 'complete',
    priority: 'high',
    notes: 'Amazing micro-interactions and command palette. Focus on keyboard shortcuts system.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    componentCount: 24,
    learnings: ['Command palette implementation', 'Smooth transitions', 'Keyboard navigation patterns']
  },
  {
    id: 'proj-2',
    name: 'Stripe Landing Page',
    originalUrl: 'https://stripe.com',
    livePreviewUrl: 'https://stripe.com',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop',
    tags: ['saas', 'fintech', 'corporate', 'clean'],
    industry: 'fintech',
    designStyle: 'corporate',
    techStack: ['Next.js', 'React'],
    status: 'in-progress',
    priority: 'high',
    notes: 'Beautiful gradient effects and spacing system.',
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-22T16:45:00Z',
    componentCount: 12
  },
  {
    id: 'proj-3',
    name: 'Vercel Homepage',
    originalUrl: 'https://vercel.com',
    livePreviewUrl: 'https://vercel.com',
    thumbnail: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&auto=format&fit=crop',
    tags: ['saas', 'developer-tools', 'dark', 'modern'],
    industry: 'developer-tools',
    designStyle: 'modern',
    techStack: ['Next.js', 'React', 'TypeScript'],
    status: 'complete',
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-16T11:20:00Z',
    componentCount: 18,
    learnings: ['Dark mode implementation', 'Code block styling', 'Gradient animations']
  },
  {
    id: 'proj-4',
    name: 'Notion Website',
    originalUrl: 'https://notion.so',
    livePreviewUrl: 'https://notion.so',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    tags: ['productivity', 'clean', 'illustrations'],
    industry: 'productivity',
    designStyle: 'clean',
    techStack: ['React', 'TypeScript'],
    status: 'queued',
    priority: 'medium',
    notes: 'Love the illustrations and how they integrate typography with visuals.',
    createdAt: '2024-01-22T14:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z'
  },
  {
    id: 'proj-5',
    name: 'Figma Landing',
    originalUrl: 'https://figma.com',
    livePreviewUrl: 'https://figma.com',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    tags: ['design', 'vibrant', 'animations', 'creative'],
    industry: 'design-tools',
    designStyle: 'vibrant',
    techStack: ['React'],
    status: 'queued',
    priority: 'high',
    notes: 'Incredible animations and color usage. Study the hero section transitions.',
    createdAt: '2024-01-23T10:30:00Z',
    updatedAt: '2024-01-23T10:30:00Z'
  },
  {
    id: 'proj-6',
    name: 'Shopify Store',
    originalUrl: 'https://shopify.com',
    livePreviewUrl: 'https://shopify.com',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
    tags: ['ecommerce', 'clean', 'professional'],
    industry: 'ecommerce',
    designStyle: 'professional',
    techStack: ['React', 'Ruby on Rails'],
    status: 'planned',
    priority: 'medium',
    notes: 'Great product card designs and checkout flow.',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-21T09:30:00Z'
  },
  {
    id: 'proj-7',
    name: 'Airbnb Experiences',
    originalUrl: 'https://airbnb.com',
    livePreviewUrl: 'https://airbnb.com',
    thumbnail: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=800&auto=format&fit=crop',
    tags: ['marketplace', 'imagery', 'cards'],
    industry: 'travel',
    designStyle: 'imagery-focused',
    techStack: ['React'],
    status: 'complete',
    createdAt: '2024-01-05T13:20:00Z',
    updatedAt: '2024-01-12T16:40:00Z',
    componentCount: 32,
    learnings: ['Image galleries', 'Filter systems', 'Card hover effects']
  },
  {
    id: 'proj-8',
    name: 'Cal.com Scheduling',
    originalUrl: 'https://cal.com',
    livePreviewUrl: 'https://cal.com',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop',
    tags: ['saas', 'minimal', 'calendar'],
    industry: 'productivity',
    designStyle: 'minimal',
    techStack: ['Next.js', 'TypeScript', 'Prisma'],
    status: 'queued',
    priority: 'low',
    notes: 'Calendar UI is really clean.',
    createdAt: '2024-01-24T15:45:00Z',
    updatedAt: '2024-01-24T15:45:00Z'
  }
]

export const mockComponents: Component[] = [
  {
    id: 'comp-1',
    name: 'Gradient Button',
    category: 'primitive',
    description: 'Modern button with gradient background and hover effects',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop',
    sources: ['proj-1', 'proj-2'],
    variants: 6,
    code: {
      react: `<Button variant="gradient" size="lg">Get Started</Button>`,
    },
    tags: ['button', 'gradient', 'interactive']
  },
  {
    id: 'comp-2',
    name: 'Feature Card',
    category: 'composition',
    description: 'Card component with icon, title, and description',
    preview: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&auto=format&fit=crop',
    sources: ['proj-2', 'proj-3', 'proj-6'],
    variants: 4,
    code: {
      react: `<FeatureCard icon={Icon} title="Title" description="Description" />`,
    },
    tags: ['card', 'feature', 'composition']
  },
  {
    id: 'comp-3',
    name: 'Hero Section',
    category: 'layout',
    description: 'Full-width hero with gradient background and CTA',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop',
    sources: ['proj-1', 'proj-5', 'proj-7'],
    variants: 12,
    code: {
      react: `<Hero title="Title" subtitle="Subtitle" cta={<Button />} />`,
    },
    tags: ['hero', 'layout', 'landing']
  },
  {
    id: 'comp-4',
    name: 'Navigation Bar',
    category: 'composition',
    description: 'Responsive navbar with dropdown menus',
    preview: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=400&auto=format&fit=crop',
    sources: ['proj-1', 'proj-2', 'proj-3', 'proj-6'],
    variants: 8,
    code: {
      react: `<Navbar logo={Logo} items={navItems} />`,
    },
    tags: ['navigation', 'menu', 'header']
  },
  {
    id: 'comp-5',
    name: 'Pricing Table',
    category: 'layout',
    description: 'Three-tier pricing table with feature comparison',
    preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop',
    sources: ['proj-2', 'proj-6'],
    variants: 5,
    code: {
      react: `<PricingTable plans={plans} />`,
    },
    tags: ['pricing', 'table', 'comparison']
  },
  {
    id: 'comp-6',
    name: 'Testimonial Card',
    category: 'composition',
    description: 'Customer testimonial with avatar and quote',
    preview: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&auto=format&fit=crop',
    sources: ['proj-2', 'proj-6', 'proj-7'],
    variants: 3,
    code: {
      react: `<Testimonial quote="..." author="..." avatar="..." />`,
    },
    tags: ['testimonial', 'social-proof', 'card']
  }
]

export const mockDesignTokens: DesignToken[] = [
  {
    id: 'token-1',
    name: 'Primary Blue',
    category: 'color',
    value: '#3B82F6',
    usage: 45,
    projects: ['proj-1', 'proj-2', 'proj-3']
  },
  {
    id: 'token-2',
    name: 'Heading Font',
    category: 'typography',
    value: 'Inter, sans-serif',
    usage: 38,
    projects: ['proj-1', 'proj-2', 'proj-3', 'proj-7']
  },
  {
    id: 'token-3',
    name: 'Card Shadow',
    category: 'effects',
    value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    usage: 32,
    projects: ['proj-2', 'proj-3', 'proj-6', 'proj-7']
  },
  {
    id: 'token-4',
    name: 'Base Spacing',
    category: 'spacing',
    value: '1rem (16px)',
    usage: 52,
    projects: ['proj-1', 'proj-2', 'proj-3', 'proj-6', 'proj-7']
  },
  {
    id: 'token-5',
    name: 'Success Green',
    category: 'color',
    value: '#10B981',
    usage: 28,
    projects: ['proj-1', 'proj-3']
  },
  {
    id: 'token-6',
    name: 'Body Text',
    category: 'typography',
    value: '16px / 1.5',
    usage: 41,
    projects: ['proj-1', 'proj-2', 'proj-3', 'proj-6', 'proj-7']
  }
]
