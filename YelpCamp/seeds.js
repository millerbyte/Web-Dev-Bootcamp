const mongoose = require('mongoose');
const CAMPGROUND = require('./models/campground');
const COMMENT = require('./models/comment');

let data = [
  {
    name: 'Castle Fartbox',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut dapibus ligula, ac porta enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at laoreet nisi, sed bibendum mi. Donec augue libero, accumsan quis vehicula at, vulputate quis quam. Nunc fringilla finibus diam, in gravida purus ornare et. Sed a egestas urna, at aliquet dolor. Donec accumsan, urna vel hendrerit tempor, nisl dui pharetra eros, non viverra leo ipsum et ligula. Sed sed ipsum eu justo facilisis dapibus non quis est. Praesent semper ex odio, dapibus mattis augue condimentum nec. Maecenas lacinia aliquam molestie. Vivamus porta, nisl at tincidunt consequat, felis odio feugiat nulla, eu consequat mi leo sed dui. Sed et metus eget ante dapibus lacinia sed vitae ligula.'
  }, {
    name: 'Mt. Saint Hellboy',
    image: 'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut dapibus ligula, ac porta enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at laoreet nisi, sed bibendum mi. Donec augue libero, accumsan quis vehicula at, vulputate quis quam. Nunc fringilla finibus diam, in gravida purus ornare et. Sed a egestas urna, at aliquet dolor. Donec accumsan, urna vel hendrerit tempor, nisl dui pharetra eros, non viverra leo ipsum et ligula. Sed sed ipsum eu justo facilisis dapibus non quis est. Praesent semper ex odio, dapibus mattis augue condimentum nec. Maecenas lacinia aliquam molestie. Vivamus porta, nisl at tincidunt consequat, felis odio feugiat nulla, eu consequat mi leo sed dui. Sed et metus eget ante dapibus lacinia sed vitae ligula.'
  }, {
    name: 'Widow\'s Peak',
    image: 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?auto=format&fit=crop&w=1949&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut dapibus ligula, ac porta enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at laoreet nisi, sed bibendum mi. Donec augue libero, accumsan quis vehicula at, vulputate quis quam. Nunc fringilla finibus diam, in gravida purus ornare et. Sed a egestas urna, at aliquet dolor. Donec accumsan, urna vel hendrerit tempor, nisl dui pharetra eros, non viverra leo ipsum et ligula. Sed sed ipsum eu justo facilisis dapibus non quis est. Praesent semper ex odio, dapibus mattis augue condimentum nec. Maecenas lacinia aliquam molestie. Vivamus porta, nisl at tincidunt consequat, felis odio feugiat nulla, eu consequat mi leo sed dui. Sed et metus eget ante dapibus lacinia sed vitae ligula.'
  }
];

function seedDB() {
  // remove all campgrounds
  CAMPGROUND.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Campgrounds removed!');
      // add several campgrounds
      data.forEach((seed) => {
        CAMPGROUND.create(seed, (err, campground) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Campground added: ${campground.name}`);
            // Create a comment
            COMMENT.create(
              {
              text: 'Praesent vulputate eleifend orci, sit amet congue odio volutpat ac. Quisque dignissim ante non libero ultrices, in condimentum augue semper. Donec pellentesque mauris ex, vitae finibus dui tincidunt at. Aliquam cursus leo orci, sed porttitor lacus vestibulum in. Suspendisse eget dolor et sapien aliquam aliquam.',
              author: 'Bob Ross'
            },
            (err, comment) => {
              if(err){
                console.log(err);
              } else{
                campground.comments.push(comment);
                campground.save();
                console.log('Created new comment');
              }
            }
          )
          }
        });
      });
    }
  });

  // add several comments
}

module.exports = seedDB;
