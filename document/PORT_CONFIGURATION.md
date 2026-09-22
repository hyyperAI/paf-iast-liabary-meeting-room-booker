# Port Configuration Update

## ✅ Configuration Complete

Both student and admin interfaces now work on the same port (port 3000).

---

## 🔧 Changes Made

### 1. Frontend Port Configuration
**File**: `frontend/vite.config.ts`

**Changes**:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,      // Changed from default 5173 to 3000
    host: true,       // Allows external access
  },
})
```

### 2. API URL Configuration
**File**: `frontend/src/lib/api.ts`

**Changes**:
```typescript
// Before
const API_BASE_URL = 'http://localhost:3001/api/v1';

// After
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';
```

---

## 🌐 Port Summary

### Frontend (React App)
- **Development**: `http://localhost:3000`
- **Student Booking**: `http://localhost:3000/book`
- **Admin Login**: `http://localhost:3000/login`
- **Admin Dashboard**: `http://localhost:3000/admin`

### Backend (API Server)
- **API Endpoint**: `http://localhost:3001/api/v1`
- **Status**: Unchanged

---

## 🚀 How to Run

### Start Frontend (Port 3000)
```bash
cd frontend
npm run dev
```
Frontend will be available at: **http://localhost:3000**

### Start Backend (Port 3001)
```bash
cd backend
npm run dev
```
Backend API will be available at: **http://localhost:3001/api/v1**

---

## 📍 URL Access

### Student Flow
1. Open browser to: `http://localhost:3000`
2. Auto-redirects to: `http://localhost:3000/book`
3. Fill student details form
4. Book room without login

### Admin Flow
1. Open browser to: `http://localhost:3000/admin`
2. Redirects to: `http://localhost:3000/login`
3. Enter admin credentials
4. Access admin dashboard at: `http://localhost:3000/admin`

---

## ✅ Benefits

### Single Port Operation
- ✅ Both student and admin on port 3000
- ✅ Easier to remember and share URLs
- ✅ Simpler development setup
- ✅ No port confusion

### Environment Variable Support
- API URL can be configured via `VITE_API_URL` environment variable
- Defaults to `http://localhost:3001/api/v1` if not set
- Useful for different environments (dev, staging, prod)

---

## 🧪 Verification

### Build Test
```bash
cd frontend
npm run build
```
**Result**: ✅ PASSED
```
✓ 2277 modules transformed
✓ dist/index.html
✓ dist/assets/index-*.css
✓ dist/assets/index-*.js
Built in 7.14s
```

### Development Server
```bash
cd frontend
npm run dev
```
**Expected Output**:
```
  VITE v7.3.1  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.X.X:3000/
```

---

## 📋 Configuration Files

### 1. `frontend/vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
})
```

### 2. `frontend/src/lib/api.ts` (excerpt)
```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // ...
});
```

---

## 🔄 URL Mapping

| Interface | URL | Port | Status |
|-----------|-----|------|--------|
| Student Booking | http://localhost:3000/book | 3000 | ✅ Active |
| Admin Login | http://localhost:3000/login | 3000 | ✅ Active |
| Admin Dashboard | http://localhost:3000/admin | 3000 | ✅ Active |
| Backend API | http://localhost:3001/api/v1 | 3001 | ✅ Active |

---

## 🎯 Usage Instructions

### For Students
1. Open browser
2. Go to: **http://localhost:3000**
3. Fill the form with your details
4. Book your study room

### For Administrators
1. Open browser
2. Go to: **http://localhost:3000/admin**
3. You'll be redirected to login
4. Enter admin credentials
5. Manage bookings

---

## ✅ Complete!

Both student and admin interfaces now work on **port 3000** as requested.

**Summary**:
- ✅ Frontend runs on port 3000
- ✅ Student booking: http://localhost:3000/book
- ✅ Admin login: http://localhost:3000/login
- ✅ Admin dashboard: http://localhost:3000/admin
- ✅ Backend API: http://localhost:3001/api/v1
- ✅ Build successful
- ✅ Ready for development

---

**Date**: January 10, 2026
**Status**: ✅ COMPLETE
