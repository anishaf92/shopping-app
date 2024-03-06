import { Router } from "express";
import Product from "../../models/product.js";
const router = Router();
router
  .get("/getProducts",async (req,res) => {
    await Product.find()
    .then(result => {
      res.send({result})
    })
    .catch(error => {
      console.error('Error retrieving products:', error);
    });
  })
  router.get("/getProductBySearch/:searchTerm", async (req, res) => {
    const searchTerm = req.params.searchTerm;
    console.log("called",searchTerm)

    try {
        // Convert the search term to lowercase for case-insensitive comparison
        await Product.find({name: { $regex: searchTerm.toLowerCase() } }).then((result) => {
        res.json({ result: result });
        })
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/getProductById/:id", async (req, res) => {
    const id = req.params.id;
    
    await Product.find({_id:id})
    .then(result => {
      console.log(result);
      res.send({result})
    })
    .catch(error => {
      console.error('Error retrieving products:', error);
    });
})

export default router;