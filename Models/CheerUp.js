const mongoose = require("mongoose");
const CheerUpSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    tag: {
      type: String,
      enum: ["used", "unused"],
      default: "unused"
    }
  },
  { timestamps: true }
);

module.exports = CheerUp = mongoose.model("cheerupmessage", CheerUpSchema);
