import { Router } from 'express';
import { Review } from '../models';
import { appendToExcel, REVIEW_COLUMNS } from '../utils/excel';
import { isDbConnected, getMockData, saveMockData } from '../utils/dbFallback';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json(getMockData('Review'));
    }
    const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
    res.json(reviews);
  } catch (error) {
    res.json(getMockData('Review'));
  }
});

router.post('/', async (req, res) => {
  try {
    let review: any;
    if (!isDbConnected()) {
      review = saveMockData('Review', req.body);
    } else {
      review = await Review.create(req.body);
    }

    try {
      await appendToExcel('reviews.xlsx', [
        review.userName,
        review.rating,
        review.comment,
        review.date || new Date().toISOString()
      ], REVIEW_COLUMNS);
    } catch (excelErr) {
      console.warn('Excel export failed', excelErr);
    }

    res.status(201).json(review);
  } catch (error) {
    if (!isDbConnected()) {
      const review = saveMockData('Review', req.body);
      return res.status(201).json(review);
    }
    res.status(400).json({ message: 'Error saving review' });
  }
});

export default router;
