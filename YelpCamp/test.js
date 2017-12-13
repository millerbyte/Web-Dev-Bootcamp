'use strict';

var express = require('express'),
    app = express(),
    seedDB = require('./seeds'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    USER = require('./models/user'),
    COMMENT = require('./models/comment'),
    CAMPGROUND = require('./models/campground');
// PORT = process.env.PORT || 8000,
// IP = process.env.IP || '127.0.0.1';

// Requiring Routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    authRoutes = require('./routes/auth');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
mongoose.connect('mongodb://matthew:dbpass123@ds137336.mlab.com:37336/yelpers', { useMongoClient: true });

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(flash());

// seedDB(); // Seed the DB

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'I should be applying for jobs...',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(USER.authenticate()));
passport.serializeUser(USER.serializeUser());
passport.deserializeUser(USER.deserializeUser());

app.use(function (req, res, next) {
  // Locals determines what objectd are visible in EJS template
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// app.listen(PORT, IP, () => {
//   console.log('The YelpCamp Server running on port ' + PORT);
// });

app.listen(process.env.PORT, process.env.IP, function () {
  console.log('The YelpCamp Server running on port ' + PORT);
});
