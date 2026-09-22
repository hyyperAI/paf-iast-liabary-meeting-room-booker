import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import roomRoutes from './routes/rooms';
import bookingRoutes from './routes/bookings';
import queueRoutes from './routes/queue';
import adminRoutes from './routes/admin';
import studentRoutes from './routes/students';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, _res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n[${timestamp}] ${req.method} ${req.originalUrl}`);

  if (Object.keys(req.query).length > 0) {
    console.log('  Query:', req.query);
  }
  if (Object.keys(req.params).length > 0) {
    console.log('  Params:', req.params);
  }
  if (req.method !== 'GET' && Object.keys(req.body).length > 0) {
    // Hide sensitive fields
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = '***';
    console.log('  Body:', safeBody);
  }

  next();
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
];

// Comma-separated list of extra allowed origins via env (e.g. "https://app.vercel.app,https://staging.app.vercel.app")
const extraOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || extraOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/queue', queueRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/students', studentRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
