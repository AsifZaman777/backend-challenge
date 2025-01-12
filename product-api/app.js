const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;  // Use module.exports instead of export default
