const mongoose = require('mongoose');
const config = require('../core/config/configs');

mongoose.set('useFindAndModify', false);

const itemSchema = mongoose.Schema({
  name: String,
  description: String, 
  avalible: Boolean,
  date: Date,
  images: [String]
});

module.exports = itemModel = mongoose.model(config.database.collections.item, itemSchema);
