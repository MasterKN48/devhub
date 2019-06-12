const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path =require('path');
const items =require('./route/api/item');
const app=express();

//BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db= require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));

// route ./api/items
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
