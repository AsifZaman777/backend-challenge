const Category = require('../models/categoryModel');

/**
 * Create a new category.
 */
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate category name and description
    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
};

/**
 * Get all categories.
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

//get category by name
const getCategoryByName = async (req, res) => {
    try {
      const name = req.params.name;
      console.log(`Searching for category with name containing: ${name}`);
      
      // Use regular expression for partial match (case-insensitive)
      const category = await Category.findOne({ name: { $regex: name, $options: "i" } });
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category", error: error.message });
    }
  };
  
module.exports = { createCategory, getCategories, getCategoryByName };


