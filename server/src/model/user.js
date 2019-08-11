const mongoose = require('mongoose');
const config = require('../core/config/configs');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: String,
  password: String
});

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const userModel = mongoose.model(config.database.collections.user, userSchema);

userModel.comparePassword = async function(pass, hashedPass) {
  return await bcrypt.compare(pass, hashedPass);
}

module.exports = userModel;
