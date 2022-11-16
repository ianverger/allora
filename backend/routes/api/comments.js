const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Activity = mongoose.model('Activity');
const { requireUser, restoreUser } = require('../../config/passport');
const validateCommentInput = require('../../validation/comments');

router.get('/', async(req, res) =>{
    try{
        const comments = await Comment.find()
                                      .populate("publisher", "_id, username")
                                      .sort({ createdAt: -1 }); 
        return res.json(comments);
    }
    catch(err){
        return res.json([]); 
    }
})

router.get('/activities/:activityId', async (req, res, next) => {
    let activity;
    try {
        activity = await Activity.findById(req.params.activityId);
    }
    catch (err) {
        const error = new Error('Activity not found');
        error.statusCode = 404
        error.errors = { message: "No activity found with that id"}
        return next(error);
    }

    try {
        const comments = await Comment.find({ activity: activity._id})
                                      .sort( {createdAt: -1 })
                                      .populate("publisher", "-id, username");
        return res.json(comments);

    }
    catch(err) {
        return res.json([]);
    }
})

router.post('/new', requireUser, restoreUser, validateCommentInput, async(req, res, next) =>{
    try{
        const newComment = new Comment({
            activity: req.body.activity,
            text: req.body.text,
            publisher: req.user._id
        });

        let activity = await Activity.findById(req.body.trip)
        if (activity) {
            let comment = await newComment.save();
            // comment = await comment.populate('publisher', '_id, username');
            return res.json(comment);
        }
    }
    catch(err){
        next(err);
    }
});

module.exports = router; 