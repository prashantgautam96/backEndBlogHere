const mongoose = require("mongoose");

const TestimoniaSchema = new mongoose.Schema(
  {
    imageSrc: {
      type: String,
      required: false,
      unique: true,
    },
    quote: {
      type: String,
      required: false,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerTitle: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonia", TestimoniaSchema);
