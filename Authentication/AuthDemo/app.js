const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  USER = require('./models/user'),
  localStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth_demo_app', {useMongoClient: true});

const app = express();

app.use(require('express-session')({
  secret: 'Head On, apply directly to the forehead',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(USER.authenticate()));
passport.serializeUser(USER.serializeUser());
passport.deserializeUser(USER.deserializeUser());

app.set('view engine', 'ejs');

// =====
// ROUTES
// =====
app.get('/', (req, res) => {
  res.render('home');
})
  .get('/register', (req, res) => {
    res.render('register');
  })
  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })
  .get('/secret', isLoggedIn, (req, res) => {
    res.render('secret');
});

app.post('/register', (req, res) => {
  USER.register(new USER({username: req.body.username}), req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret');
    });
  })
});

// LOGIN ROUTES
  app.get('/login', (req, res) => {
    res.render('login');
  })
  .post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
  }), (req, res) => {

  });

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

app.listen(8000, () => {
  console.log('=====================' +
    '\nServer running on port 8000' +
    '\n=====================');
})
