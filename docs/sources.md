# Source Configuration Guide

## Overview

Clibrary supports multiple source types for importing and analyzing web projects. Each source type has specific configuration options and sync capabilities.

## Source Types

### 1. Local Repositories

For projects stored on your local machine.

```json
{
  "id": "local-project-1",
  "name": "E-commerce Platform",
  "type": "local",
  "path": "~/Documents/GitHub/ecommerce-site",
  "watch": true,
  "ignore": ["node_modules", ".git", "dist"],
  "sync": "auto"
}
```

**Options:**
- `path`: Absolute or relative path to repository
- `watch`: Enable file system watching for changes
- `ignore`: Patterns to ignore during scanning
- `sync`: `auto` | `manual` | `disabled`

### 2. GitHub Repositories

For public and private GitHub repositories.

```json
{
  "id": "github-project-1",
  "name": "SaaS Dashboard",
  "type": "github",
  "repo": "username/repository-name",
  "branch": "main",
  "private": true,
  "token": "${GITHUB_TOKEN}",
  "webhook": true
}
```

**Options:**
- `repo`: Repository in format `owner/name`
- `branch`: Target branch (default: main)
- `private`: Boolean for private repos
- `token`: Personal access token (can use env var)
- `webhook`: Enable webhook for automatic updates

### 3. GitLab Projects

```json
{
  "id": "gitlab-project-1",
  "name": "Portfolio Site",
  "type": "gitlab",
  "projectId": "12345678",
  "branch": "main",
  "host": "gitlab.com",
  "token": "${GITLAB_TOKEN}"
}
```

### 4. Live URLs

For analyzing deployed websites or adding to inspiration queue.

```json
{
  "id": "live-site-1",
  "name": "Marketing Site",
  "type": "url",
  "url": "https://example.com",
  "status": "queued",  // Not processed yet
  "priority": "high",
  "notes": "Amazing hero animation and typography system",
  "crawl": {
    "depth": 3,
    "maxPages": 50,
    "includePaths": ["/products", "/features"],
    "excludePaths": ["/admin", "/api"]
  },
  "schedule": "0 0 * * *"
}
```

**Status Options:**
- `queued`: Added to inspiration list, not started
- `planned`: Scheduled for cloning
- `in-progress`: Currently being cloned
- `complete`: Fully processed

**Options:**
- `url`: Base URL to analyze
- `status`: Current processing status
- `priority`: How urgently you want to clone it
- `notes`: What caught your eye, specific elements to study
- `crawl.depth`: How deep to crawl (when processing)
- `crawl.maxPages`: Maximum pages to analyze (when processing)
- `schedule`: Cron expression for scheduled updates

### 5. Vercel Projects

```json
{
  "id": "vercel-project-1",
  "name": "Next.js App",
  "type": "vercel",
  "projectId": "prj_xxxxx",
  "teamId": "team_xxxxx",
  "token": "${VERCEL_TOKEN}",
  "environment": "production"
}
```

### 6. CodeSandbox/StackBlitz

```json
{
  "id": "sandbox-1",
  "name": "React Playground",
  "type": "codesandbox",
  "sandboxId": "clever-name-xxxxx",
  "autoSync": true
}
```

## Configuration File Structure

### Complete sources.json Example

```json
{
  "version": "1.0.0",
  "sources": [
    {
      "id": "project-1",
      "name": "E-commerce Clone",
      "type": "local",
      "path": "~/Documents/GitHub/ecommerce",
      "metadata": {
        "description": "Modern e-commerce platform clone",
        "tags": ["ecommerce", "nextjs", "tailwind"],
        "industry": "retail",
        "designStyle": "minimal",
        "originalUrl": "https://original-site.com"
      },
      "extraction": {
        "components": true,
        "styles": true,
        "assets": false,
        "patterns": true
      },
      "sync": {
        "enabled": true,
        "frequency": "auto",
        "lastSync": "2024-01-15T10:00:00Z"
      }
    }
  ],
  "settings": {
    "autoExtract": true,
    "preserveHistory": true,
    "maxStorageGB": 50
  }
}
```

## CLI Commands

### Add Source

```bash
# Interactive mode
npm run source:add

# With arguments
npm run source:add \
  --type=github \
  --repo=user/repo \
  --name="Project Name" \
  --tags="react,tailwind"
```

### List Sources

```bash
# List all sources
npm run source:list

# Filter by type
npm run source:list --type=github

# Filter by status
npm run source:list --status=active
```

### Update Source

```bash
# Update configuration
npm run source:update project-1 \
  --name="New Name" \
  --branch=develop

# Enable/disable source
npm run source:toggle project-1
```

### Remove Source

```bash
# Remove source (keeps extracted data)
npm run source:remove project-1

# Remove source and data
npm run source:remove project-1 --purge
```

### Sync Sources

```bash
# Sync all sources
npm run source:sync

# Sync specific source
npm run source:sync project-1

# Force sync (ignore cache)
npm run source:sync --force
```

## Sync Strategies

### Auto Sync
Automatically syncs when changes are detected.

```json
{
  "sync": "auto",
  "syncOptions": {
    "debounce": 5000,
    "maxFrequency": "1h"
  }
}
```

### Scheduled Sync
Sync on a schedule using cron expressions.

```json
{
  "sync": "scheduled",
  "syncOptions": {
    "cron": "0 */6 * * *",
    "timezone": "America/New_York"
  }
}
```

### Manual Sync
Only sync when explicitly triggered.

```json
{
  "sync": "manual"
}
```

### Webhook Sync
Sync triggered by external webhooks.

```json
{
  "sync": "webhook",
  "syncOptions": {
    "secret": "${WEBHOOK_SECRET}",
    "events": ["push", "release"]
  }
}
```

## Source Metadata

### Required Fields

- `id`: Unique identifier
- `name`: Display name
- `type`: Source type
- Source-specific fields (path, repo, url, etc.)

### Optional Metadata

```json
{
  "metadata": {
    "description": "Detailed description",
    "tags": ["tag1", "tag2"],
    "industry": "technology",
    "designStyle": "minimal",
    "originalUrl": "https://inspiration-site.com",
    "techStack": ["react", "nextjs", "tailwind"],
    "author": "Original Author",
    "license": "MIT",
    "notes": "Personal notes about the project"
  }
}
```

## Source Validation

### Validation Rules

1. Unique IDs required
2. Valid paths/URLs must be accessible
3. API tokens must have required permissions
4. Cron expressions must be valid

### Validation Command

```bash
# Validate all sources
npm run source:validate

# Validate specific source
npm run source:validate project-1
```

## Troubleshooting

### Access Issues

```bash
# Test source access
npm run source:test project-1

# Check credentials
npm run source:auth project-1
```

### Sync Problems

```bash
# View sync logs
npm run source:logs project-1

# Reset sync state
npm run source:reset project-1
```

### Performance

```bash
# Analyze source size
npm run source:analyze project-1

# Optimize storage
npm run source:optimize
```

## Best Practices

1. **Organize by Type**: Group similar projects
2. **Use Consistent Naming**: Follow naming conventions
3. **Tag Appropriately**: Use descriptive tags
4. **Regular Validation**: Validate sources periodically
5. **Monitor Storage**: Track storage usage
6. **Secure Credentials**: Use environment variables
7. **Document Sources**: Add descriptions and notes

## Next Steps

- [Component Extraction](./extraction.md)
- [Shadcn Integration](./shadcn.md)
- [API Reference](./api.md)