const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const upload = require('../middleware/upload');

// Routes
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', upload.single('orderImage'), createOrder);

module.exports = router;
