const express = require('express'),
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

// Requiring Routes
const commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  authRoutes = require('./routes/auth');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
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

app.use((req, res, next) => {
  // Locals determines what objectd are visible in EJS template
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(8000, () => {
  console.log('The YelpCamp Server running on port 8000');
});
