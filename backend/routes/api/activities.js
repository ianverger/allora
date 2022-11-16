const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Activity = mongoose.model('Activity');
const Trip = mongoose.model('Trip');
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

router.get('/trip/:tripId', async (req, res, next) =>{
    let trip; 
    try{
        trip = await Trip.findById(req.params.tripId);
    }
    catch(err){
        const error = new Error('User not found');
        error.statusCode = 404
        error.errors = { message: "No trip found with that id"}
        return next(error);
    }
    try{
        const activities = await Activity.find({ trip: trip._id })
                                         .sort({ createdAt: -1 })
                                         .populate("creator", "_id, username");
        return res.json(activities);
    }
    catch(err){
        return res.json([]); 
    }

})

router.get('/:id', async(req, res, next) =>{
    try {
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

router.post('/', requireUser, restoreUser, validateActivityInput, async(req, res, next) =>{
    try {
        const newActivity = new Activity({
            trip: req.body.trip,
            title: req.body.title,
            activityDate: req.body.activityDate,
            description: req.body.description,
            creator: req.user._id,
        }); 
    
        let trip = await Trip.findById(req.body.trip)
        if (trip) {

            let activity = await newActivity.save();
            // activity = await activity.populate("creator", "_id, username")
            res.json(activity);
        } 
    }
    catch(err){
        next(err);
    }
});



router.delete("/:activityId", async (req, res, next) => {
    let activity;
    try {
      activity = await Activity.findById(req.params.activityId);
      activity.remove();
      return res.json(activity);
    } catch {
      const error = new Error("Activity not found");
      error.statusCode = 404;
      error.errors = { message: "No activity found with that id" };
      return next(error);
    }
  });

  router.put('/:activityId/upvote', requireUser, restoreUser, async (req, res, next) => {
    let activity;
    try {
      activity = await Activity.findByIdAndUpdate(req.params.activityId, {
            $push:{votes: req.user._id}
        })
        
      return res.json(activity);
    } catch {
        const error = new Error("Activity not found");
        error.statusCode = 404;
        error.errors = { message: "No activity found with that id" };
        return next(error);
      }
    
})

router.put('/:activityId/downvote', requireUser, restoreUser, async (req, res, next) => {
    let activity;
    try {
      activity = await Activity.findByIdAndUpdate(req.params.activityId, {
            $pull:{votes: req.user._id}
        }) 
      return res.json(activity);
    } catch {
      const error = new Error("Activity not found");
      error.statusCode = 404;
      error.errors = { message: "No activity found with that id" };
      return next(error);
    }
    
})

module.exports = router; 