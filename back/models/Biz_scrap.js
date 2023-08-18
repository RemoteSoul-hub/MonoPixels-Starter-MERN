const mongoose = require('mongoose');

const biz_scrap = new mongoose.Schema( {
  website: String,
  Email: String,
})

module.exports = mongoose.model('G_result', biz_scrap);
