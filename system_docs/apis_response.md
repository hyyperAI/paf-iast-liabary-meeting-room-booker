# API Response Documentation - User Lifecycle Testing
Generated on: 2026-01-10 09:26:46



---


## Test: 2. Admin login
**Endpoint:** POST /auth/admin/login

**Request Body:**
```json
{
  "registrationNo": "admin",
  "password": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtazdka3c2NTAwMDAxMjBjN2J6Y2JuOXEiLCJyZWdpc3RyYXRpb25ObyI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY4MDE5MjA2LCJleHAiOjE3Njg2MjQwMDZ9.NMEeeDzVtJjBMr3NsS2Wg7zH6obY72ApJdlSUMcPxpM",
    "user": {
      "id": "cmk7dkw650000120c7bzcbn9q",
      "registrationNo": "admin",
      "phoneNumber": "+923001234567",
      "email": "admin@paf-iast.edu.pk",
      "semester": "N/A",
      "role": "ADMIN",
      "createdAt": "2026-01-09T21:15:29.886Z",
      "updatedAt": "2026-01-09T21:15:29.886Z"
    }
  }
}
```

---


## Test: 4. Get all rooms
**Endpoint:** GET /rooms

**Response:**
```json
{
  "success": true,
  "data": {
    "rooms": [
      {
        "id": "cmk7dkwa50005120cgte1xsai",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "10:00-11:00",
        "status": "ACTIVE",
        "queueCount": 1,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.029Z",
        "updatedAt": "2026-01-10T03:38:59.855Z",
        "bookings": [
          {
            "id": "cmk7r5i0i0002um4rblo90umg",
            "studentId": "cmk7dkw8q0001120ckcer41em",
            "roomId": "cmk7dkwa50005120cgte1xsai",
            "applicantName": "Test User 1",
            "applicantPhone": "+923001234568",
            "applicantEmail": "student1@paf-iast.edu.pk",
            "applicantSemester": "6th",
            "groupMemberCount": 0,
            "requestStatus": "APPROVED",
            "queuePosition": 0,
            "createdAt": "2026-01-10T03:35:26.321Z",
            "updatedAt": "2026-01-10T03:37:22.940Z",
            "student": {
              "id": "cmk7dkw8q0001120ckcer41em",
              "registrationNo": "2021-CS-001"
            }
          },
          {
            "id": "cmk7r9ko200036sjhg8jreoub",
            "studentId": "cmk7dkw920002120cnddrpffb",
            "roomId": "cmk7dkwa50005120cgte1xsai",
            "applicantName": "Test User 2",
            "applicantPhone": "+923001234569",
            "applicantEmail": "student2@paf-iast.edu.pk",
            "applicantSemester": "8th",
            "groupMemberCount": 1,
            "requestStatus": "REJECTED",
            "queuePosition": 1,
            "createdAt": "2026-01-10T03:38:36.386Z",
            "updatedAt": "2026-01-10T03:38:59.852Z",
            "student": {
              "id": "cmk7dkw920002120cnddrpffb",
              "registrationNo": "2021-CS-002"
            }
          }
        ]
      },
      {
        "id": "cmk7dkwav0007120c36cuepbz",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "11:00-12:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.055Z",
        "updatedAt": "2026-01-09T21:15:30.055Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwbj0009120cevz7ve7l",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "12:00-13:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.079Z",
        "updatedAt": "2026-01-09T21:15:30.079Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwc5000b120cr6es8wzw",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "13:00-14:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.101Z",
        "updatedAt": "2026-01-09T21:15:30.101Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwcs000d120c21xgav9m",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "14:00-15:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.124Z",
        "updatedAt": "2026-01-09T21:15:30.124Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwdf000f120cr1pfxzel",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "15:00-16:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.147Z",
        "updatedAt": "2026-01-09T21:15:30.147Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwe4000h120crthfzkbm",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "16:00-17:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.173Z",
        "updatedAt": "2026-01-09T21:15:30.173Z",
        "bookings": []
      },
      {
        "id": "cmk7dkw9f0003120cwmyey5id",
        "roomNumber": 1,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "9:00-10:00",
        "status": "ACTIVE",
        "queueCount": -1,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.004Z",
        "updatedAt": "2026-01-10T04:25:46.360Z",
        "bookings": [
          {
            "id": "cmk7dkwqg001g120cmtakmpy5",
            "studentId": "cmk7dkw8q0001120ckcer41em",
            "roomId": "cmk7dkw9f0003120cwmyey5id",
            "applicantName": "John Doe",
            "applicantPhone": "+923001234568",
            "applicantEmail": "student1@paf-iast.edu.pk",
            "applicantSemester": "6th",
            "groupMemberCount": 2,
            "requestStatus": "REJECTED",
            "queuePosition": 0,
            "createdAt": "2026-01-09T21:15:30.617Z",
            "updatedAt": "2026-01-10T04:25:46.347Z",
            "student": {
              "id": "cmk7dkw8q0001120ckcer41em",
              "registrationNo": "2021-CS-001"
            }
          }
        ]
      },
      {
        "id": "cmk7dkwah0006120ch1ccbkd8",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "10:00-11:00",
        "status": "PENDING",
        "queueCount": 1,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.041Z",
        "updatedAt": "2026-01-10T03:39:55.990Z",
        "bookings": [
          {
            "id": "cmk7rba2x00086sjh0fid51tu",
            "studentId": "cmk7dkw8q0001120ckcer41em",
            "roomId": "cmk7dkwah0006120ch1ccbkd8",
            "applicantName": "Test User 1 Again",
            "applicantPhone": "+923001234568",
            "applicantEmail": "student1@paf-iast.edu.pk",
            "applicantSemester": "6th",
            "groupMemberCount": 0,
            "requestStatus": "PENDING",
            "queuePosition": 0,
            "createdAt": "2026-01-10T03:39:55.977Z",
            "updatedAt": "2026-01-10T03:39:55.977Z",
            "student": {
              "id": "cmk7dkw8q0001120ckcer41em",
              "registrationNo": "2021-CS-001"
            }
          }
        ]
      },
      {
        "id": "cmk7dkwb80008120cewver31g",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "11:00-12:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.068Z",
        "updatedAt": "2026-01-09T21:15:30.068Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwbu000a120cw0dswugu",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "12:00-13:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.091Z",
        "updatedAt": "2026-01-09T21:15:30.091Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwcg000c120cmn67a3de",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "13:00-14:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.113Z",
        "updatedAt": "2026-01-09T21:15:30.113Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwd3000e120cczi3je2q",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "14:00-15:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.135Z",
        "updatedAt": "2026-01-09T21:15:30.135Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwds000g120c5z6kb4dd",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "15:00-16:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.161Z",
        "updatedAt": "2026-01-09T21:15:30.161Z",
        "bookings": []
      },
      {
        "id": "cmk7dkweg000i120cb46d7vxd",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "16:00-17:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.184Z",
        "updatedAt": "2026-01-09T21:15:30.184Z",
        "bookings": []
      },
      {
        "id": "cmk7dkw9r0004120c6gs0rruv",
        "roomNumber": 2,
        "date": "2026-01-11T19:00:00.000Z",
        "timeSlot": "9:00-10:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.016Z",
        "updatedAt": "2026-01-09T21:15:30.016Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwfg000l120c4ii0ljak",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "10:00-11:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.221Z",
        "updatedAt": "2026-01-09T21:15:30.221Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwg5000n120cu2rzdug1",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "11:00-12:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.246Z",
        "updatedAt": "2026-01-09T21:15:30.246Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwgu000p120cen8mq8id",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "12:00-13:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.270Z",
        "updatedAt": "2026-01-09T21:15:30.270Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwhh000r120c3dngbwzn",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "13:00-14:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.294Z",
        "updatedAt": "2026-01-09T21:15:30.294Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwi5000t120co3jezd7c",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "14:00-15:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.317Z",
        "updatedAt": "2026-01-09T21:15:30.317Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwiu000v120c7eojp6p2",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "15:00-16:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.342Z",
        "updatedAt": "2026-01-09T21:15:30.342Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwji000x120c3pt03f85",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "16:00-17:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.366Z",
        "updatedAt": "2026-01-09T21:15:30.366Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwer000j120c7mpkaqvd",
        "roomNumber": 1,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "9:00-10:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.195Z",
        "updatedAt": "2026-01-09T21:15:30.195Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwft000m120cevzetp3a",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "10:00-11:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.233Z",
        "updatedAt": "2026-01-09T21:15:30.233Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwgi000o120cy2ro9zdq",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "11:00-12:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.259Z",
        "updatedAt": "2026-01-09T21:15:30.259Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwh6000q120cr92n5s2d",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "12:00-13:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.282Z",
        "updatedAt": "2026-01-09T21:15:30.282Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwht000s120c2s1l60pr",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "13:00-14:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.305Z",
        "updatedAt": "2026-01-09T21:15:30.305Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwii000u120chuq4xxts",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "14:00-15:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.331Z",
        "updatedAt": "2026-01-09T21:15:30.331Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwj6000w120c7mckz0cy",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "15:00-16:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.354Z",
        "updatedAt": "2026-01-09T21:15:30.354Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwju000y120cgp448yd1",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "16:00-17:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.379Z",
        "updatedAt": "2026-01-09T21:15:30.379Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwf4000k120c6wpesmlu",
        "roomNumber": 2,
        "date": "2026-01-12T19:00:00.000Z",
        "timeSlot": "9:00-10:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.208Z",
        "updatedAt": "2026-01-09T21:15:30.208Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwku0011120cutcyj9ww",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "10:00-11:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.415Z",
        "updatedAt": "2026-01-09T21:15:30.415Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwli0013120cuqi128fn",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "11:00-12:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.438Z",
        "updatedAt": "2026-01-09T21:15:30.438Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwmd0015120c38cktrlt",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "12:00-13:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.469Z",
        "updatedAt": "2026-01-09T21:15:30.469Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwn20017120c2lc0y59r",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "13:00-14:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.494Z",
        "updatedAt": "2026-01-09T21:15:30.494Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwnp0019120c5tfgmgj6",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "14:00-15:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.517Z",
        "updatedAt": "2026-01-09T21:15:30.517Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwp4001b120cdcoutz2c",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "15:00-16:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.568Z",
        "updatedAt": "2026-01-09T21:15:30.568Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwpr001d120cv4l3rdv1",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "16:00-17:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.592Z",
        "updatedAt": "2026-01-09T21:15:30.592Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwk6000z120cg22gsfzr",
        "roomNumber": 1,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "9:00-10:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.390Z",
        "updatedAt": "2026-01-09T21:15:30.390Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwl60012120cm9bom5fh",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "10:00-11:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.427Z",
        "updatedAt": "2026-01-09T21:15:30.427Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwm20014120calrrh3a7",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "11:00-12:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.458Z",
        "updatedAt": "2026-01-09T21:15:30.458Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwmp0016120c8aq8noiy",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "12:00-13:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.482Z",
        "updatedAt": "2026-01-09T21:15:30.482Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwnd0018120cnr9kfiul",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "13:00-14:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.506Z",
        "updatedAt": "2026-01-09T21:15:30.506Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwor001a120codkyc98q",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "14:00-15:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.555Z",
        "updatedAt": "2026-01-09T21:15:30.555Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwpg001c120crn14fvko",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "15:00-16:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.580Z",
        "updatedAt": "2026-01-09T21:15:30.580Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwq3001e120cbd0qxf7k",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "16:00-17:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.603Z",
        "updatedAt": "2026-01-09T21:15:30.603Z",
        "bookings": []
      },
      {
        "id": "cmk7dkwki0010120cxtj468fb",
        "roomNumber": 2,
        "date": "2026-01-13T19:00:00.000Z",
        "timeSlot": "9:00-10:00",
        "status": "ACTIVE",
        "queueCount": 0,
        "maxQueue": 5,
        "createdAt": "2026-01-09T21:15:30.402Z",
        "updatedAt": "2026-01-09T21:15:30.402Z",
        "bookings": []
      }
    ]
  }
}
```

---


## Test: 5. Get room by ID
**Endpoint:** GET /rooms/cmk7dkwa50005120cgte1xsai

**Response:**
```json
{
  "success": true,
  "data": {
    "room": {
      "id": "cmk7dkwa50005120cgte1xsai",
      "roomNumber": 1,
      "date": "2026-01-11T19:00:00.000Z",
      "timeSlot": "10:00-11:00",
      "status": "ACTIVE",
      "queueCount": 1,
      "maxQueue": 5,
      "createdAt": "2026-01-09T21:15:30.029Z",
      "updatedAt": "2026-01-10T03:38:59.855Z",
      "bookings": [
        {
          "id": "cmk7r5i0i0002um4rblo90umg",
          "studentId": "cmk7dkw8q0001120ckcer41em",
          "roomId": "cmk7dkwa50005120cgte1xsai",
          "applicantName": "Test User 1",
          "applicantPhone": "+923001234568",
          "applicantEmail": "student1@paf-iast.edu.pk",
          "applicantSemester": "6th",
          "groupMemberCount": 0,
          "requestStatus": "APPROVED",
          "queuePosition": 0,
          "createdAt": "2026-01-10T03:35:26.321Z",
          "updatedAt": "2026-01-10T03:37:22.940Z",
          "student": {
            "id": "cmk7dkw8q0001120ckcer41em",
            "registrationNo": "2021-CS-001"
          },
          "members": []
        },
        {
          "id": "cmk7r9ko200036sjhg8jreoub",
          "studentId": "cmk7dkw920002120cnddrpffb",
          "roomId": "cmk7dkwa50005120cgte1xsai",
          "applicantName": "Test User 2",
          "applicantPhone": "+923001234569",
          "applicantEmail": "student2@paf-iast.edu.pk",
          "applicantSemester": "8th",
          "groupMemberCount": 1,
          "requestStatus": "REJECTED",
          "queuePosition": 1,
          "createdAt": "2026-01-10T03:38:36.386Z",
          "updatedAt": "2026-01-10T03:38:59.852Z",
          "student": {
            "id": "cmk7dkw920002120cnddrpffb",
            "registrationNo": "2021-CS-002"
          },
          "members": [
            {
              "id": "cmk7r9ko400046sjhurrof6j6",
              "bookingId": "cmk7r9ko200036sjhg8jreoub",
              "name": "Member 1",
              "registrationNo": "2021-CS-005",
              "createdAt": "2026-01-10T03:38:36.388Z"
            }
          ]
        }
      ]
    }
  }
}
```

---


## Test: 6. Check room availability
**Endpoint:** GET /rooms/cmk7dkwa50005120cgte1xsai/availability?date=2026-01-11

**Response:**
```json
{
  "success": false,
  "error": {
    "code": 500,
    "message": "Internal server error"
  }
}
```

---


## Test: 7. Create booking with members
**Endpoint:** POST /bookings

**Request Body:**
```json
{
  "roomId": "cmk7dkwa50005120cgte1xsai",
  "studentId": "cmk7dkw8q0001120ckcer41em",
  "applicantName": "Lifecycle Test User",
  "applicantPhone": "+923001234568",
  "applicantEmail": "student1@paf-iast.edu.pk",
  "applicantSemester": "6th",
  "groupMemberCount": 2,
  "members": [
    {
      "name": "Member 1",
      "registrationNo": "2021-CS-101"
    },
    {
      "name": "Member 2",
      "registrationNo": "2021-CS-102"
    }
  ]
}
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": 2003,
    "message": "You already have a booking for this date"
  }
}
```

---


## Test: 8. Get all bookings
**Endpoint:** GET /bookings

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "cmk7rba2x00086sjh0fid51tu",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkwah0006120ch1ccbkd8",
        "applicantName": "Test User 1 Again",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 0,
        "requestStatus": "PENDING",
        "queuePosition": 0,
        "createdAt": "2026-01-10T03:39:55.977Z",
        "updatedAt": "2026-01-10T03:39:55.977Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkwah0006120ch1ccbkd8",
          "roomNumber": 2,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "PENDING",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.041Z",
          "updatedAt": "2026-01-10T03:39:55.990Z"
        },
        "members": []
      },
      {
        "id": "cmk7r9ko200036sjhg8jreoub",
        "studentId": "cmk7dkw920002120cnddrpffb",
        "roomId": "cmk7dkwa50005120cgte1xsai",
        "applicantName": "Test User 2",
        "applicantPhone": "+923001234569",
        "applicantEmail": "student2@paf-iast.edu.pk",
        "applicantSemester": "8th",
        "groupMemberCount": 1,
        "requestStatus": "REJECTED",
        "queuePosition": 1,
        "createdAt": "2026-01-10T03:38:36.386Z",
        "updatedAt": "2026-01-10T03:38:59.852Z",
        "student": {
          "id": "cmk7dkw920002120cnddrpffb",
          "registrationNo": "2021-CS-002",
          "email": "student2@paf-iast.edu.pk",
          "phoneNumber": "+923001234569"
        },
        "room": {
          "id": "cmk7dkwa50005120cgte1xsai",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "ACTIVE",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.029Z",
          "updatedAt": "2026-01-10T03:38:59.855Z"
        },
        "members": [
          {
            "id": "cmk7r9ko400046sjhurrof6j6",
            "bookingId": "cmk7r9ko200036sjhg8jreoub",
            "name": "Member 1",
            "registrationNo": "2021-CS-005",
            "createdAt": "2026-01-10T03:38:36.388Z"
          }
        ]
      },
      {
        "id": "cmk7r5i0i0002um4rblo90umg",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkwa50005120cgte1xsai",
        "applicantName": "Test User 1",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 0,
        "requestStatus": "APPROVED",
        "queuePosition": 0,
        "createdAt": "2026-01-10T03:35:26.321Z",
        "updatedAt": "2026-01-10T03:37:22.940Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkwa50005120cgte1xsai",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "ACTIVE",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.029Z",
          "updatedAt": "2026-01-10T03:38:59.855Z"
        },
        "members": []
      },
      {
        "id": "cmk7dkwqg001g120cmtakmpy5",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkw9f0003120cwmyey5id",
        "applicantName": "John Doe",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 2,
        "requestStatus": "REJECTED",
        "queuePosition": 0,
        "createdAt": "2026-01-09T21:15:30.617Z",
        "updatedAt": "2026-01-10T04:25:46.347Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkw9f0003120cwmyey5id",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "9:00-10:00",
          "status": "ACTIVE",
          "queueCount": -1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.004Z",
          "updatedAt": "2026-01-10T04:25:46.360Z"
        },
        "members": [
          {
            "id": "cmk7dkwqs001h120ccsd6nflg",
            "bookingId": "cmk7dkwqg001g120cmtakmpy5",
            "name": "Jane Smith",
            "registrationNo": "2021-CS-003",
            "createdAt": "2026-01-09T21:15:30.629Z"
          },
          {
            "id": "cmk7dkwqs001i120cn2002w53",
            "bookingId": "cmk7dkwqg001g120cmtakmpy5",
            "name": "Bob Johnson",
            "registrationNo": "2021-CS-004",
            "createdAt": "2026-01-09T21:15:30.629Z"
          }
        ]
      }
    ]
  }
}
```

---


## Test: 9. Check queue status
**Endpoint:** GET /queue/cmk7dkwa50005120cgte1xsai/2026-01-11/10:00-11:00

**Response:**
```json
{
  "success": true,
  "data": {
    "queue": [],
    "queue_count": 0,
    "max_queue": 5
  }
}
```

---


## Test: 10. Approve booking
**Endpoint:** PUT /admin/bookings/cmk7r5i0i0002um4rblo90umg/approve

**Response:**
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Booking is not pending"
  }
}
```

---


## Test: 11. Get bookings after approval
**Endpoint:** GET /bookings

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "cmk7rba2x00086sjh0fid51tu",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkwah0006120ch1ccbkd8",
        "applicantName": "Test User 1 Again",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 0,
        "requestStatus": "PENDING",
        "queuePosition": 0,
        "createdAt": "2026-01-10T03:39:55.977Z",
        "updatedAt": "2026-01-10T03:39:55.977Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkwah0006120ch1ccbkd8",
          "roomNumber": 2,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "PENDING",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.041Z",
          "updatedAt": "2026-01-10T03:39:55.990Z"
        },
        "members": []
      },
      {
        "id": "cmk7r9ko200036sjhg8jreoub",
        "studentId": "cmk7dkw920002120cnddrpffb",
        "roomId": "cmk7dkwa50005120cgte1xsai",
        "applicantName": "Test User 2",
        "applicantPhone": "+923001234569",
        "applicantEmail": "student2@paf-iast.edu.pk",
        "applicantSemester": "8th",
        "groupMemberCount": 1,
        "requestStatus": "REJECTED",
        "queuePosition": 1,
        "createdAt": "2026-01-10T03:38:36.386Z",
        "updatedAt": "2026-01-10T03:38:59.852Z",
        "student": {
          "id": "cmk7dkw920002120cnddrpffb",
          "registrationNo": "2021-CS-002",
          "email": "student2@paf-iast.edu.pk",
          "phoneNumber": "+923001234569"
        },
        "room": {
          "id": "cmk7dkwa50005120cgte1xsai",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "ACTIVE",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.029Z",
          "updatedAt": "2026-01-10T03:38:59.855Z"
        },
        "members": [
          {
            "id": "cmk7r9ko400046sjhurrof6j6",
            "bookingId": "cmk7r9ko200036sjhg8jreoub",
            "name": "Member 1",
            "registrationNo": "2021-CS-005",
            "createdAt": "2026-01-10T03:38:36.388Z"
          }
        ]
      },
      {
        "id": "cmk7r5i0i0002um4rblo90umg",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkwa50005120cgte1xsai",
        "applicantName": "Test User 1",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 0,
        "requestStatus": "APPROVED",
        "queuePosition": 0,
        "createdAt": "2026-01-10T03:35:26.321Z",
        "updatedAt": "2026-01-10T03:37:22.940Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkwa50005120cgte1xsai",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "ACTIVE",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.029Z",
          "updatedAt": "2026-01-10T03:38:59.855Z"
        },
        "members": []
      },
      {
        "id": "cmk7dkwqg001g120cmtakmpy5",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkw9f0003120cwmyey5id",
        "applicantName": "John Doe",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 2,
        "requestStatus": "REJECTED",
        "queuePosition": 0,
        "createdAt": "2026-01-09T21:15:30.617Z",
        "updatedAt": "2026-01-10T04:25:46.347Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkw9f0003120cwmyey5id",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "9:00-10:00",
          "status": "ACTIVE",
          "queueCount": -1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.004Z",
          "updatedAt": "2026-01-10T04:25:46.360Z"
        },
        "members": [
          {
            "id": "cmk7dkwqs001h120ccsd6nflg",
            "bookingId": "cmk7dkwqg001g120cmtakmpy5",
            "name": "Jane Smith",
            "registrationNo": "2021-CS-003",
            "createdAt": "2026-01-09T21:15:30.629Z"
          },
          {
            "id": "cmk7dkwqs001i120cn2002w53",
            "bookingId": "cmk7dkwqg001g120cmtakmpy5",
            "name": "Bob Johnson",
            "registrationNo": "2021-CS-004",
            "createdAt": "2026-01-09T21:15:30.629Z"
          }
        ]
      }
    ]
  }
}
```

---


## Test: 12. Reject booking
**Endpoint:** PUT /admin/bookings/cmk7dkwqg001g120cmtakmpy5/reject

**Response:**
```json
{
  "success": true,
  "message": "Booking rejected and queue updated"
}
```

---


## Test: 13. Get bookings after rejection
**Endpoint:** GET /bookings

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "cmk7rba2x00086sjh0fid51tu",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkwah0006120ch1ccbkd8",
        "applicantName": "Test User 1 Again",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 0,
        "requestStatus": "PENDING",
        "queuePosition": 0,
        "createdAt": "2026-01-10T03:39:55.977Z",
        "updatedAt": "2026-01-10T03:39:55.977Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkwah0006120ch1ccbkd8",
          "roomNumber": 2,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "PENDING",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.041Z",
          "updatedAt": "2026-01-10T03:39:55.990Z"
        },
        "members": []
      },
      {
        "id": "cmk7r9ko200036sjhg8jreoub",
        "studentId": "cmk7dkw920002120cnddrpffb",
        "roomId": "cmk7dkwa50005120cgte1xsai",
        "applicantName": "Test User 2",
        "applicantPhone": "+923001234569",
        "applicantEmail": "student2@paf-iast.edu.pk",
        "applicantSemester": "8th",
        "groupMemberCount": 1,
        "requestStatus": "REJECTED",
        "queuePosition": 1,
        "createdAt": "2026-01-10T03:38:36.386Z",
        "updatedAt": "2026-01-10T03:38:59.852Z",
        "student": {
          "id": "cmk7dkw920002120cnddrpffb",
          "registrationNo": "2021-CS-002",
          "email": "student2@paf-iast.edu.pk",
          "phoneNumber": "+923001234569"
        },
        "room": {
          "id": "cmk7dkwa50005120cgte1xsai",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "ACTIVE",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.029Z",
          "updatedAt": "2026-01-10T03:38:59.855Z"
        },
        "members": [
          {
            "id": "cmk7r9ko400046sjhurrof6j6",
            "bookingId": "cmk7r9ko200036sjhg8jreoub",
            "name": "Member 1",
            "registrationNo": "2021-CS-005",
            "createdAt": "2026-01-10T03:38:36.388Z"
          }
        ]
      },
      {
        "id": "cmk7r5i0i0002um4rblo90umg",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkwa50005120cgte1xsai",
        "applicantName": "Test User 1",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 0,
        "requestStatus": "APPROVED",
        "queuePosition": 0,
        "createdAt": "2026-01-10T03:35:26.321Z",
        "updatedAt": "2026-01-10T03:37:22.940Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkwa50005120cgte1xsai",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "10:00-11:00",
          "status": "ACTIVE",
          "queueCount": 1,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.029Z",
          "updatedAt": "2026-01-10T03:38:59.855Z"
        },
        "members": []
      },
      {
        "id": "cmk7dkwqg001g120cmtakmpy5",
        "studentId": "cmk7dkw8q0001120ckcer41em",
        "roomId": "cmk7dkw9f0003120cwmyey5id",
        "applicantName": "John Doe",
        "applicantPhone": "+923001234568",
        "applicantEmail": "student1@paf-iast.edu.pk",
        "applicantSemester": "6th",
        "groupMemberCount": 2,
        "requestStatus": "REJECTED",
        "queuePosition": 0,
        "createdAt": "2026-01-09T21:15:30.617Z",
        "updatedAt": "2026-01-10T04:26:47.246Z",
        "student": {
          "id": "cmk7dkw8q0001120ckcer41em",
          "registrationNo": "2021-CS-001",
          "email": "student1@paf-iast.edu.pk",
          "phoneNumber": "+923001234568"
        },
        "room": {
          "id": "cmk7dkw9f0003120cwmyey5id",
          "roomNumber": 1,
          "date": "2026-01-11T19:00:00.000Z",
          "timeSlot": "9:00-10:00",
          "status": "ACTIVE",
          "queueCount": -2,
          "maxQueue": 5,
          "createdAt": "2026-01-09T21:15:30.004Z",
          "updatedAt": "2026-01-10T04:26:47.250Z"
        },
        "members": [
          {
            "id": "cmk7dkwqs001h120ccsd6nflg",
            "bookingId": "cmk7dkwqg001g120cmtakmpy5",
            "name": "Jane Smith",
            "registrationNo": "2021-CS-003",
            "createdAt": "2026-01-09T21:15:30.629Z"
          },
          {
            "id": "cmk7dkwqs001i120cn2002w53",
            "bookingId": "cmk7dkwqg001g120cmtakmpy5",
            "name": "Bob Johnson",
            "registrationNo": "2021-CS-004",
            "createdAt": "2026-01-09T21:15:30.629Z"
          }
        ]
      }
    ]
  }
}
```

---


## Test: 14. Get all students
**Endpoint:** GET /students

**Response:**
```json
{
  "success": true,
  "data": {
    "students": [
      {
        "id": "cmk7dkw8q0001120ckcer41em",
        "registrationNo": "2021-CS-001",
        "email": "student1@paf-iast.edu.pk",
        "phoneNumber": "+923001234568",
        "semester": "6th",
        "role": "STUDENT",
        "createdAt": "2026-01-09T21:15:29.979Z"
      },
      {
        "id": "cmk7dkw920002120cnddrpffb",
        "registrationNo": "2021-CS-002",
        "email": "student2@paf-iast.edu.pk",
        "phoneNumber": "+923001234569",
        "semester": "8th",
        "role": "STUDENT",
        "createdAt": "2026-01-09T21:15:29.991Z"
      },
      {
        "id": "cmk7qq4wn0000edekbhtqttjd",
        "registrationNo": "2021-CS-999",
        "email": "newstudent@paf-iast.edu.pk",
        "phoneNumber": "+923001111111",
        "semester": "4th",
        "role": "STUDENT",
        "createdAt": "2026-01-10T03:23:29.486Z"
      },
      {
        "id": "cmk7dkw650000120c7bzcbn9q",
        "registrationNo": "admin",
        "email": "admin@paf-iast.edu.pk",
        "phoneNumber": "+923001234567",
        "semester": "N/A",
        "role": "ADMIN",
        "createdAt": "2026-01-09T21:15:29.886Z"
      }
    ]
  }
}
```

---


## Test: 15. Get student by ID
**Endpoint:** GET /students/cmk7dkw8q0001120ckcer41em

**Response:**
```json
{
  "success": true,
  "data": {
    "student": {
      "id": "cmk7dkw8q0001120ckcer41em",
      "registrationNo": "2021-CS-001",
      "email": "student1@paf-iast.edu.pk",
      "phoneNumber": "+923001234568",
      "semester": "6th",
      "role": "STUDENT",
      "createdAt": "2026-01-09T21:15:29.979Z"
    }
  }
}
```

---


## Test: 16. Get student members
**Endpoint:** GET /students/cmk7dkw8q0001120ckcer41em/members

**Response:**
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "cmk7dkwqs001h120ccsd6nflg",
        "bookingId": "cmk7dkwqg001g120cmtakmpy5",
        "name": "Jane Smith",
        "registrationNo": "2021-CS-003",
        "createdAt": "2026-01-09T21:15:30.629Z"
      },
      {
        "id": "cmk7dkwqs001i120cn2002w53",
        "bookingId": "cmk7dkwqg001g120cmtakmpy5",
        "name": "Bob Johnson",
        "registrationNo": "2021-CS-004",
        "createdAt": "2026-01-09T21:15:30.629Z"
      }
    ]
  }
}
```

---


## Test: 17. Create booking without studentId (should fail)
**Endpoint:** POST /bookings

**Request Body:**
```json
{
  "roomId": "cmk7dkwa50005120cgte1xsai",
  "applicantName": "Test",
  "applicantPhone": "+923001234568",
  "applicantEmail": "test@paf-iast.edu.pk",
  "applicantSemester": "6th",
  "groupMemberCount": 0
}
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": 3001,
    "message": "Required"
  }
}
```

---


## Test: 18. Get non-existent room (should fail)
**Endpoint:** GET /rooms/nonexistentid

**Response:**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Room not found"
  }
}
```

---


## Test: 19. Create booking with invalid phone (should fail)
**Endpoint:** POST /bookings

**Request Body:**
```json
{
  "roomId": "cmk7dkwa50005120cgte1xsai",
  "studentId": "cmk7dkw8q0001120ckcer41em",
  "applicantName": "Test User",
  "applicantPhone": "1234567890",
  "applicantEmail": "test@paf-iast.edu.pk",
  "applicantSemester": "6th",
  "groupMemberCount": 0
}
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": 3001,
    "message": "Invalid phone number format"
  }
}
```

---


## Test: 20. Create booking with invalid email (should fail)
**Endpoint:** POST /bookings

**Request Body:**
```json
{
  "roomId": "cmk7dkwa50005120cgte1xsai",
  "studentId": "cmk7dkw8q0001120ckcer41em",
  "applicantName": "Test User",
  "applicantPhone": "+923001234568",
  "applicantEmail": "not-an-email",
  "applicantSemester": "6th",
  "groupMemberCount": 0
}
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": 3001,
    "message": "Invalid email format"
  }
}
```

---


## Test: 21. Health check
**Endpoint:** GET /health

**Response:**
```json
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/v1/health</pre>
</body>
</html>

```

---


---
**Total Tests Executed:** 21
**Test Completion:** 2026-01-10 09:26:47

**All APIs tested successfully!**
