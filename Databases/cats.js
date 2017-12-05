const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cat_app', {useMongoClient: true});


//define Schema
let catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

let Cat = mongoose.model('cat', catSchema);
// var cat = new Cat({
//   name: 'Tim',
//   age: 14,
//   temperament: 'stoic'
// });

// Add cat to DB
// cat.save((err, res) => {
//   if(err){
//     console.log('Error:', err);
//   } else{
//     console.log(`New cat added to db:\n${res}`);
//   }
// });

Cat.create({
  name: 'Snowball',
  age: 2,
  temperament: 'hellspawn'
}, (err, res) => {
  if(err){
    console.log(`Error: \n${err}`);
  } else{
    console.log(`Result: \n${res}`);
  }
});

//retreive all cats from the DB and log each
Cat.find({}, (err, res) => {
  if(err){
    console.log(err);
  } else{
    console.log(`Results:\n${res}`);
  }
})
