const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

let movie = '';

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('searchForm');
});

app.get('/results', (req, res) => {
  request(`http://www.omdbapi.com/?s=${movie}&apikey=thewdb`,
  (err, response, body) => {
    if(!err && response.statusCode == 200){
      let data = JSON.parse(body);
      res.render('results', {data: data.Search});
    }
  })
});

app.post('/search', (req, res) => {
  movie = req.body.movie;
  res.redirect('/results');
});

app.listen(8000, () => {
  console.log('server running on port 8000');
});
