const mongoose = require('mongoose');

// MONGOOSE CONFIG
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog_demo', {useMongoClient: true});


// POST - title, conten
let postSchema = mongoose.Schema({
  title: String,
  content: String
});
let POST = mongoose.model('post', postSchema);

// USER - email, name
let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
let USER = mongoose.model('User', userSchema);

// let newUser = new USER({
//   email: 'foo@bar.gov',
//   name: 'Pvt. Puddinglips'
// });
// newUser.posts.push({
//   title: 'War... war never changes',
//   content: 'Fallout 3 is the best game in the world'
// })
// // let newUser = new USER({
// //   email: 'foo@bar.com',
// //   name: 'Pvt. Ryan'
// // });
// newUser.save((err, user) => {
//   if(err){
//     console.log(err);
//   } else{
//     console.log(user);
//   }
// });
USER.findOne({name: 'Pvt. Puddinglips'}, (err, user) => {
  if(err){
    console.log(err);
  } else{
    user.posts.push({
      title: 'Coffee, what, up wit dat?',
      content: 'Coffee, you so fine.  You so fine you blow my mind.  And butt.'
    });
    user.save((err, user) => {
      if(err){
        console.log(err);
      } else{
        console.log(user);
      }
    });
  }
});
// let newPost = new POST({
//   title: 'Grapes:  What\'s up with them?',
//   content: 'Coming up with titles is hard...'
// });
// newPost.save((err, post) => {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });
