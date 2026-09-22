# Step-by-Step Procedure: Uncomment Authentication Tokens

## Overview

The authentication middleware has been **commented out** for easier testing without JWT tokens. This guide shows you how to **uncomment and re-enable** the authentication for production use.

---

## Files Modified

The following route files have been modified to comment out `authenticate` middleware:

1. `/backend/src/routes/rooms.ts`
2. `/backend/src/routes/bookings.ts`
3. `/backend/src/routes/queue.ts`
4. `/backend/src/routes/admin.ts`
5. `/backend/src/routes/students.ts`

---

## Step-by-Step Uncomment Procedure

### Step 1: Navigate to Each Route File

For each of the 5 route files, follow these steps:

---

### File 1: `/backend/src/routes/rooms.ts`

**Current State (Authentication Commented):**
```typescript
// GET /api/v1/rooms
// router.get('/', authenticate, validate(getRoomsSchema), getRooms);
router.get('/', validate(getRoomsSchema), getRooms);

// GET /api/v1/rooms/:id
// router.get('/:id', authenticate, getRoomById);
router.get('/:id', getRoomById);

// GET /api/v1/rooms/:id/availability
// router.get('/:id/availability', authenticate, validate(getRoomAvailabilitySchema), getRoomAvailability);
router.get('/:id/availability', validate(getRoomAvailabilitySchema), getRoomAvailability);
```

**Action Required:**
1. Open file: `/backend/src/routes/rooms.ts`
2. **Uncomment** the lines by:
   - Removing the `//` at the beginning of the commented lines
   - **Remove** the uncommented lines below each commented line

**Expected Result:**
```typescript
// GET /api/v1/rooms
router.get('/', authenticate, validate(getRoomsSchema), getRooms);

// GET /api/v1/rooms/:id
router.get('/:id', authenticate, getRoomById);

// GET /api/v1/rooms/:id/availability
router.get('/:id/availability', authenticate, validate(getRoomAvailabilitySchema), getRoomAvailability);
```

---

### File 2: `/backend/src/routes/bookings.ts`

**Current State:**
```typescript
// GET /api/v1/bookings/my
// router.get('/my', authenticate, getMyBookings);
router.get('/my', getMyBookings);

// GET /api/v1/bookings (Admin only)
// router.get('/', authenticate, authorize('ADMIN'), validate(getBookingsSchema), getBookings);
router.get('/', authorize('ADMIN'), validate(getBookingsSchema), getBookings);

// POST /api/v1/bookings
// router.post('/', authenticate, validate(createBookingSchema), createBooking);
router.post('/', validate(createBookingSchema), createBooking);

// PUT /api/v1/bookings/:id
// router.put('/:id', authenticate, validate(updateBookingSchema), updateBooking);
router.put('/:id', validate(updateBookingSchema), updateBooking);

// DELETE /api/v1/bookings/:id
// router.delete('/:id', authenticate, validate(deleteBookingSchema), deleteBooking);
router.delete('/:id', validate(deleteBookingSchema), deleteBooking);
```

**Action Required:**
1. Open file: `/backend/src/routes/bookings.ts`
2. **Uncomment** all lines by removing `//` and removing duplicate uncommented lines

**Expected Result:**
```typescript
// GET /api/v1/bookings/my
router.get('/my', authenticate, getMyBookings);

// GET /api/v1/bookings (Admin only)
router.get('/', authenticate, authorize('ADMIN'), validate(getBookingsSchema), getBookings);

// POST /api/v1/bookings
router.post('/', authenticate, validate(createBookingSchema), createBooking);

// PUT /api/v1/bookings/:id
router.put('/:id', authenticate, validate(updateBookingSchema), updateBooking);

// DELETE /api/v1/bookings/:id
router.delete('/:id', authenticate, validate(deleteBookingSchema), deleteBooking);
```

---

### File 3: `/backend/src/routes/queue.ts`

**Current State:**
```typescript
// GET /api/v1/queue/:roomId/:date/:timeSlot
// router.get('/:roomId/:date/:timeSlot', authenticate, getQueueStatus);
router.get('/:roomId/:date/:timeSlot', getQueueStatus);
```

**Action Required:**
1. Open file: `/backend/src/routes/queue.ts`
2. **Uncomment** the route

**Expected Result:**
```typescript
// GET /api/v1/queue/:roomId/:date/:timeSlot
router.get('/:roomId/:date/:timeSlot', authenticate, getQueueStatus);
```

---

### File 4: `/backend/src/routes/admin.ts`

**Current State:**
```typescript
// PUT /api/v1/admin/bookings/:id/approve (Admin only)
// router.put('/bookings/:id/approve', authenticate, authorize('ADMIN'), approveBooking);
router.put('/bookings/:id/approve', authorize('ADMIN'), approveBooking);

// PUT /api/v1/admin/bookings/:id/reject (Admin only)
// router.put('/bookings/:id/reject', authenticate, authorize('ADMIN'), rejectBooking);
router.put('/bookings/:id/reject', authorize('ADMIN'), rejectBooking);
```

**Action Required:**
1. Open file: `/backend/src/routes/admin.ts`
2. **Uncomment** both routes

**Expected Result:**
```typescript
// PUT /api/v1/admin/bookings/:id/approve (Admin only)
router.put('/bookings/:id/approve', authenticate, authorize('ADMIN'), approveBooking);

// PUT /api/v1/admin/bookings/:id/reject (Admin only)
router.put('/bookings/:id/reject', authenticate, authorize('ADMIN'), rejectBooking);
```

---

### File 5: `/backend/src/routes/students.ts`

**Current State:**
```typescript
// GET /api/v1/students (Admin only)
// router.get('/', authenticate, authorize('ADMIN'), validate(getStudentsSchema), getStudents);
router.get('/', authorize('ADMIN'), validate(getStudentsSchema), getStudents);

// GET /api/v1/students/:id (Admin only)
// router.get('/:id', authenticate, authorize('ADMIN'), validate(getStudentSchema), getStudentById);
router.get('/:id', authorize('ADMIN'), validate(getStudentSchema), getStudentById);

// GET /api/v1/students/:id/members (Admin only)
// router.get('/:id/members', authenticate, authorize('ADMIN'), validate(getStudentMembersSchema), getStudentMembers);
router.get('/:id/members', authorize('ADMIN'), validate(getStudentMembersSchema), getStudentMembers);
```

**Action Required:**
1. Open file: `/backend/src/routes/students.ts`
2. **Uncomment** all three routes

**Expected Result:**
```typescript
// GET /api/v1/students (Admin only)
router.get('/', authenticate, authorize('ADMIN'), validate(getStudentsSchema), getStudents);

// GET /api/v1/students/:id (Admin only)
router.get('/:id', authenticate, authorize('ADMIN'), validate(getStudentSchema), getStudentById);

// GET /api/v1/students/:id/members (Admin only)
router.get('/:id/members', authenticate, authorize('ADMIN'), validate(getStudentMembersSchema), getStudentMembers);
```

---

## Quick Commands for Automated Uncommenting

If you prefer command-line tools, you can use `sed` to uncomment all files at once:

### Linux/macOS Commands:

```bash
# Navigate to backend directory
cd /path/to/backend

# Uncomment rooms.ts
sed -i 's|^// router.get.*|router.get|' src/routes/rooms.ts

# Uncomment bookings.ts
sed -i 's|^// router.*|router|' src/routes/bookings.ts

# Uncomment queue.ts
sed -i 's|^// router.*|router|' src/routes/queue.ts

# Uncomment admin.ts
sed -i 's|^// router.*|router|' src/routes/admin.ts

# Uncomment students.ts
sed -i 's|^// router.*|router|' src/routes/students.ts
```

### Windows PowerShell Commands:

```powershell
# Navigate to backend directory
Set-Location "C:\path\to\backend"

# Function to uncomment routes
function Uncomment-Routes {
    param([string]$file)
    (Get-Content $file) | ForEach-Object {
        $_ -replace '^\s*//\s*router', 'router'
    } | Set-Content $file
}

# Apply to all route files
Uncomment-Routes "src\routes\rooms.ts"
Uncomment-Routes "src\routes\bookings.ts"
Uncomment-Routes "src\routes\queue.ts"
Uncomment-Routes "src\routes\admin.ts"
Uncomment-Routes "src\routes\students.ts"
```

---

## Verification Steps

After uncommenting, verify the changes:

### Step 1: Check Route Files

Run this command to verify authentication is uncommented:

```bash
# Linux/macOS
grep -n "authenticate" src/routes/*.ts

# Windows (PowerShell)
Select-String -Path "src\routes\*.ts" -Pattern "authenticate"
```

**Expected Output:** Should show all routes with `authenticate` middleware

### Step 2: Restart Server

```bash
cd backend
npm run dev
```

### Step 3: Test Authentication

Test that authentication is working:

```bash
# This should now return 401 Unauthorized
curl -X GET http://localhost:3001/api/v1/rooms

# This should work with valid token
curl -X GET http://localhost:3001/api/v1/rooms \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Summary of Changes

### Before (Commented):
- Routes work **without** JWT tokens
- No authentication required
- Easier for testing

### After (Uncommented):
- Routes require **valid JWT token**
- All endpoints protected
- Production-ready security

---

## Quick Reference Table

| File | Action |
|------|--------|
| `rooms.ts` | Uncomment 3 routes |
| `bookings.ts` | Uncomment 5 routes |
| `queue.ts` | Uncomment 1 route |
| `admin.ts` | Uncomment 2 routes |
| `students.ts` | Uncomment 3 routes |

**Total:** 14 routes to uncomment across 5 files

---

## Important Notes

1. **Pattern Matching:** Each file has a specific pattern - follow the examples above
2. **Remove Duplicates:** Always remove the duplicate uncommented line after uncommenting
3. **Save Changes:** Save all files after modifications
4. **Restart Server:** Must restart the server after changes
5. **Test:** Always test after uncommenting to verify authentication works

---

## Testing Checklist

After uncommenting, verify:

- [ ] All 5 route files modified correctly
- [ ] Server restarted
- [ ] Routes without token return 401 Unauthorized
- [ ] Routes with valid token work correctly
- [ ] Admin routes still require ADMIN role
- [ ] Student routes require valid student token

---

## Troubleshooting

### Issue: Server crashes after uncommenting
**Solution:** Check for syntax errors in route files

### Issue: Routes still work without token
**Solution:** Verify all `authenticate` middleware is uncommented

### Issue: Admin routes not working
**Solution:** Check that `authorize('ADMIN')` is present

---

## Done! ✅

After completing all steps, your API will require authentication tokens for all protected endpoints.
