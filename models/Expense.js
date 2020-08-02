const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter name"],
  },
  quantity: {
    type: Number,
    required: [true, "How many are you adding?"],
  },
  price: {
    type: Number,
    required: [true, "How much does one cost?"],
  },
  date: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
  location: {
    type: String,
    required: [true, "Please enter location"]
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
