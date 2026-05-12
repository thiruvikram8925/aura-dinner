import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import { isDbConnected } from '../utils/dbFallback';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'aura_secret';

router.post('/register', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(201).json({ message: 'User registered (mock)' });
    }
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role: role || 'customer' });
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isDbConnected()) {
       if (email === 'admin@aura.com' && password === 'admin123') {
         const token = jwt.sign({ id: 'mock-admin', role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
         return res.json({ token, user: { name: 'Principal Admin (Mock)', email, role: 'admin' } });
       }
       return res.status(401).json({ message: 'Invalid credentials (DB Disconnected)' });
    }

    const user: any = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
});

export default router;
