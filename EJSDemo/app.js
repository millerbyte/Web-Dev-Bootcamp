const express = require('express');
const app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
})
  .get('/filw/:thing', (req, res) => {
    res.render('love', {thingVar: req.params.thing});
  })
  .get('/posts',(req, res) => {
    let posts = [
      {title: 'A Song of Ice and Fire', author: 'George RR Martin'},
      {title: 'The Magic of Reality', author: 'Richard Dawkins'},
      {title: 'Sapiens', author: 'Yuval Noah Harari'}
    ];

    res.render('posts', {posts: posts});
  })

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
