const COMMENT = require('../models/comment'),
  CAMPGROUND = require('../models/campground');

let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You must be logged in to do that.');
  res.redirect('/login');
};

middlewareObj.verifyCampgroundOwner = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to do that.');
    res.redirect('back');
  } else {
    CAMPGROUND.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        console.log(err);
        req.flash('error', 'Campground not found.');
        res.redirect('back');
      } else {
          if(!foundCampground) {
            req.flash('error', 'Sneaky...')
            return res.redirect('/');
          }
          // Does the user own the campground?
          if (foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash('error', 'Only the campground owner may modify a this campground.');
            res.redirect('back');
          }
      }
    });
  }
};

middlewareObj.verifyCommentOwner = (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('You must be logged in to perform this action...');
    res.redirect('back');
  }
  else {
    COMMENT.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
        console.log(err);
        req.flash('error', 'Comment not found.');
        res.redirect('back');
      }
      else {
        // Does the user own the comment?
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', 'Only the comment owner may modify this comment.');
          res.redirect('back');
        }
      }
    });
  }
};

module.exports = middlewareObj;
