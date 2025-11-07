const express = require('express');
const router = express.Router();
const { menuValidationRules, validateMenu } = require('../middleware/validators');

// Temporary in-memory data
let menuItems = [
  { id: 1, name: 'Burger', description: 'Juicy grilled burger with cheese', price: 9.99, category: 'entree', ingredients: ['beef', 'cheese', 'bun'], available: true },
  { id: 2, name: 'Lemonade', description: 'Freshly squeezed lemonade', price: 2.99, category: 'beverage', ingredients: ['lemons', 'sugar', 'water'], available: true },
];

// GET all menu items
router.get('/', (req, res) => {
  res.status(200).json(menuItems);
});

// GET menu item by ID
router.get('/:id', (req, res) => {
  const item = menuItems.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Menu item not found' });
  res.status(200).json(item);
});

// POST new menu item
router.post('/', menuValidationRules, validateMenu, (req, res) => {
  const newItem = { id: menuItems.length + 1, ...req.body };
  menuItems.push(newItem);
  res.status(201).json(newItem);
});

// PUT update menu item
router.put('/:id', menuValidationRules, validateMenu, (req, res) => {
  const itemIndex = menuItems.findIndex(m => m.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).json({ message: 'Menu item not found' });

  menuItems[itemIndex] = { id: parseInt(req.params.id), ...req.body };
  res.status(200).json(menuItems[itemIndex]);
});

// DELETE menu item
router.delete('/:id', (req, res) => {
  const itemIndex = menuItems.findIndex(m => m.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).json({ message: 'Menu item not found' });

  const deletedItem = menuItems.splice(itemIndex, 1);
  res.status(200).json({ message: 'Menu item deleted', deleted: deletedItem });
});

module.exports = router;
