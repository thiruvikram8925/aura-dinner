import { Router } from 'express';
import { Order, OrderItem } from '../models';
import { appendToExcel, ORDER_COLUMNS } from '../utils/excel';
import { isDbConnected, getMockData, saveMockData } from '../utils/dbFallback';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json(getMockData('Order'));
    }
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
    });
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
      order = await Order.create({ customerName, email, address, totalAmount });
      if (items && items.length > 0) {
        const orderItems = items.map((i: any) => ({
          orderId: order.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }));
        await OrderItem.bulkCreate(orderItems);
      }
      order = await Order.findByPk(order.id, {
        include: [{ model: OrderItem, as: 'items' }],
      });
    }

    try {
      const itemsStr = items.map((i: any) => `${i.name} (${i.quantity})`).join(', ');
      await appendToExcel('orders.xlsx', [
        (order.id || order._id).toString(),
        order.customerName, order.email, itemsStr,
        order.totalAmount, order.status, new Date().toLocaleString()
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
