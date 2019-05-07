const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: { type: String },

  password: { type: String },
  created_at: Date,
  provider: '',
  google: '',
  permission: { type: String, enum: ['ADMIN', 'USER', 'OWNER'], required: true }
});
userSchema.pre('save', function(next) {
  if (!this.created_at) this.created_at = new Date();
  next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;
