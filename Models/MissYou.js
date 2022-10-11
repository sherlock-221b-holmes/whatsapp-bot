const mongoose = require('mongoose');
const MissYouSchema = new mongoose.Schema(
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

module.exports = MissYou = mongoose.model('MissYoumessage', MissYouSchema);
