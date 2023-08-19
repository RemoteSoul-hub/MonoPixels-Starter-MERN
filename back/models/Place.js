const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  place_id: {
    type: String,
    required: true,
    unique: true // Ensure that each place_id is unique in the collection
  },
  website:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Place', placeSchema);
