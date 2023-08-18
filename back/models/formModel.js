const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  text: String,
});

module.exports = mongoose.model('FormModel', formSchema);
