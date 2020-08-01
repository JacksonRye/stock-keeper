const express = require("express");
const router = express.Router();

const {
  getInventory,
  addInventory,
  deleteInventory,
  updateInventory,
} = require("../controllers/inventory");

router.route("/").get(getInventory).post(addInventory);

router.route("/:id").delete(deleteInventory).put(updateInventory);

module.exports = router;
