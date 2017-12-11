const mongoose = require('mongoose');

// POST - title, conten
let postSchema = mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('Post', postSchema);
