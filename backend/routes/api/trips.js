const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose'); 
const  User = mongoose.model('User'); 
const Trip = mongoose.model('Trip'); 
const { requireUser, restoreUser } = require('../../config/passport'); 
const validateTripInput = require('../../validation/trips'); 

router.get('/', async(req, res) =>{
    try{
        const trips = await Trip.find()
                               .populate("planner", "_id, username")
                               .sort({ createdAt: -1}); 
        return res.json(trips); 
    }
    catch(err){
        return res.json([]); 
    }
});

router.get('/user/:userId', async (req, res, next) =>{
    let user; 
    try{
        user = await User.findById(req.params.userId); 
    } catch(err){
        const error = new Error('User not found'); 
        error.statusCode = 404; 
        error.errors = { message: "No user found with that id"}
        return next(error); 
    }
    try{
        const trips = await Trip.find({ planner: user._id })
                                .sort({ createdAt: -1 })
                                .populate("planner", "_id, username");
        return res.json(trips);
    }
    catch(err){
        return res.json([]); 
    }
});

router.get('/:id', async(req, res, next) =>{
    try{
        const trip = await Trip.findById(req.params.id)
                               .populate("planner", "_id, username");
        return res.json(trip);
    }
    catch(err){
        const error = new Error('Trip not found'); 
        error.statusCode = 404; 
        error.errors = { message: "No trip found with that id" }; 
        return next(error);
    }
})

router.post('/', requireUser, restoreUser, validateTripInput, async(req, res, next) =>{
    try{
        const newTrip = new Trip({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            city: req.body.city,
            country: req.body.country,
            planner: req.user._id
        }); 

        let trip = await newTrip.save(); 
        trip = await trip.populate('planner', '_id, username')
        res.json(trip);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;