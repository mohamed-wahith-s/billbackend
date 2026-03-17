const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a product
exports.addProduct = async (req, res) => {
  const { name, price } = req.body;
  
  let image = req.body.image || 'https://via.placeholder.com/150';
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    image = `${baseUrl}/uploads/${req.file.filename}`;
  }

  try {
    const newProduct = new Product({ name, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      updateData.image = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
