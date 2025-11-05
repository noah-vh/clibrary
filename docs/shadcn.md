# Shadcn Integration Guide

## Overview

This guide covers how to convert extracted components into shadcn/ui compatible format, enabling seamless integration with the shadcn component system and registry.

## What is Shadcn/UI?

Shadcn/UI is a collection of reusable components built using:
- **Radix UI** - Unstyled, accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe component props

## Conversion Process

### Automatic Conversion

```bash
# Convert all components to shadcn format
npm run shadcn:convert

# Convert specific component
npm run shadcn:convert --component=Button

# Convert with options
npm run shadcn:convert \
  --component=Button \
  --radix=true \
  --typescript=true \
  --tailwind=true
```

### Manual Conversion Steps

#### 1. Original Component
```jsx
// Original extracted component
export function Button({ variant, size, children, onClick }) {
  const className = `btn btn-${variant} btn-${size}`
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
```

#### 2. Converted to Shadcn Format
```tsx
// Shadcn-compatible component
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## Component Registry Format

### Registry Entry

```json
{
  "name": "button",
  "dependencies": ["@radix-ui/react-slot"],
  "devDependencies": ["class-variance-authority"],
  "registryDependencies": [],
  "files": [
    {
      "name": "button.tsx",
      "content": "// Component code here"
    }
  ],
  "type": "components:ui"
}
```

### Creating Registry

```bash
# Generate registry for all components
npm run registry:generate

# Add component to registry
npm run registry:add --component=Button

# Validate registry
npm run registry:validate
```

## Configuration

### shadcn.config.json

```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "rsc": false,
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Component Configuration

```json
{
  "button": {
    "radix": ["@radix-ui/react-slot"],
    "variants": {
      "variant": ["default", "destructive", "outline", "secondary", "ghost", "link"],
      "size": ["default", "sm", "lg", "icon"]
    },
    "extends": "HTMLButtonElement",
    "forwardRef": true
  }
}
```

## Radix UI Integration

### Mapping to Radix Primitives

```javascript
const componentMapping = {
  "Button": "@radix-ui/react-button",
  "Checkbox": "@radix-ui/react-checkbox",
  "Dialog": "@radix-ui/react-dialog",
  "Dropdown": "@radix-ui/react-dropdown-menu",
  "Input": null, // No Radix primitive
  "Select": "@radix-ui/react-select",
  "Tabs": "@radix-ui/react-tabs",
  "Toast": "@radix-ui/react-toast",
  "Tooltip": "@radix-ui/react-tooltip"
}
```

### Converting to Radix

```typescript
// Original Modal
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  )
}

// Radix Dialog
import * as Dialog from '@radix-ui/react-dialog'

export function Modal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

## Tailwind Integration

### Utility Classes

```javascript
// Convert CSS to Tailwind
const styleMapping = {
  // Spacing
  "margin: 8px": "m-2",
  "padding: 16px": "p-4",
  
  // Colors
  "background-color: #3b82f6": "bg-blue-500",
  "color: #ffffff": "text-white",
  
  // Layout
  "display: flex": "flex",
  "justify-content: center": "justify-center",
  "align-items: center": "items-center",
  
  // Typography
  "font-size: 14px": "text-sm",
  "font-weight: bold": "font-bold"
}
```

### CSS Variables

```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}
```

## TypeScript Support

### Type Generation

```typescript
// Generate types for components
npm run types:generate

// Example generated types
export interface ComponentProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
  className?: string
}
```

### Prop Validation

```typescript
import { z } from "zod"

const ButtonPropsSchema = z.object({
  variant: z.enum(["default", "outline", "ghost"]).optional(),
  size: z.enum(["sm", "md", "lg"]).optional(),
  disabled: z.boolean().optional(),
  asChild: z.boolean().optional()
})

type ButtonProps = z.infer<typeof ButtonPropsSchema>
```

## CLI Usage

### Installing Components

```bash
# Install from Clibrary registry
npx clibrary add button

# Install multiple components
npx clibrary add button card dialog

# Install with dependencies
npx clibrary add form --deps
```

### Creating New Project

```bash
# Initialize new project with Clibrary components
npx create-clibrary-app my-app

# With options
npx create-clibrary-app my-app \
  --typescript \
  --tailwind \
  --eslint
```

## Quality Assurance

### Validation

```bash
# Validate shadcn compatibility
npm run shadcn:validate

# Check accessibility
npm run a11y:check

# Type checking
npm run type-check
```

### Testing

```bash
# Component testing
npm run test:components

# Visual regression
npm run test:visual

# Accessibility testing
npm run test:a11y
```

## Publishing

### To NPM Registry

```bash
# Build for publishing
npm run build:registry

# Publish to NPM
npm publish --access public
```

### Private Registry

```json
// .npmrc
@yourorg:registry=https://npm.yourcompany.com
//npm.yourcompany.com/:_authToken=${NPM_TOKEN}
```

## Examples

### Complete Button Component

```typescript
// button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Usage

```tsx
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
```

## Troubleshooting

### Common Issues

#### Style Conflicts
```bash
# Reset Tailwind config
npm run tailwind:reset

# Rebuild styles
npm run build:styles
```

#### Type Errors
```bash
# Regenerate types
npm run types:generate

# Check types
npm run type-check
```

#### Missing Dependencies
```bash
# Install Radix dependencies
npm install @radix-ui/react-slot @radix-ui/react-dialog

# Install dev dependencies
npm install -D class-variance-authority
```

## Best Practices

1. **Use Radix Primitives**: For accessibility and behavior
2. **Tailwind for Styling**: Consistent utility classes
3. **TypeScript Always**: Type-safe components
4. **Forward Refs**: Support ref forwarding
5. **Compound Components**: For complex components
6. **CSS Variables**: For theming
7. **Documentation**: Document all props and variants

## Next Steps

- [API Reference](./api.md)
- [Contributing](./contributing.md)
- [Setup Guide](./setup.md)