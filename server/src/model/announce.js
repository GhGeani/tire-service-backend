const mongoose = require('mongoose');
const config = require('../core/config/configs');

const announceSchema = mongoose.Schema({
  description: String,
  date: Date
});

announceSchema.pre('save', function(next) {
  this.date = new Date();
  next();
});

const announceModel = mongoose.model(config.database.collections.announce, announceSchema);

module.exports = announceModel;
