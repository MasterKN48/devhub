const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require("body-parser");
const app = express();
const passport=require('passport');

// bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db,{
    useCreateIndex: true,
    useNewUrlParser:true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//app.get('/', (req, res) => res.send('Hello World'));
mongoose.set('useFindAndModify', false);
// passport middleware
app.use(passport.initialize());

// passport config -- jwt stratgy like oauth stratgy
require("./config/passport")(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
