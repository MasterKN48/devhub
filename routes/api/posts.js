const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

const Profile= require('../../models/Profile');
const Post=require('../../models/Post');
mongoose.set('useFindAndModify', false);
const validatePostInput=require('../../valid/post');

// @route   POST api/posts
// @desc    Create post route
// @access  Private
router.post('/',passport.authenticate('jwt',{session:false}), (req, res) => {
    const {errors,isValid}=validatePostInput(req.body);
    if(!isValid){
        res.status(400).json(errors);
    }
    const newPost =new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    });
    newPost.save().then(post =>res.json(post));
});

// @route   GET api/posts
// @desc    Get post route
// @access  Public
router.get('/',(req,res)=>{
    Post.find()
    .sort({date:-1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({msg:'No Post Now'}));
})

// @route   GET api/posts/:id
// @desc    Get single post by id route
// @access  Public
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({msg:'No Post Found with that ID'}));
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id route
// @access  Private
router.delete('/:id',passport.authenticate('jwt',{ session:false }),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile =>{
        Post.findById(req.params.id)
        .then(post => {
            // check for post owner
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({msg:'Unauthorized user'});
            }
            // Delete
            post.remove().then(()=>res.json({success:true}));
        })
        .catch(err => res.status(404).json({msg:'No Post Found to delete'}));
    });
});

// @route   POST api/posts/like/:id
// @desc    POST Like by ID route
// @access  Public
router.post('/like/:id',passport.authenticate('jwt',{session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile =>{
        Post.findById(req.params.id)
        .then(post=>{
            if(post.likes.filter(like => like.user.toString() === req.user.id).length >0){
                return res.status(400).json({alreadyliked:"User already liked this post"});
            }
           
            // Add user id to likes array
            post.likes.unshift({user:req.user.id});
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({msg:'Post not found'}));
    });
});

// @route   POST api/posts/unlike/:id
// @desc    POST unLike by ID route
// @access  Public
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile =>{
        Post.findById(req.params.id)
        .then(post=>{
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json({notliked:"you have not liked this post"});
            }
           
            // Remove user id to likes array
            const removeIndex=post.likes
            .map(item=>item.user.toString())
            .indexOf(req.user.id);
            //splice out of array
            post.likes.splice(removeIndex,1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({msg:'Post not found'}));
    });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private

router.post('/comment/:id',passport.authenticate('jwt',{session:false}), (req, res) => {
    const {errors,isValid}=validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);   
    }
    
    Post.findById(req.params.id)
    .then(post =>{
        const newComment={
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user:req.user.id
        }
        // Add to comment array
        post.comments.unshift(newComment);
        // save
        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({msh:'post not found'}));

});

// @route   Delette api/posts/comment/:id/:comment_id
// @desc    Delete comment to post
// @access  Private

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}), (req, res) => {

    Post.findById(req.params.id)
    .then(post =>{
        // check comment exists
        if(post.comments.filter(comment => comment._id.toString()===req.params.comment_id).length === 0){
            return res.status(404).json({msg:'Comment not exits'});
        }
        // Remove Index
        const removeIndex=post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
        // splice cmment out of array
        post.comments.splice(removeIndex,1);
        // save
        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({msh:'post not found'}));

});

module.exports = router;
