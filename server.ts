import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import apiRoutes from './src/server/routes';
import { FoodItem, User } from './src/server/models';
import bcrypt from 'bcryptjs';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aura_dining';
  
  mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
    .then(async () => {
      console.log('Connected to MongoDB');
      // ... (internal seeding logic)
    })
    .catch(err => {
      console.warn('--- DATABASE NOTICE ---');
      console.warn('MongoDB connection failed (No local DB found).');
      console.warn('SYSTEM: Automatically enabled MOCK DATA FALLBACK for demo purposes.');
      console.warn('To use a real DB, add MONGODB_URI to your Secrets.');
      console.warn('------------------------');
    });

  app.use(cors());
  app.use(express.json());

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'mock-mode' });
  });

  // API Routes
  app.use('/api', apiRoutes);

  // Serve static assets from reports directory for excel downloads
  app.use('/reports', express.static(path.join(process.cwd(), 'reports')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
