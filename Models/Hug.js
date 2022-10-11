const mongoose = require('mongoose');
const HugMessageSchema = new mongoose.Schema(
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

module.exports = HugMessage = mongoose.model('HugMessage', HugMessageSchema);
