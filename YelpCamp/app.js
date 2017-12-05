const express = require('express'),
       app = express(),
       bodyParser = require('body-parser'),
       mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true})

//Schema Config
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})
let CAMPGROUND = mongoose.model('Campground', campgroundSchema);

// CAMPGROUND.create({
//   name: 'Castle Fartbox',
//   image: 'http://via.placeholder.com/420x220',
//   description: 'The lesser known castle on the wall...'
// }, (err, res) => {
//   if(err){
//     console.log(err);
//   }
//   else {console.log(`NEW CAMPGROUND ADDED:\n${res}`);}
// });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('landing');
})
  // INDEX - show all campgrounds
  .get('/campgrounds', (req, res) => {
    CAMPGROUND.find({}, (err, allCampgrounds) => {
      if(err){
        console.log(err);
      } else{
        res.render('index', {campgrounds: allCampgrounds})
      }
    })
  })
  // NEW - Show form to create new campground
  .get('/campgrounds/new', (req, res) => {
    res.render('new');
  })
  // SHOW - view a single campground
  .get('/campgrounds/:id', (req, res) => {
    CAMPGROUND.findById(req.params.id, (err, dbRes) => {
      if(err){
        console.log(err);
      } else{
          res.render('show', {campground: dbRes});
      }
    });
  })
  // CREATE - Add new campground
  .post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;

    let newCampground = {name: name, image: image, description: desc};

    CAMPGROUND.create(newCampground, (err, result) => {
      if(err){
        console.log(`Error:\n${err}`);
        res.redirect('/new');
      } else {
        console.log(`New campground added:\n${result}`);
        res.redirect('/campgrounds');
      }
    })
});

app.listen(8000, () => {
  console.log('The YelpCamp Server running on port 8000');
});
