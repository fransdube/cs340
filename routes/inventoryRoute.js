// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const classificationRules = require("../utilities/classification-validation")
const inventoryRules = require("../utilities/inventory-validation")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by detail view
router.get("/detail/:inventoryId", invController.buildByInventoryId);

// Route to build management view
router.get("/", invController.buildManagementView);

// Route to build add classification view
router.get("/add-classification", invController.buildAddClassification);

// Post route to add new classification
router.post(
    "/add-classification",
    classificationRules.classificationRules(),
    classificationRules.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
);

// Route to build add inventory view
router.get("/add-inventory", invController.buildAddInventory);

// Post route to add new inventory
router.post(
    "/add-inventory",
    inventoryRules.inventoryRules(),
    inventoryRules.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
);

// Route to trigger an error
router.get("/error", (req, res, next) => {
  next({status: 500, message: 'This is an intentional error.'})
});

module.exports = router;