const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const StarSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   set: setName,
  // },
  // age: {
  //   type: Number,
  //   min: 0,
  //   required: true,
  // },
  rarity: {
    type: Number,
    min: 1,
    max: 5,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

StarSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  rarity: doc.rarity,
});

const StarModel = mongoose.model('Star', StarSchema);
module.exports = StarModel;
