const mongoose = require("mongoose");
const { Link } = require("react-router-dom");

const JoinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Join", JoinSchema);
