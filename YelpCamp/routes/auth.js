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
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
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
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
