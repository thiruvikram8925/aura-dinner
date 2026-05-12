import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import * as dotenv from 'dotenv';
import apiRoutes from './src/server/routes';
import { sequelize, initDatabase, FoodItem, User } from './src/server/models';
import { setDbConnected } from './src/server/utils/dbFallback';
import bcrypt from 'bcryptjs';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database Connection (MySQL via Sequelize)
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL');
    await initDatabase();
    setDbConnected(true);

    // Seed default data if tables are empty
    const foodCount = await FoodItem.count();
    if (foodCount === 0) {
      console.log('Seeding default menu items...');
    }

    const adminExists = await User.findOne({ where: { email: 'admin@aura.com' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({ name: 'Admin', email: 'admin@aura.com', password: hashedPassword, role: 'admin' });
      console.log('Default admin user created.');
    }
  } catch (err) {
    console.warn('--- DATABASE NOTICE ---');
    console.warn('MySQL connection failed (No local DB found).');
    console.warn('SYSTEM: Automatically enabled MOCK DATA FALLBACK for demo purposes.');
    console.warn('To use a real DB, install MySQL and configure MYSQL_* in .env');
    console.warn('------------------------');
    setDbConnected(false);
  }

  app.use(cors());
  app.use(express.json());

  // Health Check
  app.get('/api/health', (req, res) => {
    const { isDbConnected } = require('./src/server/utils/dbFallback');
    res.json({ status: 'ok', database: isDbConnected() ? 'connected' : 'mock-mode' });
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
