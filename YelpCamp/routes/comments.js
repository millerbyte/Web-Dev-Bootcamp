const express = require('express'),
  router = express.Router({mergeParams: true}),
  middleware = require('../middleware'),
  COMMENT = require('../models/comment'),
  CAMPGROUND = require('../models/campground');

// =================
//    COMMENT ROUTES
// =================
// Comments New
router.get('/new', middleware.isLoggedIn, (req, res) => {
  CAMPGROUND.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
        res.render('comments/new', {campground});
    }
  })
})
// Comments Create
  .post('/', middleware.isLoggedIn, (req, res) => {
    CAMPGROUND.findById(req.params.id, (err, campground) => {
      if(err){
        console.log(err);
        res.redirect(`/campgrounds/${req.params.id}/comments/new`);
      }
      else {
        COMMENT.create(req.body.comment, (err, newComment) => {
          if (err) {
            console.log(err);
          }
          else {
            // add username and ID to comment
            newComment.author.id = req.user._id;
            newComment.author.username = req.user.username;
            newComment.save();
            campground.comments.push(newComment);
            campground.save();
            console.log(newComment);
            req.flash('success', 'Comment successfully added.');
            res.redirect(`/campgrounds/${req.params.id}`)
          }
        })
      }
    })
  });

// EDIT - Edit comment
router.get('/:comment_id/edit', middleware.verifyCommentOwner, (req, res) => {
  COMMENT.findById(req.params.comment_id, (err, comment) => {
    if(err){
      console.log(err);
      res.redirect('back');
    }
    else {
      res.render('comments/edit', {campgroundId: req.params.id,
        comment: comment});
    }
  });
});

// UPDATE - Update comment in DB
router.put('/:comment_id', middleware.verifyCommentOwner, (req, res) => {
  COMMENT.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err) {
      console.log(err);
      res.redirect('back');
    }
    else if(!updatedComment) {
      req.flash('error', 'sneaky...');
    }
    else {
      req.flash('success', 'Comment successfully updated.');
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  })
});

// DESTROY - Remove comment
router.delete('/:comment_id', middleware.verifyCommentOwner, (req, res) => {
  COMMENT.findByIdAndRemove(req.params.comment_id, (err) => {
    if(err){
      req.flash('error', 'Comment not found.');
      res.redirect('back');
      console.log(err);
    }
    else {
      req.flash('success', 'Comment successfully removed.');
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  })
});

module.exports = router;
