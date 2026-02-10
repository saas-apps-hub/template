<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.

<!-- nx configuration end-->

---

# Project Context

## Purpose

This is a starter template designed for rapid idea validation and SaaS project development. It provides a complete monorepo setup with backend, web, and mobile applications sharing common code.

## Architecture

**Apps:**

- `apps/backend` - Express.js backend with Docker support
- `apps/marketing` - Next.js 16 (App Router) with Tailwind CSS
- `apps/mobile` - Expo app with Expo Router

**Shared Libraries:**

- `libs/core` - Shared TypeScript code used across all applications

## Tech Stack

- **Backend**: Express + esbuild + Docker (deployable)
- **Marketing**: Next.js 16 + App Router + Tailwind + Docker (deployable)
- **Mobile**: Expo + Expo Router (EAS Build for app stores)
- **Monorepo**: Nx + pnpm workspaces
- **Testing**: Jest
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode

---

# Development Workflow

## Quick Start

```bash
pnpm install              # Install all dependencies
pnpm backend              # Start backend (port 8000)
pnpm marketing            # Start Next.js (port 3000)
pnpm ios                  # Start iOS app
pnpm android              # Start Android app
```

## Running Tasks with Nx

```bash
nx serve <project>                    # Start dev server
nx build <project>                    # Production build
nx test <project>                     # Run tests
nx lint <project>                     # Run linter
nx typecheck <project>                # Type check
nx show project <project>             # See all available targets
nx affected -t <target>               # Run target on affected projects only
```

## When to Use nx vs pnpm

- **Use `nx`**: For running tasks (build, test, lint, serve)
- **Use `pnpm`**: For dependency management (install, add, remove)
- **Root shortcuts**: `pnpm backend`, `pnpm marketing`, `pnpm ios`, `pnpm android`

---

# Dependency Management

## Adding Workspace-Specific Dependencies

Always add dependencies to the specific project that needs them:

```bash
# Backend dependencies
pnpm add multer --filter "backend"
pnpm add @types/multer --filter "backend" --save-dev

# Marketing (web) dependencies
pnpm add framer-motion --filter "marketing"
pnpm add @types/framer-motion --filter "marketing" --save-dev

# Mobile dependencies
pnpm add react-native-reanimated --filter "mobile"
```

## Root vs Workspace Dependencies

- **Root `devDependencies`**: Build tools, linters, formatters, Nx plugins, shared testing utilities
- **Workspace `dependencies`**: Project-specific runtime dependencies
- **Shared code**: Add to `libs/core` when needed across multiple apps (keep platform-agnostic)

## Important Rules

- Do NOT install React Native packages in backend or marketing
- Do NOT install browser-only packages in backend or mobile
- Keep `libs/core` platform-agnostic (works in Node, browser, and React Native)

---

# Code Quality & Testing

## Available Commands

```bash
nx affected -t lint          # Lint changed projects
nx affected -t test          # Test changed projects
nx affected -t typecheck     # Type check changed projects
nx run-many -t lint          # Lint all projects
nx run-many -t test          # Test all projects
```

## Pre-commit Hooks

Husky automatically runs on every commit via lint-staged:

- **Prettier**: Formats all staged files
- **ESLint**: Lints and fixes staged TS/JS files
- **TypeScript**: Type checks affected projects

## Commit Message Format

Conventional commits enforced by commitlint:

```bash
feat: add user authentication
fix: resolve login redirect issue
chore: update dependencies
docs: improve setup instructions
```

## Testing Guidelines

- Tests are located in `__tests__/` directories within each project
- Run tests before committing: `nx affected -t test`
- Add tests for new features and bug fixes
- Ensure all tests pass in CI before merging PRs

---

# CI/CD Workflows

## CI on Pull Requests

**Workflow**: `.github/workflows/ci.yaml`

Runs on every PR to `main`:

```bash
nx affected -t lint test typecheck
nx affected -t build --exclude="mobile" --exclude="libs/*"
```

- Excludes mobile(build target is `eas:build`) and libs (no separate build targets)
- Must pass before merging

## CD on Main Branch

**Workflow**: `.github/workflows/cd.yaml`

Runs on push to `main` (only when relevant files change):

```bash
nx affected -t docker:push --exclude="mobile" --exclude="libs/*"
```

- Builds Docker images for backend and marketing
- Pushes to GitHub Container Registry (`ghcr.io`)
- Tags images as `latest` (configurable via env vars)
- Excludes mobile (use EAS Build instead)

## Docker Image Names

- Backend: `ghcr.io/<owner>/<project-name>-backend:latest`
- Marketing: `ghcr.io/<owner>/<project-name>-marketing:latest`

---

# Docker & Deployment

## Available Docker Targets

```bash
nx docker:build backend      # Build Docker image locally
nx docker:push backend       # Build and push to registry

# Required environment variables for docker:push
export REGISTRY=ghcr.io
export OWNER=<your-github-username>
export TAG=latest
```

## Docker Build Details

**Backend**:

- Uses esbuild bundled output from `apps/backend/dist`
- Runs `pnpm install --prod` for external dependencies
- Entry: `node main.js`

**Marketing**:

- Uses Next.js standalone build (`.next/standalone`)
- Includes static assets and public files
- Entry: `node apps/marketing/server.js`

**Mobile**:

- Not containerized (use EAS Build for app stores)
- See `eas.json` for EAS configuration

## Local Development with Docker

```bash
docker compose up            # Start all services
docker compose down          # Stop all services
```

---

# Project-Specific Guidelines

## Backend (`apps/backend`)

- **Entry point**: `src/main.ts`
- **Tests**: `__tests__/`
- **Port**: 8000 (configurable via `BACKEND_PORT` env var)
- **Build output**: `dist/` (esbuild)
- **Dependencies**: Add backend-specific packages here (Express middleware, database clients, etc.)

## Marketing (`apps/marketing`)

- **Framework**: Next.js 16 with App Router
- **Pages**: `src/app/` (App Router structure)
- **Styles**: `src/styles/global.css` (Tailwind configured)
- **Port**: 3000 (configurable via `PORT` env var)
- **Build output**: `.next/`
- **Dependencies**: Add web-specific packages here (React libraries, UI components, etc.)

## Mobile (`apps/mobile`)

- **Framework**: Expo with Expo Router
- **Screens**: `src/app/` (file-based routing)
- **Assets**: `assets/` (images, fonts)
- **Build**: Use EAS Build (`eas.json` configured)
- **Dependencies**: Add React Native packages here
- **Platform scripts**: `pnpm ios`, `pnpm android`

## Shared Library (`libs/core`)

- **Purpose**: Shared TypeScript code across all apps
- **Exports**: `src/index.ts`
- **Rules**: Keep platform-agnostic (no Node, browser, or React Native specific APIs)
- **Usage**: Import from `@<project-name>/core` in any app

---

# Common Tasks

## See Available Targets for a Project

```bash
nx show project backend
nx show project marketing
nx show project mobile
```

## Generate New Projects

```bash
nx g @nx/node:app <name>              # New Node.js app
nx g @nx/next:app <name>              # New Next.js app
nx g @nx/expo:app <name>              # New Expo app
nx g @nx/node:lib <name>              # New shared library
```

## View Project Graph

```bash
nx graph                              # Interactive project graph
nx affected:graph                     # Graph of affected projects
```

## Clean Build Artifacts

```bash
pnpm clean                            # Run clean script (removes dist/, .next/, node_modules/.cache)
```

---

# Troubleshooting

## Common Issues

**Cache Issues**

```bash
nx reset                              # Clear Nx cache
pnpm clean                            # Remove build artifacts
pnpm clean                            # Nuclear option: fresh install(requires user input)
pnpm install                          # Ensure all deps are installed again
```

**Port Conflicts**

- Backend uses port 8000, marketing uses 3000
- Check if ports are in use: `lsof -i :8000` or `lsof -i :3000`
- Kill process: `kill -9 <PID>`
- Or change ports in `.env` file

**TypeScript Errors After Adding Dependencies**

```bash
nx affected -t typecheck              # Check what's actually broken
pnpm install                          # Ensure all deps are installed
```

**Docker Build Fails**

- Ensure you've run `nx build <project>` first
- Check that `.env` has required `REGISTRY`, `OWNER`, `TAG` set
- Verify Docker daemon is running: `docker ps`

**Git/Affected Detection Not Working**

```bash
git status                            # Check for uncommitted changes
nx reset                              # Reset Nx daemon
```

---

# Decision Guide

## When Adding New Code

Use this decision tree to determine where new code should live:

```
┌─ Is the code shared across multiple apps?
│
├─ YES → Does it use platform-specific APIs?
│         │
│         ├─ NO → Add to libs/core
│         │       ✓ Pure TypeScript/JavaScript
│         │       ✓ Business logic, utilities, types
│         │       ✓ Must work in Node, browser, and React Native
│         │
│         └─ YES → Create a new lib or keep in app
│                  ✗ Don't add to libs/core
│
└─ NO → Which platform?
        │
        ├─ Backend/API → apps/backend
        │                ✓ Express middleware, DB clients
        │                ✓ Node.js-specific code
        │
        ├─ Web only → apps/marketing
        │             ✓ React components, Next.js pages
        │             ✓ Browser APIs, DOM manipulation
        │
        └─ Mobile only → apps/mobile
                        ✓ React Native components
                        ✓ Native modules, device APIs
```

## When Adding Dependencies

**Decision matrix:**

| Dependency Type      | Where to Add           | Command                                 |
| -------------------- | ---------------------- | --------------------------------------- |
| Build tools, linters | Root `devDependencies` | `pnpm add -D -w <package>`              |
| Backend packages     | `apps/backend`         | `pnpm add <package> --filter backend`   |
| Web libraries        | `apps/marketing`       | `pnpm add <package> --filter marketing` |
| React Native         | `apps/mobile`          | `pnpm add <package> --filter mobile`    |
| Shared utilities     | `libs/core`            | `pnpm add <package> --filter core`      |

**Red flags:**

- ❌ React Native package in backend or marketing
- ❌ Node.js-only package in mobile
- ❌ Browser-only package in backend or mobile
- ❌ Platform-specific APIs in `libs/core`

---

# Environment Setup

## Prerequisites

- **Node.js 22+** (specified in `.nvmrc`)
- **pnpm 10+**

## Initial Setup

```bash
cp .env.example .env                  # Copy environment template
# Edit .env with your configuration
```

## Environment Variables

The project uses a root `.env` file (see `.env.example` for template). Required variables:

**Critical (required for basic functionality):**

- `BACKEND_PORT` - Backend server port (default: 8000)
- `PORT` - Marketing app port (default: 3000)
- `NEXT_PUBLIC_BACKEND_URL` - Backend URL for Next.js (must start with `NEXT_PUBLIC_`)
- `EXPO_PUBLIC_BACKEND_URL` - Backend URL for mobile (must start with `EXPO_PUBLIC_`)

**Optional (required for deployment only):**

- `REGISTRY` - Docker registry URL (default: ghcr.io)
- `OWNER` - GitHub username/org for Docker images
- `TAG` - Docker image tag (default: latest)

**Important Notes:**

- Next.js public env vars must be prefixed with `NEXT_PUBLIC_`
- Expo public env vars must be prefixed with `EXPO_PUBLIC_`
- Each app can override with its own `.env.local` file

---

# Best Practices

## For Agents Working on This Codebase

1. **Always use `nx affected`** in CI/CD contexts to only process changed projects
2. **Add dependencies to the correct workspace** using `--filter` flag
3. **Run tests locally** before pushing: `nx affected -t test`
4. **Check available targets** with `nx show project <name>` before assuming they exist
5. **Keep libs/core platform-agnostic** to ensure it works across all apps
6. **Use conventional commits** for clear git history
7. **Understand affected detection**: Nx uses git to determine what changed
8. **Mobile is special**: No Docker, uses EAS Build, has different deployment flow

## Performance Tips

- Use `nx affected` instead of `nx run-many` when possible
- Leverage Nx caching: tasks won't re-run if inputs haven't changed
- Use `nx reset` if cache behaves unexpectedly

## Version Management

**Current Stack Versions:**

- **Next.js**: 16 (App Router)
- **Expo**: See `apps/mobile/package.json` for SDK version
- **Node.js**: 22+ (check `.nvmrc`)
- **TypeScript**: Check root `package.json`

**Upgrading Dependencies:**

```bash
# Check for outdated packages
pnpm outdated

# Update specific project
pnpm update --filter <project>

# Update all projects (use with caution)
pnpm update -r

# Nx plugins and tools
nx migrate latest              # Check for Nx updates
nx migrate --run-migrations    # Apply Nx migrations
```

**Before upgrading major versions:**

1. Check migration guides for breaking changes
2. Run `nx affected -t test` before and after
3. Update one major dependency at a time
4. Test all apps: backend, marketing, and mobile
5. Update relevant documentation in this file
