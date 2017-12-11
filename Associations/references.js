const mongoose = require('mongoose');
const POST = require('./models/post');
const USER = require('./models/user');

// MONGOOSE CONFIG
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog_demo_2', {useMongoClient: true});

// USER.create({
//   email: 'foo@bar.edu',
//   name: 'Dr. Doom'
// });

POST.create({
  title: 'The Tangerines of Wrath',
  content: 'the quick brown fox be quick and brown, yo'
}, (err, post) => {
  USER.findOne({email: 'foo@bar.edu'}, (err, foundUser) => {
    if(err){
      console.log(err);
    } else{
      foundUser.posts.push(post);
      foundUser.save((err, data) => {
        if(err){
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  });
});

// USER.findOne({name: 'Dr. Doom'}).populate('posts').exec((err, user) => {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });
