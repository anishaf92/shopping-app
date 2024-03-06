const mongoose = require("mongoose")
const productSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: true,
    },
    occasion:{
        type: Array,
        required: true,
    },
    price:{
      type:Number,
      required: true
    },
    image_url:{
        type: String,
        
    },

    })
          
const Product = new mongoose.model ('Product', productSchema);
module.exports = Product;