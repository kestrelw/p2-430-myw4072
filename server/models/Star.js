const mongoose = require('mongoose');
// const _ = require('underscore');

const StarSchema = new mongoose.Schema({ // data being saved

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
  rarity: doc.rarity,
});

const StarModel = mongoose.model('Star', StarSchema);
module.exports = StarModel;
