const express = require("express");
const {
  createProduct,
  getProducts,
  getProductByID,
  getProductByName,
  getProductByDiscount,
  getProductByCategory,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);

//filterings
router.get("/id/:id", getProductByID);
router.get("/name/:name", getProductByName);
router.get("/discount/:discount", getProductByDiscount);
router.get("/category/:category", getProductByCategory);

//update
router.put("/update/:id", updateProduct);

module.exports = router;

//url
// http://localhost:5000/api/products/create
