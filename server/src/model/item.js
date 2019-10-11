const mongoose = require('mongoose');
const config = require('../core/config/configs');

mongoose.set('useFindAndModify', false);

const itemSchema = mongoose.Schema({
  name: String,
  description: String, 
  avalible: Boolean,
  date: String,
  images: Array,
  section: Array
});

// itemSchema.pre('save', function(next) {
//   const d = new Date().toLocaleDateString('ro-RO', {year: 'numeric', month: 'long', day: 'numeric' })
//   this.date = d
//   next();
// });

module.exports = itemModel = mongoose.model(config.database.collections.item, itemSchema);
