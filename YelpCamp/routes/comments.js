const express = require('express'),
  router = express.Router({mergeParams: true}),
  CAMPGROUND = require('../models/campground'),
  COMMENT = require('../models/comment');

// =================
//    COMMENT ROUTES
// =================
// Comments New
router.get('/new', isLoggedIn, (req, res) => {
  CAMPGROUND.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
        res.render('comments/new', {campground});
    }
  })
})
// Comments Create
  .post('/', isLoggedIn, (req, res) => {
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
            res.redirect(`/campgrounds/${req.params.id}`)
          }
        })
      }
    })
  });

// EDIT - Edit comment
router.get('/:comment_id/edit', (req, res) => {
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
router.put('/:comment_id', (req, res) => {
  COMMENT.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err) {
      console.log(err);
      res.redirect('back');
    }
    else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
});

// DELETE
// Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
