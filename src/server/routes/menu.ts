import { Router } from 'express';
import { FoodItem } from '../models';
import { isDbConnected, getMockData, saveMockData } from '../utils/dbFallback';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json(getMockData('FoodItem'));
    }
    const items = await FoodItem.find();
    res.json(items);
  } catch (error) {
    res.json(getMockData('FoodItem')); // Fallback on error too
  }
});

router.post('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      const item = saveMockData('FoodItem', req.body);
      return res.status(201).json(item);
    }
    const item = new FoodItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    if (!isDbConnected()) {
       const item = saveMockData('FoodItem', req.body);
       return res.status(201).json(item);
    }
    res.status(400).json({ message: 'Error adding menu item' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: 'Error updating menu item' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting menu item' });
  }
});

export default router;
