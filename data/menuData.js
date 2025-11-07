const { v4: uuidv4 } = require('uuid');

let menu = [
  {
    id: uuidv4(),
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and house sauce.',
    price: 9.99,
    category: 'entree',
    ingredients: ['beef', 'cheddar', 'lettuce', 'tomato', 'bun'],
    available: true
  },
  {
    id: uuidv4(),
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey center, served with vanilla ice cream.',
    price: 6.5,
    category: 'dessert',
    ingredients: ['chocolate', 'flour', 'sugar', 'eggs'],
    available: true
  }
];

function getAll() {
  return menu;
}

function getById(id) {
  return menu.find(item => item.id === id);
}

function create(item) {
  const newItem = { id: uuidv4(), ...item };
  menu.push(newItem);
  return newItem;
}

function update(id, changes) {
  const idx = menu.findIndex(m => m.id === id);
  if (idx === -1) return null;
  menu[idx] = { ...menu[idx], ...changes, id };
  return menu[idx];
}

function remove(id) {
  const idx = menu.findIndex(m => m.id === id);
  if (idx === -1) return false;
  menu.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
