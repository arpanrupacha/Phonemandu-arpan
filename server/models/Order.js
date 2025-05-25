const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  addressInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, default: "pending" }, // pending, confirmed, delivered
  paymentMethod: { type: String, default: "COD" }, // COD or other methods
  paymentStatus: { type: String, default: "pending" }, // pending, paid
  orderDate: { type: Date, default: Date.now },
  orderUpdateDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
