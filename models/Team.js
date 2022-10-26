const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    current: {
      type: Boolean,
      required:false,
    },
    that_year:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
