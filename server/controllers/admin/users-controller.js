const User = require("../../models/User");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, "-password");
  res.json({ success: true, data: users });
};

exports.addUser = async (req, res) => {
  const { userName, email, password, role } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  const user = new User({ userName, email, password: hashPassword, role });
  await user.save();
  res.json({ success: true, message: "User added" });
};

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { userName, email, password, role } = req.body;
  const update = { userName, email, role };
  if (password) update.password = await bcrypt.hash(password, 12);
  await User.findByIdAndUpdate(id, update);
  res.json({ success: true, message: "User updated" });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ success: true, message: "User deleted" });
};