const mongoose = require("mongoose");

const AkfrontSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: false,
      unique: true,
    },
    subject: {
      type: String,
      required: false,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
      unique: true,
    },
    link: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    featured: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AksharshalaFront", AkfrontSchema);
