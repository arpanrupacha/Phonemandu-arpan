const Category = require("../../models/Category");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};