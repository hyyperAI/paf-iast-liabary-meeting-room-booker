# Feature Analysis Guide

Must ask use for planning and understanding mode if you are not sure what mode to use or user didn't specify it

## Quick Reference

| Mode           | Audience      | Output Location                     | Contains                                |
| -------------- | ------------- | ----------------------------------- | --------------------------------------- |
| `understand` | Non-technical | `.claude/features/understanding/` | Business value, user impact, what & why |
| `planning`   | Technical     | `.claude/features/planning/`      | Architecture, APIs, code patterns, how  |

**Naming:** `[feature_name]_understanding.md` or `[feature_name]_planning.md`

---

## Core Rules

1. **NEVER break existing functionality** - Analyze impact before proposing changes
2. **Stay focused** - Answer only what's needed for the current mode
3. **Be decisive** - Provide clear recommendations, not just options
4. **Output feeds into task creation** - This doc goes to `instructions.md` for implementation

## Key Principles (MANDATORY)

5. **Explore BEFORE analyze** - Read codebase structure first, understand existing patterns, don't assume
6. **Ask clarifying questions** - Don't make assumptions about feature requirements
7. **Understand existing structure** - Know current architecture before proposing changes
8. **Minimize file creation** - Prefer modifying existing files over creating new ones
9. **Minimize API creation** - Reuse existing APIs unless absolutely necessary
10. **Skip security details** - Don't include security considerations in the analysis

---

## Mode: UNDERSTAND (Non-Technical)

> For stakeholders, PMs, or deciding if feature is worth building

### Required Sections

```markdown
# [Feature Name] - Understanding

## What is it?
[One sentence description a non-technical person can understand]

## Problem it Solves
- Current pain point
- Who experiences it
- How often

## Who Uses It?
- Primary users
- Secondary users

## User Journey
1. User wants to...
2. User does...
3. User sees...
4. Result: ...

## Business Value
- Why add this now?
- What happens if we don't?
- Success metrics (how do we know it works?)

## Dependencies
- What existing features does this need?
- What might break?

## Risks & Concerns
- What could go wrong?
- What's unclear?

## Recommendation
[ ] Proceed with implementation
[ ] Needs more clarification on: ___
[ ] Not recommended because: ___
```

### DO NOT Include

- Code architecture
- API endpoints
- Database schemas
- Technical implementation details
- Library/framework specifics

---

## Mode: PLANNING (Technical)

> For developers implementing the feature
> **NOTE**: Include MINIMUM coding details - focus on WHAT and WHY, not exhaustive code examples

### Required Sections

```markdown
# [Feature Name] Feature Implementation Plan

## Feature Overview
[One paragraph describing the feature scope and purpose]

---

## 1. Feature Scope & Requirements

### Core Functionality
**What it does:**
- [Primary function 1]
- [Primary function 2]
- [Primary function 3]

**User Roles:**
- Primary: [Main user type]
- Secondary: [Additional user types]

**Problems Solved:**
- Current pain point 1
- Current pain point 2
- Current pain point 3

**Acceptance Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

**Edge Cases & Scenarios:**
1. **[Scenario Name]:** [Description and expected handling]
2. **[Scenario Name]:** [Description and expected handling]
3. **[Scenario Name]:** [Description and expected handling]

---

## 2. Data Requirements

### Data Structure

**Database Schema:**
```sql
-- New table(s) or changes to existing
CREATE TABLE [table_name] (
  [fields and constraints]
)
```

**Data Shape:**

```javascript
// Define the data structure
{
  [field]: [type],
  [field]: [type]
}
```

**Data Flow:**

1. **[Operation]:** [Description of data flow]
2. **[Operation]:** [Description of data flow]
3. **[Operation]:** [Description of data flow]

**Data Storage:**

- **Database:** [Storage location and rationale]
- **File System:** [If applicable]
- **Cache:** [If applicable]

**Validation Rules:**

**Dependencies:**

---

## 3. UI Components

### Page Structure: `[Page Path]`

**Main Layout:**

```
[ASCII diagram of UI structure]
```

### Component Breakdown

**1. [Component Name]** ([Status: NEW/UPDATE/EXISTING])

- **Location:** [Where it appears]
- **Functionality:**
  - [Function 1]
  - [Function 2]
- **Behavior:**
  - [Behavior 1]
  - [Behavior 2]

**2. [Component Name]** ([Status: NEW/UPDATE/EXISTING])

- [Same structure as above]

**3. [Component Name]** ([Status: NEW/UPDATE/EXISTING])

- [Same structure as above]

---

## 4. Navigation and Routing

### Frontend Routes

```
[Route] → [Component/Page]
[Route] → [Component/Page]
```

### Backend API Endpoints

**[Feature] Routes** ([NEW/UPDATE: File path])

```
Method    Path                    → [Description]
GET       /api/[endpoint]         → [What it returns]
POST      /api/[endpoint]         → [What it does]
PUT       /api/[endpoint]         → [What it updates]
DELETE    /api/[endpoint]         → [What it deletes]
```

### Access Control

- [Authentication requirements]
- [Authorization rules]
- [Rate limiting if applicable]

### Route Details

**GET /api/[endpoint]**

```javascript
// Request: [Description]
// Response:
{
  [response structure]
}
```

**POST /api/[endpoint]**

```javascript
// Request: [Description]
// Response:
{
  [response structure]
}
```

---

## 5. Business Logic

### [Logic Section 1]

**[Process/Operation Name]:**

1. [Step 1]
2. [Step 2]
3. [Step 3]

### [Logic Section 2]

**[Process/Operation Name]:**

1. [Step 1]
2. [Step 2]
3. [Step 3]

### Validation Rules

**[Rule Name]:**

- [Validation criteria]
- [How enforced]

**[Rule Name]:**

- [Validation criteria]
- [How enforced]

### Business Rules

---

## 6. Quick Mental Model Checklist

✅ **Do I understand the WHAT?**

- Feature: [One-line description]
- Requirements: [Key requirements]
- Acceptance criteria: [List]

✅ **Do I know the WHERE?**

- Frontend pages: [Paths]
- Components: [Paths]
- Backend routes: [Paths]
- Database: [Tables]

✅ **Do I see the HOW?**

- Patterns: [Architecture patterns]
- Approach: [High-level approach]
- Similar code: [Reference existing code]

✅ **Do I map the DATA?**

- Structure: [Data model]
- Flow: [Data flow description]
- Storage: [Storage strategy]

✅ **Do I trace the FLOW?**

- User action: [User journey]
- Data flow: [System flow]
- Error flow: [Error handling]

✅ **Do I know DONE?**

- Success criteria: [How to verify]
- Verification: [Testing approach]
- Quality: [Quality gates]

---

## Final Analysis

### One-Sentence Feature Description

[Clear, concise description]

### Files to be Created/Modified

**NEW Files:**

1. [File path] - [Description]
2. [File path] - [Description]
3. [File path] - [Description]

**MODIFIED Files:**

1. [File path] - [Description]
2. [File path] - [Description]
3. [File path] - [Description]

**TOTAL FILES:** [X] files ([Y] new, [Z] modified)

### Data Flow Through System

```
[Visual flow diagram]
```

### What Can Go Wrong?

**Technical Issues:**

1. **[Issue]:** [How it could happen]
2. **[Issue]:** [How it could happen]
3. **[Issue]:** [How it could happen]

**Business Logic Issues:**

1. **[Issue]:** [How it could happen]
2. **[Issue]:** [How it could happen]

**User Experience Issues:**

1. **[Issue]:** [How it could happen]
2. **[Issue]:** [How it could happen]

### How to Know It's Working?

**Functional Testing:**

1. ✅ [Test case] → [Expected result]
2. ✅ [Test case] → [Expected result]
3. ✅ [Test case] → [Expected result]

**Performance Testing:**

1. ✅ [Performance criterion]
2. ✅ [Performance criterion]

**Error Testing:**

1. ✅ [Error scenario] → [Expected behavior]
2. ✅ [Error scenario] → [Expected behavior]

---

## User Scenarios (Before vs After)

### Scenario 1: [Primary Use Case]

**BEFORE (Current State):**

1. [Current step]
2. [Current step]
3. [Current step]
4. **Problem:** [What's broken]

**AFTER (With Feature):**

1. [New step]
2. [New step]
3. [New step]
4. **Benefit:** [What's improved]

### Scenario 2: [Secondary Use Case]

**BEFORE (Current State):**

1. [Current step]
2. [Current step]
3. [Current step]
4. **Problem:** [What's broken]

**AFTER (With Feature):**

1. [New step]
2. [New step]
3. [New step]
4. **Benefit:** [What's improved]

---

## Decision Framework

Before writing, ask yourself:

```

1. Is user asking "understand" or "planning"?
   └─ understand → Skip ALL technical details
   └─ planning → Include technical depth
2. Have you explored the codebase structure?
   └─ No → STOP. Read files first to understand existing patterns
   └─ Yes → Continue
3. Can this feature reuse existing code/APIs?
   └─ Yes → Document what to reuse
   └─ No → Justify why new code/API is needed
4. Does this break anything existing?
   └─ Yes → STOP. Document impact first.
   └─ No → Proceed
5. Is the scope clear?
   └─ Yes → Write the doc
   └─ No → Ask clarifying questions FIRST

```

---

## Output Quality Checklist

Before submitting, verify:

- [ ] Correct mode (understand vs planning)
- [ ] Saved to correct folder
- [ ] Follows naming convention
- [ ] Answers the core question: "Should we build this?" (understand) or "How do we build this?" (planning)
- [ ] No scope creep - stays focused on THIS feature only
- [ ] Clear recommendation/next steps

**CRITICAL - Did you:**

- [ ] Explore codebase structure BEFORE analyzing?
- [ ] Ask clarifying questions instead of assuming?
- [ ] Minimize new files/APIs (prefer reuse)?
- [ ] Remove security details from analysis?

---

## Folder Structure

```

.claude/
├── features/
│   ├── understanding/     ← Non-technical feature docs
│   │   └── [feature]_understanding.md
│   └── planning/          ← Technical planning docs
│       └── [feature]_planning.md

```

---

## TL;DR Summary (Required at End of Every Feature Doc)

> **Always include this section at the bottom of your feature doc so readers can skip the details and still understand everything.**

```markdown
---

## Quick Summary


### 5 Key Answers (for understanding mode)

| Question | Answer |
|----------|--------|
| **What's the feature in one sentence?** | [Clear, simple description] |
| **What files will be touched?** | [List: create X, modify Y, leave Z alone] |
| **What data flows through?** | [Source → Process → Store → Display] |
| **What can go wrong?** | [Top 2-3 risks or failure points] |
| **How do we know it's working?** | [Specific success criteria/metrics] |


### 5 Key Answers (for planning mode)

| Question | Answer |
|----------|--------|
| **What exactly does it do in one sentence I can repeat?** | [Clear, simple description] |
| **Who is it for and what job does it solve for them?** | [User role + pain relieved] |
| **Where do I click to see it and what happens next?** | [Entry point + next screen/action] |
| **What could go wrong and what do we show when it does?** | [Top 2-3 risks + fallback UI/message] |
| **When you walk away, how do I know it’s working without asking again?** | [Observable sign/metric] |

```

## End result output structure:

```markdown
The generated output contains 6 key sections:
1. **[Section Name]** - [Description of what it contains]
2. **[Section Name]** - [Description of what it contains]
3. **[Section Name]** - [Description of what it contains]
4. **[Section Name]** - [Description of what it contains]
5. **[Section Name]** - [Description of what it contains]
6. **[Section Name]** - [Description of what it contains]

Each section is clearly labeled with headers for easy [parsing/import/analysis].
```
