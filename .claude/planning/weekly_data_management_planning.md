# Weekly Data Management - Technical Planning

## Summary
Build a data management interface allowing users to export weekly data as CSV files and delete selected weeks' data from the database with confirmation safeguards.

## Scope
- Files to CREATE:
  - `src/components/WeeklyDataManager.tsx` - Main component
  - `src/components/DeleteConfirmDialog.tsx` - Confirmation modal
  - `src/services/weeklyDataService.ts` - Data operations
  - `src/utils/csvExporter.ts` - CSV export utility
  - `src/types/weeklyData.ts` - TypeScript interfaces

- Files to MODIFY:
  - `src/pages/SettingsPage.tsx` - Add navigation to weekly data manager
  - `src/services/api.ts` - Add DELETE /api/weekly-data endpoint call

- Files to LEAVE ALONE:
  - Existing data visualization components
  - User profile/auth components

## Architecture

### Data Flow
[Database] → [API Layer] → [weeklyDataService] → [UI State] → [User Action] → [API/Download]

### Data Structure
```ts
interface WeekData {
  weekStartDate: string;  // ISO date
  weekEndDate: string;    // ISO date
  postCount: number;
  engagementRate: number;
  followers: number;
  metrics: Record<string, number>;
}

interface WeeklyDataResponse {
  weeks: WeekData[];
  totalWeeks: number;
  availableRange: {
    start: string;
    end: string;
  };
}

interface ExportRequest {
  weekStart: string;
  weekEnd: string;
  format: 'csv';
}

interface DeleteRequest {
  weekStart: string;
  confirm: boolean;
}
```

### API Requirements
| Endpoint | Method | Request | Response | Auth |
|----------|--------|---------|----------|------|
| `/api/weekly-data` | GET | `{ startDate?, endDate? }` | `{ weeks: WeekData[], totalWeeks }` | Required |
| `/api/weekly-data/export` | POST | `{ weekStart, weekEnd, format: 'csv' }` | `{ downloadUrl }` | Required |
| `/api/weekly-data` | DELETE | `{ weekStart, confirm: true }` | `{ success, deletedWeek }` | Required |

## Implementation Approach

### Reuse (Preferred)
- Existing API client patterns from `src/services/api.ts`
- Button components from existing UI library
- Date formatting utilities from `src/utils/dateHelpers.ts`
- Loading states from existing components
- Confirmation modal pattern from delete confirmation in posts

### Create (Only if necessary)
- Weekly data table component (custom display needed)
- CSV export logic (no existing pattern for file generation)
- Date range picker (no weekly-specific picker exists)

## State Management
- Where state lives: React Query for server state, local component state for UI
- How state updates: Query invalidate on delete, setState for loading/error
- What triggers re-renders: Data fetch, delete operation, export operation

## UI States
- Default: Show table with available weeks, export and delete buttons
- Loading: Skeleton loader for table, loading spinners on buttons
- Success: Toast notification, updated data
- Error: Error message with retry option
- Empty: "No data available" message
- Delete Confirmation: Modal with week details and double confirmation

## Validation & Business Rules
1. **Cannot delete current week**: Check against current date, show warning
2. **At least one week must remain**: Prevent deleting all weeks
3. **Double confirmation**: First confirmation shows data preview, second confirms
4. **Export date validation**: End date must be after start date
5. **Rate limiting**: Max 10 exports per hour per user

## Error Handling
| Error Type | User Sees | System Does |
|------------|-----------|-------------|
| Network failure | "Connection error. Please try again." | Retry API call once, then show error |
| No data for week | "No data available for selected week" | Return empty state, disable actions |
| Delete failure | "Failed to delete data. Please try again." | Log error, suggest retry |
| Export failure | "Failed to generate CSV. Please try again." | Clear download URL, allow retry |
| Unauthorized | "You don't have permission to perform this action" | Redirect to login |

## Integration Points
- Depends on: Authentication system, existing API client
- Impacts: Data dashboard (reduced data after deletion), analytics (filtered data)

## Testing Checklist
- [ ] Happy path: Export single week, export range, delete single week
- [ ] Edge case: Delete current week (blocked), delete all weeks (blocked), export 52 weeks (performance)
- [ ] Error case: Network timeout, server error, invalid date range

## Security
- Input sanitization: Validate all dates, prevent SQL injection
- Permission checks: Verify user owns the data before delete
- Audit trail: Log all delete operations with user, timestamp, week deleted
- Confirmation requirement: Must explicitly confirm with week details shown

## Migration/Compatibility
- Breaking changes: No
- Data migration needed: No
- Backward compatibility: N/A (new feature)

---

## Quick Summary

### 5 Key Answers (for planning mode)

| Question | Answer |
|----------|--------|
| **What exactly does it do in one sentence I can repeat?** | Allows users to export weekly data as CSV and permanently delete selected weeks from database with confirmation safeguards. |
| **Who is it for and what job does it solve for them?** | Data analysts and admins who need to clean up old data and export weekly reports for external analysis. |
| **Where do I click to see it and what happens next?** | Navigate to Settings → Weekly Data Manager → View table of weeks → Click Export or Delete |
| **What could go wrong and what do we show when it does?** | Accidental deletion (double confirmation modal), export failures (retry button with error message), network issues (offline message) |
| **When you walk away, how do I know it's working without asking again?** | Success toast notifications, updated data table, downloaded CSV file |

### Before & After Scenarios

#### Scenario 1: Export Weekly Report
| Before | After |
|--------|-------|
| User has to manually query database and format CSV | User selects week range and clicks export, CSV downloads automatically |

#### Scenario 2: Delete Old Data
| Before | After |
|--------|-------|
| User contacts admin to delete old test data | User selects week, confirms twice, data is permanently removed |

#### Scenario 3: Bulk Operations
| Before | After |
|--------|-------|
| User cannot manage data volume, database grows indefinitely | User can export then delete ranges of weeks, keeping only recent data |
