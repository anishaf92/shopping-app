const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const productRoutes = require('./routes/product/index.js');
const occasionRoutes= require('./routes/occasionRoutes/index.js');
const cartRoutes = require('./routes/cartRoutes/index.js');
const path = require("path")


dotenv.config();

const app = express ();
const server = http.createServer(app);
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST','PATCH','DELETE'],
};
console.log(process.env.mongodbURL)
const PORT  =  process.env.PORT;
app.use(cors(corsOptions));

app.use (express.urlencoded ({extended: true}));
app.use (express.json ());
//routes
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/occasion", occasionRoutes);

// --------------------------deployment-------------------------------
__dirname = path.resolve()
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"/client/build")))
  app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))
  })
}
else{
  app.get("/",(req,res) => res.send("API is running"))
}



const dbURL = process.env.mongodbURL;
mongoose.connect(dbURL);

mongoose.connection.on('connected', async () => {
  console.log('Connected to MongoDB');

  
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  
});




 

server.listen(PORT, () => {
  console.log ('listening',PORT);
})