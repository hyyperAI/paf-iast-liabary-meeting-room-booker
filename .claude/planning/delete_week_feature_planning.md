# Delete Week Feature - Technical Planning

## Summary

Implement iPhone Photos-style week deletion: Edit button in header toggles selection mode, users select weeks via checkboxes, then delete with confirmation dialog.

## Scope

- Files to CREATE:

  - `frontend/src/components/DeleteConfirmationDialog.jsx` - Confirmation modal component
- Files to MODIFY:

  - `frontend/src/pages/WeeksPage.jsx` - Add Edit mode, selection state, delete button
  - `frontend/src/components/WeekCard.jsx` - Add selection checkbox/button state
- Files to LEAVE ALONE:

  - All other components and pages

## Architecture

### Data Flow

[User clicks Edit] → [Toggle editMode state] → [Show selection UI on cards] → [User selects weeks] → [Click Delete] → [Show confirmation] → [Call api.deleteWeekPlan()] → [Refresh data]

### Data Structure

```jsx
// In WeeksPage component state
const [editMode, setEditMode] = useState(false)
const [selectedWeekIds, setSelectedWeekIds] = useState([])

// Pass to WeekCard
<WeekCard
  weekPlan={wp}
  isSelected={selectedWeekIds.includes(wp.id)}
  showSelection={editMode}
  onSelect={(weekId) => {
    setSelectedWeekIds(prev =>
      prev.includes(weekId)
        ? prev.filter(id => id !== weekId)
        : [...prev, weekId]
    )
  }}
/>
```

### API Requirements

**EXISTING API - NO NEW ENDPOINTS NEEDED**

```javascript
// Already exists in api.js (line 207-211)
async deleteWeekPlan(id) {
  return this.request(`/week-plan/${id}`, {
    method: 'DELETE'
  })
}
```

## Implementation Approach

### Reuse (Preferred)

- Existing `api.deleteWeekPlan(id)` method
- Existing button and card styling patterns
- Existing state management patterns (useState in parent)
- Existing WeekCard component structure

### Create (Only if necessary)

- DeleteConfirmationDialog component (new confirmation modal pattern)

## State Management

- Where state lives: Local state in WeeksPage component (useState)
- How state updates:
  - `setEditMode(false/true)` for edit mode toggle
  - `setSelectedWeekIds` for adding/removing selected week IDs
- What triggers re-renders: State changes update WeekCard props

## UI States

### In Normal Mode (editMode = false)

- Show Edit button in header
- Week cards display normally (no selection UI)
- Delete button not visible

### In Edit Mode (editMode = true)

- Edit button changes to "Cancel" or "Done"
- Each week card shows selection checkbox/circle
- Delete button appears at bottom (disabled if no selection)
- Selected weeks show checked state

### After Selection

- Delete button becomes active (enabled)
- Button text shows count: "Delete 3 weeks"

### After Delete Click

- Confirmation dialog: "Delete 3 weeks?"
- On confirm: Show loading state
- On success: Exit edit mode, clear selection, refresh data
- On error: Show error message

## Validation & Business Rules

1. **At least one week must be selected** to enable delete button
2. **Cannot delete all weeks** (prevent deleting last remaining week)
3. **Exit edit mode after successful deletion**

## Error Handling

| Error Type      | User Sees                       | System Does                   |
| --------------- | ------------------------------- | ----------------------------- |
| Delete fails    | Error toast + dialog stays open | Keep dialog open, allow retry |
| Network error   | "Failed to delete weeks"        | Dialog closes, exit edit mode |
| Partial success | "2 of 3 weeks deleted"          | Show which succeeded/failed   |

## Integration Points

- Depends on: Existing weekPlans data from parent
- Impacts: Parent component must refresh weekPlans after delete

Quick Summary

### 5 Key Answers (for planning mode)

| Question                                                                       | Answer                                                                                                                                                    |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What exactly does it do in one sentence I can repeat?**                | Adds iPhone Photos-style deletion: Edit button toggles multi-select mode, users select weeks, then delete with confirmation.                              |
| **Who is it for and what job does it solve for them?**                   | Users who need to clean up old or unwanted week plans from their dashboard.                                                                               |
| **Where do I click to see it and what happens next?**                    | Click "Edit" button in weeks page header → Week cards show selection checkboxes → Select weeks → Click "Delete X weeks" at bottom → Confirm in dialog |
| **What could go wrong and what do we show when it does?**                | Accidental delete (confirmation dialog with count), network failure (error toast), delete fails partially (show which succeeded)                          |
| **When you walk away, how do I know it's working without asking again?** | Deleted weeks disappear from grid, success toast notification, edit mode exits automatically                                                              |

### Before & After Scenarios

#### Scenario 1: Delete Single Week

| Before                                                   | After                                                                      |
| -------------------------------------------------------- | -------------------------------------------------------------------------- |
| User has to navigate to each week and find delete option | User clicks Edit → Select week → Click Delete → Confirm → Week removed |

#### Scenario 2: Delete Multiple Weeks

| Before                            | After                                                                   |
| --------------------------------- | ----------------------------------------------------------------------- |
| User must delete weeks one by one | User clicks Edit → Select multiple weeks → Delete once → All removed |

#### Scenario 3: Cleanup Old Data

| Before                                                  | After                                                                               |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Weeks pile up over time, no way to remove unwanted ones | User can easily select and delete old test weeks or completed weeks from months ago |
