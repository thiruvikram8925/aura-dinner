import { Router } from 'express';
import { Order } from '../models';
import { appendToExcel, ORDER_COLUMNS } from '../utils/excel';
import { isDbConnected, getMockData, saveMockData } from '../utils/dbFallback';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json(getMockData('Order'));
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.json(getMockData('Order'));
  }
});

router.post('/', async (req, res) => {
  try {
    const { customerName, email, address, items, totalAmount } = req.body;
    let order: any;
    
    if (!isDbConnected()) {
      order = saveMockData('Order', { customerName, email, address, items, totalAmount, status: 'pending' });
    } else {
      order = new Order({
        customerName,
        email,
        address,
        items,
        totalAmount
      });
      await order.save();
    }

    // Export to Excel
    try {
      const itemsStr = items.map((i: any) => `${i.name} (${i.quantity})`).join(', ');
      await appendToExcel('orders.xlsx', [
        order._id.toString(),
        order.customerName,
        order.email,
        itemsStr,
        order.totalAmount,
        order.status,
        new Date().toLocaleString()
      ], ORDER_COLUMNS);
    } catch (excelErr) {
      console.warn('Excel export failed', excelErr);
    }

    res.status(201).json(order);
  } catch (error) {
    if (!isDbConnected()) {
       const order = saveMockData('Order', req.body);
       return res.status(201).json(order);
    }
    res.status(400).json({ message: 'Error creating order' });
  }
});

export default router;
