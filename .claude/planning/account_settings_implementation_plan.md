# Account Settings Feature Implementation Plan

## Feature Overview
Implement comprehensive Account Settings allowing users to manage profile information, passwords, and notification preferences with persistent storage and real-time updates.

---

## 1. Feature Scope & Requirements

### Core Functionality
**What it does:**
- Enables users to manage their account profile (name, email, avatar)
- Allows password changes with proper validation
- Provides notification preferences control (email, browser, reminders, digests)
- Stores all settings persistently in database
- Provides real-time UI updates when settings change

**User Roles:**
- Primary: Authenticated users (currently hardcoded to usman.ak508@gmail.com)
- Future: Multi-user support when auth system is expanded

**Problems Solved:**
- Current profile uses localStorage only (not persistent across devices)
- No avatar upload capability
- No password management
- No notification preferences
- No centralized settings management

**Acceptance Criteria:**
- [ ] Users can update name, email with instant UI reflection
- [ ] Users can upload and change avatar image
- [ ] Users can change password with current password validation
- [ ] Email notifications can be toggled on/off
- [ ] Browser notifications can be enabled/disabled
- [ ] Reminder timing can be set (15min, 30min, 1hr, 2hr, custom)
- [ ] Daily/weekly digest can be enabled with frequency options
- [ ] All settings persist across sessions
- [ ] Form validation prevents invalid inputs
- [ ] Success/error feedback for all operations

**Edge Cases & Scenarios:**
1. **Large Avatar Upload:** Images >5MB should show error and compression suggestion
2. **Invalid Email Format:** Real-time validation with clear error messages
3. **Weak Password:** Enforce password strength (8+ chars, 1 uppercase, 1 number, 1 special char)
4. **Network Failure:** Graceful error handling with retry mechanism
5. **Browser Notification Permission:** Handle browser permission denied gracefully
6. **Rapid Updates:** Debounce saves to prevent excessive API calls
7. **Database Errors:** Rollback changes and show user-friendly error

**Similar Features in Market:**
- Instagram: Profile editing with avatar, privacy settings
- Twitter/X: Comprehensive notification preferences
- LinkedIn: Email digest options (daily, weekly, instant)
- GitHub: Password change with 2FA integration

**Error Handling Strategy:**
- Frontend: Form validation, loading states, toast notifications
- Backend: Try-catch blocks, detailed error messages, HTTP status codes
- Database: Transaction rollback on failure
- File uploads: Size/type validation, secure storage

---

## 2. Data Requirements

### Data Structure

**User Settings Table (NEW)**
```sql
CREATE TABLE user_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT UNIQUE NOT NULL,
  user_name TEXT NOT NULL,
  avatar_url TEXT,
  password_hash TEXT,
  email_notifications INTEGER DEFAULT 1,
  browser_notifications INTEGER DEFAULT 0,
  reminder_timing TEXT DEFAULT '30min', -- 15min, 30min, 1hr, 2hr, custom
  custom_reminder_minutes INTEGER,
  daily_digest INTEGER DEFAULT 0,
  weekly_digest INTEGER DEFAULT 1,
  digest_day TEXT DEFAULT 'monday', -- for weekly digest
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

**Data Shape:**
```javascript
// User Profile Data
{
  id: number,
  user_email: string,
  user_name: string,
  avatar_url: string | null,
  email_notifications: boolean,
  browser_notifications: boolean,
  reminder_timing: '15min' | '30min' | '1hr' | '2hr' | 'custom',
  custom_reminder_minutes: number | null,
  daily_digest: boolean,
  weekly_digest: boolean,
  digest_day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  created_at: ISOString,
  updated_at: ISOString
}
```

**Data Flow:**
1. **Profile Update:**
   - User edits form → Frontend validation → API call → Database update → AuthContext update → UI refresh

2. **Avatar Upload:**
   - User selects file → Frontend validation (size/type) → Upload to server → Get URL → Save to DB → Update UI

3. **Password Change:**
   - User enters current + new password → Validate current password → Hash new password → Update DB → Session may need refresh

4. **Notification Settings:**
   - User toggles settings → Immediate API call → Database update → Settings applied in real-time

**Data Storage:**
- **Database:** SQLite table `user_settings` (persistent, shareable across devices)
- **File System:** Avatar images stored in `/backend/uploads/avatars/` with unique filenames
- **Cache:** Frontend state in React Context + localStorage for offline access

**Data Persistence Strategy:**
- Immediate save on every change (auto-save with debounce 500ms)
- Optimistic UI updates (show success before API confirms)
- Rollback on failure with toast notification
- Version control: Track updated_at for conflict resolution

**Validation Rules:**
- Email: Valid email format, max 255 chars
- Name: 2-50 chars, alphanumeric + spaces
- Password: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
- Avatar: JPG/PNG/WebP, max 5MB, min 100x100px
- Custom minutes: 5-1440 minutes (1 day max)

**Dependencies:**
- Authentication system (AuthContext)
- File upload handling (multer for Express)
- Image processing (sharp for resize/compress)
- Notification system (browser Notification API)

**Stale Data Handling:**
- Always fetch latest from database on page load
- Check updated_at timestamp for conflicts
- Show banner if data modified elsewhere
- Last-write-wins strategy for simplicity

---

## 3. UI Components

### Page Structure: `/frontend/src/pages/Settings.jsx`

**Main Settings Page Layout:**
```
┌─────────────────────────────────────┐
│ Settings                             │
├─────────────────────────────────────┤
│ [Tabs: Profile | Notifications]      │
│                                     │
│ ┌─ Profile Tab ───────────────────┐ │
│ │ Avatar Section:                 │ │
│ │ ┌─────────┐                     │ │
│ │ │ [Img]   │ [Change] [Remove]  │ │
│ │ │ 128x128 │                     │ │
│ │ └─────────┘                     │ │
│ │                                 │ │
│ │ Form Fields:                    │ │
│ │ Name: [________________] ✓      │ │
│ │ Email: [_______________] ✓      │ │
│ │                                 │ │
│ │ Password Section:               │ │
│ │ Current: [____________]         │ │
│ │ New: [____________]             │ │
│ │ Confirm: [__________]           │ │
│ │ [Show/Hide] [Strength Meter]   │ │
│ │                                 │ │
│ │ [Save Profile] [Cancel]        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─ Notifications Tab ─────────────┐ │
│ │ Email Notifications:            │ │
│ │ ☑ New activity                  │ │
│ │ ☑ Week summaries                │ │
│ │ ☑ System updates                │ │
│ │                                 │ │
│ │ Browser Notifications:          │ │
│ │ ☐ Enable [Permission Status]   │ │
│ │                                 │ │
│ │ Reminder Timing:                │ │
│ │ ○ 15 min ○ 30 min ○ 1 hour     │ │
│ │ ○ 2 hours ○ Custom: [___] min  │ │
│ │                                 │ │
│ │ Email Digests:                  │ │
│ │ ☐ Daily digest (7 AM)          │ │
│ │ ☑ Weekly digest (Monday)       │ │
│ │                                 │ │
│ │ [Save Notifications]            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Component Breakdown

**1. AvatarUpload Component** (NEW: `frontend/src/components/Settings/AvatarUpload.jsx`)
- **Location:** Profile tab, top section
- **When visible:** Always on Profile tab
- **Functionality:**
  - Display current avatar (128x128px circle)
  - Upload button triggering file input
  - Remove avatar button
  - Drag-and-drop support
  - Progress indicator during upload
  - Preview before save
- **Form behavior:**
  - Validates file type (JPG/PNG/WebP)
  - Validates file size (<5MB)
  - Shows preview immediately
  - Auto-resize to 256x256px on backend
- **Accessibility:**
  - Keyboard navigable
  - ARIA labels for screen readers
  - Focus indicators
  - Alt text for avatar

**2. ProfileForm Component** (UPDATE: `frontend/src/pages/Settings.jsx`)
- **Location:** Profile tab, middle section
- **When visible:** Profile tab active
- **Functionality:**
  - Name input with validation (2-50 chars)
  - Email input with validation (format check)
  - Real-time validation feedback (green check/red cross)
  - Save button (disabled until changes)
  - Cancel button (resets to original values)
- **Behavior:**
  - Auto-save on blur (debounced 500ms)
  - Manual save button for batch updates
  - Loading state during save
  - Success toast on save
  - Error state on failure

**3. PasswordChange Component** (NEW: `frontend/src/components/Settings/PasswordChange.jsx`)
- **Location:** Profile tab, bottom section
- **When visible:** Profile tab active
- **Functionality:**
  - Current password input (with show/hide toggle)
  - New password input (with show/hide toggle)
  - Confirm password input (with show/hide toggle)
  - Password strength meter (4-level: Weak/Medium/Strong/Very Strong)
  - Validation rules display
  - Submit button (disabled until valid)
- **Validation Rules:**
  - Current password required and must match
  - New password: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special
  - Confirm must match new password
  - New password cannot equal current password
- **UX Behavior:**
  - Real-time strength checking
  - Clear error messages
  - Auto-hide passwords by default
  - Require current password before showing new password fields

**4. NotificationSettings Component** (NEW: `frontend/src/components/Settings/NotificationSettings.jsx`)
- **Location:** Notifications tab
- **When visible:** Notifications tab active
- **Functionality:**
  - Email notification toggles (3 checkboxes)
  - Browser notification toggle with permission status
  - Reminder timing radio group (5 options)
  - Custom minutes input (appears when "Custom" selected)
  - Daily digest checkbox
  - Weekly digest checkbox with day selector
- **Behavior:**
  - Instant API save on toggle (optimistic UI)
  - Browser permission request on toggle
  - Dependency: Disable custom minutes if not "Custom" selected
  - Dependency: Disable day selector if weekly digest off
- **State Management:**
  - Local state with debounced save
  - Rollback on API failure
  - Loading indicators

**5. SettingsLayout Component** (NEW: `frontend/src/components/Settings/SettingsLayout.jsx`)
- **Location:** Settings page wrapper
- **Purpose:** Tab navigation + layout structure
- **Tabs:** Profile, Notifications
- **Active state:** Highlight active tab
- **Routing:** URL updates with `/settings/profile` or `/settings/notifications`

**6. FormValidation Component** (REUSE: `frontend/src/components/Modals/ValidationHelpers.jsx`)
- **Usage:** Shared validation logic
- **Functions:**
  - validateEmail(email)
  - validateName(name)
  - validatePassword(password)
  - validateAvatar(file)

**7. ToastNotifications** (EXISTING: already implemented)
- **Usage:** Success/error feedback
- **Types needed:**
  - Settings saved successfully
  - Avatar uploaded
  - Password changed
  - Validation errors
  - Network errors

---

## 4. Navigation and Routing

### Frontend Routes
```
/settings                  → Redirect to /settings/profile
/settings/profile          → Profile management tab
/settings/notifications    → Notification preferences tab
```

### Backend API Endpoints

**User Settings Routes** (NEW: `backend/src/routes/userSettings.js`)

```
GET    /api/user/settings          → Get current user's settings
PUT    /api/user/settings          → Update user settings (name, email, notifications)
POST   /api/user/avatar            → Upload avatar image
DELETE /api/user/avatar            → Remove avatar image
PUT    /api/user/password          → Change password
```

### Access Control
- **Authentication Required:** All routes require valid auth token
- **User Isolation:** Users can only access their own settings
- **Rate Limiting:** Password changes limited to 3 per hour
- **File Upload Limits:** Avatar uploads limited to 10 per day

### Route Details

**GET /api/user/settings**
```javascript
// Request: No body, auth required
// Response:
{
  success: true,
  data: {
    user_email: "usman.ak508@gmail.com",
    user_name: "Usman",
    avatar_url: "/uploads/avatars/abc123.jpg",
    email_notifications: true,
    browser_notifications: false,
    reminder_timing: "30min",
    custom_reminder_minutes: null,
    daily_digest: false,
    weekly_digest: true,
    digest_day: "monday"
  }
}
```

**PUT /api/user/settings**
```javascript
// Request:
{
  user_name: "New Name",
  user_email: "new@email.com",
  email_notifications: true,
  browser_notifications: true,
  reminder_timing: "1hr",
  custom_reminder_minutes: null,
  daily_digest: false,
  weekly_digest: true,
  digest_day: "monday"
}

// Response:
{
  success: true,
  data: { /* updated settings */ },
  message: "Settings updated successfully"
}
```

**POST /api/user/avatar**
```javascript
// Request: multipart/form-data with 'avatar' field
// Response:
{
  success: true,
  data: {
    avatar_url: "/uploads/avatars/def456.jpg"
  },
  message: "Avatar uploaded successfully"
}
```

**PUT /api/user/password**
```javascript
// Request:
{
  current_password: "oldpassword",
  new_password: "newpassword123!"
}

// Response:
{
  success: true,
  message: "Password changed successfully"
}
```

---

## 5. Business Logic

### Profile Management Logic

**Name/Email Update:**
1. Validate input format (email regex, name length)
2. Check if email already exists for another user (if multi-user)
3. Update database record
4. Update AuthContext user object
5. Update localStorage
6. Broadcast change to other open tabs (localStorage event)

**Avatar Upload Process:**
1. Frontend validation (type, size, dimensions)
2. Send file via FormData to `/api/user/avatar`
3. Backend validation (multer, file type check)
4. Generate unique filename (timestamp + random)
5. Resize image to 256x256px using sharp
6. Save to `/backend/uploads/avatars/`
7. Update database with avatar URL
8. Update AuthContext
9. Return new URL for frontend update

**Password Change Process:**
1. Verify current password (hash comparison)
2. Validate new password strength
3. Hash new password using bcrypt
4. Update database
5. Optional: Invalidate other sessions
6. Return success (don't return old/new passwords)

### Notification Settings Logic

**Email Notifications:**
- Toggle state stored in database
- Applied to future notifications
- No immediate action needed

**Browser Notifications:**
1. Check Notification API support
2. Request permission if enabling
3. Store preference in database
4. If granted: Register service worker (future enhancement)
5. If denied: Show instructions to enable manually

**Reminder Timing:**
```javascript
// Conversion to minutes
const timingMap = {
  '15min': 15,
  '30min': 30,
  '1hr': 60,
  '2hr': 120,
  'custom': custom_reminder_minutes || 60
}

// For scheduling reminders (future implementation)
const scheduleReminder = (timingMinutes) => {
  // Future: integrate with actual reminder system
  // Store in database for scheduler service
}
```

**Digest Scheduling:**
```javascript
// For email digests (future implementation)
const scheduleDigest = (type, day) => {
  // type: 'daily' | 'weekly'
  // day: 'monday'...'sunday' (for weekly)
  // Store in cron job table for scheduler
}
```

### Validation Rules

**Name Validation:**
- Length: 2-50 characters
- Characters: Letters, numbers, spaces, hyphens, apostrophes
- No leading/trailing spaces
- Cannot be all spaces

**Email Validation:**
- Format: RFC 5322 compliant regex
- Length: 5-255 characters
- No consecutive dots
- No @ at start/end

**Password Strength:**
```javascript
const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?'
}

const calculateStrength = (password) => {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  // Return: 0-4 (Weak to Very Strong)
}
```

**Avatar Validation:**
- Type: JPG, PNG, WebP only
- Size: Max 5MB
- Dimensions: Min 100x100px (after resize to 256x256)
- Aspect ratio: 1:1 (square)

### Business Rules

1. **Email Uniqueness:** One email per user account
2. **Password History:** Don't allow reuse of last 5 passwords (future)
3. **Avatar Cleanup:** Delete old avatar file when new one uploaded
4. **Notification Dependencies:**
   - Browser notifications require permission
   - Digests can be enabled even if email notifications off
5. **Auto-save:** Changes saved automatically (debounced)
6. **Conflict Resolution:** Last-write-wins with timestamp

---

## 6. Quick Mental Model Checklist

✅ **Do I understand the WHAT?**
- Feature: Complete account settings with profile, password, and notifications
- Requirements: Persistent storage, real-time updates, form validation, file upload
- Acceptance criteria: All 10 criteria listed in Section 1

✅ **Do I know the WHERE?**
- Frontend pages: `/frontend/src/pages/Settings.jsx`
- Components: `/frontend/src/components/Settings/`
- Backend routes: `/backend/src/routes/userSettings.js`
- Database: New `user_settings` table
- File storage: `/backend/uploads/avatars/`
- API endpoints: `/api/user/*`

✅ **Do I see the HOW?**
- Patterns: REST API with CRUD operations, React Context for state, debounced auto-save
- Approach: Table-driven data, optimistic UI updates, file upload with validation
- Similar code: Existing Profile.jsx (localStorage → database conversion)

✅ **Do I map the DATA?**
- Structure: user_settings table with 12 fields
- Flow: Form → Validation → API → Database → Context → UI
- Storage: SQLite database + file system for avatars
- Dependencies: AuthContext, Notification system

✅ **Do I trace the FLOW?**
- User action: Edit form → Validation → API call → DB update → Context update → UI refresh
- Data flow: Frontend state → HTTP request → Backend validation → Database → Response → Frontend update
- Error flow: API error → Rollback → Toast notification

✅ **Do I know DONE?**
- Success criteria: All 10 acceptance criteria met
- Verification: Manual testing + automated tests
- Quality: No console errors, responsive design, accessibility compliance

---

## Final Analysis

### One-Sentence Feature Description
A comprehensive account settings system enabling users to manage profile information, passwords, and notification preferences with persistent database storage, real-time validation, and secure file uploads.

### Files to be Created/Modified

**NEW Files:**
1. `backend/src/routes/userSettings.js` - API routes for user settings
2. `frontend/src/components/Settings/AvatarUpload.jsx` - Avatar upload component
3. `frontend/src/components/Settings/PasswordChange.jsx` - Password change component
4. `frontend/src/components/Settings/NotificationSettings.jsx` - Notifications UI
5. `frontend/src/components/Settings/SettingsLayout.jsx` - Tab layout

**MODIFIED Files:**
1. `frontend/src/pages/Settings.jsx` - Replace current settings with new comprehensive UI
2. `backend/src/server.js` - Add userSettings router
3. `backend/src/services/database.js` - Create user_settings table
4. `frontend/src/contexts/AuthContext.jsx` - Load settings on login, update on profile change
5. `frontend/src/components/Navigation.jsx` - Add settings link if not present

**TOTAL FILES:** 9 files (5 new, 4 modified)

### Data Flow Through System

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Settings Page UI │
│ (React Components)│
└──────┬───────────┘
       │ HTTP/API
       ▼
┌──────────────────┐
│ userSettings.js  │
│ (Express Routes) │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  SQLite Database │
│  user_settings   │
│      Table       │
└──────────────────┘
       ▲
       │
       ▼
┌──────────────────┐
│ File System      │
│ /uploads/avatars │
│   (Avatar Files) │
└──────────────────┘
       ▲
       │
       ▼
┌──────────────────┐
│ AuthContext      │
│ (Global State)   │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  UI Updates      │
│ (Real-time)      │
└──────────────────┘
```

### What Can Go Wrong?

**Technical Issues:**
1. **Database Connection Failure:** Handle gracefully, show offline mode
2. **File Upload Errors:** Invalid type, size limit, disk full
3. **Network Timeouts:** Implement retry logic, show loading states
4. **Concurrent Updates:** Last-write-wins, timestamp comparison
5. **Memory Leaks:** Cleanup event listeners, debounce API calls

**Business Logic Issues:**
1. **Email Already Exists:** Check uniqueness before save
2. **Wrong Current Password:** Clear error message
3. **Weak Password:** Enforce strength with clear rules
4. **Browser Permissions Denied:** Provide instructions
5. **Invalid Avatar Format:** Validate on frontend and backend

**User Experience Issues:**
1. **Auto-save Too Frequent:** Use debounce (500ms)
2. **No Feedback:** Toast notifications for all actions
3. **Form Loss on Refresh:** Auto-save prevents data loss
4. **Slow Upload:** Show progress indicator
5. **Confusing Validation:** Real-time feedback with clear messages

### How to Know It's Working?

**Functional Testing:**
1. ✅ Update name/email → Check database → Verify UI updates
2. ✅ Upload avatar → Verify file exists → Check URL works
3. ✅ Change password → Test old password fails, new works
4. ✅ Toggle notifications → Verify database updates
5. ✅ Refresh page → Settings persist

**Performance Testing:**
1. ✅ Auto-save debounce works (500ms delay)
2. ✅ Large avatar upload completes within 5 seconds
3. ✅ Form validation responds <100ms
4. ✅ Settings load on page open <500ms

**Error Testing:**
1. ✅ Invalid email shows error immediately
2. ✅ Wrong current password shows error
3. ✅ Large file shows error and doesn't upload
4. ✅ Network failure shows retry option
5. ✅ Concurrent edit shows "updated elsewhere" banner

---

## User Scenarios (Before vs After)

### Scenario 1: Updating Profile Information

**BEFORE (Current State):**
1. User navigates to Profile page
2. Edits name/email in form
3. Clicks Save Profile
4. Data stored in localStorage only
5. **Problem:** Data lost if browser cache cleared, not accessible on other devices
6. **Problem:** No avatar upload capability
7. **Problem:** Settings not shared across sessions

**AFTER (With Feature):**
1. User navigates to Settings → Profile tab
2. Edits name/email in form
3. Auto-saves as user types (debounced)
4. Data stored in SQLite database
5. **Benefit:** Data persists across devices and browser clears
6. **Benefit:** Can upload and change avatar
7. **Benefit:** Real-time validation feedback
8. **Benefit:** Changes visible immediately across all open tabs

### Scenario 2: Changing Password

**BEFORE (Current State):**
1. No password change functionality exists
2. User must remember the hardcoded password (admin)
3. **Problem:** Cannot change password for security
4. **Problem:** Not suitable for production use

**AFTER (With Feature):**
1. User navigates to Settings → Profile tab
2. Scrolls to Password section
3. Enters current password
4. Enters new password with strength meter
5. Confirms new password
6. Clicks Save
7. Backend validates current password
8. New password hashed and stored
9. **Benefit:** Secure password management
10. **Benefit:** Password strength enforcement
11. **Benefit:** Protects against unauthorized changes

### Scenario 3: Managing Notification Preferences

**BEFORE (Current State):**
1. No notification settings exist
2. User receives all notifications or none
3. **Problem:** Cannot customize notification frequency
4. **Problem:** No digest options
5. **Problem:** Overwhelming notifications

**AFTER (With Feature):**
1. User navigates to Settings → Notifications tab
2. Toggles email notifications on/off
3. Enables/disables browser notifications
4. Selects reminder timing (15min, 30min, 1hr, 2hr, custom)
5. Enables daily digest at 7 AM
6. Enables weekly digest on Monday
7. **Benefit:** Personalized notification experience
8. **Benefit:** Control over reminder frequency
9. **Benefit:** Digest options reduce notification overload
10. **Benefit:** Browser notifications with permission management

---

## Importance Rating: 8/10

**Rationale:**
- **High Impact (8/10):** Critical for user account management and security
- **Foundation for Growth:** Enables multi-user support in future
- **Production Readiness:** Required for moving beyond hardcoded auth
- **User Experience:** Significantly improves app usability
- **Competitive Feature:** Standard in all modern applications

**Score Breakdown:**
- Security (Password Management): 9/10
- User Experience: 8/10
- Technical Complexity: 7/10
- Business Value: 8/10
- Development Effort: 7/10 (moderate, well-defined scope)

**Why Not 10/10:**
- Doesn't add new business functionality (extension of existing features)
- Not critical for core Instagram scraping workflow
- Can be postponed if needed (current localStorage works for demo)

**Priority:** Should be implemented before production launch
**Estimated Effort:** 2-3 weeks for full implementation
**Risk Level:** Low (well-defined requirements, standard patterns)
