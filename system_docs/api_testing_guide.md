# PAF-IAST Library Management System - API Testing Guide

## Setup Complete ✅

**Database:** Seeded with sample data
- Admin user: `admin` / `admin`
- Student users: `2021-CS-001` / `2021-CS-002` (password: `student123`)
- 48 room slots for next 3 working days
- 1 sample booking in queue

**Server Status:** Ready to start
- Run: `cd backend && npm run dev`
- Port: 3001
- Base URL: `http://localhost:3001`

---

## API Endpoints Testing

### 1. HEALTH CHECK

```bash
curl -X GET http://localhost:3001/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-09T..."
}
```

---

### 2. AUTHENTICATION ENDPOINTS

#### 2.1 Admin Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "registrationNo": "admin",
    "password": "admin"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "registrationNo": "admin",
      "role": "ADMIN"
    }
  }
}
```

**Save the token for subsequent requests:**
```bash
ADMIN_TOKEN="your-token-here"
```

#### 2.2 Student Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "registrationNo": "2021-CS-001",
    "password": "student123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "registrationNo": "2021-CS-001",
      "role": "STUDENT"
    }
  }
}
```

**Save the token:**
```bash
STUDENT_TOKEN="your-token-here"
```

#### 2.3 Student Registration
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "registrationNo": "2021-CS-999",
    "phoneNumber": "+923001111111",
    "email": "newstudent@paf-iast.edu.pk",
    "semester": "4th",
    "password": "password123"
  }'
```

---

### 3. ROOM MANAGEMENT ENDPOINTS

#### 3.1 Get All Rooms
```bash
curl -X GET http://localhost:3001/api/v1/rooms \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "rooms": [
      {
        "id": "...",
        "roomNumber": 1,
        "date": "2026-01-12T00:00:00.000Z",
        "timeSlot": "9:00-10:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "bookings": []
      },
      ...
    ]
  }
}
```

#### 3.2 Get Room by ID
```bash
curl -X GET http://localhost:3001/api/v1/rooms/{room-id} \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 3.3 Get Room Availability
```bash
curl -X GET "http://localhost:3001/api/v1/rooms/1/availability?date=2026-01-12" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

### 4. BOOKING ENDPOINTS

#### 4.1 Get My Bookings (Student)
```bash
curl -X GET http://localhost:3001/api/v1/bookings/my \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

#### 4.2 Get All Bookings (Admin)
```bash
curl -X GET http://localhost:3001/api/v1/bookings \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 4.3 Create Booking (Student)

**First, get a room ID:**
```bash
ROOMS=$(curl -X GET http://localhost:3001/api/v1/rooms \
  -H "Authorization: Bearer $STUDENT_TOKEN")
echo $ROOMS
# Copy a room ID from the response
ROOM_ID="paste-room-id-here"
```

**Create booking with group members:**
```bash
curl -X POST http://localhost:3001/api/v1/bookings \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"roomId\": \"$ROOM_ID\",
    \"applicantName\": \"Alice Smith\",
    \"applicantPhone\": \"+923001234570\",
    \"applicantEmail\": \"alice@paf-iast.edu.pk\",
    \"applicantSemester\": \"6th\",
    \"groupMemberCount\": 3,
    \"members\": [
      {\"name\": \"Bob Brown\", \"registrationNo\": \"2021-CS-005\"},
      {\"name\": \"Carol White\", \"registrationNo\": \"2021-CS-006\"},
      {\"name\": \"David Green\", \"registrationNo\": \"2021-CS-007\"}
    ]
  }"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking": {
      "id": "...",
      "studentId": "...",
      "roomId": "...",
      "applicantName": "Alice Smith",
      "requestStatus": "PENDING",
      "queuePosition": 1,
      "groupMemberCount": 3,
      "createdAt": "2026-01-09T..."
    }
  }
}
```

#### 4.4 Update Booking Status (Student)
```bash
curl -X PUT http://localhost:3001/api/v1/bookings/{booking-id} \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "requestStatus": "CANCELLED"
  }'
```

#### 4.5 Delete/Cancel Booking (Student)
```bash
curl -X DELETE http://localhost:3001/api/v1/bookings/{booking-id} \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

---

### 5. QUEUE ENDPOINTS

#### 5.1 Get Queue Status
```bash
curl -X GET http://localhost:3001/api/v1/queue/{room-id}/{date}/{timeSlot} \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

**Example:**
```bash
curl -X GET http://localhost:3001/api/v1/queue/cmk7dkw9f0003120cwmyey5id/2026-01-12/9:00-10:00 \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "queue": [
      {
        "id": "...",
        "applicantName": "John Doe",
        "queuePosition": 0,
        "requestStatus": "PENDING",
        "student": {
          "registrationNo": "2021-CS-001"
        },
        "members": [...]
      },
      {
        "id": "...",
        "applicantName": "Alice Smith",
        "queuePosition": 1,
        "requestStatus": "PENDING"
      }
    ],
    "queue_count": 2,
    "max_queue": 5
  }
}
```

---

### 6. ADMIN ENDPOINTS

#### 6.1 Approve Booking
```bash
curl -X PUT http://localhost:3001/api/v1/admin/bookings/{booking-id}/approve \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Booking approved successfully"
}
```

**Verify queue auto-movement:**
```bash
# Check the queue again - positions should update
curl -X GET http://localhost:3001/api/v1/queue/{room-id}/{date}/{timeSlot} \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 6.2 Reject Booking
```bash
curl -X PUT http://localhost:3001/api/v1/admin/bookings/{booking-id}/reject \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Booking rejected and queue updated"
}
```

**Verify queue count decreased:**
```bash
curl -X GET http://localhost:3001/api/v1/rooms \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Room status should be ACTIVE if queue is empty
# Room status should be PENDING with updated queueCount
```

---

### 7. STUDENT MANAGEMENT (ADMIN ONLY)

#### 7.1 Get All Students
```bash
curl -X GET http://localhost:3001/api/v1/students \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 7.2 Get Student by ID
```bash
curl -X GET http://localhost:3001/api/v1/students/{student-id} \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 7.3 Get Student Members
```bash
curl -X GET http://localhost:3001/api/v1/students/{student-id}/members \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Business Logic Testing Scenarios

### Scenario 1: FIFO Queue System
1. Create 5 bookings for the same room/time slot
2. Verify queue positions: 0, 1, 2, 3, 4
3. Approve the first booking
4. Verify remaining positions auto-update: 0, 1, 2, 3
5. Reject a middle booking (position 2)
6. Verify queue shifts: 0, 1, 2

**Commands:**
```bash
# Create bookings (repeat 5 times with different students)
# Then approve first
curl -X PUT http://localhost:3001/api/v1/admin/bookings/{first-booking-id}/approve \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Check queue
curl -X GET http://localhost:3001/api/v1/queue/{room-id}/{date}/{timeSlot} \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Scenario 2: Queue Limit Enforcement
1. Create 5 bookings for a slot
2. Try to create 6th booking
3. **Expected:** Error "Queue is full"

**Command:**
```bash
curl -X POST http://localhost:3001/api/v1/bookings \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

**Expected Error Response:**
```json
{
  "success": false,
  "error": {
    "code": 2002,
    "message": "Queue is full"
  }
}
```

### Scenario 3: One Booking Per Day
1. Student creates a booking for today
2. Same student tries to create another booking for today
3. **Expected:** Error "You already have a booking for today"

**Commands:**
```bash
# First booking
curl -X POST http://localhost:3001/api/v1/bookings \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'

# Second booking (should fail)
curl -X POST http://localhost:3001/api/v1/bookings \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Scenario 4: Room Status Updates
1. **ACTIVE** → Room has no bookings
2. **PENDING** → Room has pending bookings in queue
3. **APPROVED** → Room has at least one approved booking

**Check status:**
```bash
curl -X GET http://localhost:3001/api/v1/rooms \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.data.rooms[] | {roomNumber, timeSlot, status, queueCount}'
```

### Scenario 5: Working Days Validation
1. Try to create booking for weekend
2. **Expected:** Error "Booking not allowed on weekends"

**Note:** Implementation depends on date validation in controllers

---

## Error Response Format

All errors follow this format:
```json
{
  "success": false,
  "error": {
    "code": <number>,
    "message": "<string>"
  }
}
```

**Common Error Codes:**
- 1001: Invalid credentials
- 1004: Unauthorized
- 2002: Queue full
- 2003: Already booked today
- 2005: Weekend booking not allowed
- 3001: Invalid input
- 404: Resource not found

---

## Complete Test Flow

### Full Student Journey:
1. Login → Get token
2. View rooms → Select room
3. Check availability → Select time slot
4. Create booking → Join queue
5. View my bookings → See status
6. Cancel booking → Leave queue

### Full Admin Journey:
1. Login → Get admin token
2. View all rooms → See booking status
3. View queue → See pending bookings
4. Approve/Reject → Manage queue
5. View students → Monitor users

---

## Notes

- Replace `{room-id}`, `{booking-id}`, `{student-id}` with actual IDs from API responses
- All timestamps are in ISO 8601 format
- JWT tokens expire after 7 days (configurable)
- Database: SQLite file at `backend/prisma/dev.db`
- View data: `npx prisma studio` (in backend directory)

---

## Testing Checklist

- [ ] Health check
- [ ] Admin login
- [ ] Student login
- [ ] Student registration
- [ ] Get rooms
- [ ] Create booking
- [ ] Get my bookings
- [ ] Get queue status
- [ ] Approve booking (admin)
- [ ] Reject booking (admin)
- [ ] Queue auto-movement
- [ ] Queue limit (max 5)
- [ ] One booking per day rule
- [ ] Cancel booking
- [ ] Room status updates
- [ ] Get all students (admin)
- [ ] Error handling

**Total: 17 test scenarios**
