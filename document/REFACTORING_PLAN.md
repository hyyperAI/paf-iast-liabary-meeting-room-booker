# Refactoring Plan: Remove Student Authentication

## Objective
Transform the system from requiring student login to a direct booking system where students can book rooms without authentication, while keeping admin authentication intact.

## Current State
- Students must login with registration number and password
- Admin must login separately
- Booking requires authenticated student account
- Student details stored in backend user database

## Target State
- Students can book directly without login
- Admin retains login functionality for management
- Student details captured in booking form
- No registration or account creation required for students

## Phase 1: Analysis & Planning
### Files to Remove (Student Auth Only)
- [ ] `src/pages/LoginPage.tsx` - Modify to remove student login, keep admin toggle
- [ ] `src/contexts/AuthContext.tsx` - Refactor to support guest bookings
- [ ] `src/components/ProtectedRoute.tsx` - Update to allow guest access
- [ ] `src/hooks/useAuthErrorHandler.ts` - Update error handling
- [ ] Student login UI components

### Files to Modify
- [ ] `src/App.tsx` - Update routing structure
- [ ] `src/pages/StudentDashboard.tsx` - Remove auth requirements
- [ ] `src/components/BookingModal.tsx` - Add student details form
- [ ] `src/lib/api.ts` - Update booking API calls
- [ ] `src/types/api.ts` - Update types for guest bookings

### Files to Create
- [ ] `src/contexts/GuestContext.tsx` - Store guest student data
- [ ] `src/components/GuestForm.tsx` - Student details collection form
- [ ] Guide files (TXT and JSON)

## Phase 2: Component Changes

### Authentication Context Refactoring
**Current**: AuthContext manages authenticated user state
**Target**: Support both authenticated users (admin) and guest students

**Changes**:
1. Add `userType` property: 'GUEST' | 'STUDENT' | 'ADMIN'
2. Add guest student data storage
3. Modify login/logout logic
4. Update protected route logic

### Routing Structure
**Current Routes**:
```
/login -> LoginPage
/student -> ProtectedRoute + StudentDashboard
/admin -> AdminRoute + AdminDashboard
```

**New Routes**:
```
/book -> StudentDashboard (Guest access)
/admin -> AdminRoute + AdminDashboard (Admin only)
```

### Student Dashboard Changes
**Current**: Requires authentication
**Target**: Available to guests

**Changes**:
1. Check for guest mode
2. Show guest form if no student details
3. Proceed to booking with guest data
4. Show booking history for authenticated students only (if applicable)

### Booking Form Enhancement
**Current**: Uses authenticated user data
**Target**: Collect all student details from form

**Changes**:
1. Add student details form fields:
   - Registration Number
   - Name
   - Phone Number
   - Email
   - Semester
2. Validate all fields
3. Store in GuestContext
4. Use for booking submission

## Phase 3: API Changes

### Booking Submission
**Current**:
```typescript
{
  studentId: user.id, // From auth
  applicantName: user.name,
  applicantPhone: user.phone,
  // ...
}
```

**Target**:
```typescript
{
  // Either use authenticated user OR guest data
  studentId?: string, // Only if authenticated
  registrationNo: string, // From form
  applicantName: string, // From form
  applicantPhone: string, // From form
  applicantEmail: string, // From form
  applicantSemester: string, // From form
  // ...
}
```

### API Client Updates
**Changes**:
1. Remove student auth from API calls
2. Support guest bookings
3. Keep admin authentication
4. Update error handling

## Phase 4: UI/UX Changes

### New Guest Flow
1. User visits /book (or /student)
2. If guest, show student details form
3. After submission, proceed to room booking
4. Booking uses guest data
5. Show confirmation

### Admin Flow (Unchanged)
1. Admin visits /admin
2. Must login
3. Full dashboard access
4. Manage bookings

### Student Dashboard Layout
```
┌─────────────────────────────────────┐
│ Header: "Book Study Room"           │
│ [Guest: John Doe] [Logout/Continue] │
├─────────────────────────────────────┤
│ Student Details Form (if guest)      │
│ ┌─────────────────────────────────┐ │
│ │ Registration Number: [_______]  │ │
│ │ Name: [________________]        │ │
│ │ Phone: [______________]         │ │
│ │ Email: [________________]       │ │
│ │ Semester: [________]             │ │
│ │        [Continue Booking]       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Phase 5: Validation & Security

### Form Validation
- Registration number format
- Phone number format
- Email validation
- Required fields

### Data Sanitization
- XSS prevention
- Input validation
- SQL injection prevention (backend handles)

### Backend Considerations
- Update booking endpoint to accept guest data
- Store student details in booking, not user table
- Link bookings by registration number, not user ID

## Phase 6: Testing Strategy

### Test Scenarios
1. **Guest Booking Flow**
   - Visit /book
   - Fill student details
   - Select room and time
   - Submit booking
   - Verify booking created

2. **Admin Flow (Unchanged)**
   - Login as admin
   - View guest bookings
   - Approve/reject bookings

3. **Error Handling**
   - Invalid form data
   - Network errors
   - Validation errors

### Edge Cases
- Guest starts booking but doesn't complete
- Refresh page during booking
- Navigate away and return
- Duplicate bookings

## Phase 7: Migration & Rollout

### Backwards Compatibility
- Existing authenticated students can still login
- Mixed mode: guest + authenticated
- Admin dashboard shows all bookings

### Data Model Changes
**Booking Document**:
```typescript
{
  // Existing fields
  studentId?: string, // Only for authenticated users
  registrationNo: string, // For all bookings
  applicantName: string,
  applicantPhone: string,
  applicantEmail: string,
  applicantSemester: string,
  // ...
}
```

## Implementation Checklist

### Pre-Implementation
- [x] Create refactoring plan
- [x] Create guide files
- [x] Review all affected files
- [ ] Create backup of current state

### Implementation Steps
1. [ ] Create GuestContext
2. [ ] Create GuestForm component
3. [ ] Refactor AuthContext
4. [ ] Update App.tsx routing
5. [ ] Modify StudentDashboard
6. [ ] Update BookingModal
7. [ ] Update API client
8. [ ] Update types
9. [ ] Test guest booking flow
10. [ ] Test admin flow
11. [ ] Fix bugs
12. [ ] Update documentation

### Post-Implementation
- [ ] Remove unused student auth code
- [ ] Clean up imports
- [ ] Update README
- [ ] Test all flows
- [ ] Performance testing
- [ ] Accessibility testing

## Risks & Mitigation

### Risk 1: Booking Spam
**Issue**: No authentication might lead to spam bookings
**Mitigation**:
- Rate limiting (backend)
- Captcha (future enhancement)
- Registration number validation

### Risk 2: Data Quality
**Issue**: Students might enter invalid details
**Mitigation**:
- Client-side validation
- Server-side validation
- Duplicate registration check

### Risk 3: Admin Visibility
**Issue**: Admin needs to see all bookings
**Mitigation**:
- Booking by registration number
- Filterable by student details
- Search functionality

### Risk 4: User Experience
**Issue**: Form might be too long
**Mitigation**:
- Progressive disclosure
- Auto-fill from previous bookings
- Clear validation messages

## Success Metrics

1. **Guest Booking Rate**: % of bookings from guests
2. **Form Completion**: % of users who complete student details form
3. **Admin Efficiency**: Time to approve/reject bookings
4. **User Satisfaction**: Feedback on new flow
5. **Error Rate**: % of failed bookings

## Timeline Estimate

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1 | 1 day | Planning, guides |
| Phase 2 | 2 days | Component creation |
| Phase 3 | 1 day | API changes |
| Phase 4 | 1 day | UI/UX updates |
| Phase 5 | 1 day | Testing |
| Phase 6 | 1 day | Bug fixes |
| **Total** | **7 days** | Complete refactor |

## Additional Notes

- Keep admin authentication fully functional
- Ensure booking queue management still works
- Maintain accessibility standards
- Follow existing code style and patterns
- Document all changes
- Create comprehensive test cases
