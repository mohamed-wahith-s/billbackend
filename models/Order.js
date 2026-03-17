const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  orderImage: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
