# [Feature Name] - Technical Planning

## Summary
[One paragraph describing the feature scope and purpose]

## Scope
- Files to CREATE:
  - [File path] - [Description]
  - [File path] - [Description]

- Files to MODIFY:
  - [File path] - [Description]
  - [File path] - [Description]

- Files to LEAVE ALONE:
  - [List files/sections to avoid modifying]

## Deep Codebase Analysis

### Existing Patterns to Reuse
1. **[Pattern Name]**: [Source location] - [What to reuse]
2. **[Pattern Name]**: [Source location] - [What to reuse]
3. **[Pattern Name]**: [Source location] - [What to reuse]

### Database Schema (from backend/src/services/database.js)
```sql
-- [Table name]
[table_name]: [field1], [field2], [field3]

-- [Related table]
[table_name]: [field1], [field2], [field3]
```

### Data Flow
```
[Process step 1]
    ↓
[Process step 2]
    ↓
[Process step 3]
    ↓
[Process step 4]
    ↓
[Final result]
```

### Complete Data Structure

#### [Data Type] Response
```javascript
{
  [structure example]
}
```

#### [Another Data Type] Response
```javascript
{
  [structure example]
}
```

### API Requirements

#### Frontend API Method (frontend/src/services/api.js)
```javascript
async [methodName]([params]) {
  return this.request(`[endpoint]`, {
    method: '[HTTP_METHOD]'
  })
}
```

#### Backend Endpoint (backend/src/routes/[file].js)
```javascript
// [Description of where to add this]
// [HTTP_METHOD] /api/[endpoint] - [What it does]
router.[method]('/[path]', (req, res) => {
  try {
    [implementation details]

    // [Key operations]

    res.[responseType]([data])
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})
```

## Implementation Approach

### Reuse (Preferred)
- ✅ `[Hook/Pattern/Component]` from `[location]`
- ✅ `[Style/Utility]` from `[location]`
- ✅ `[API Pattern]` from `[location]`
- ✅ `[Layout Pattern]` from `[location]`

### Create (Only if necessary)
- [New component/service/utility needed]
- [Why existing patterns don't work]

## State Management
- **Where state lives**: [Component state/Context/Redux/etc.]
- **State structure**:
  ```javascript
  const [state1, setState1] = useState([initial])
  const [state2, setState2] = useState([initial])
  ```
- **State updates**:
  - `setState1` when [condition/event]
  - `setState2` when [condition/event]
- **What triggers re-renders**: State changes update UI components

## UI States

### [State Name]
- [UI description]
- [Behavior details]

### [State Name]
- [UI description]
- [Behavior details]

### [State Name]
- [UI description]
- [Behavior details]

### [State Name]
- [UI description]
- [Behavior details]

## UI Implementation Design

### Complete Component Code ([Component Path])

```jsx
[Full component implementation with:
- Imports
- State hooks
- useEffect hooks
- Event handlers
- Render logic
- UI components
- Styling classes
]
```

### [Page] Integration ([Page Path])

Add after [specific location]:

```jsx
{[JSX to add]}
```

### Import Addition (at top of file)

```jsx
import [Component] from '[path]'
```

### Alternative UI Patterns

**Pattern 1: [Pattern Name]** ([Reference App] style)
```jsx
[Alternative implementation]
```

**Pattern 2: [Pattern Name]** ([Reference App] style)
```jsx
[Alternative implementation]
```

## [Feature-Specific Section Name]

### [Subsection Name]

[Description and structure]

```
[Data format or structure]
```

#### [Section Name]
```csv
[CSV section structure]
```

#### [Section Name]
```csv
[CSV section structure]
```

### Backend [Utility/Service] ([File Path])

Create new file:

```javascript
export const [functionName] = (data) => {
  const { [destructured data] } = data
  const lines = []

  // Helper function
  const [helperName] = (value) => {
    [logic]
  }

  // [Section 1]
  lines.push('[Section Header]')
  lines.push([headers].map([helperName]).join(','))
  [data].forEach(item => {
    lines.push([fields].map([helperName]).join(','))
  })
  lines.push('')

  return lines.join('\n')
}
```

## Validation & Business Rules
1. **[Rule]**: [Description]
2. **[Rule]**: [Description]
3. **[Rule]**: [Description]
4. **[Rule]**: [Description]

## Error Handling

| Error Type | User Sees | System Does |
|------------|-----------|-------------|
| [Error scenario] | [User-facing message] | [System action] |
| [Error scenario] | [User-facing message] | [System action] |
| [Error scenario] | [User-facing message] | [System action] |
| [Error scenario] | [User-facing message] | [System action] |

## Integration Points

### Dependencies
- ✅ **[Dependency]**: [Description]
- ✅ **[Dependency]**: [Description]
- ✅ **[Dependency]**: [Description]

### Impact Assessment
- ✅ **[Impact type]**: [Assessment]
- ✅ **[Impact type]**: [Assessment]
- ✅ **[Impact type]**: [Assessment]

## Testing Checklist

### Functional Tests
- [ ] **Happy path**: [Test case] → [Expected result]
- [ ] **[Scenario]**: [Test case] → [Expected result]
- [ ] **[Scenario]**: [Test case] → [Expected result]
- [ ] **[Scenario]**: [Test case] → [Expected result]

### UI Tests
- [ ] **[State]**: [Test case]
- [ ] **[State]**: [Test case]
- [ ] **[Interaction]**: [Test case]
- [ ] **[Display]**: [Test case]

### Error Tests
- [ ] **[Error scenario]**: [Expected behavior]
- [ ] **[Error scenario]**: [Expected behavior]
- [ ] **[Error scenario]**: [Expected behavior]
- [ ] **[Error scenario]**: [Expected behavior]

### [Data/Integration/Performance] Tests
- [ ] **[Test case]**: [Expected behavior]
- [ ] **[Test case]**: [Expected behavior]
- [ ] **[Test case]**: [Expected behavior]
- [ ] **[Test case]**: [Expected behavior]

---

## Quick Summary

### 5 Key Answers (for planning mode)

| Question | Answer |
|----------|--------|
| **What exactly does it do in one sentence I can repeat?** | [Clear, simple description] |
| **Who is it for and what job does it solve for them?** | [User role + pain relieved] |
| **Where do I click to see it and what happens next?** | [Entry point + next screen/action] |
| **What could go wrong and what do we show when it does?** | [Top 2-3 risks + fallback UI/message] |
| **When you walk away, how do I know it's working without asking again?** | [Observable sign/metric] |

### Before & After Scenarios

#### Scenario 1: [Primary Use Case]
| Before | After |
|--------|-------|
| [Current pain point] | [New capability] |

#### Scenario 2: [Secondary Use Case]
| Before | After |
|--------|-------|
| [Current pain point] | [New capability] |

#### Scenario 3: [Edge Case or Power User]
| Before | After |
|--------|-------|
| [Current limitation] | [New ability] |

### Files Modified Summary
- **Create**: [X] new files ([names])
- **Modify**: [Y] files ([names])
- **Reuse**: [Z] existing patterns ([descriptions])
- **Database**: [Changes needed / No schema changes]

### [Output/Feature] Structure
[Description of what the feature produces/output]

[Section describing the structure in detail]

```
[Structure format]
```

