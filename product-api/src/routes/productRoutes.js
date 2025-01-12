const express = require("express");
const { createProduct, getProducts } = require("../controllers/productController");

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);

module.exports = router;


//url
// http://localhost:5000/api/products/create
