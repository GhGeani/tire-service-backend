const mongoose = require('mongoose');
const config = require('../core/config/configs');

const announceSchema = mongoose.Schema({
  description: String,
  date: String
});

// announceSchema.pre('save', function(next) {
//   this.date = new Date().toLocaleDateString('ro-RO', {year: 'numeric', month: 'long', day: 'numeric' })
//   next();
// });

const announceModel = mongoose.model(config.database.collections.announce, announceSchema);

module.exports = announceModel;
