const express = require("express");
const { createProduct, getProducts, getProductByID,getProductByName,updateProduct} = require("../controllers/productController");

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.get("/id/:id", getProductByID);
router.get("/name/:name", getProductByName);
router.put("/update/:id", updateProduct);


module.exports = router;


//url
// http://localhost:5000/api/products/create
