// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by detail view
router.get("/detail/:inventoryId", invController.buildByInventoryId);

// Route to trigger an error
router.get("/error", (req, res, next) => {
  next({status: 500, message: 'This is an intentional error.'})
});

module.exports = router;