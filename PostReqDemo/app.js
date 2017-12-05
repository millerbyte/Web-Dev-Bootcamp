const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let friends = ['Parker', 'Solomon', 'Lauren', 'Sierra'];

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('home');
})
  .get('/friends', (req, res) => {
    res.render('friends', {friends: friends});
  });

app.post('/addFriend', (req, res) => {
  friends.push(req.body.newFriend);
  res.redirect('/friends');
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
