import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import Product from './models/product.js';
import productRoutes from "./routes/product/index.js"
import cartRoutes from "./routes/cartRoutes/index.js"
import occasionRoutes from "./routes/occasionRoutes/index.js"


dotenv.config();

const app = express ();
const server = http.createServer(app);
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST','PATCH','DELETE'],
};

const PORT  =  process.env.PORT;
app.use(cors(corsOptions));

app.use (express.urlencoded ({extended: true}));
app.use (express.json ());
//routes
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/occasion", occasionRoutes);




const dbURL = process.env.mongodbURL;
mongoose.connect(dbURL);

mongoose.connection.on('connected', async () => {
  console.log('Connected to MongoDB');
  getAnnouncements()
  
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  
});



const getAnnouncements = async () => {
    await Product.find()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Error retrieving announcements:', error);
      });
  };
 

server.listen(PORT, () => {
  console.log ('listening',PORT);
})