const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Activity = mongoose.model('Activity');
const { requireUser } = require('../../config/passport');
const validateActivityInput = require('../../validation/tweets');


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