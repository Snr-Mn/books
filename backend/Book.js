const mongoose = require('mongoose')

var BookSchema = new mongoose.Schema({
    title: String,
    author: String
});

// Compile model from schema
const Bookmodel = mongoose.model('BookModel', BookSchema);

module.exports = Bookmodel