import { Router } from "express";
import Cart from "../../models/cart.js";

const router = Router();

router.post("/addToCart", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cartItem = await Cart.create({ productId, quantity });
    res.send({ result: "Added to cart" });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send({ error: 'Error adding to cart' });
  }
});

router.post("/removeFromCart", async (req, res) => {
  const { productId } = req.body;

  try {
    const cartItem = await Cart.findOne({ productId });
    if (!cartItem) {
      return res.status(404).send({ result: "Item not found in cart" });
    }

    if (cartItem.quantity === 1) {
      await Cart.findOneAndDelete({ productId });
      console.log('Item removed from cart:', cartItem);
      res.send({ result: "Removed from cart" });
    } else {
      // Decrease quantity by 1 if greater than 1
      cartItem.quantity--;
      await cartItem.save();
      console.log('Item quantity updated in cart:', cartItem);
      res.send({ result: "Quantity updated in cart" });
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).send({ error: 'Error removing from cart' });
  }
});

router.get("/getCartProducts", async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');

    const products = cartItems.map(item => ({
      productId: item.productId._id,
      productName: item.productId.name,
      productPrice: item.productId.price,
      productOccasion: item.productId.occasion,
      productImage: item.productId.image_url
    }));
    res.send({ result: products });
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).send({ error: 'Error retrieving cart items' });
  }
});



export default router;
