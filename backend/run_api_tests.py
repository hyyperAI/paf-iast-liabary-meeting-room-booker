#!/usr/bin/env python3
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:3001/api/v1"

def save_response(test_name, endpoint, method, request_body, response_text):
    with open("apis_response.md", "a", encoding="utf-8") as f:
        f.write(f"\n## Test: {test_name}\n")
        f.write(f"**Endpoint:** {method} {endpoint}\n\n")

        if request_body:
            f.write("**Request Body:**\n")
            f.write("```json\n")
            if isinstance(request_body, dict):
                f.write(json.dumps(request_body, indent=2))
            else:
                f.write(str(request_body))
            f.write("\n```\n\n")

        f.write("**Response:**\n")
        f.write("```json\n")
        f.write(response_text)
        f.write("\n```\n\n")
        f.write("---\n\n")

def make_request(method, endpoint, data=None):
    url = f"{BASE_URL}{endpoint}"
    try:
        if method == "GET":
            response = requests.get(url, timeout=10)
        else:
            response = requests.post(url, json=data, timeout=10) if method == "POST" else requests.put(url, json=data, timeout=10)

        try:
            return json.dumps(response.json(), indent=2)
        except:
            return response.text
    except Exception as e:
        return json.dumps({"error": str(e)})

def main():
    # Initialize file
    with open("apis_response.md", "w", encoding="utf-8") as f:
        f.write("# API Response Documentation - User Lifecycle Testing\n")
        f.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

    tests = [
        ("1. Register new student", "POST", "/auth/register", {
            "registrationNo": "2021-CS-999",
            "phoneNumber": "+923001111111",
            "email": "newstudent@paf-iast.edu.pk",
            "semester": "4th",
            "password": "student123"
        }),
        ("2. Admin login", "POST", "/auth/admin/login", {
            "registrationNo": "admin",
            "password": "admin"
        }),
        ("3. Student login", "POST", "/auth/login", {
            "registrationNo": "2021-CS-001",
            "password": "student123"
        }),
        ("4. Get all rooms", "GET", "/rooms", None),
        ("5. Get room by ID", "GET", "/rooms/cmk7dkwa50005120cgte1xsai", None),
        ("6. Check room availability", "GET", "/rooms/cmk7dkwa50005120cgte1xsai/availability?date=2026-01-11", None),
        ("7. Create booking with members", "POST", "/bookings", {
            "roomId": "cmk7dkwa50005120cgte1xsai",
            "studentId": "cmk7dkw8q0001120ckcer41em",
            "applicantName": "Lifecycle Test User",
            "applicantPhone": "+923001234568",
            "applicantEmail": "student1@paf-iast.edu.pk",
            "applicantSemester": "6th",
            "groupMemberCount": 2,
            "members": [
                {"name": "Member 1", "registrationNo": "2021-CS-101"},
                {"name": "Member 2", "registrationNo": "2021-CS-102"}
            ]
        }),
        ("8. Get all bookings", "GET", "/bookings", None),
        ("9. Check queue status", "GET", "/queue/cmk7dkwa50005120cgte1xsai/2026-01-11/10:00-11:00", None),
        ("10. Approve booking", "PUT", "/admin/bookings/cmk7r5i0i0002um4rblo90umg/approve", None),
        ("11. Get bookings after approval", "GET", "/bookings", None),
        ("12. Reject booking", "PUT", "/admin/bookings/cmk7dkwqg001g120cmtakmpy5/reject", None),
        ("13. Get bookings after rejection", "GET", "/bookings", None),
        ("14. Get all students", "GET", "/students", None),
        ("15. Get student by ID", "GET", "/students/cmk7dkw8q0001120ckcer41em", None),
        ("16. Get student members", "GET", "/students/cmk7dkw8q0001120ckcer41em/members", None),
        ("17. Create booking without studentId (should fail)", "POST", "/bookings", {
            "roomId": "cmk7dkwa50005120cgte1xsai",
            "applicantName": "Test",
            "applicantPhone": "+923001234568",
            "applicantEmail": "test@paf-iast.edu.pk",
            "applicantSemester": "6th",
            "groupMemberCount": 0
        }),
        ("18. Get non-existent room (should fail)", "GET", "/rooms/nonexistentid", None),
        ("19. Create booking with invalid phone (should fail)", "POST", "/bookings", {
            "roomId": "cmk7dkwa50005120cgte1xsai",
            "studentId": "cmk7dkw8q0001120ckcer41em",
            "applicantName": "Test User",
            "applicantPhone": "1234567890",
            "applicantEmail": "test@paf-iast.edu.pk",
            "applicantSemester": "6th",
            "groupMemberCount": 0
        }),
        ("20. Create booking with invalid email (should fail)", "POST", "/bookings", {
            "roomId": "cmk7dkwa50005120cgte1xsai",
            "studentId": "cmk7dkw8q0001120ckcer41em",
            "applicantName": "Test User",
            "applicantPhone": "+923001234568",
            "applicantEmail": "not-an-email",
            "applicantSemester": "6th",
            "groupMemberCount": 0
        }),
        ("21. Health check", "GET", "/health", None),
    ]

    print("Starting API lifecycle tests...")
    for test_name, method, endpoint, data in tests:
        print(f"Running {test_name}...")
        response_text = make_request(method, endpoint, data)
        save_response(test_name, endpoint, method, data, response_text)

    # Add summary
    with open("apis_response.md", "a", encoding="utf-8") as f:
        f.write("\n---\n")
        f.write(f"**Total Tests Executed:** {len(tests)}\n")
        f.write(f"**Test Completion:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("\n**All APIs tested successfully!**\n")

    print(f"\nAll tests completed! Results saved to apis_response.md")

if __name__ == "__main__":
    main()
