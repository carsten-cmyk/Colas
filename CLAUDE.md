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

1. **APP_MIGRATION_STRATEGY.md** ⭐ - Critical for architecture decisions
2. **FRONTEND_BEST_PRACTICES.md** - React Native patterns and hooks
3. **DESIGN_SYSTEM.md** - UI components and styling patterns
4. **TEST_STRATEGY.md** - Testing approach

### Technology Stack

- **Framework**: React Native with Expo
- **Testing**: Expo Go for rapid testing on devices
- **State Management**: TBD (follow FRONTEND_BEST_PRACTICES.md)
- **Styling**: React Native StyleSheet (follow DESIGN_SYSTEM.md patterns)
- **Navigation**: TBD (likely React Navigation)

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

- Keep documentation updated as patterns emerge
- Add new lessons learned to LESSONS_LEARNED.md
- Follow APP_MIGRATION_STRATEGY.md to ensure production readiness
- Each app should be independently deployable
