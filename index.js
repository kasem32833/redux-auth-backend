const express = require ('express')
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route')
const { 
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
  } = require('./controllers/product.controller.js')

// declare a port
const port = 5000

// middleware 
app.use(cors());
app.use(express.json())

// routes
app.use('/api/products', productRoute)

// user: redux-admin-home
//password: NGpaHyi2chtXjx8A

mongoose.connect("mongodb+srv://redux-admin-home:NGpaHyi2chtXjx8A@cluster0.pygokcx.mongodb.net/reduxAuth?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("connected to the database");
  app.listen(port, ()=>{
  console.log(`server start on port of: ${port}`);
})
})
.catch(()=>{
  console.log("connection failed");
})

// test code for server
app.get('/', (req, res)=>{
  res.send('Hello abul Kasems and Tarin world')

}) 



 

