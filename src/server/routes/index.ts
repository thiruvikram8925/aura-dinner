import { Router } from 'express';
import authRoutes from './auth';
import menuRoutes from './menu';
import orderRoutes from './orders';
import reservationRoutes from './reservations';
import reviewRoutes from './reviews';

const router = Router();

router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/reservations', reservationRoutes);
router.use('/reviews', reviewRoutes);

export default router;
