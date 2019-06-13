const express = require('express');
const router = express.Router();
const gravatar=require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport=require('passport');
const validateRegisterInput=require('../../valid/register');
const validateLoginInput=require('../../valid/login');

// mongoose Model
const User=require('../../models/User');
const key = require("../../config/keys").secretKey;


// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid}=validateRegisterInput(req.body);
    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    User.findOne({ email:req.body.email })
    .then(user=>{
        if(user){
            errors.email="Email already exists"
            return res.status(400).json(errors);
        }
        else{
            const avatar= gravatar.url(req.body.email,{
                s:'200',
                r: 'pg',
                d: 'mm'
            })
            const newUser =new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        }
    })
});

// @route   POST api/users/login
// @desc    Login login user / returning token
// @access  Public
router.post('/login', (req, res) => {
    const {errors, isValid}=validateLoginInput(req.body);
    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
   
    const email=req.body.email;
   const password=req.body.password;
   // find user by email
   User.findOne({email})
   .then(user =>{
       if(!user){
           errors.email='User not found';
           return res.status(400).json(errors);
       }
       // check password
       bcrypt.compare(password, user.password) // give true/false value 
       .then(isMatch =>{
           if(isMatch){
               // User Matched
                const payload={id:user.id,name:user.name,avatar: user.avatar} ///payload jwt
               // Sign Token

                jwt.sign(payload,key,{expiresIn: 3600},(err,token)=>{
                    res.json({
                        success:true,
                        token: 'Bearer '+token // Bearer is protocol
                    });
                });


           }
           else{
               errors.password='Password Incorrect';
               return res.status(400).json(errors);
           } 
       })

   })
});


// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
   res.json({

       id:req.user.id,
       name:req.user.name,
       email:req.user.email
   }); 
})


module.exports = router;
