const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const { generateProductCode } = require('../utils/helpers');

/**
 * Create a new product.
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, image, status, categoryId } = req.body;

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Generate product code
    const productCode = generateProductCode(name);

    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      image,
      status,
      categoryId,
      productCode,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

/**
 * Get products with filters (Category, Name, Price).
 */
const getProducts = async (req, res) => {
  try {
    const { category, name } = req.query;

    let filter = {};
    if (category) {
      const categoryObj = await Category.findOne({ name: category });
      if (categoryObj) filter.categoryId = categoryObj._id;
    }
    if (name) filter.name = new RegExp(name, "i");

    const products = await Product.find(filter)
      .populate("categoryId", "name")
      .exec();

    // Calculate the final price after discount
    const productsWithPrices = products.map((product) => {
      const finalPrice = product.price - (product.price * product.discount) / 100;
      return { ...product.toObject(), finalPrice };
    });

    res.status(200).json(productsWithPrices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

//filter products by id,name,

//url http://localhost:5000/api/products/id/:id
const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("categoryId", "name").exec();
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ ...product.toObject() });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
}

//filter products by name  //url http://localhost:5000/api/products/name/:name
const getProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await Product.findOne({ name: name }).populate("categoryId", "name").exec();
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ ...product.toObject() });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
}





/**
 * Update a product's details (status, description, discount).
 */


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, description, discount } = req.body;
  try {
    const product = await Product.findById(id);
    console.log(product);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (status) product.status = status;
    if (description) product.description = description;
    if (discount !== undefined) product.discount = discount;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

module.exports = { createProduct, getProducts, getProductByID,getProductByName,updateProduct };
