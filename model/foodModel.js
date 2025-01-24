const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Entrer le nom du plat"],
    trim: true,
  },
  poids: {
    type: Number,
    required: [true, "Entrer le poids du plat"],
    maxLength: [8, "Price cannot exceed 9 characters"],
  },
  description: {
    type: String,
    required: [true, "Entrer la description du plat"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      food_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
   // when two admins are there. tab ye pta chalgea kiss admin ne product add kiya hai
   user: {
    type: mongoose.Schema.ObjectId, //  this is for admin who will add the prduct to the db
    ref: "userModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FoodModel = mongoose.model("FoodModel", foodSchema);
module.exports = FoodModel;
