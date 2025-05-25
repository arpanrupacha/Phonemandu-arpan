const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: {
      type: Number,
      default: 0, // Optional field with a default value
    },
    totalStock: Number,
    averageReview: {
      type: Number,
      default: 0, // Default to 0 if no reviews
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
