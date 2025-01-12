const express = require('express');
const { createCategory, getCategories,getCategoryByName } = require('../controllers/categoryController');

const router = express.Router();

// Create a new category
router.post('/create', createCategory);
// Get all categories
router.get('/', getCategories);
//filter category by name
router.get('/:name', getCategoryByName);



module.exports = router;
