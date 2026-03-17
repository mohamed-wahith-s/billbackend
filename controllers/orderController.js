const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { orderNumber, items, totalAmount } = req.body;
    
    // Parse items if they arrive as a string (common with FormData)
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

    let orderImage = '';
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      orderImage = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const newOrder = new Order({
      orderNumber,
      items: parsedItems,
      totalAmount,
      orderImage
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
