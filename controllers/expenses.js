const Expense = require("../models/Expense");

// @desc Get all expenses
// @route GET /api/v1/expenses
// access public
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find();

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (err) {
    res.send(500).json({
      success: false,
      error: "Error fetching expenses",
    });
  }
};

// @desc Add expense
// @route POST /api/v1/expenses
// access public
exports.addExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);

    return res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    if (err.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.send(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc Delete expense
// @route DELETE /api/v1/expenses
// access public
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "No Expense found",
      });
    }

    await expense.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.send(500).json({
      success: false,
      error: "Error deleting expense",
    });
  }
};

// @desc UPDATE expense
// @route PUT /api/v1/expenses
// access public
exports.updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "No Expense found",
      });
    }

    await expense.save();

    return res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: error.message,
    });
  }
};
