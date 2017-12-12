const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  USER = require('../models/user');

// =============
//    AUTH ROUTES
// =============
// Root Route
router.get('/', (req, res) => {
  res.render('landing');
});

// Register Route
router.get('/register', (req, res) => {
  res.render('register');
})
.post('/register', (req, res) => {
  let newUser = new USER({username: req.body.username});
  USER.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Welcome to YelpCamp, ${newUser.username}!`);
      res.redirect('/campgrounds');
    });
  });
});

//Login Route
router.get('/login', (req, res) => {
  res.render('login');
})
.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {});

//Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out.');
  res.redirect('/campgrounds');
});

module.exports = router;
