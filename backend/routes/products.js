const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    console.error('Error reading products data:', err);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Get product by ID
router.get('/:id', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    const product = jsonData.products.find(p => p.id == req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error('Error reading products data:', err);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

// Get products by category
router.get('/category/:category', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    const categoryProducts = jsonData.products.filter(p => p.category === req.params.category);
    
    res.json({ products: categoryProducts });
  } catch (err) {
    console.error('Error reading products data:', err);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

module.exports = router;
