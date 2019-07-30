const mongoose = require('mongoose');
const config = require('../core/config/configs');

const infoSchema = mongoose.Schema({
  name: String,
  description: String, 
  priority: Number,
  avalible: Boolean
});

module.exports = itemModel = mongoose.model(config.database.collections.info, infoSchema);
