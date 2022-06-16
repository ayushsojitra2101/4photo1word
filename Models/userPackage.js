const mongoose = require("mongoose");

const userPackageSchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  lastLevel: {
    type: Number,
    default: 1,
  },
  time: [{
        type: String,
      }],
});

const userPackage = mongoose.model("userPackage", userPackageSchema);

module.exports = userPackage;
