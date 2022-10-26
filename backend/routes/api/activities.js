const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Activity = mongoose.model('Activity');
const { requireUser, restoreUser } = require('../../config/passport');
const validateActivityInput = require('../../validation/activities');


router.get('/', async(req, res) =>{
    try{
        const activities = await Activity.find()
                                         .populate("creator", "_id, username")
                                         .sort({ createdAt: -1});
        return res.json(activities);
    }
    catch(err){
        return res.json([]);
    }
});

router.get('/user/:userId', async (req, res, next) =>{
    let user; 
    try{
        user = await User.findById(req.params.userId);
    }
    catch(err){
        const error = new Error('User not found');
        error.statusCode = 404
        error.errors = { message: "No user found with that id"}
        return next(error);
    }
    try{
        const activities = await Activity.find({ creator: user._id})
                                         .sort({ createdAt: -1 })
                                         .populate("creator", "_id, username");
        return res.json(activities);
    }
    catch(err){
        return res.json([]); 
    }

})

router.get('/:id', async(req, res, next) =>{
    try{
        const activity = await Activity.findById(req.params.id)
                                       .populate("creator", "_id, username");
        return res.json(activity);
    }
    catch(err){
        const error = new Error('Activity not found'); 
        error.statusCode = 404; 
        error.errors = { message: "No activity found with that id" };
        return next(error);
    }
});

router.post('/create', requireUser, restoreUser, validateActivityInput, async(req, res, next) =>{
    try{
        const newActivity = new Activity({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            maxGuests: req.body.maxGuests,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            zipCode: req.body.zipCode,
            creator: req.user._id
        }); 

        let activity = await newActivity.save();
        activity = await activity.populate("creator", "_id, username")
        res.json(activity);
        
    }
    catch(err){
        next(err);
    }
});

module.exports = router; 