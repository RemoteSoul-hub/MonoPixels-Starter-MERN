const mongoose = require('mongoose');

const biz_scrap = new mongoose.Schema( {
  id: String,
  biz_name: String,
})

module.exports = mongoose.model('G_result', biz_scrap);
