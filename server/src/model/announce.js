const mongoose = require('mongoose');
const config = require('../core/config/configs');

const announceSchema = mongoose.Schema({
  description: String,
  date: String
});

announceSchema.pre('save', function(next) {
  const d = new Date().toLocaleDateString('ro-RO', {year: 'numeric', month: 'long', day: 'numeric' })
  this.date = d
  next();
});

const announceModel = mongoose.model(config.database.collections.announce, announceSchema);

module.exports = announceModel;
