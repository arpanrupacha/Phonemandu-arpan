const express = require("express");
const { addFavorite, removeFavorite, getFavorites } = require("../../controllers/shop/favorite-controller");
const router = express.Router();

router.post("/add", addFavorite);
router.post("/remove", removeFavorite);
router.get("/:userId", getFavorites);

module.exports = router;