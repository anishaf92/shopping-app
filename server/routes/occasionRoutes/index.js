import { Router } from "express";
import Product from "../../models/product.js";
const router = Router();
router
  .get("/:occasion",async (req,res) => {
    const occasion = req.params;
    console.log(occasion.occasion)
    try {
        const products = await Product.find({ occasion: { $in: occasion.occasion } });
        res.json({ products });
      } catch (error) {
        console.error('Error fetching products by occasion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  })
export default router;