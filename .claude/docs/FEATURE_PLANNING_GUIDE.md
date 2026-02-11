# Feature Planning Guide

## Purpose

Before implementing any feature, we create a detailed todo plan to:
1. Ensure user and Claude agree on the approach
2. Break down complex features into manageable tasks
3. Identify potential issues early
4. Track progress systematically

## Planning Process

### Step 1: Analyze Requirements

**Questions to Answer:**
- What is the goal of this feature?
- What does the Figma design show? (if applicable)
- What are the acceptance criteria?
- What data is needed?
- What APIs/services are involved?
- What edge cases exist?

**Document:**
- Feature description
- User flow
- Technical requirements
- Dependencies

### Step 2: Create Implementation Plan

**Break down into tasks:**
```markdown
### Feature: [Feature Name]

**Goal:** [What we're building and why]

**Tasks:**
1. [ ] Configuration setup
   - [ ] Add theme colors if needed
   - [ ] Add business config if needed
   - [ ] Add feature flags if needed

2. [ ] Data layer
   - [ ] Define types/interfaces
   - [ ] Create API service functions
   - [ ] Add mock data for testing

3. [ ] UI Components
   - [ ] Component A
   - [ ] Component B
   - [ ] Component C

4. [ ] Integration
   - [ ] Connect components to data layer
   - [ ] Add navigation
   - [ ] Handle loading/error states

5. [ ] Testing
   - [ ] Test happy path
   - [ ] Test edge cases
   - [ ] Test on physical device

6. [ ] Polish
   - [ ] Match Figma design exactly
   - [ ] Add animations/transitions
   - [ ] Performance optimization
```

### Step 3: Get User Agreement

**Before coding:**
1. Present the plan to the user
2. Discuss approach and alternatives
3. Adjust based on feedback
4. Get explicit approval to proceed

### Step 4: Add to PROJECT_STATUS.md

```markdown
## 🚧 In Progress

### Feature: [Feature Name]
**Started:** 2026-02-11
**Status:** Planning / Implementation / Testing

**Tasks:**
- [x] Completed task
- [ ] Current task
- [ ] Upcoming task
```

## Planning Templates

### Template 1: Figma Design Implementation

```markdown
### Feature: [Screen/Feature Name] (Figma Implementation)

**Figma Link:** [URL]
**Goal:** Implement [screen name] exactly as designed

**Phase 1: Analysis**
- [ ] Review Figma design
- [ ] Identify all components needed
- [ ] List all colors/styles used
- [ ] Identify interactions/animations
- [ ] Document data requirements

**Phase 2: Configuration**
- [ ] Add colors to theme if not exists
- [ ] Add any config values needed
- [ ] Set up mock data

**Phase 3: Component Development**
- [ ] Component 1: [Name]
- [ ] Component 2: [Name]
- [ ] Component 3: [Name]

**Phase 4: Integration**
- [ ] Connect to data layer
- [ ] Add navigation
- [ ] Handle states (loading, error, empty)

**Phase 5: Polish**
- [ ] Pixel-perfect match to design
- [ ] Animations/transitions
- [ ] Test on Expo Go
- [ ] Test on iOS device
```

### Template 2: API Integration

```markdown
### Feature: [API Integration Name]

**Goal:** Integrate [service/endpoint]

**Phase 1: Planning**
- [ ] Review API documentation
- [ ] Define TypeScript types
- [ ] Plan error handling strategy
- [ ] Identify auth requirements

**Phase 2: Service Layer**
- [ ] Create service file (shared/services/[name]Service.js)
- [ ] Implement API calls
- [ ] Add error handling
- [ ] Add loading states

**Phase 3: Mock Data**
- [ ] Create mock responses for testing
- [ ] Add mock mode toggle

**Phase 4: Integration**
- [ ] Connect to UI components
- [ ] Add loading indicators
- [ ] Handle errors gracefully
- [ ] Add retry logic

**Phase 5: Testing**
- [ ] Test with mock data
- [ ] Test with real API
- [ ] Test error scenarios
- [ ] Test offline behavior
```

### Template 3: Native Feature

```markdown
### Feature: [GPS/Camera/etc Feature]

**Goal:** Implement [native feature]

**Phase 1: Setup**
- [ ] Install expo package (expo-location, expo-camera)
- [ ] Add permissions to app.json (iOS + Android)
- [ ] Test permission requests

**Phase 2: Permission Flow**
- [ ] Create permission request UI
- [ ] Handle permission granted
- [ ] Handle permission denied
- [ ] Handle permission restricted

**Phase 3: Feature Implementation**
- [ ] Core functionality
- [ ] Error handling
- [ ] Loading states
- [ ] Background behavior (if needed)

**Phase 4: Testing**
- [ ] Test on iOS (simulator)
- [ ] Test on iOS (device)
- [ ] Test on Android (device)
- [ ] Test permission edge cases
```

## Best Practices

### Do's ✅
- Always create a plan before coding
- Break down into small, testable tasks
- Get user agreement on approach
- Update PROJECT_STATUS.md continuously
- Test after each phase

### Don'ts ❌
- Don't start coding without a plan
- Don't make assumptions about requirements
- Don't skip the planning discussion with user
- Don't forget to update PROJECT_STATUS.md
- Don't move to next phase with failing tests

## Example: Real Planning Session

**User Request:** "Implement the driver start screen from Figma"

**Claude's Response:**
```
Let me create an implementation plan for the driver start screen.

First, let me analyze the Figma design...
[Access Figma and analyze]

Here's my proposed plan:

### Feature: Driver Start Screen (Chauffeur App)

**Components Identified:**
- Header with logo and profile
- Welcome message with driver name
- Quick stats cards (today's tasks, completed, pending)
- Primary CTA button "Start Day"
- Recent tasks list

**Implementation Plan:**

Phase 1: Configuration (15 min)
- [ ] Add theme colors from Figma
- [ ] Add spacing/typography configs
- [ ] Set up mock driver data

Phase 2: Components (45 min)
- [ ] Header component
- [ ] StatsCard component (reusable)
- [ ] TaskListItem component
- [ ] StartButton component

Phase 3: Screen Assembly (30 min)
- [ ] Create StartScreen.js
- [ ] Assemble components
- [ ] Add navigation setup
- [ ] Connect to mock data

Phase 4: Testing (15 min)
- [ ] Test on Expo Go
- [ ] Verify matches Figma
- [ ] Test interactions

Total estimate: ~2 hours

Does this approach look good? Any changes you'd like?
```

## Summary

**Every feature starts with:**
1. ✅ Analysis of requirements
2. ✅ Detailed task breakdown
3. ✅ Discussion and agreement with user
4. ✅ Adding to PROJECT_STATUS.md
5. ✅ Then and only then → implementation

This ensures we're always aligned and nothing gets forgotten!

---

**Last Updated**: 2026-02-11
**Always Use This**: For every feature, no exceptions!
