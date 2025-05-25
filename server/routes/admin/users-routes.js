const express = require("express");
const {
  getAllUsers,
  addUser,
  editUser,
  deleteUser,
} = require("../../controllers/admin/users-controller");

const router = express.Router();

router.get("/get", getAllUsers);
router.post("/add", addUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;