const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter name of Item"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter how many"],
  },
  location: {
    type: String,
    required: [true, "Please enter location"]
  }
});

module.exports = mongoose.model("Inventory", InventorySchema);
