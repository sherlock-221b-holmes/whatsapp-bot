const mongoose = require('mongoose');
const GoodMorningSchema = new mongoose.Schema(
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

module.exports = GoodMorning = mongoose.model(
  'goodmorningmessage',
  GoodMorningSchema
);
