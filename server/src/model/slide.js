const mongoose = require('mongoose');
const config = require('../core/config/configs');


const slideSchema = mongoose.Schema({
  text: String,
  img: String, 
});

module.exports = slideModel = mongoose.model(config.database.collections.slide, slideSchema);
