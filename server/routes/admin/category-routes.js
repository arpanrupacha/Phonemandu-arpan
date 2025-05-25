const express = require("express");
const { addCategory, deleteCategory, getCategories } = require("../../controllers/admin/category-controller");
const router = express.Router();

router.post("/add", addCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get", getCategories);

module.exports = router;