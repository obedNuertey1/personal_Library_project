const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  comments: {
    type: [String],
  },
  commentcount:{
    type: Number,
    default: 0
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;