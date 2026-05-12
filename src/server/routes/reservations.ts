import { Router } from 'express';
import { Reservation } from '../models';
import { isDbConnected, getMockData, saveMockData } from '../utils/dbFallback';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json(getMockData('Reservation'));
    }
    const reservations = await Reservation.findAll({ order: [['createdAt', 'DESC']] });
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
    const reservation = await Reservation.create(req.body);
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
       return res.json({ message: 'Status updated (mock)', status: req.body.status });
    }
    const { status } = req.body;
    await Reservation.update({ status }, { where: { id: req.params.id } });
    const reservation = await Reservation.findByPk(req.params.id);
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating reservation status' });
  }
});

export default router;
