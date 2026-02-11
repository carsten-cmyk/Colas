# Claude Code Instructions - Colas Transport Apps

## Project Overview

Dette er et monorepo for Colas Transport apps. Projektet indeholder multiple native apps bygget med React Native/Expo.

## Structure

```
Colas/
├── apps/              # Individual apps
│   ├── chauffeur/     # Chauffeur/Driver app
│   ├── vognmand/      # Haulier/Transport company app
│   └── formand/       # Foreman app
├── shared/            # Shared code across apps
│   ├── components/    # Shared UI components
│   ├── utils/         # Shared utilities
│   └── styles/        # Shared styling
└── .claude/docs/      # Development documentation
```

## Development Guidelines

### Always Reference Documentation

Before starting work, reference relevant documentation from `.claude/docs/`:

1. **PROJECT_STATUS.md** ⭐⭐⭐ - ALWAYS UPDATE THIS FILE with progress and todos
2. **CONFIGURATION_STRATEGY.md** ⭐⭐ - CRITICAL: Avoid hardcoded values
3. **TECH_STACK.md** ⭐⭐ - Technology decisions and setup
4. **APP_MIGRATION_STRATEGY.md** ⭐ - Architecture decisions
5. **FRONTEND_BEST_PRACTICES.md** - React Native patterns and hooks
6. **DESIGN_SYSTEM.md** - UI components and styling patterns
7. **TEST_STRATEGY.md** - Testing approach

### Technology Stack

See TECH_STACK.md for complete details.

**Summary:**
- **Framework**: React Native with Expo (Pro Plan)
- **Backend**: Supabase (auth, database, storage)
- **Testing**: Expo Go → TestFlight → App Store
- **Deployment**: EAS Build, Netlify for web
- **Native**: expo-location (GPS), expo-camera (Camera)
- **Styling**: React Native StyleSheet (configuration-first approach)

### Code Organization

- Keep app-specific code in `apps/<app-name>/`
- Extract shared components to `shared/components/`
- Extract shared utilities to `shared/utils/`
- Follow the service layer pattern from APP_MIGRATION_STRATEGY.md

### Best Practices

1. **Component Structure**: Follow patterns from FRONTEND_BEST_PRACTICES.md
2. **Styling**: Use consistent patterns (DESIGN_SYSTEM.md adapted for React Native)
3. **Testing**: Test with Expo Go before committing
4. **Performance**: Follow optimization patterns from LESSONS_LEARNED.md

### Figma Integration

- Figma MCP is configured with authentication
- Reference Figma designs during implementation
- Ensure pixel-perfect implementation where specified

### Commit Messages

Follow conventional commits:
- `feat(chauffeur):` for new features
- `fix(chauffeur):` for bug fixes
- `refactor:` for code refactoring
- `docs:` for documentation updates

### Testing Workflow

1. Make changes
2. Test with Expo Go: `npm run chauffeur:start`
3. Scan QR code with phone
4. Verify functionality
5. Commit when working

## Project Goals

Build production-ready native apps for Colas Transport with:
- Professional UI/UX following Figma designs
- Solid architecture following documented best practices
- Easy maintenance and scalability
- Shared code across apps where sensible

## Important Notes

### CRITICAL - Always Do This
1. **Update PROJECT_STATUS.md** after completing any task
2. **Never hardcode** colors, currencies, or config values (see CONFIGURATION_STRATEGY.md)
3. **Follow tech stack** documented in TECH_STACK.md
4. **Check PROJECT_STATUS.md** at start of every session for context

### General Best Practices
- Keep documentation updated as patterns emerge
- Add new lessons learned to LESSONS_LEARNED.md
- Follow APP_MIGRATION_STRATEGY.md to ensure production readiness
- Each app should be independently deployable
