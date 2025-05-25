const Favorite = require("../../models/Favorite");

exports.addFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const exists = await Favorite.findOne({ userId, productId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Already in favorites" });
    }
    const favorite = new Favorite({ userId, productId });
    await favorite.save();
    res.status(201).json({ success: true, data: favorite });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error adding favorite" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await Favorite.findOneAndDelete({ userId, productId });
    res.status(200).json({ success: true, message: "Removed from favorites" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error removing favorite" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId }).populate("productId");
    res.status(200).json({ success: true, data: favorites });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error fetching favorites" });
  }
};