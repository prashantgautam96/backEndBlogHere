const mongoose= require("mongoose");

const { Link } = require("react-router-dom");

const GetInSchema = new mongoose.Schema(
  {
   
    email: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GetIn", GetInSchema);


