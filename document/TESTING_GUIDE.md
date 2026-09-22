# 🧪 Testing Guide - Bypass Authentication

## Overview

This guide explains how to test the PAF-IAST Library Management System **without** going through the login/registration process.

---

## 🚀 Quick Start (3 Methods)

### Method 1: Test Bypass Page (Recommended)

**Navigate to:** `http://localhost:5176/test-bypass`

This page provides two quick login buttons:

1. **Login as Student** → Takes you to `/student` dashboard
2. **Login as Admin** → Takes you to `/admin` dashboard

**Benefits:**
- ✅ No credentials needed
- ✅ Instant access to both dashboards
- ✅ Easy switching between student/admin
- ✅ Mock user data included

---

### Method 2: Direct URL Access

You can directly navigate to:
- `http://localhost:5176/student` (Student Dashboard)
- `http://localhost:5176/admin` (Admin Dashboard)

**Note:** ProtectedRoute will redirect you to `/login` if no authentication is found.

**Solution:** Use Method 1 first, then navigate directly.

---

### Method 3: Browser Console (Advanced)

Open browser console (F12) and run:

```javascript
// Login as Student
localStorage.setItem('token', 'test-token');
localStorage.setItem('user', JSON.stringify({
  id: '1',
  registrationNo: '2021-CS-TEST',
  name: 'Test Student',
  email: 'test@paf-iast.edu.pk',
  phoneNumber: '+923001234567',
  semester: '8th',
  role: 'STUDENT'
}));

// Then navigate to /student
window.location.href = '/student';
```

---

## 📋 Testing Flow

### Student Testing Flow

1. Go to `http://localhost:5176/test-bypass`
2. Click **"Login as Student"**
3. You're now at `/student` dashboard
4. Test:
   - ✅ Calendar navigation
   - ✅ Room selection
   - ✅ Time slot grid
   - ✅ Booking modal
   - ✅ Member selection (1-5 members)
   - ✅ Form validation

### Admin Testing Flow

1. Go to `http://localhost:5176/test-bypass`
2. Click **"Login as Admin"**
3. You're now at `/admin` dashboard
4. Test:
   - ✅ Room tabs
   - ✅ Queue management
   - ✅ Approve/Reject bookings
   - ✅ Status updates
   - ✅ Real-time data

---

## 🔧 Test Scenarios

### Student Dashboard Tests

#### Calendar Tests
- [ ] Navigate between months
- [ ] Select working days (Mon-Fri)
- [ ] Verify weekends are disabled
- [ ] Click on available dates

#### Room & Time Slot Tests
- [ ] Select Room 1, Room 2, Room 3
- [ ] View time slots: 8-10, 10-12, 12-2, 2-4, 4-6, 6-8
- [ ] Check slot statuses:
  - GREEN = Available
  - YELLOW = Pending
  - BLUE = Approved
  - GRAY = Full/Expired
- [ ] View queue count

#### Booking Tests
- [ ] Click available slot
- [ ] Booking modal opens
- [ ] Adjust member count (1-5)
- [ ] Enter member registration numbers
- [ ] Submit booking
- [ ] Verify success/error messages

### Admin Dashboard Tests

#### Queue Management Tests
- [ ] View all room queues
- [ ] See pending bookings
- [ ] Click approve button
- [ ] Click reject button
- [ ] Verify status changes
- [ ] Check queue updates

#### Room Management Tests
- [ ] Switch between Room 1, 2, 3
- [ ] View different queue data
- [ ] Check real-time updates

---

## 🧹 Clearing Authentication

### Method 1: Test Bypass Page
Click **"Clear Authentication"** button on `/test-bypass`

### Method 2: Browser Console
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
window.location.href = '/login';
```

### Method 3: Manual
Open DevTools → Application/Storage → Local Storage → Delete entries

---

## 📱 Testing on Different Devices

### Mobile Testing
1. Open browser devtools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Test responsive layouts

### Different Screen Sizes
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)

---

## 🔍 Console Logging

The app includes console logs for debugging:

```javascript
// Check authentication state
console.log('User:', localStorage.getItem('user'));
console.log('Token:', localStorage.getItem('token'));

// Check current user from context
// (Add in components: console.log(useAuth()))
```

---

## 🎭 Mock Data

### Student User
```javascript
{
  id: '1',
  registrationNo: '2021-CS-TEST',
  name: 'Test Student',
  email: 'test@paf-iast.edu.pk',
  phoneNumber: '+923001234567',
  semester: '8th',
  role: 'STUDENT'
}
```

### Admin User
```javascript
{
  id: '2',
  registrationNo: 'ADMIN-TEST',
  name: 'Test Admin',
  email: 'admin@paf-iast.edu.pk',
  phoneNumber: '+923007654321',
  semester: '',
  role: 'ADMIN'
}
```

---

## 🚨 Troubleshooting

### Issue: Still redirected to login
**Solution:** Use `/test-bypass` first to set authentication

### Issue: Token expired errors
**Solution:** Mock tokens don't expire, but if you see issues, clear auth and re-login via `/test-bypass`

### Issue: Changes not reflecting
**Solution:** Hard refresh (Ctrl+Shift+R) to reload the app

### Issue: API errors in console
**Solution:** Backend may not be running. Check backend server status.

---

## 📊 Testing Checklist

### Basic Functionality
- [ ] Can access `/test-bypass` page
- [ ] Student login works
- [ ] Admin login works
- [ ] Can navigate to `/student`
- [ ] Can navigate to `/admin`
- [ ] Can clear authentication

### Student Features
- [ ] Calendar displays correctly
- [ ] Room selection works
- [ ] Time slots show proper colors
- [ ] Booking modal opens
- [ ] Member count adjustment works
- [ ] Form submission works

### Admin Features
- [ ] Admin route protection works
- [ ] Room tabs switch correctly
- [ ] Queue displays properly
- [ ] Approve/Reject buttons work
- [ ] Status updates correctly

---

## 🔄 Development Workflow

### Typical Testing Session

1. **Start development:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open in browser:**
   ```
   http://localhost:5176/test-bypass
   ```

3. **Choose user type:**
   - Student: Test booking flow
   - Admin: Test queue management

4. **Test features:**
   - Navigate between pages
   - Test forms and interactions
   - Check responsive design

5. **Clear auth when done:**
   - Use "Clear Authentication" button
   - Or clear browser storage

6. **Make code changes:**
   - Edit files
   - Browser auto-reloads
   - Test again via `/test-bypass`

---

## 💡 Tips & Tricks

### Quick Switch Between Users
1. Login as Student
2. Open new tab
3. Go to `/test-bypass`
4. Login as Admin
5. Switch between tabs to compare

### Testing Without Backend
- Frontend will load with mock data
- API calls will fail (expected)
- UI components will render
- Form submissions will error (normal)

### Persistent Testing
Mock authentication persists across page refreshes until:
- You click "Clear Authentication"
- You manually delete localStorage
- Browser storage is cleared

---

## 🎯 Next Steps After Testing

Once testing is complete:

1. **Enable Real Authentication:**
   - Uncomment student registration (see `STUDENT_REGISTRATION_PLAN.md`)
   - Start backend server
   - Test with real API

2. **Production Deployment:**
   - Remove `/test-bypass` route
   - Remove test bypass page
   - Enable real authentication only

---

## 📞 Support

### Files Modified for Testing
- ✅ `frontend/src/pages/TestBypassPage.tsx` (NEW)
- ✅ `frontend/src/App.tsx` (Added route)

### No Permanent Changes
The test bypass is completely removable:
1. Delete `TestBypassPage.tsx`
2. Remove import and route from `App.tsx`
3. Clean and simple

---

## 🎓 Learning Resources

### Understanding the Flow
```
User → /test-bypass → Mock Login → /student or /admin
                    ↓
              localStorage set
```

### Authentication Context
- Mock data stored in `localStorage`
- AuthContext reads from localStorage
- ProtectedRoute checks AuthContext
- Navigation happens normally

---

**Happy Testing! 🚀**

---

**Last Updated:** 2026-01-10
**Version:** 1.0
