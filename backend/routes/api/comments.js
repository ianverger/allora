const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
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

router.get('/user/:userId', async(req, res, next) =>{
    let user; 
    try{
        user = await User.findById(req.params.userId);
    } catch(err){
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: 'Unable to find user with that id'};
        return next(error);
    }
    try{
        const comments = await Comment.find({ publisher: user._id })
                                      .sort({ createdAt: -1 })
                                      .populate("publisher", "_id, username");
        return res.json(comments);
    }
    catch(err){
        return res.json([])
    }

});

router.get('/:id', async(req, res, next) =>{
    try{
        const comment = await Comment.findById(req.params.id)
                                     .populate("publisher", "_id, username");
        return res.json(comment);
    }
    catch(err){
        const error = new Error('Comment not found');
        error.statusCode = 404; 
        error.errors = { message: 'Unable to find comment with that id'};
        return next(error);
    }
});

router.post('/', requireUser, restoreUser, validateCommentInput, async(req, res, next) =>{
    try{
        const newComment = new Comment({
            publisher: req.user._id,
            text: req.body.text
        });

        let comment = await newComment.save();
        comment = await comment.populate('publisher', '_id, username');
        return res.json(comment);
    }
    catch(err){
        next(err);
    }
});

module.exports = router; 