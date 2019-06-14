const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const Profile= require('../../models/Profile');
const User= require('../../models/User');
const validateProfileInput= require('../../valid/profile');
const validateEduInput= require('../../valid/edu');
const validateExpInput= require('../../valid/experience');

mongoose.set('useFindAndModify', false);
// @route   GET api/profile
// @desc    Get current user profile 
// @access  Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors={};
    Profile.findOne({user:req.user.id})
    .populate('user',['avatar','name'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='No Profile for User';
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
// @route   GET api/profile/all
// @desc    get all profile
// @access  Public

router.get('/all',(req,res)=>{
    const errors={};
    Profile.find()
    .populate('user',['avatar','name'])
    .then(profile=>{
        if(!profile){
            errors.noprofile="No Profiles";
            res.status(400).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json({msg:"There is No profiles"}));
})

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private

router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}= validateExpInput(req.body);
    // check validation
    if(!isValid){
        // return any errors with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newExp={
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        // Add to exp array

        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));
    })
})

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private

router.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}= validateEduInput(req.body);
    // check validation
    if(!isValid){
        // return any errors with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newEdu={
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        // Add to exp array

        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile));
    })
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        // Get remove index
        const removeIndex=profile.experience
        .map(item =>item.id)
        .indexOf(req.params.exp_id);
        // splice out of array
        profile.experience.splice(removeIndex,1);
        //save
        profile.save().then(profile=>res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        // Get remove index
        const removeIndex=profile.education
        .map(item =>item.id)
        .indexOf(req.params.edu_id);
        // splice out of array
        profile.education.splice(removeIndex,1);
        //save 
        profile.save().then(profile=>res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile
// @desc    Delete user abd profile
// @access  Private

router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndRemove({user:req.user.id}).then(()=>{
        User.findOneAndRemove({_id:req.user.id})
        .then(()=>res.json({msg:'True User deleted'}));
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    get profile by handle 
// @access  Public

router.get('/handle/:handle',(req,res)=>{
    const errors={};
    Profile.findOne({handle:req.params.handle})
    .populate('user',['avatar','name'])
    .then(profile=>{
        if(!profile){
            errors.noprofile="No Profile";
            res.status(400).json(errors);
        }
        res.json(profile);
    })
    .catch(err=> res.status(404).json(err));
})

// @route   GET api/profile/user/:user_id
// @desc    get profile by user ID 
// @access  Public

router.get('/user/:user_id',(req,res)=>{
    const errors={};
    Profile.findOne({handle:req.params.user_id})
    .populate('user',['avatar','name'])
    .then(profile=>{
        if(!profile){
            errors.noprofile="No Profile";
            res.status(400).json(errors);
        }
        res.json(profile);
    })
    .catch(err=> res.status(404).json({msg:"No profile"}));
})


// @route   POST api/profile
// @desc    Create or edit user profile 
// @access  Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}= validateProfileInput(req.body);
    // check validation
    if(!isValid){
        // return any errors with 400 status
        return res.status(400).json(errors);
    }
    // Get fields
    const profileFields={};
    profileFields.user=req.user.id;
    if(req.body.handle) profileFields.handle= req.body.handle;
    if(req.body.company) profileFields.company= req.body.company;
    if(req.body.website) profileFields.website= req.body.website;
    if(req.body.location) profileFields.location= req.body.location;
    if(req.body.bio) profileFields.bio= req.body.bio;
    if(req.body.status) profileFields.status= req.body.status;
    if(req.body.githubUserName) profileFields.githubUserName= req.body.githubUserName;
    // skills
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills=req.body.skills.split(',');
    }
    // social fields
    profileFields.social={};
    if(req.body.youtube) profileFields.social.youtube= req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter= req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin= req.body.linkedin;
    if(req.body.facebook) profileFields.social.facebook= req.body.facebook;
    Profile.findOne({user:req.user.id})
    .then(profile =>{
        if(profile){
            // update
            Profile.findOneAndUpdate({user:req.user.id},{$set: profileFields}, {new:true})
            .then(profile=> res.json(profile));
        } else{
            //check handle exits
            Profile.findOne({handle: profileFields.handle}).then(profile =>{
                if(profile){
                    errors.handle="That handle already exits";
                    res.status(400).json(errors);
                }
                // save profile
                new Profile(profileFields).save().then(profile=>res.json(profile));
            })
        }
    })


});


module.exports = router;
