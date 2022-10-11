const mongoose = require('mongoose');
const GoodNightSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    tag: {
      type: String,
      enum: ['used', 'unused'],
      default: 'unused'
    }
  },
  { timestamps: true }
);

module.exports = GoodNight = mongoose.model(
  'GoodNightmessage',
  GoodNightSchema
);
