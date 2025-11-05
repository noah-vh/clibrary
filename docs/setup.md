# Clibrary Setup Guide

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Python 3.8+ (for capture tools)
- Git
- Optional: Docker for containerized preview environments

## Installation Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/noahvanhart/clibrary.git
cd clibrary

# Install dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` with your settings:

```env
# API Keys (optional, for external sources)
GITHUB_TOKEN=your_github_personal_access_token
VERCEL_TOKEN=your_vercel_token
NETLIFY_TOKEN=your_netlify_token

# Database
DATABASE_URL=postgresql://localhost/clibrary
REDIS_URL=redis://localhost:6379

# Storage
LOCAL_STORAGE_PATH=~/Documents/Clibrary/storage
SCREENSHOT_PATH=~/Documents/Clibrary/screenshots

# Ports
STUDIO_PORT=3000
DOCS_PORT=3001
PREVIEW_PORT=3002
API_PORT=4000
```

### 3. Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### 4. Configure Source Repositories

```bash
# Interactive setup
npm run config:sources

# Or manually edit sources.json
nano data/sources.json
```

### 5. Build Packages

```bash
# Build all packages
npm run build

# Or build individually
npm run build:ui
npm run build:tokens
npm run build:registry
```

## Development Workflow

### Starting Services

```bash
# Start all services (recommended)
npm run dev

# Or start individually
npm run dev:studio    # Main interface
npm run dev:docs      # Component docs
npm run dev:preview   # Preview server
npm run dev:api       # API server
```

### Adding Sources

#### Local Repository
```bash
npm run source:add \
  --type=local \
  --path=~/Documents/GitHub/my-project \
  --name="My Project"
```

#### GitHub Repository
```bash
npm run source:add \
  --type=github \
  --repo=username/repository \
  --branch=main \
  --name="Project Name"
```

#### Live Website
```bash
npm run source:add \
  --type=url \
  --url=https://example.com \
  --name="Example Site"
```

### Running Extraction

```bash
# Extract from all sources
npm run extract:all

# Extract from specific source
npm run extract --source=project-id

# Extract with options
npm run extract \
  --source=project-id \
  --components=true \
  --styles=true \
  --assets=false
```

## Production Deployment

### Building for Production

```bash
# Build all applications
npm run build:apps

# Generate static exports
npm run export
```

### Docker Deployment

```bash
# Build Docker images
docker-compose build

# Start services
docker-compose up -d
```

### Vercel/Netlify Deployment

```bash
# Deploy studio
vercel --prod

# Deploy docs
netlify deploy --prod
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9
```

#### Permission Errors
```bash
# Fix permissions
chmod -R 755 ./tools
chmod +x ./tools/capture/capture.sh
```

#### Missing Dependencies
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Reset Database
```bash
npm run db:reset
npm run db:migrate
```

### Clear Cache
```bash
npm run cache:clear
rm -rf .next .cache dist
```

## Next Steps

- [Configure Sources](./sources.md)
- [Extract Components](./extraction.md)
- [Integrate with Shadcn](./shadcn.md)
- [API Documentation](./api.md)