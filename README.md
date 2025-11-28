# Booking API Backend

This is a simple backend API for managing bookings and messages. It provides endpoints to retrieve booking details and to post and retrieve messages for each booking.

---

## Table of Contents

- Features
- Tech Stack
- Setup
- Environment Variables
- API Endpoints
- Mock Data
- License

---

## Features

- Retrieve bookings from a combination of ServiceM8 API and mocked data.
- Retrieve messages for a specific booking.
- Post messages for a specific booking (stored in-memory).
- Simple in-memory storage for messages.

---

## Tech Stack

- Node.js
- Express.js (or similar framework)
- dotenv
- node-fetch

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/rfhtorres31-renji/customerportalmvcbackend
cd customerportalmvcbackend
```

2. Install dependencies:

```bash
npm install
```
3. Start the server:

```bash
npm server.js
```
---

## Environment Variables

- `SERVICEM8_API_KEY` – smk-7cb94a-79b61bf845b0d3d8-64e148cd927f8ece
---

## API Endpoints

### Get all bookings

```
GET /api/bookings
```

### Get messages for a booking

```
GET /api/bookings/:uuid/messages
```

### Post a message for a booking

```
POST /api/bookings/:uuid/messages
Content-Type: application/json

{
  "sender": "Customer",
  "message": "Hello, I have a question."
}
```

**Notes:**

- Returns `400` if `uuid`, `sender`, or `message` is missing.
- Messages are stored in-memory and will reset when the server restarts.

---

## Mock Data

The backend includes sample bookings in `mockedData` for testing purposes, combined with live ServiceM8API Fetching
