# Export Week Data - Technical Planning

## Summary
Add CSV export functionality to Settings page allowing users to select a specific week from dropdown and export its comprehensive data (metrics, profiles, statistics, queue data) as CSV file.

## Scope
- Files to CREATE:
  - `frontend/src/components/ExportWeekData.jsx` - Export section component with dropdown
  - `frontend/src/utils/csvExporter.js` - CSV generation utility with detailed field mapping
  - `frontend/src/services/exportService.js` - Export API integration service

- Files to MODIFY:
  - `frontend/src/pages/Settings.jsx` - Add Export Week Data section near Delete Data
  - `frontend/src/services/api.js` - Add exportWeekData() method

- Files to LEAVE ALONE:
  - All other pages and components

## Deep Codebase Analysis

### Existing Patterns to Reuse
1. **Notification System**: `useNotification()` hook for success/error toasts
2. **API Service Pattern**: Following existing `api.getWeekPlans()`, `api.getMetrics()` patterns
3. **Settings Page Layout**: Card-based layout matching Delete Data section (lines 34-54 in Settings.jsx)
4. **Button Styling**: Blue gradient buttons (`.bg-blue-600.hover:bg-blue-700`)
5. **Loading States**: Spinner pattern from WeeksPage.jsx (line 173)
6. **Card Styling**: `.card.p-6` wrapper pattern

### Database Schema (from backend/src/services/database.js)
```sql
-- Week Plans
week_plans: id, start_date, status, created_at, updated_at

-- Days (5 per week)
days: id, week_plan_id, day_number, date, is_complete, is_locked, created_at, updated_at

-- Metrics (Tab 1)
metrics: id, day_id, week_plan_id, open_instagram, open_views,
         profile_visits, accounts_reached, created_at, updated_at

-- Profiles (Tab 2)
profiles: id, profile_name, profile_url, full_name, bio, followers_count,
          following_count, posts_count, is_verified, is_private,
          engagement_score, status, week_plan_id, day_id, created_at, updated_at

-- Queue (Tab 3)
queue: id, profile_id, status, slot, day_id, week_plan_id, position,
       created_at, updated_at

-- Statistics (Tab 4)
statistics: id, week_plan_id, day_id, total_comments, total_messages,
            created_at, updated_at

-- Completed Queue
completed_queue: id, profile_id, completed_at, day_id, week_plan_id,
                 slot, comments_count
```

### Data Flow
```
Settings Page Loads
    ↓
Fetch Available Weeks (api.getWeekPlans())
    ↓
Display Dropdown with Week Options
    ↓
User Selects Week + Clicks Export
    ↓
Fetch Complete Week Data:
  - Week Plan + Days
  - Metrics for each day (5 days)
  - Profiles in queue
  - Completed profiles
  - Statistics
    ↓
Transform to CSV Format
    ↓
Download File
    ↓
Show Success Toast
```

### Complete Data Structure

#### Week Plan Response (api.getWeekPlans)
```javascript
{
  success: true,
  data: [
    {
      id: 1,
      startDate: "2024-01-01",
      status: "active" | "completed" | "uncompleted",
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-05T10:00:00Z",
      isComplete: false,
      days: [
        {
          id: 1,
          date: "2024-01-01",
          isComplete: true,
          isLocked: false,
          createdAt: "2024-01-01T10:00:00Z",
          updatedAt: "2024-01-05T10:00:00Z"
        },
        // ... 5 days total
      ]
    }
  ]
}
```

#### Metrics Response (api.getMetrics)
```javascript
{
  success: true,
  data: {
    id: 1,
    day_id: 1,
    week_plan_id: 1,
    open_instagram: 5,
    open_views: 1250,
    profile_visits: 340,
    accounts_reached: 890,
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z"
  }
}
```

### API Requirements

#### Frontend API Method (frontend/src/services/api.js)
```javascript
async exportWeekData(weekId) {
  return this.request(`/week-plan/${weekId}/export`, {
    method: 'GET'
  })
}
```

#### Backend Endpoint (backend/src/routes/weekPlan.js)
```javascript
// Add after existing DELETE endpoint (line 319)
// GET /api/week-plan/:id/export - Export week data as CSV
router.get('/:id/export', (req, res) => {
  try {
    const db = getDb()
    const { id } = req.params

    // Fetch all related data
    const weekPlan = db.prepare('SELECT * FROM week_plans WHERE id = ?').get(id)
    const days = db.prepare('SELECT * FROM days WHERE week_plan_id = ? ORDER BY day_number').all(id)
    const metrics = db.prepare('SELECT * FROM metrics WHERE week_plan_id = ?').all(id)
    const profiles = db.prepare('SELECT * FROM profiles WHERE week_plan_id = ?').all(id)
    const queue = db.prepare('SELECT * FROM queue WHERE week_plan_id = ?').all(id)
    const completed = db.prepare('SELECT * FROM completed_queue WHERE week_plan_id = ?').all(id)
    const statistics = db.prepare('SELECT * FROM statistics WHERE week_plan_id = ?').all(id)

    // Transform to CSV format (detailed in csvExporter.js)
    const csv = transformWeekToCSV({ weekPlan, days, metrics, profiles, queue, completed, statistics })

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=week_${id}_export.csv`)

    res.send(csv)
  } catch (error) {
    console.error('Error exporting week:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})
```

## Implementation Approach

### Reuse (Preferred)
- ✅ `useNotification()` hook from `frontend/src/hooks/useNotification.js`
- ✅ `getStatusBorderColor()` from `frontend/src/utils/weekUtils.js` for status display
- ✅ Button styles: `px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl`
- ✅ Card layout: `.card.p-6` wrapper
- ✅ Loading spinner: `w-16 h-16 mx-auto mb-6 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin`
- ✅ API service patterns from `frontend/src/services/api.js`
- ✅ Date formatting: `new Date(week.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })`

### Create (Only if necessary)
- CSV transformation logic (complex data joining)
- Export-specific API integration
- File download handling

## State Management
- **Where state lives**: Local component state (useState) in ExportWeekData
- **State structure**:
  ```javascript
  const [weeks, setWeeks] = useState([])           // Available weeks
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [exporting, setExporting] = useState(false)
  const [loading, setLoading] = useState(false)
  ```
- **State updates**:
  - `setWeeks` after api.getWeekPlans() succeeds
  - `setSelectedWeekId` on dropdown change
  - `setExporting` during export process
  - `setLoading` during initial fetch
- **What triggers re-renders**: State changes update UI components

## UI States

### Initial/Loading State
- Show loading spinner
- "Loading weeks..." message
- Dropdown disabled

### Data Loaded State
- Dropdown populated with weeks
- Format: "Dec 1-5, 2024 (Active)" using status colors
- Export button disabled
- Empty state: "No weeks available" if weeks.length === 0

### Week Selected State
- Dropdown shows selected week
- Export button enabled
- Button text: "Export Week Data"
- Button class: `bg-blue-600 hover:bg-blue-700`

### Exporting State
- Button shows loading spinner
- Button text: "Exporting..."
- Button disabled
- Prevent multiple clicks

### Success State
- Download starts automatically (browser handles)
- Show success toast: "Week data exported successfully!"
- Auto-dismiss after 3 seconds
- Reset to initial state (clear selection)

### Error State
- Show error toast: "Failed to export week data. Please try again."
- Button remains enabled for retry
- Log error to console

## UI Implementation Design

### Complete Component Code (frontend/src/components/ExportWeekData.jsx)

```jsx
import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { useNotification } from '../hooks/useNotification'
import { getStatusBorderColor } from '../utils/weekUtils'

export default function ExportWeekData() {
  const [weeks, setWeeks] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState('')
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const { showSuccess, showError } = useNotification()

  // Fetch available weeks on mount
  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const response = await api.getWeekPlans()
        if (response.success && response.data) {
          setWeeks(response.data)
        }
      } catch (error) {
        console.error('Error fetching weeks:', error)
        showError('Failed to load weeks')
      } finally {
        setLoading(false)
      }
    }

    fetchWeeks()
  }, [showError])

  const handleExport = async () => {
    if (!selectedWeekId) return

    setExporting(true)
    try {
      const response = await fetch(`/api/week-plan/${selectedWeekId}/export`, {
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `week_${selectedWeekId}_export.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      showSuccess('Week data exported successfully!')
      setSelectedWeekId('') // Reset selection
    } catch (error) {
      console.error('Export error:', error)
      showError('Failed to export week data. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const formatWeekDisplay = (startDate, status) => {
    const start = new Date(startDate)
    const end = new Date(start)
    end.setDate(end.getDate() + 4) // 5-day week

    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} (${status})`
  }

  if (loading) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin"></div>
          <span className="ml-3 text-slate-600">Loading weeks...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        {/* Left - Info & Dropdown */}
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-slate-900 mb-2">
            Export Week Data
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Export a specific week's data as CSV file for external analysis
          </p>

          {/* Dropdown */}
          <select
            value={selectedWeekId}
            onChange={(e) => setSelectedWeekId(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl mb-3
                       focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                       disabled:bg-slate-50 disabled:text-slate-400"
            disabled={exporting}
          >
            <option value="">Select week to export...</option>
            {weeks.map(week => (
              <option key={week.id} value={week.id}>
                {formatWeekDisplay(week.startDate, week.status)}
              </option>
            ))}
          </select>
        </div>

        {/* Right - Button */}
        <div className="ml-6 flex-shrink-0">
          <button
            onClick={handleExport}
            disabled={!selectedWeekId || exporting}
            className={`px-6 py-3 font-medium rounded-xl transition-all shadow-sm
                       flex items-center gap-2 ${
              !selectedWeekId || exporting
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
            }`}
          >
            {exporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Settings Page Integration (frontend/src/pages/Settings.jsx)

Add after line 54 (after Delete Data section closing div):

```jsx
{/* Export Week Data Section */}
<ExportWeekData />
```

### Import Addition (at top of Settings.jsx)

```jsx
import ExportWeekData from '../components/ExportWeekData'
```

### Alternative UI Patterns (from other apps)

**Pattern 1: List with Radio Buttons (iOS Health App style)**
```jsx
<div className="space-y-2">
  {weeks.map(week => (
    <label key={week.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
      <input
        type="radio"
        name="week"
        value={week.id}
        checked={selectedWeekId === week.id}
        onChange={(e) => setSelectedWeekId(e.target.value)}
        className="mr-3"
      />
      <div className="flex-1">
        <div className="font-medium">{formatWeekDisplay(...)}</div>
        <div className="text-sm text-slate-500">{week.status}</div>
      </div>
    </label>
  ))}
</div>
```

**Pattern 2: Card Grid (Project Management style)**
```jsx
<div className="grid grid-cols-2 gap-3">
  {weeks.map(week => (
    <button
      key={week.id}
      onClick={() => setSelectedWeekId(week.id)}
      className={`p-4 border-2 rounded-xl text-left transition-all ${
        selectedWeekId === week.id
          ? 'border-blue-500 bg-blue-50'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="font-semibold">{formatWeekDisplay(...)}</div>
      <div className="text-sm text-slate-500">{week.status}</div>
    </button>
  ))}
</div>
```

## CSV Export Structure & Backend Logic

### Complete CSV Structure (Multiple Sections)

The CSV will contain 6 sections separated by blank lines:

#### Section 1: Week Summary
```csv
Week Summary
Week ID,Start Date,End Date,Status,Created At,Updated At
1,2024-01-01,2024-01-05,active,2024-01-01T10:00:00Z,2024-01-05T10:00:00Z

Day Overview
Day Number,Date,Is Complete,Is Locked
1,2024-01-01,1,0
2,2024-01-02,1,0
3,2024-01-03,0,1
4,2024-01-04,0,1
5,2024-01-05,0,1
```

#### Section 2: Metrics (Tab 1 Data)
```csv
Metrics (Tab 1)
Day Number,Date,Open Instagram,Open Views,Profile Visits,Accounts Reached,Created At,Updated At
1,2024-01-01,5,1250,340,890,2024-01-01T10:00:00Z,2024-01-05T10:00:00Z
2,2024-01-02,3,980,275,720,2024-01-02T10:00:00Z,2024-01-05T10:00:00Z
```

#### Section 3: Profiles (Tab 2 Data)
```csv
Profiles (Tab 2)
Profile ID,Profile Name,Profile URL,Full Name,Followers Count,Following Count,Posts Count,Is Verified,Is Private,Engagement Score,Status,Created At
1,fashionista_style,https://instagram.com/fashionista_style,Fashionista Style,12500,340,89,1,0,85.5,active,2024-01-01T10:00:00Z
2,tech_guru,https://instagram.com/tech_guru,Tech Guru,8900,275,45,0,0,72.3,active,2024-01-01T10:00:00Z
```

#### Section 4: Queue (Tab 3 Data)
```csv
Queue (Tab 3)
Queue ID,Profile ID,Profile Name,Status,Slot,Day ID,Position,Created At
1,1,fashionista_style,pending,morning,1,1,2024-01-01T10:00:00Z
2,2,tech_guru,pending,daytime,1,2,2024-01-01T10:00:00Z
```

#### Section 5: Completed Queue
```csv
Completed Queue
Completed ID,Profile ID,Profile Name,Slot,Comments Count,Completed At
1,3,foodie_life,morning,5,2024-01-01T15:30:00Z
2,4,travel_wanderer,daytime,7,2024-01-01T16:45:00Z
```

#### Section 6: Statistics (Tab 4 Data)
```csv
Statistics (Tab 4)
Day ID,Day Number,Total Comments,Total Messages,Created At,Updated At
1,1,17,3,2024-01-01T10:00:00Z,2024-01-05T10:00:00Z
2,2,9,2,2024-01-02T10:00:00Z,2024-01-05T10:00:00Z
```

### Backend CSV Transformation (backend/src/utils/csvExporter.js)

Create new file:

```javascript
export const transformWeekToCSV = (data) => {
  const { weekPlan, days, metrics, profiles, queue, completed, statistics } = data
  const lines = []

  // Helper function to escape CSV values
  const escapeCSV = (value) => {
    if (value === null || value === undefined) return ''
    const str = String(value)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  // Section 1: Week Summary
  lines.push('Week Summary')
  lines.push(['Week ID', 'Start Date', 'End Date', 'Status', 'Created At', 'Updated At'].map(escapeCSV).join(','))

  const startDate = new Date(weekPlan.start_date)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 4)

  lines.push([
    weekPlan.id,
    weekPlan.start_date,
    endDate.toISOString().split('T')[0],
    weekPlan.status,
    weekPlan.created_at,
    weekPlan.updated_at
  ].map(escapeCSV).join(','))
  lines.push('')

  // Day Overview
  lines.push('Day Overview')
  lines.push(['Day Number', 'Date', 'Is Complete', 'Is Locked'].map(escapeCSV).join(','))
  days.forEach(day => {
    lines.push([
      day.day_number,
      day.date,
      day.is_complete,
      day.is_locked
    ].map(escapeCSV).join(','))
  })
  lines.push('')

  // Section 2: Metrics
  lines.push('Metrics (Tab 1)')
  lines.push(['Day Number', 'Date', 'Open Instagram', 'Open Views', 'Profile Visits', 'Accounts Reached', 'Created At', 'Updated At'].map(escapeCSV).join(','))

  // Group metrics by day
  const metricsByDay = {}
  metrics.forEach(m => {
    const day = days.find(d => d.id === m.day_id)
    if (day) {
      metricsByDay[day.day_number] = m
    }
  })

  days.forEach(day => {
    const m = metricsByDay[day.day_number]
    lines.push([
      day.day_number,
      day.date,
      m?.open_instagram || 0,
      m?.open_views || 0,
      m?.profile_visits || 0,
      m?.accounts_reached || 0,
      m?.created_at || '',
      m?.updated_at || ''
    ].map(escapeCSV).join(','))
  })
  lines.push('')

  // Section 3: Profiles
  lines.push('Profiles (Tab 2)')
  lines.push(['Profile ID', 'Profile Name', 'Profile URL', 'Full Name', 'Followers Count', 'Following Count', 'Posts Count', 'Is Verified', 'Is Private', 'Engagement Score', 'Status', 'Created At'].map(escapeCSV).join(','))
  profiles.forEach(profile => {
    lines.push([
      profile.id,
      profile.profile_name,
      profile.profile_url || '',
      profile.full_name || '',
      profile.followers_count || 0,
      profile.following_count || 0,
      profile.posts_count || 0,
      profile.is_verified || 0,
      profile.is_private || 0,
      profile.engagement_score || 0,
      profile.status || 'active',
      profile.created_at || ''
    ].map(escapeCSV).join(','))
  })
  lines.push('')

  // Section 4: Queue
  lines.push('Queue (Tab 3)')
  lines.push(['Queue ID', 'Profile ID', 'Profile Name', 'Status', 'Slot', 'Day Number', 'Position', 'Created At'].map(escapeCSV).join(','))
  queue.forEach(item => {
    const profile = profiles.find(p => p.id === item.profile_id)
    const day = days.find(d => d.id === item.day_id)
    lines.push([
      item.id,
      item.profile_id,
      profile?.profile_name || '',
      item.status,
      item.slot || '',
      day?.day_number || '',
      item.position || 0,
      item.created_at || ''
    ].map(escapeCSV).join(','))
  })
  lines.push('')

  // Section 5: Completed Queue
  lines.push('Completed Queue')
  lines.push(['Completed ID', 'Profile ID', 'Profile Name', 'Slot', 'Comments Count', 'Completed At'].map(escapeCSV).join(','))
  completed.forEach(item => {
    const profile = profiles.find(p => p.id === item.profile_id)
    lines.push([
      item.id,
      item.profile_id,
      profile?.profile_name || '',
      item.slot || '',
      item.comments_count || 0,
      item.completed_at || ''
    ].map(escapeCSV).join(','))
  })
  lines.push('')

  // Section 6: Statistics
  lines.push('Statistics (Tab 4)')
  lines.push(['Day Number', 'Date', 'Total Comments', 'Total Messages', 'Created At', 'Updated At'].map(escapeCSV).join(','))
  statistics.forEach(stat => {
    const day = days.find(d => d.id === stat.day_id)
    lines.push([
      day?.day_number || '',
      day?.date || '',
      stat.total_comments || 0,
      stat.total_messages || 0,
      stat.created_at || '',
      stat.updated_at || ''
    ].map(escapeCSV).join(','))
  })

  return lines.join('\n')
}
```

## Validation & Business Rules
1. **Must select a week** before export enabled
2. **Only export one week** at a time
3. **CSV filename format**: `week_{weekId}_export.csv`
4. **Data completeness**: Export all related data (metrics, profiles, queue, stats)
5. **UTF-8 encoding**: Ensure proper CSV encoding for special characters
6. **Large datasets**: Handle weeks with many profiles efficiently

## Error Handling

| Error Type | User Sees | System Does |
|------------|-----------|-------------|
| No weeks available | Empty state with message | Show "No weeks available to export" |
| Week not found (404) | Error toast: "Selected week not found" | Log error, reset selection |
| Export fails (500) | Error toast: "Failed to export week data" | Log detailed error, allow retry |
| Network error | Error toast: "Connection error. Please try again." | Suggest checking connection |
| Partial data missing | CSV includes empty fields | Log warning, continue export |
| File download blocked | Browser download notification | Show instructions to enable downloads |

## Integration Points

### Dependencies
- ✅ **weekPlans data**: Uses existing `api.getWeekPlans()`
- ✅ **Notification system**: `useNotification()` hook
- ✅ **Settings page**: Insert as new section
- ✅ **Database queries**: Reuse existing SQL patterns from weekPlan.js

### Impact Assessment
- ✅ **No breaking changes**: Read-only operation
- ✅ **No performance impact**: Single week export, not bulk
- ✅ **No data modification**: Only reads from database
- ✅ **Caching friendly**: GET request, can be cached

## Testing Checklist

### Functional Tests
- [ ] **Happy path**: Select week → Click Export → CSV downloads
- [ ] **Week with no data**: Export week with empty metrics/profiles
- [ ] **Week with partial data**: Export week with some missing data
- [ ] **Multiple exports**: Export same week multiple times
- [ ] **Rapid clicking**: Prevent duplicate exports

### UI Tests
- [ ] **Loading state**: Spinner shows during fetch
- [ ] **Empty state**: Message when no weeks available
- [ ] **Button states**: Disabled when no selection, loading during export
- [ ] **Dropdown population**: All weeks show with correct dates
- [ ] **Date formatting**: Correct display format (Dec 1-5, 2024)

### Error Tests
- [ ] **Network failure**: Error toast, retry works
- [ ] **API error**: Proper error message shown
- [ ] **Week deleted during selection**: Error handling
- [ ] **Browser blocks download**: User notification

### Data Integrity Tests
- [ ] **CSV structure**: All 6 sections present
- [ ] **Data accuracy**: CSV matches database values
- [ ] **Encoding**: Special characters preserved
- [ ] **Large datasets**: Handles 100+ profiles without issues

### Integration Tests
- [ ] **Settings page**: Component renders correctly
- [ ] **Notifications**: Success/error toasts appear
- [ ] **Week deletion**: Exported week can be deleted after
- [ ] **Navigation**: Export doesn't affect other settings

---

## Quick Summary

### 5 Key Answers (for planning mode)

| Question | Answer |
|----------|--------|
| **What exactly does it do in one sentence I can repeat?** | Adds comprehensive CSV export to Settings page where users select a week from dropdown and download all related data (metrics, profiles, queue, statistics) as structured CSV. |
| **Who is it for and what job does it solve for them?** | Data analysts, managers, and users who need to export week data for external analysis in Excel/Google Sheets, backup purposes, or sharing with team members. |
| **Where do I click to see it and what happens next?** | Navigate to Settings → Scroll to "Export Week Data" section → Select week from dropdown (shows "Dec 1-5, 2024 (Active)") → Click blue "Export CSV" button → Browser downloads file → Success toast appears |
| **What could go wrong and what do we show when it does?** | No weeks available (shows empty state message), network fails (error toast "Connection error. Please try again"), export fails (error toast with retry button), week deleted during selection (error handling with reset) |
| **When you walk away, how do I know it's working without asking again?** | CSV file automatically downloads, success toast notification says "Week data exported successfully!", file named "week_1_export.csv" appears in Downloads folder |

### Before & After Scenarios

#### Scenario 1: Export Week for Excel Analysis
| Before | After |
|--------|-------|
| User manually copies metrics from each day into Excel spreadsheet, takes 30+ minutes | User clicks Settings → Selects week → Exports → Opens CSV in Excel with all data pre-formatted in 6 sections |

#### Scenario 2: Backup Week Data Before Deletion
| Before | After |
|--------|-------|
| No way to backup week data before cleanup, risk of losing historical data | User exports week → Downloads complete backup CSV → Can safely delete week knowing data is preserved |

#### Scenario 3: Share Weekly Report with Manager
| Before | After |
|--------|-------|
| Cannot share Instagram engagement data with team/manager, must screenshot or re-enter manually | User exports week → Sends CSV file via email → Manager opens in Excel/Sheets with all metrics, profiles, and statistics |

### Files Modified Summary
- **Create**: 3 new files (ExportWeekData.jsx, csvExporter.js, export endpoint)
- **Modify**: 2 files (Settings.jsx, api.js, weekPlan.js)
- **Reuse**: 6 existing patterns (notifications, API patterns, UI styles, date formatting, loading states, card layouts)
- **Database**: No schema changes, read-only queries from existing tables

### CSV Output Structure
The exported CSV contains 6 comprehensive sections:
1. **Week Summary** - Overall week info and day overview
2. **Metrics (Tab 1)** - Open Instagram, views, profile visits, accounts reached
3. **Profiles (Tab 2)** - All Instagram profiles with follower counts, verification status
4. **Queue (Tab 3)** - Pending profiles with slot assignments and positions
5. **Completed Queue** - Completed profiles with comment counts
6. **Statistics (Tab 4)** - Cumulative comments and messages per day

Each section is clearly labeled with headers for easy import into Excel/Google Sheets.
