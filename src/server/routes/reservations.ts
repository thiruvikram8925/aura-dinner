import { Router } from 'express';
import { Reservation } from '../models';
import { isDbConnected, getMockData, saveMockData } from '../utils/dbFallback';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json(getMockData('Reservation'));
    }
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.json(getMockData('Reservation'));
  }
});

router.post('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      const reservation = saveMockData('Reservation', req.body);
      return res.status(201).json(reservation);
    }
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    if (!isDbConnected()) {
       const reservation = saveMockData('Reservation', req.body);
       return res.status(201).json(reservation);
    }
    res.status(400).json({ message: 'Error creating reservation' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    if (!isDbConnected()) {
       // Just return mock success for demo
       return res.json({ message: 'Status updated (mock)', status: req.body.status });
    }
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating reservation status' });
  }
});

export default router;
