const express = require('express'),
  router = express.Router(),
  CAMPGROUND = require('../models/campground');

// ==================
//    CAMPGROUND ROUTES
// ==================
// Index Route
  router.get('/', (req, res) => {
    CAMPGROUND.find({}, (err, allCampgrounds) => {
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds/index', {
          campgrounds: allCampgrounds
        });
      }
    });
});
// NEW - Show form to create new campground
  router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});
// SHOW - view a single campground
  router.get('/:id', (req, res) => {
  CAMPGROUND.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: campground});
    }
  });
});
// CREATE - Add new campground
  router.post('/', isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };

  let newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };

  CAMPGROUND.create(newCampground, (err, result) => {
    if (err) {
      console.log(`Error:\n${err}`);
      res.redirect('/new');
    } else {
      console.log(`New campground added:\n${result}`);
      res.redirect('/campgrounds');
    }
  })
});

// EDIT - display campground edit form
router.get('/:id/edit', verifyOwnership, (req, res) => {
  CAMPGROUND.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
      res.redirect('back');
    }
    else {
      res.render('campgrounds/edit', {campground: foundCampground});
    }
  });
});

// UPDATE - update the campground in the DB
router.put('/:id', verifyOwnership, (req, res) => {
  CAMPGROUND.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if(err){
      res.redirect(`/campgrounds/${req.params.id}/edit`);
    }
    else {
      res.redirect(`/campgrounds/${req.params.id}`)
      console.log(`Campground ${updatedCampground.name} has been updated successfully.`);
    }
  });
});

// DESTROY - Delete campground
router.delete('/:id', verifyOwnership, (req, res) => {
  CAMPGROUND.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/campgrounds');
  });
});

// =============
//    MIDDLEWARE
// =============
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

function verifyOwnership(req, res, next){
  if(!req.isAuthenticated()){
    console.log('You must be logged in to perform this action...');
    res.redirect('back');
  }
  else {
    CAMPGROUND.findById(req.params.id, (err, foundCampground) => {
      if(err) {
        console.log(err);
        res.redirect('back');
      }
      else {
        // Does the user own the campground?
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  }
};

module.exports = router;
