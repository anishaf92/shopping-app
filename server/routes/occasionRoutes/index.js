const express = require('express');
const router = express.Router();
const Product = require("../../models/product.js");

router
  .get("/:occasion",async (req,res) => {
    const occasion = req.params;
    try {
        const products = await Product.find({ occasion: { $in: occasion.occasion } });
        res.json({ products });
      } catch (error) {
        console.error('Error fetching products by occasion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  })
module.exports = router;