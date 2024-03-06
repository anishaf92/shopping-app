import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
});

const Cart = new mongoose.model('Cart', cartSchema);

export default Cart;
