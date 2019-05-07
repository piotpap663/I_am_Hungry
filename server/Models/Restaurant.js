const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  email: { type: String },
  postalCode: { type: Array },
  minOrderPrice: { type: Number },
  opinionStars: { type: Number },
  opinions: { type: Number },
  deliveryCost: { type: Number },
  category: { type: Array },
  created_at: Date,
  slug: { type: String, required: true },
  Menu: { type: Object },
  owners: { type: Array, required: true },
  orders: { type: Array }
});
restaurantSchema.pre('save', function(next) {
  if (!this.created_at) this.created_at = new Date();
  next();
});

const Restaurant = mongoose.model('Restaurants', restaurantSchema);

module.exports = Restaurant;
