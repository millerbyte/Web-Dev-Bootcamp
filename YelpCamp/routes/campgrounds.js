const express = require('express'),
  router = express.Router(),
  middleware = require('../middleware'),
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
  router.get('/new', middleware.isLoggedIn, (req, res) => {
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
  router.post('/', middleware.isLoggedIn, (req, res) => {
  let name = req.body.name;
  let price = req.body.price;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };

  let newCampground = {
    name: name,
    price: price,
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
router.get('/:id/edit', middleware.verifyCampgroundOwner, (req, res) => {
  CAMPGROUND.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('back');
    }
    else {
      res.render('campgrounds/edit', {campground: foundCampground});
    }
  });
});

// UPDATE - update the campground in the DB
router.put('/:id', middleware.verifyCampgroundOwner, (req, res) => {
  CAMPGROUND.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if(err){
      req.flash('error', err.message);
      res.redirect(`/campgrounds/${req.params.id}/edit`);
    }
    else {
      res.redirect(`/campgrounds/${req.params.id}`)
      console.log(`Campground ${updatedCampground.name} has been updated successfully.`);
    }
  });
});

// DESTROY - Delete campground
router.delete('/:id', middleware.verifyCampgroundOwner, (req, res) => {
  CAMPGROUND.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/campgrounds');
  });
});

module.exports = router;
