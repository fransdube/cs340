// /* const invModel = require("../models/inventory-model")
// const utilities = require("../utilities/")

// const invCont = {}

// /* ***************************
//  *  Build inventory by classification view
//  * **************************
//  */
// /* invCont.buildByClassificationId = async function (req, res, next) {
//   const classification_id = req.params.classificationId
//   const data = await invModel.getInventoryByClassificationId(classification_id)
//   const grid = await utilities.buildClassificationGrid(data)
//   let nav = await utilities.getNav()
//   const className = data[0].classification_name
//   res.render("./inventory/classification", {
//     title: className + " vehicles",
//     nav,
//     grid,
//   })
// }  */

//   invCont.buildByClassificationId = async function (req, res, next) {
//     try {
//       const classification_id = req.params.classificationId;
//       const data = await invModel.getInventoryByClassificationId(classification_id);
      
//       if (!data || data.length === 0) {
//         throw new Error('No vehicles found for this classification');
//       }
      
//       const grid = await utilities.buildClassificationGrid(data);
//       let nav = await utilities.getNav();
//       const className = data[0].classification_name;
      
//       res.render("./inventory/classification", {
//         title: className + " vehicles",
//         nav,
//         grid,
//       });
//     } catch (error) {
//       console.error('Error in buildByClassificationId:', error);
//       next(error);
//     }
//   };

const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    
    if (!data || data.length === 0) {
      let nav = await utilities.getNav();
      return res.render("./inventory/classification", {
        title: "No Vehicles Found",
        nav,
        grid: '<p class="notice">Sorry, no matching vehicles could be found.</p>',
      });
    }
    
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  } catch (error) {
    console.error('Controller Error:', error);
    next(error);
  }
};

invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inventory_id = req.params.inventoryId;
    const data = await invModel.getInventoryByInventoryId(inventory_id);
    const grid = await utilities.buildInventoryGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].inv_make + " " + data[0].inv_model;
    res.render("./inventory/detail", {
      title: className,
      nav,
      grid,
    });
  } catch (error) {
    console.error('Controller Error:', error);
    next(error);
  }
};

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Add new classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const classificationResult = await invModel.addClassification(classification_name)
  let nav = await utilities.getNav()
  if (classificationResult) {
    req.flash("notice", `Congratulations, you\'ve added ${classification_name}.`)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the addition failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    classificationList,
    errors: null,
  })
}

/* ***************************
 *  Add new inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  const inventoryResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )
  let nav = await utilities.getNav()
  if (inventoryResult) {
    req.flash("notice", `Congratulations, you\'ve added the ${inv_make} ${inv_model}.`)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    let classificationList = await utilities.buildClassificationList(classification_id)
    req.flash("notice", "Sorry, the addition failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      classificationList,
      errors: null,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    })
  }
}

module.exports = invCont;