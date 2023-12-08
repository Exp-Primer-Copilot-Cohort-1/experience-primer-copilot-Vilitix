// Create Web server 

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var jwt = require('express-jwt');

//middleware for authenticating jwt tokens
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// GET route for getting all comments
router.get('/', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }

    res.json(comments);
  });
});

// POST route for creating comments
router.post('/', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    res.json(comment);
  });
});

// Preload comment objects on routes with ':comment'
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

// GET route for returning a comment
router.get('/:comment', function(req, res) {
  res.json(req.comment);
});

// PUT route for updating a comment
router.put('/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

// DELETE route for deleting a comment
router.delete('/:comment', auth, function(req, res) {
  req.comment.remove();
  res.sendStatus(200);
});

module.exports = router;