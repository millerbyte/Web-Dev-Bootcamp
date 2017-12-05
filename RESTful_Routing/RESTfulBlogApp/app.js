const bodyParser = require('body-parser'),
       mongoose = require('mongoose'),
       express = require('express'),
       app = express();

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app',
  {useMongoClient: true});

let blogSchema = mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

let BLOG = mongoose.model('blog', blogSchema);

// RESTFUL ROUTES
app.get('/', (req, res) => {
  res.redirect('/blogs')
})
// INDEX ROUTE
.get('/blogs', (req, res) => {
  BLOG.find({}, (err, blogs) => {
    if(err){
      console.log(`Error:\n${err}`);
    } else{
        res.render('index', {blogs});
    }
  })
})
// NEW ROUTE
.get('/blogs/new' , (req, res) => {
  res.render('new');
})
// SHOW ROUTE
.get('/blogs/:id', (req, res) => {
  BLOG.findById(req.params.id, (err, blog) => {
    if(err){
      console.log(err);
      res.redirect('/blogs');
    } else {
        res.render('show', {blog});
    }
  })

})
// CREATE ROUTE
.post('/blogs', (req, res) => {
  BLOG.create(req.body.blog, (err, dbr) => {
    if(err){
      console.log(err);
      res.render('new');
    } else {
        res.redirect('/blogs');
    }
  })
})

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
