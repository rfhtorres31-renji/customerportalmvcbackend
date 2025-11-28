import dotenv from 'dotenv';
dotenv.config();
import fetch from "node-fetch";


const mockedData = [
  {
    "uuid": "8cc15323-76d3-4f0e-8c32-1151f0e3261e",
    "active": 1,
    "date": "2025-11-30 14:30:00",
    "job_description": "Electrical inspection — flickering lights and circuit breaker check.",
    "job_address": "599 Katipunan Ave, Quezon City, Metro Manila",
    "status": "Work Order",
    "generated_job_id": "JOB-0024",
    "total_invoice_amount": "450.00",
    "edit_date": "2025-11-29 09:22:00",
    "attachments": [
      {
        "id": "a1-001",
        "name": "breaker-panel-photo.jpg",
        "url": "https://example.com/uploads/breaker-panel-photo.jpg"
      },
      {
        "id": "a1-002",
        "name": "flickering-lights-video.mp4",
        "url": "https://example.com/uploads/flickering-lights-video.mp4"
      }
    ]
  },
  {
    "uuid": "2bd73e09-f2c7-4818-bc41-84aa7851d2a0",
    "active": 1,
    "date": "2025-12-02 13:00:00",
    "job_description": "Refrigerator not cooling — possible compressor issue.",
    "job_address": "45 BF Resort Village, Las Piñas",
    "status": "Work Order",
    "generated_job_id": "JOB-0027",
    "total_invoice_amount": "1250.00",
    "edit_date": "2025-11-29 15:20:00",
     "attachments": [
      {
        "id": "b1-001",
        "name": "fridge-condition-before.jpg",
        "url": "https://example.com/uploads/fridge-condition-before.jpg"
      },
      {
        "id": "b1-002",
        "name": "compressor-diagnosis.pdf",
        "url": "https://example.com/uploads/compressor-diagnosis.pdf"
      }
    ]
  } 
]

const messagesStore = {};

const retrieveBookings = async function (req, res) {
  try {
    const response = await fetch('https://api.servicem8.com/api_1.0/job.json', {
      headers: {
        'X-API-Key': process.env.SERVICEM8_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ServiceM8 API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    const finalData = [...data, ...mockedData];
    res.status(200).json(finalData);
  } catch (error) {
    console.error('Error fetching ServiceM8 jobs:', error.message);
    return []; // fallback empty array
  }

};

// Get messages for a booking
const getMessages = (req, res) => {
  const { uuid } = req.params;
  const messages = messagesStore[uuid] || [];
  res.json(messages);
};

// Post message for a booking
const postMessage = (req, res) => {
  const { uuid } = req.params;
  const { message, sender } = req.body;

  if (!uuid || !message || !sender) {
    return res.status(400).json({ error: "Missing uuid, message, or sender" });
  }

  if (!messagesStore[uuid]) messagesStore[uuid] = [];
  messagesStore[uuid].push({ sender, message, timestamp: new Date().toISOString() });

  res.status(201).json({ success: true });
};


export default {retrieveBookings, getMessages, postMessage};