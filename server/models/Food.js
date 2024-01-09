const mongoose = require("mongoose");

const FoodShema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  daysSinceIAte: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", FoodShema);
module.exports = Food
