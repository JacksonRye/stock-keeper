const Inventory = require("../models/Inventory");

// @desc Get all inventory
// @route GET /api/v1/inventory
// access public
exports.getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find();

    return res.status(200).json({
      success: true,
      count: inventory.length,
      data: inventory,
    });
  } catch (err) {
    res.send(500).json({
      success: false,
      error: "Error fetching inventory",
    });
  }
};

// @desc Add inventory
// @route POST /api/v1/inventory
// access public
exports.addInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.create(req.body);

    return res.status(201).json({
      success: true,
      data: inventory,
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

// @desc Delete inventory
// @route DELETE /api/v1/inventory
// access public
exports.deleteInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({
        success: false,
        error: "No Inventory found",
      });
    }

    await inventory.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.send(500).json({
      success: false,
      error: "Error deleting inventory",
    });
  }
};

// @desc UPDATE inventory
// @route PUT /api/v1/inventory
// access public
exports.updateInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        error: "No Inventory found",
      });
    }

    await inventory.save();

    return res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: error.message,
    });
  }
};
