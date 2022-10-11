const mongoose = require('mongoose');
const LoveYouSchema = new mongoose.Schema(
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

module.exports = LoveYou = mongoose.model('LoveYoumessage', LoveYouSchema);
